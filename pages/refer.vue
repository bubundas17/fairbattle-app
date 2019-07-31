<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row erap>
    <v-flex xs12 v-if="loading">
      <Loading></Loading>
    </v-flex>

    <v-flex xs12 v-else v-if="!loading && !referStatus.canRefer">
      <Loading></Loading>
    </v-flex>

    <v-flex xs12 v-if="!loading && referStatus.canRefer">
      <v-card class="ma-1">
        <v-card-media>
          <v-img :src="require('~/assets/refer-banner.png')" aspect-ratio="4"></v-img>
        </v-card-media>
        <v-card-text>
          <p class="body-1">Now you can earn Money by Inviting Friends to this app.</p>
          <p class="body-1">For each player you refer, <strong>You'll get <faircoin-icon/> {{ referStatus.perRefer }}<sup>*</sup>
            Instantly after your Friend joins a Paid match</strong></p>
          <v-card flat class="green darken-3 white--text">
            <v-card-text class="text-xs-center title">
              Use The referral Code: <br/>
              {{ user.username }}
            </v-card-text>
          </v-card>
          <p class="body-2 mt-3">IMPORTANT: Please make sure to enter the promo code while signing up. Without it, your
            referral won't be counted.</p>

          <p>*The amount is subject to change. It can be changed anytime.</p>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn block color="orange darken-3" dark @click="share">
            <v-icon left>mdi-share-variant</v-icon>
            <span>Share Now</span>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="ma-1">
        <v-card-title><h1 class="title">Referral statistics</h1></v-card-title>
        <v-card-text>
          <v-layout class="px-5 bars">
            <v-flex xs4 >
              <v-card class="mx-1 green darken-2 elevation-4" dark>
                <v-card-text class="px-1 text-xs-center">
                  REFERRED <br> {{ referStatus.totalReferred }}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs4 d-flex>
              <v-card class="mx-1 red darken-2" dark>
                <v-card-text class="px-1 text-xs-center">
                  DONE <br/> {{ referStatus.totalCompletedRefer }}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs4 d-flex>
              <v-card class="mx-1 blue darken-2 justify-center align-center" dark>
                <v-card-text class="px-1 text-xs-center">
                    <span>EARNED <br/>
                        {{ referStatus.totalReferCredit }} FC
                    </span>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card class="ma-1">
        <v-card-title><h1 class="title">LEADER BOARD</h1></v-card-title>
          <v-data-table
            :headers="tableHeaders"
            :items="referStatus.leaderboard"
            class="elevation-1"
            hide-actions
            disable-initial-sort
          >
            <template v-slot:items="props">
              <td>#{{props.index + 1}} {{ props.item.username }}</td>
              <td class="text-xs-center"><faircoin-icon/>{{ props.item.referral.totalReferCredit }}</td>
              <!--                <td class="text-xs-right">{{ props.item.fat }}</td>-->
              <!--                <td class="text-xs-right">{{ props.item.carbs }}</td>-->
              <!--                <td class="text-xs-right">{{ props.item.protein }}</td>-->
              <!--                <td class="text-xs-right">{{ props.item.iron }}</td>-->
            </template>
          </v-data-table>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  import Loading from '../components/Loading'
  import { Plugins } from '@capacitor/core'
  import FaircoinIcon from "../components/FaircoinIcon";

  const { Share } = Plugins

  export default {
    name: 'refer.vue',
    components: {FaircoinIcon, Loading },
    data() {
      return {
        loading: false,
        referStatus: {},
        tableHeaders: [
          {
            text: 'Username',
            align: 'left',
            sortable: false,
            value: 'username',
            width: "80%"
          },
          {
            text: 'Earned',
            align: 'center',
            value: 'referral.totalReferCredit',
            sortable: false,
          }
        ]
      }
    },
    methods: {
      async loadData() {
        this.loading = true
        try {
          let referStatus = await this.$axios.$get('/refer')
          this.referStatus = referStatus
        } catch (e) {
          this.showAlert('error', 'Cannot load data')
        }
        this.loading = false
      },
      async share() {

        try {
          let shareRet = await Share.share({
            title: 'Play PUBG and Earn Money!',
            text: 'Play PUBG Tournaments and earn money, only at FairBattle app!\r\nYou are Invited! Use the promo code '
              + this.user.username + ' on Sign Up and Get 15 Credit for your next Match.' +
              '\r\nClick on the link to download.' +
              '\r\n\r\nIMPORTANT: Don\'t Forget to Use Promo code ' + this.user.username +'\r\n',
            url: 'https://fairbattle.net',
            dialogTitle: 'Share with Friends'
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style scoped>

</style>
