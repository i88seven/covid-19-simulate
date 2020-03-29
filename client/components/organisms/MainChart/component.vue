<template>
  <line-chart
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Chart from "chart.js";
import LineChart from '~/components/molecules/LineChart';

const FONT_COLOR = "black";
const GRID_LINES_SETTING = {
  display: true,
  drawOnChartArea: false,
  color: "black",
  zeroLineColor: "black"
};

@Component({
  components: {
    LineChart,
  }
})
class MainChart extends Vue {
  @Prop()
  labels!: string[];

  @Prop()
  infectedList!: number[];

  @Prop()
  latentList!: number[];

  @Prop()
  recoveredList!: number[];

  get chartOptions(): Chart.ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        // display: false
        onClick(event, legendItem) {
          return;
        },
        fullWidth: false,
        labels: {
          boxWidth: 20,
          fontColor: FONT_COLOR
        },
      },
      layout: {
        padding: {
          top: 20,
          left: 20,
          bottom: 20,
          right: 20
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: GRID_LINES_SETTING,
            ticks: {
              autoSkip: true,
              fontColor: FONT_COLOR,
              fontSize: 14
            },
            scaleLabel: {
              display: true,
              fontColor: FONT_COLOR,
              labelString: '日付',
            },
          },
        ],
        yAxes: [
          {
            id: "yAxis_1",
            type: "linear",
            gridLines: GRID_LINES_SETTING,
            scaleLabel: {
              display: true,
              fontColor: FONT_COLOR,
              labelString: "人数"
            },
            ticks: {
              autoSkip: true,
              fontColor: FONT_COLOR,
              fontSize: 14,
              min: 0,
              max: 100
            },
          },
        ],
      }
    };
  }

  get chartData(): Chart.ChartData {
    return {
      labels: this.labels,
      datasets: [
        {
          yAxisID: "yAxis_1",
          type: "line",
          label: "感染者数",
          backgroundColor: "#6090EF",
          borderColor: "#6090EF",
          fill: false,
          data: this.infectedList,
        },
        {
          yAxisID: "yAxis_1",
          type: "line",
          label: "潜在感染者数",
          backgroundColor: "#F87979",
          borderColor: "#F87979",
          fill: false,
          data: this.latentList,
        },
        {
          yAxisID: "yAxis_1",
          type: "line",
          label: "回復者数",
          backgroundColor: "#79F879",
          borderColor: "#79F879",
          fill: false,
          data: this.recoveredList,
        },
      ]
    };
  }
}

export default MainChart;
</script>
