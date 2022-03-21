<template>

<div>
    <div class="">
        <el-form :model="form" label-width="120px">
            <el-form-item label="name">
            <el-input v-model="form.Name" />
            </el-form-item>
            <el-form-item label="platform">
            <el-input v-model="form.Platform" />
            </el-form-item>
            <el-form-item label="year">
            <el-input v-model="form.Year" />
            </el-form-item>
            <el-form-item label="publisher">
            <el-input v-model="form.Publisher" />
            </el-form-item>
            <el-form-item label="genre">
            <el-input v-model="form.Genre" />
            </el-form-item>
            <el-form-item label="sale_type">
                <el-select v-model="form.Area" placeholder="Select" size="large">
                    <el-option
                    v-for="item in sale_type_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <div style="display:flex; flex-direction: column; justify-content: center; align-items: center;">
                <el-button @click="search">search</el-button>
            </div>
        </el-form>
    </div>
    <div class="title_container" v-loading.fullscreen.lock="loading">
        <div class="title" id="card_title"></div>
        <div class="title" id="name_title">name</div>
        <div class="title" id="platform_title">platform</div>
        <div class="title" id="publisher_title">publisher</div>
        <div class="title" id="year_title">year</div>
        <div class="title" id="genre_title">genre</div>
        <div class="title" id="sales_title">{{area}}</div>
    </div>

    <div class="game_container">
        <ListItem v-for="game in current_list" :key="game" :game="game" :sale_type="area"></ListItem>
        <el-empty v-if="isEmpty"></el-empty>
    </div>

    <div class="container">
        <el-pagination
            v-model:currentPage="current_page"
            v-model:page-size="item_per_page"
            :page-sizes="[10,15,20]"
            :small="false"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="whole_list.length"
            @size-change="handleSizeChange"
        />
    </div>
    <div>{{hello}}</div>
</div>

</template>

<script>
import axios from 'axios'
import ListItem from "./ListItem.vue";
export default {
    mounted(){
        this.loading = true
        axios
      .post('https://test-azure-j1.azurewebsites.net/search_list/')
      .then(response => {
          console.log(response.data)
          this.whole_list=response.data;
          this.loading=false})
    },
    data() {
        return {
            whole_list: [],
            current_page: 1,
            item_per_page: 10,
            sale_type: "NA",
            form: {Name:"",Platform:"",Year:"",Publisher:"",Area:"Global_Sales",Genre:""},
            area: "Global_Sales",
            sale_type_options: [{value:"NA_Sales",label:"North America"},
            {value:"EU_Sales",label:"Europe"},
            {value:"JP_Sales",lable:"Japan"},
            {value:"Other_Sales",label:"Other"},
            {value:"Global_Sales",label:"Global"}],
            loading:false
        };
    },
    computed: {
        current_list() {
            return this.whole_list.slice(this.item_per_page * (this.current_page - 1), this.item_per_page * this.current_page);
        },
        isEmpty(){
            return this.whole_list.length==0 ? true:false
        }
    },
    methods: {
        handleSizeChange(val) {
            this.item_per_page = val;
            console.log(this.item_per_page);
        },
        search(){
            this.area = this.form.Area
            this.loading=true
            console.log(this.form)
            let form_data = new FormData()
            for ( var key in this.form ) {
                form_data.append(key, this.form[key]);
            }
            axios
            .post('https://test-azure-j1.azurewebsites.net/search_list/',form_data)
            .then(response => {
                console.log(response);
                this.whole_list=response.data;
                this.loading=false})
        }
    },
    components: { ListItem }
}
</script>

<style scoped>

.title_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: aliceblue;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border-left-style: solid;
    border-left-width: 0.5px;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>