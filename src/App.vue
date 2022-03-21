
<template>
<div style="display:flex; justify-content:center; flex-direction: column;">
  <div style="display:flex; justify-content:center;width:100%;flex-direction: column; align-items:center;">
    <img style="border-radius: 8px;width: 15%;" src="./assets/game.gif">
    <h1>GameSale</h1>
  </div>
  <div class="view_button_container">
                <div class="view_button" :class="{selected:is_list}" @click="go_list">list</div>
                <div class="view_button" :class="{selected:is_trend}" @click="go_trend">trend</div>
  </div>
  <router-view></router-view>
</div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import ListItem from './components/ListItem.vue';
import GameList from './components/GameList.vue';
import { useRoute } from 'vue-router';
export default{
    data() {
      return {
      }
    },
    methods: {
      go_list(){
        console.log(this.$route.path)
        this.$router.push("/");
      },
      go_trend(){
        this.$router.push("/predict");
      }
    },
    computed:{
      is_list(){
        if(this.$route.path == "/"){
          return true
        }
        else{
          return false
        }
      },
      is_trend(){
        if(this.$route.path == "/predict"){
          return true
        }
        else{
          return false
        }
      }
    }
}
</script>

<style>
.view_button{
    display: flex;
    border-style: ridge;
    border-radius: 25px;
    justify-content: center;
    width: 20%;
    cursor:pointer
}
.view_button_container{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
