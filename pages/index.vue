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
        <MatchCard :match="match"></MatchCard>
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

  export default {
    components: {UpdateAvailable, NotFound, MatchCard, Loading },
    middleware: 'loggedin',
    name: 'Matches',
    data() {
      return {
        loading: false,
        matches: []
      }
    },
    computed: {
      ...vuex.mapGetters(["updateAvailable"])
    },
    methods: {
      calculateProgress(total, joined) {
        return ((joined / total) * 100)
      },
      canJoin(joined, total) {
        return joined < total
      }
    },
    async mounted() {
      this.loading = true
      setTimeout(async () => {
        try {
          let matches = await this.$axios.$get('/matches', { params: { status: 1 } })
          this.matches = matches.matches
        } catch (e) {
          this.showAlert('error', 'In Loading Data')
        }
        this.loading = false
      }, 0)
    }
  }
</script>

<style scoped>
  .match-image {
    max-width: 70px;
  }
</style>
