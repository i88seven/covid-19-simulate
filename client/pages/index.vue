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
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RangeForm, {
  Options as RangeOptions,
  Values as RangeValues,
} from '~/components/molecules/RangeForm';

@Component({
  layout: 'default',
  components: {
    RangeForm,
  }
})
class MainPage extends Vue {
  options: {
    incubationPeriod: RangeOptions;
    meetFrequency: RangeOptions;
    peoplePerMeet: RangeOptions;
    infectionProbability: RangeOptions;
    population: RangeOptions;
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
}

export default MainPage;
</script>

<style lang='scss' scoped>
.main-card {
  width: 100%;
}
</style>
