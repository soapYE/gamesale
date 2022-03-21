<template>
<div>
    <div class="">
        <el-form :model="form" label-width="120px">
            <el-form-item label="genre">
            <el-input v-model="form.Genre" />
            </el-form-item>
            <el-form-item label="platform">
            <el-input v-model="form.Platform" />
            </el-form-item>
            <el-form-item label="publisher">
            <el-input v-model="form.Publisher" />
            </el-form-item>
        </el-form>
        <div style="display:flex; justify-content: center; align-items: center;">
            <el-button @click="search">search</el-button>
        </div>
        <div id="chart">
            <v-chart class="chart" :option="option"></v-chart>
        </div>
    </div>
</div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import axios from 'axios'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
    components:{
        VChart
    },
    mounted() {
        axios
        .post('https://test-azure-j1.azurewebsites.net/predict/')
        .then(response => {
          console.log(response.data)
          this.predict_data = this.form_data(response.data)
          })
    },
    methods: {
        form_data(data){
            const regions = ["NA_Sales","EU_Sales","JP_Sales","Other_Sales","Global_Sales"];
            var predict_data = {}
            for (let x in regions){
                var predict_list = data.pred_val[regions[x]];
                var history_list = data.sale_list[regions[x]].slice(-10);
                var data_list = predict_list.concat(history_list)
                predict_data[regions[x]] = data_list
            }
            console.log(predict_data)
            return predict_data
        },
        search(){
            this.loading=true
            console.log(this.form)
            let form_data = new FormData()
            for ( var key in this.form ) {
                form_data.append(key, this.form[key]);
            }
            axios
            .post('https://test-azure-j1.azurewebsites.net/predict/',form_data)
            .then(response => {
                console.log(response);
                console.log(response.data)
                this.predict_data = this.form_data(response.data)})
        }
    },
    computed:{
        option(){
            var x_list = Array(15).fill().map((_, i) => i+2009);
            return {
                title: {
                    text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales', 'Global_Sales']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x_list
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: 'NA_Sales',
                    type: 'line',
                    stack: 'Total',
                    data: this.predict_data.NA_Sales
                    },
                    {
                    name: 'EU_Sales',
                    type: 'line',
                    stack: 'Total',
                    data: this.predict_data.EU_Sales
                    },
                    {
                    name: 'JP_Sales',
                    type: 'line',
                    stack: 'Total',
                    data: this.predict_data.JP_Sales
                    },
                    {
                    name: 'Other_Sales',
                    type: 'line',
                    stack: 'Total',
                    data: this.predict_data.Other_Sales
                    },
                    {
                    name: 'Global_Sales',
                    type: 'line',
                    stack: 'Total',
                    data: this.predict_data.Global_Sales
                    }
                ]
            }
        }
    },
    data(){
        return{
            form:{Genre:"",Platform:"",Publisher:"",Area:""},
            predict_data: {},
            loading: false
        }
    }
}
</script>

<style>

</style>