<template>
  <el-card
    class="main-card"
  >
    <condition-form
      v-model="conditions"
    />
    <div>
      <el-button
        v-if="stoped"
        type="primary"
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
import ConditionForm, { Conditions } from '~/components/organisms/ConditionForm';
import MainChart from '~/components/organisms/MainChart';

@Component({
  layout: 'default',
  components: {
    ConditionForm,
    MainChart,
  }
})
class MainPage extends Vue {
  conditions: Conditions = {
    meetFrequency: 1,
    peoplePerMeet: 5,
    incubationPeriod: 5,
    infectionProbability: 0.5,
    recoverPeriod: 14,
    population: 10000000,
    initialInfected: 1,
    startDate: moment('2020/01/06'),
  }

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
    const infected = this.preNumber(this.latentList, this.conditions.incubationPeriod);

    /*
      感染者は潜伏期間後に必ず症状が現れるものとする。
    */
    const preLatent = this.latentList.length !== 0
      ? this.preNumber(this.latentList)
      : this.conditions.initialInfected;
    const infectedSum = this.sumList(
      this.infectedList.slice(this.conditions.recoverPeriod * -1));
    const latentSum = this.sumList(
      this.latentList.slice(this.conditions.incubationPeriod * -1));
    const recoveredSum = this.sumList(this.recoveredList);
    // 感染者は昼間人口に含まない
    const activePopulation = this.conditions.population - infectedSum;
    const potentialPopulation = activePopulation - latentSum - recoveredSum;
    // すでに感染済みの人は感染しても新規感染者には含めない
    const populationRate = potentialPopulation / activePopulation;
    const predictedLatent = preLatent * this.conditions.meetFrequency *
      this.conditions.peoplePerMeet * this.conditions.infectionProbability
      * populationRate;

    // 顕在感染者が治癒平均日数過ぎたら回復者になる。
    const recovered = this.preNumber(this.infectedList, this.conditions.recoverPeriod);

    this.infectedList.push(infected);
    if (potentialPopulation > predictedLatent) {
      this.latentList.push(Math.ceil(predictedLatent));
    } else {
      this.latentList.push(potentialPopulation);
    }
    this.recoveredList.push(recovered);

    const targetDate = moment(this.conditions.startDate).add(this.dayCount, 'day');
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
