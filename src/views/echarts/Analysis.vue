<template>
  <div>
   
    <Chart :option="chartOption" style="height: 400px" />
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
import request from "utils/request";
import Chart from "./Chart";
import chartCode from "!!raw-loader!./Chart";
export default {
  data() {
    return {
      chartOption: {},
      chartCode
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(response => {
        console.log(response.data);
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart
  }
};
</script>

<style></style>
