<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title class="secondary white--text">
          <h1 class="title">Purchase Faircoins</h1>
        </v-card-title>
        <v-card-text>
          <p class="body-1">₹10 = 33 FC (Fair Coins)</p>
        </v-card-text>
        <v-layout row wrap>
          <template v-for="offer in offers">
            <v-flex xs6>
              <v-card class="ma-1 primary" flat>
                <v-card-media class="justify-center align-center">
                  <img src="@/assets/images/icons/coin.svg" class="inner-image">
                </v-card-media>
                <v-card-title class="white--text">{{offer.credit}} Faircoins</v-card-title>
                <v-card-actions class="pa-0"><v-btn class="secondary" @click="openOrderPage(offer)" block flat dark><v-icon left>mdi-cart</v-icon>Buy At ₹{{offer.inr}}</v-btn></v-card-actions>
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
      let offers = (await app.$axios.$get('/purchase')).offers;
      return {
        offers
      }
    },
    methods: {
      openOrderPage(offer){
        this.$router.push({name: "addMoney", query: {amount: offer.inr, offerId: offer._id}})
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
