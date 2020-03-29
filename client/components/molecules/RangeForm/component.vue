<template>
  <div>
    <label>{{ label }}</label>
    <el-input-number
      v-model="value.min"
      :min="options.min"
      :max="options.max"
    />
    <el-input-number
      v-model="value.max"
      :min="options.min"
      :max="options.max"
    />
    <el-input-number
      v-model="value.mean"
      :min="options.min"
      :max="options.max"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RangeValues } from '~/utils/predict';
import { Options } from './constants';

@Component
class RangeForm extends Vue {
  @Prop()
  value!: RangeValues;

  @Prop({ default: { min: 0, max: 100 }})
  options?: Options;

  @Prop()
  label!: string;
}

export default RangeForm;
</script>
