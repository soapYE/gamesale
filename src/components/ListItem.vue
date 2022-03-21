<template>
    <div @click="goToDetail" class="content_container">
        <div class="content" id="card_image"><el-image style="width: 100%; height: 100%" :src="card_image" fit="scale-down" /></div>
        <div class="content" id="name">{{game_name}}</div>
        <div class="content" id="platform">{{platform}}</div>
        <div class="content" id="publisher">{{publisher}}</div>
        <div class="content" id="year">{{year}}</div>
        <div class="content" id="genre">{{genre}}</div>
        <div class="content" id="sales">{{sales}}</div>
    </div>
</template>

<script>
export default {
    props: ['game','sale_type'],
    mounted(){
    
    },
    data() {
        return {
            id: this.game.id,
            game_name: this.game.Name,
            card_image: this.game.Card_image,
            platform: this.game.Platform,
            publisher: this.game.Publisher,
            year: this.game.Year,
            genre: this.game.Genre,
        }
    },
    methods:{
          goToDetail(){
              this.$router.push("/game/"+this.id);
          }
    },
    computed:{
        sales(){
            if(this.sale_type == "NA_Sales"){
                return this.game.NA_Sales
            }
            else if(this.sale_type == "JP_Sales"){
                return this.game.JP_Sales
            }
            else if(this.sale_type == "Other_Sales"){
                return this.game.Other_Sales
            }
            else{
                return this.game.Global_Sales
            }
        }
    }
}
</script>

<style scoped>
.content_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color:bisque;
    border-style: ridge;
}

.content{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border-left-style: solid;
    border-left-width: 0.5px;
}

</style>