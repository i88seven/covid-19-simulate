<template>
  <el-table
    :data="data"
  >
    <el-table-column
      prop="label"
      label="日付"
    />
    <el-table-column
      label="顕在感染者数"
    >
      <el-table-column
        prop="infected"
        label="新規(人)"
        align="right"
        :formatter="numberFormatter"
      />
      <el-table-column
        prop="infectedCumulative"
        label="合計(人)"
        align="right"
        :formatter="numberFormatter"
      />
    </el-table-column>
    <el-table-column
      label="潜在感染者数"
    >
      <el-table-column
        prop="latent"
        label="新規(人)"
        align="right"
        :formatter="numberFormatter"
      />
      <el-table-column
        prop="latentCumulative"
        label="合計(人)"
        align="right"
        :formatter="numberFormatter"
      />
    </el-table-column>
    <el-table-column
      label="回復者数"
    >
      <el-table-column
        prop="recovered"
        label="新規(人)"
        align="right"
        :formatter="numberFormatter"
      />
      <el-table-column
        prop="recoveredCumulative"
        label="合計(人)"
        align="right"
        :formatter="numberFormatter"
      />
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TableRow } from './constants';

@Component
class MainTable extends Vue {

  @Prop()
  data!: TableRow[];

  numberFormatter(row, column, cellValue): string {
    return cellValue.toLocaleString();
  }
}

export default MainTable;
</script>
