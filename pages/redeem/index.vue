<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title class="secondary white--text">
          <h1 class="title">Redeem Faircoins</h1>
        </v-card-title>
        <v-card-text>
          <p class="body-1">₹10 = 33 FC (Fair Coins)</p>

        </v-card-text>
        <v-layout row wrap>
          <template v-for="method in methods">
            <v-flex xs6>
              <v-card class="ma-1 primary" flat :to="`/redeem/${method._id}`">
                <v-card-title class="white--text">{{method.title}}</v-card-title>
                <v-card-media class="justify-center align-center">
                  <img src="@/assets/images/icons/coin.svg" class="inner-image">
                </v-card-media>
                <v-card-title class="white--text">{{method.cost}} Faircoins</v-card-title>
<!--                <v-card-actions class="pa-0"><v-btn class="secondary" block flat dark><v-icon left>mdi-cart</v-icon>Buy At ₹{{method.cost}}</v-btn></v-card-actions>-->
              </v-card>
            </v-flex>
          </template>

        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    async asyncData({app}) {
      let methods = (await app.$axios.$get('/redeem')).methods;
      return {
        methods
      }
    }
  }
</script>

<style scoped>
  .inner-image {
    height: 80px;
    display: block;
    margin: 10px auto;
  }
</style>
