<template>
  <v-layout class="px-5 bars">
    <v-flex xs4>
      <v-card class="mx-1 greenBg darken-2 elevation-4" dark>
        <v-card-text class="px-1 text-xs-center">
          WALLET <br> {{ user.credits }} FC
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4 d-flex>
      <v-card class="mx-1 redBg darken-2" dark>
        <v-card-text class="px-1 text-xs-center">
          KILLS <br/> {{ user.kills }}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4 d-flex>
      <v-card class="mx-1 blueBg darken-2 justify-center align-center" dark>
        <v-card-text class="px-1 text-xs-center">
                    <span>EARNED <br/>
                        {{ user.earned }} FC
                    </span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'Stats'
  }
</script>
<style scoped>
  .bars {
    position: relative;
    top: -25px;
  }

  .greenBg {
    background-image: linear-gradient(135deg, #92ff00 0%, #008428 100%)
  }

  .redBg {
    background-image: linear-gradient(135deg, #ff0052 0%, #550065 100%)

  }

  .blueBg {
    background-image: linear-gradient(135deg, #0066ff 0%, #023a8e 100%)

  }
</style>
