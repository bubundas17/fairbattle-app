<template>
  <v-app>

    <v-toolbar
      fixed
      app
      color="#8e44ad"
      dark
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <nuxt-link to="/wallet" v-if="user.credits"><v-chip color="white" light class="font-weight-bold" >₹{{ user.credits }} </v-chip></nuxt-link>
    </v-toolbar>

    <v-content class="main-container">
        <nuxt />
      <alerts/>
      <bottom-nav v-if="isLoggedIn" :matches="matches" :ongoing="ongoing" :profile-click="profileClick"
                  :results="results" :participated="participated"/>
    </v-content>

  </v-app>
</template>

<script>
  import { Plugins } from '@capacitor/core';
  const { SplashScreen, StatusBar } = Plugins;
  import BottomNav from '../components/BottomNav'
  import Alerts from '../components/Alerts'

export default {
  components: { Alerts, BottomNav },
  data() {
    return {
      title: 'Fair Battle'
    }
  },
  methods: {
    profileClick(){
      this.$router.push("/profile")
    },
    matches(){
      this.$router.push("/")
    },
    ongoing(){
      this.$router.push("/ongoing")
    },
    results(){
      this.$router.push("/results")
    },
    participated(){
      this.$router.push("/participated")
    }
  },
  watch: {
    isLoggedIn(val){
      if (val == true) this.$router.push("/"); else  this.$router.push("/login")
    }
  },
  mounted() {
    SplashScreen.hide()
    StatusBar.setBackgroundColor({color: "#8e44ad"})
  }
}
</script>

<style>
  .main-container{
    background: #2c3e50;
  }
  a{
    text-decoration: none;
  }
</style>
