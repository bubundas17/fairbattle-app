<template>
  <v-layout column>
    <v-card class="success ma-1 body-2 white--text" v-if="updateAvailable">
      <v-layout row>
        <v-card-title> App Update Available</v-card-title>
        <v-spacer/>
        <v-btn flat dark to="/update">Update</v-btn>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
  import vuex from 'vuex'

  export default {
    name: "updateAvailable",
    computed: {
      ...vuex.mapGetters(['updateAvailable'])
    },
    mounted() {
      if(this.appUpdateRequired){
        this.$router.replace("/update")
      }
    }
  }
</script>

<style scoped>

</style>
