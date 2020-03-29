<template>
  <el-card
    class="main-card"
  >
    <number-form
      v-model="incubationPeriod"
      :options="options.incubationPeriod"
      label="潜伏期間(平均)"
    />
    <number-form
      v-model="meetFrequency"
      :options="options.meetFrequency"
      label="集会頻度(平均)"
      :precision="true"
    />
    <number-form
      v-model="peoplePerMeet"
      :options="options.peoplePerMeet"
      label="集会人数(平均)"
      :precision="true"
    />
    <number-form
      v-model="infectionProbability"
      :options="options.infectionProbability"
      label="感染確率"
      :precision="true"
    />
    <number-form
      v-model="recoverPeriod"
      :options="options.recoverPeriod"
      label="回復までの日数(平均)"
    />
    <number-form
      v-model="population"
      :options="options.population"
      label="昼間人口"
    />
    <number-form
      v-model="initialInfected"
      :options="options.initialInfected"
      label="初期感染者数"
    />
    <div>
      <label>開始日付</label>
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="開始日付"
      />
    </div>
    <div>
      <el-button
        v-if="stoped"
        @click="execute"
      >
        予測を実行！
      </el-button>
      <el-button
        v-if="!stoped"
        @click="stop"
      >
        停止
      </el-button>
      <el-button
        v-if="intervalId && stoped"
        @click="restart"
      >
        再開
      </el-button>
    </div>
    <main-chart
      :labels="chartLabels"
      :infected-list="infectedList"
      :latent-list="latentList"
      :recovered-list="recoveredList"
    />
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import NumberForm, {
  Options as FormOptions,
} from '~/components/molecules/NumberForm';
import MainChart from '~/components/organisms/MainChart';

@Component({
  layout: 'default',
  components: {
    NumberForm,
    MainChart,
  }
})
class MainPage extends Vue {
  options: {
    incubationPeriod: FormOptions;
    meetFrequency: FormOptions;
    peoplePerMeet: FormOptions;
    infectionProbability: FormOptions;
    recoverPeriod: FormOptions;
    population: FormOptions;
    initialInfected: FormOptions;
  } = {
    incubationPeriod: {
      min: 0,
      max: 30,
    },
    meetFrequency: {
      min: 0,
      max: 30,
    },
    peoplePerMeet: {
      min: 0,
      max: 100,
    },
    infectionProbability: {
      min: 0,
      max: 1,
    },
    recoverPeriod: {
      min: 1,
      max: 60,
    },
    population: {
      min: 1,
      max: 100000000,
    },
    initialInfected: {
      min: 1,
      max: 10000,
    },
  };

  incubationPeriod = 5;
  meetFrequency = 1;
  peoplePerMeet = 5;
  infectionProbability = 0.5;
  recoverPeriod = 14;
  population = 10000000;
  initialInfected = 1;
  startDate = moment('2020/01/06');

  chartLabels: string[] = [];
  infectedList: number[] = []; // 累積ではない
  latentList: number[] = []; // 累積ではない
  recoveredList: number[] = []; // 累積ではない

  dayCount = 0;
  intervalId = 0;
  stoped = true;

  public execute() {
    this.dayCount = 0;
    this.intervalId = 0;
    this.chartLabels = [];
    this.infectedList = [];
    this.latentList = [];
    this.recoveredList = [];

    this.stoped = false;
    this.intervalId = window.setInterval(this.executePredict, 1000);
  };

  public restart() {
    this.stoped = false;
    this.intervalId = window.setInterval(this.executePredict, 1000);
  }

  private executePredict() {
    // 潜伏期間の日数前の日に潜在感染者になった人が顕在感染者となる
    const infected = this.preNumber(this.latentList, this.incubationPeriod);

    /*
      感染者は潜伏期間後に必ず症状が現れるものとする。
    */
    const preLatent = this.latentList.length !== 0
      ? this.preNumber(this.latentList)
      : this.initialInfected;
    const infectedSum = this.sumList(this.infectedList.slice(this.recoverPeriod * -1));
    const latentSum = this.sumList(this.latentList.slice(this.incubationPeriod * -1));
    const recoveredSum = this.sumList(this.recoveredList);
    // 感染者は昼間人口に含まない
    const activePopulation = this.population - infectedSum;
    const potentialPopulation = activePopulation - latentSum - recoveredSum;
    // すでに感染済みの人は感染しても新規感染者には含めない
    const populationRate = potentialPopulation / activePopulation;
    const predictedLatent = preLatent * this.meetFrequency
      * this.peoplePerMeet * this.infectionProbability * populationRate;

    // 顕在感染者が治癒平均日数過ぎたら回復者になる。
    const recovered = this.preNumber(this.infectedList, this.recoverPeriod);

    this.infectedList.push(infected);
    if (potentialPopulation > predictedLatent) {
      this.latentList.push(Math.ceil(predictedLatent));
    } else {
      this.latentList.push(potentialPopulation);
    }
    this.recoveredList.push(recovered);

    const targetDate = moment(this.startDate).add(this.dayCount, 'day');
    this.chartLabels.push(targetDate.format('YYYY-MM-DD'));
    this.dayCount++;
  }

  public stop(): void {
    window.clearInterval(this.intervalId);
    this.stoped = true;
  }

  private preNumber(list: number[], period?: number): number {
    if (!period) {
      period = 1;
    }
    if (list.length < period) {
      return 0;
    }
    return list[list.length - period];
  }

  private sumList(list: number[]): number {
    return list.reduce((acc, cur): number => {
      return acc + cur;
    }, 0);
  }
}

export default MainPage;
</script>

<style lang='scss' scoped>
.main-card {
  width: 100%;
}
</style>
