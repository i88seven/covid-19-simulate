<template>
  <el-card
    class="main-card"
  >
    <range-form
      v-model="incubationPeriod"
      :options="options.incubationPeriod"
      label="潜伏期間"
    />
    <range-form
      v-model="meetFrequency"
      :options="options.meetFrequency"
      label="集会頻度"
    />
    <range-form
      v-model="peoplePerMeet"
      :options="options.peoplePerMeet"
      label="集会人数"
    />
    <div>
      <label>感染確率</label>
      <el-input-number
        v-model="infectionProbability"
        :min="options.infectionProbability.min"
        :max="options.infectionProbability.max"
      />
    </div>
    <div>
      <label>人口</label>
      <el-input-number
        v-model="population"
        :min="options.population.min"
        :max="options.population.max"
      />
    </div>
    <div>
      <label>初期感染者数</label>
      <el-input-number
        v-model="initialInfected"
        :min="options.initialInfected.min"
        :max="options.initialInfected.max"
      />
    </div>
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
        v-if="!intervalId"
        @click="execute"
      >
        予測を実行！
      </el-button>
      <el-button
        v-else
        @click="stop"
      >
        停止
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
import RangeForm, {
  Options as RangeOptions,
} from '~/components/molecules/RangeForm';
import predict, { RangeValues, PredictOptions } from '~/utils/predict';
import MainChart from '~/components/organisms/MainChart';

@Component({
  layout: 'default',
  components: {
    RangeForm,
    MainChart,
  }
})
class MainPage extends Vue {
  options: {
    incubationPeriod: RangeOptions;
    meetFrequency: RangeOptions;
    peoplePerMeet: RangeOptions;
    infectionProbability: RangeOptions;
    population: RangeOptions;
    initialInfected: RangeOptions;
  } = {
    incubationPeriod: {
      min: 0,
      max: 30,
    },
    meetFrequency: {
      min: 1,
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
    population: {
      min: 1,
      max: 100000000,
    },
    initialInfected: {
      min: 1,
      max: 10000,
    },
  };

  incubationPeriod: RangeValues = {
    min: 1,
    max: 14,
    mean: 5,
  };

  meetFrequency: RangeValues = {
    min: 0,
    max: 7,
    mean: 2,
  };

  peoplePerMeet: RangeValues = {
    min: 2,
    max: 20,
    mean: 5,
  };

  infectionProbability = 0.5;
  population = 10000000;
  initialInfected = 1;
  startDate = moment('2020/01/06');

  chartLabels: string[] = [];
  infectedList: number[] = [];
  latentList: number[] = [];
  recoveredList: number[] = [];

  dayCount = 0;
  intervalId = 0;

  public execute() {
    this.chartLabels = [];
    this.infectedList = [];
    this.latentList = [];
    this.recoveredList = [];

    this.intervalId = window.setInterval(this.executePredict, 1000);
  };

  private executePredict() {
    const predictOptions: PredictOptions = {
      incubationPeriod: this.incubationPeriod,
      meetFrequency:  this.meetFrequency,
      peoplePerMeet: this.peoplePerMeet,
      infectionProbability: this.infectionProbability,
      population: this.population,
      preInfected: this.preNumber(this.infectedList),
      preLatent: this.preNumber(this.latentList),
      preRecovered: this.preNumber(this.recoveredList),
    };
    const predictResult = predict(predictOptions);
    this.infectedList.push(predictResult.infected);
    this.latentList.push(predictResult.latent);
    this.recoveredList.push(predictResult.recovered);

    const targetDate = moment(this.startDate).add(this.dayCount, 'day');
    this.chartLabels.push(targetDate.format('YYYY-MM-DD'));
    this.dayCount++;
  }

  public stop(): void {
    window.clearInterval(this.intervalId);
    this.intervalId = 0;
  }

  private preNumber(list: number[]): number {
    if (list.length === 0) {
      return 0;
    }
    return list[list.length - 1];
  }
}

export default MainPage;
</script>

<style lang='scss' scoped>
.main-card {
  width: 100%;
}
</style>
