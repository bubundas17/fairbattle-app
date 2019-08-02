<template>
  <v-layout column wrap>

    <update-available></update-available>

    <v-flex xs12 v-if="loading">
      <Loading></Loading>
    </v-flex>

    <v-flex v-else-if="! matches.length">
      <not-found/>
    </v-flex>

    <v-flex xs12 v-for="match in matches" :key="match.index" v-else>
      <nuxt-link :to="'/matches/' + match._id">
        <MatchCard :match="match" @reload="load"></MatchCard>
      </nuxt-link>
    </v-flex>

  </v-layout>

</template>

<script>
  import vuex from 'vuex'
  import Loading from '../components/Loading'
  import MatchCard from '../components/match/MatchCard'
  import NotFound from "../components/NotFound";
  import UpdateAvailable from "../components/updateAvailable";

  import { Plugins } from '@capacitor/core';
  const { App } = Plugins;

  export default {
    components: {UpdateAvailable, NotFound, MatchCard, Loading },
    middleware: 'loggedin',
    name: 'Matches',
    data() {
      return {
        loading: false,
        matches: [],
        exit: false
      }
    },
    computed: {
      ...vuex.mapGetters(["updateAvailable"])
    },
    methods: {
      backBtn(){
        let self = this;
        setTimeout(_=> {
          self.exit = false
        }, 2000);
        if(this.exit) App.exitApp(); else this.showAlert("info", "Press again to exit");
        self.exit = true;
      },
      calculateProgress(total, joined) {
        return ((joined / total) * 100)
      },
      canJoin(joined, total) {
        return joined < total
      },
      async load(){
        this.$store.dispatch('reloadProfile');
        this.loading = true;
        setTimeout(async () => {
          try {
            let matches = await this.$axios.$get('/matches', { params: { status: 1 } });
            this.matches = matches.matches
          } catch (e) {
            this.showAlert('error', 'In Loading Data')
          }
          this.loading = false
        }, 0)
      }
    },
    async mounted() {
      this.$store.dispatch('reloadProfile');
      Plugins.App.addListener('backButton', () => {
        this.backBtn()
      });
      this.load();
    },
    beforeDestroy () {
      this.backBtn = () => {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .match-image {
    max-width: 70px;
  }
</style>
