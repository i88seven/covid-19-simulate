<template>
  <div class="condition-form-container">
    <div class="condition-area">
      <h3>--- 人の意識による変数 ---</h3>
      <number-form
        v-model="value.meetFrequency"
        :options="options.meetFrequency"
        label="集会頻度(平均)"
        :precision="true"
      />
      <number-form
        v-model="value.peoplePerMeet"
        :options="options.peoplePerMeet"
        label="集会人数(平均)"
        :precision="true"
      />
    </div>

    <div class="condition-area">
      <h3>--- ウイルスについての変数 ---</h3>
      <number-form
        v-model="value.incubationPeriod"
        :options="options.incubationPeriod"
        label="潜伏期間(平均)"
      />
      <number-form
        v-model="value.infectionProbability"
        :options="options.infectionProbability"
        label="感染確率"
        :precision="true"
      />
      <number-form
        v-model="value.recoverPeriod"
        :options="options.recoverPeriod"
        label="回復までの日数(平均)"
      />
    </div>

    <div class="condition-area">
      <h3>--- 初期値 ---</h3>
      <number-form
        v-model="value.population"
        :options="options.population"
        label="昼間人口"
      />
      <number-form
        v-model="value.initialInfected"
        :options="options.initialInfected"
        label="初期感染者数"
      />
      <div class="form">
        <label class="form-label">開始日付</label>
        <el-date-picker
          v-model="value.startDate"
          type="date"
          placeholder="開始日付"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Conditions } from './constants';
import NumberForm, {
  Options as FormOptions,
} from '~/components/molecules/NumberForm';

@Component({
  components: {
    NumberForm,
  }
})
class ConditionForm extends Vue {
  options: {
    meetFrequency: FormOptions;
    peoplePerMeet: FormOptions;
    incubationPeriod: FormOptions;
    infectionProbability: FormOptions;
    recoverPeriod: FormOptions;
    population: FormOptions;
    initialInfected: FormOptions;
  } = {
    meetFrequency: {
      min: 0,
      max: 30,
    },
    peoplePerMeet: {
      min: 0,
      max: 100,
    },
    incubationPeriod: {
      min: 0,
      max: 30,
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

  @Prop()
  value!: Conditions;
}

export default ConditionForm;
</script>

<style scoped>
h3 {
  margin-block-end: 2px;
}

.form {
  margin-block-end: 8px;
}

.form-label {
  min-width: 140px;
}

.condition-form-container {
  display: flex;
}

.condition-area {
  float: left;
  margin: 0px 20px;
}
</style>
