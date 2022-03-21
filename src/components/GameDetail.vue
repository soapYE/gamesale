<template>
    <div class="info_container">
        <div style="width:10%"></div>
        <div class="detail_container">
            <div>
                <el-image style="width: 100%; height: 100%" :src="card_image" fit="fit" />
            </div>
            <el-descriptions
            class="margin-top"
            direction="vertical"
            :column="1"
            :size="size"
            border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                            <user />
                            </el-icon>
                            name
                        </div>
                    </template>
                    {{game_name}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                            <user />
                            </el-icon>
                            platform
                        </div>
                    </template>
                    {{platform}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                            <user />
                            </el-icon>
                            publisher
                        </div>
                    </template>
                    {{publisher}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                            <user />
                            </el-icon>
                            year
                        </div>
                    </template>
                    {{year}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                            <user />
                            </el-icon>
                            genre
                        </div>
                    </template>
                    {{genre}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                            <user />
                            </el-icon>
                            critic_score
                        </div>
                    </template>
                    {{critic_score}}
                </el-descriptions-item>
            </el-descriptions>
            <div class="back_container"><el-button @click="back">back to list</el-button></div>
        </div>
        <div style="width:5%"></div>
        <div class="sales_container">
            <div>
                <el-image style="width: 100%; height: 100%" :src="full_image" fit="fit" />
            </div>
            <div class="chart_button_container">
                <div class="chart_button" :class="{selected:is_pie}" @click="is_pie=true">pie chart</div>
                <div class="chart_button" :class="{selected:!is_pie}" @click="is_pie=false">bar chart</div>
            </div>
            <div id="chart">
                <v-chart class="chart" :option="option"></v-chart>
            </div>
        </div>
        <div style="width:10%"></div>
    </div>
</template>

<script>
import {User} from "@element-plus/icons-vue"
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart,BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import * as echarts from 'echarts';
import axios from 'axios'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
    components:{
        User,
        VChart
    },
    mounted(){
        console.log(this.$route.params)
        let id = this.$route.params.id
        var bodyFormData = new FormData();
        bodyFormData.append("id",id)
        console.log(id)
        axios
      .post('https://test-azure-j1.azurewebsites.net/search_name/',bodyFormData)
      .then(response => {
          console.log(response)
          this.card_image=response.data.Card_image;
          this.full_image=response.data.Full_image;
          this.game_name=response.data.Name;
          this.platform=response.data.Platform;
          this.publisher=response.data.Publisher;
          this.year = response.data.Year;
          this.genre = response.data.Genre;
          this.critic_score = response.data.Critic_Score;
          this.NA_sales = response.data.NA_Sales;
          this.EU_sales = response.data.EU_Sales;
          this.JP_sales = response.data.JP_Sales;
          this.Other_sales = response.data.Other_Sales;
          this.Global_sales = response.data.Global_sales;
      });
    },
    data(){
        return{
            card_image:"https://www.vgchartz.com/games/boxart/full_4399408AmericaFrontccc.jpg",
            full_image:"https://www.vgchartz.com/games/banners/8501245226188ccc.png",
            game_name:"hello",
            platform:"wii",
            publisher:"Nitendo",
            year:"1999",
            genre:"Sports",
            critic_score:"2.0",
            NA_sales:"335.5",
            EU_sales:"335.5",
            JP_sales:"335.5",
            Other_sales:"335.5",
            Global_sales:"",
            is_pie: true
        }
    },
    methods:{
        back(){
            this.$router.push("/")
        }
    },
    computed:{
        option(){
            var my_option={}
            if(this.is_pie){
                if(document.getElementById("chart")){
                    let chartInstance = echarts.getInstanceByDom(document.getElementById("chart").querySelector("x-vue-echarts"));
                    console.log(chartInstance);
                    chartInstance.clear();
                }
                return{
                title: {
                    text: "Sales in Regions",
                    left: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}m ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["NA_sales", "EU_sales", "JP_sales", "Other_sales"]
                },
                series: [
                    {
                    name: "Traffic Sources",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [
                        { value: parseFloat(this.NA_sales), name: "NA_sales" },
                        { value: parseFloat(this.EU_sales), name: "EU_sales" },
                        { value: parseFloat(this.JP_sales), name: "JP_sales" },
                        { value: parseFloat(this.Other_sales), name: "Other_sales" }
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                    }
                ]
                }
            }
            if(!this.is_pie){
                let chartInstance = echarts.getInstanceByDom(document.getElementById("chart").querySelector("x-vue-echarts"));
                console.log(chartInstance);
                chartInstance.clear();
                return {
                    title: {
                    text: "Sales in Regions",
                    left: "center"
                },
                    tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                    xAxis: {
                        type: 'category',
                        data: ['NA', 'EU', 'JP', 'Other']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: [this.NA_sales, this.EU_sales, this.JP_sales,this.Other_sales],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                        }
                    ]
                };
            }
        }
    }
}
</script>

<style>
.chart {
    height: 400px;
}
.info_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.detail_container{
    display: flex;
    flex-direction: column;
    width: 20%;
}
.sales_container{
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
}
.chart_button{
    display: flex;
    border-style: ridge;
    border-radius: 25px;
    justify-content: center;
    width: 20%;
    cursor:pointer
}
.selected{
    background-color:aquamarine;
}
.chart_button_container{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.back_container{
    display: flex;
    justify-content: center;
    padding-top: 10px;
}
</style>