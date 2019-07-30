<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card class="ma-1">
    <v-layout row>
      <v-card-text class="match-image">
        <v-avatar tile :size="60">
          <img src="~/assets/pubg-icon.png" alt="pubg icon">
        </v-avatar>
      </v-card-text>
      <v-card-text>
        <div>
          <h1 class="subheading font-weight-black mt-1">{{ match.name }} - Match #{{match.count}}</h1>
          <h1 class="body-2">{{ new Date(match.date) | fromNow }}</h1>
          <h1 class="body-1">{{ new Date(match.date) | formatDate }}</h1>
        </div>
      </v-card-text>
    </v-layout>
    <v-card-title class="pa-0">
      <v-layout row wrap>
        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">WIN PRIZE</p>
          <p class="body-2 font-weight-bold ">
            <faircoin-icon/>
            {{ match.wining }}</p>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">PER KILL</p>
          <p class="body-2 font-weight-bold"><faircoin-icon/>{{  match.perKill }}</p>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">ENTRY FEES</p>
          <p class="body-2 font-weight-bold"><faircoin-icon/>{{ match.entryFees }}</p>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">TEAM</p>
          <p class="body-2 font-weight-bold">{{ match.team }}</p>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">TYPE</p>
          <p class="body-2 font-weight-bold">{{match.type }}</p>
        </v-flex>

        <v-flex xs4 class="text-xs-center">
          <p class="body-1 mb-0 grey--text lighten-3">MAP</p>
          <p class="body-2 font-weight-bold">{{ match.map }}</p>
        </v-flex>

      </v-layout>
    </v-card-title>

    <v-card-actions @click.prevent="" v-if="match.status === 1">
      <v-progress-linear :color=" canJoin ? 'teal' :  match.userJoined ? 'green':'red'" rounded
                         v-model="calculateProgress"></v-progress-linear>
      <v-chip flat class="mx-1" :disabled="!canJoin" small
              :color=" canJoin ? 'teal' :  match.userJoined ? 'green':'red'" dark>
        {{ match.joined }}/{{ match.maxPlayers }}
      </v-chip>

      <JoinMatchDialog :can-join="canJoin" :dialog="dialog" :join-match="joinMatch" :match="match"
                    :pubg-username="pubgUsername" :remember-username="rememberUsername" :joinBtnText="joinBtnText"/>

    </v-card-actions>
    <template v-if="showActions">
      <v-card-actions v-if="match.userJoined && (match.status === 2 || match.status === 1) && match.showRoomInfo">
        <v-btn block dark color="teal" class="elevation-0"> See Room ID and Pass</v-btn>
      </v-card-actions>
    </template>

  </v-card>
</template>
<script>
  import {Plugins} from '@capacitor/core';
  import JoinMatchDialog from "./JoinMatchDialog";
  import FaircoinIcon from "../FaircoinIcon";

  const { LocalNotifications } = Plugins;

  export default {
    name: 'MatchCard',
    components: {FaircoinIcon, JoinMatchDialog},
    props: {
      match: {},
      showActions: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        dialog: false,
        pubgUsername: '',
        rememberUsername: false
      }
    },
    computed: {
      canJoin() {
        // return true;
        return (this.match.joined < this.match.maxPlayers) && !this.match.userJoined
      },
      joinBtnText() {
        if (this.canJoin) return 'JOIN'
        else if (this.match.userJoined) return 'Joined'
        else return 'FULL'
      },

      calculateProgress() {
        return ((this.match.joined / this.match.maxPlayers) * 100)
      }
    },
    methods: {
      async joinMatch() {
        try {
          if (this.rememberUsername){
            this.$store.commit("pubgUsername", this.pubgUsername)
          }
          await this.$axios.$post('/matches/' + this.match._id + '/join', { pubgUsername: this.pubgUsername })
          this.dialog = false;
          try {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: `${this.match.name} - Match #${this.match.count}`,
                  body: "The Match Will Start In 15 Minutes! Room ID and Password Will be Sent Soon!",
                  id: this.match.count,
                  schedule: { at: new Date( new Date(this.match.date) - 1000 * 60 * 15) },  // 15 minits before the match
                  sound: null,
                  attachments: null,
                  actionTypeId: "",
                  extra: null
                }
              ]
            });
          } catch (e) {

          }

          this.showAlert('success', 'Successfully Joined The match')
        } catch (e) {

          // console.log(e.response.data.message)
          this.showAlert('error', e.response.data.message)
        }
        // this.dialog = false
      }
    },
    mounted() {
      this.pubgUsername = this.$store.getters["pubgUsername"]
    }

  }
</script>
<style scoped>
  .match-image {
    max-width: 70px;
  }
</style>
