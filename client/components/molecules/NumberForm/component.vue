<template>
  <div class="number-form">
    <label class="form-label">{{ label }}</label>
    <el-input-number
      v-model="model"
      :min="options.min"
      :max="options.max"
      :precision="precisionNum"
      :step="precisionStep"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Options } from './constants';

@Component
class NumberForm extends Vue {
  @Prop()
  value!: number;

  @Prop({ default: { min: 0, max: 100 }})
  options?: Options;

  @Prop()
  label!: string;

  @Prop()
  precision?: boolean;

  get model(): number {
    return this.value;
  }

  set model(val: number) {
    this.$emit('input', val);
  }

  get precisionNum(): number | undefined {
    if (this.precision) {
      return 2;
    }
  }

  get precisionStep(): number | undefined {
    if (this.precision) {
      return 0.1;
    }
  }
}

export default NumberForm;
</script>

<style scoped>
.number-form {
  margin-bottom: 8px;
}

.form-label {
  min-width: 140px;
}
</style>
