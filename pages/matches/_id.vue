<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row wrap>
    <v-flex xs12 v-if="loading">
      <Loading></Loading>
    </v-flex>
    <template v-if="!loading">
      <v-flex xs12>
        <MatchCard :match="match" :showActions="false"/>
      </v-flex>

      <v-flex xs12 v-if="match.userJoined && !(match.status === 3 ||match.status === 4 )">
        <v-card class="green ma-1">
          <v-card-text class="white--text" v-html="match.roomInfo" v-if="match.showRoomInfo">
          </v-card-text>
          <v-card-text class="white--text font-weight-bold" v-else>
            Room Id And Password Will Be Published Here, Right Before Match. <br> You'll Get Notified.
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="ma-1">
          <v-card-text v-html="match.description">
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card class="ma-1">
          <v-card-title><h1 class="headline">Participant List</h1></v-card-title>

          <template v-if="(match.status === 1 || match.status === 2 )">
            <v-list dense v-if="participateList.length">
              <v-list-tile>
                <v-list-tile-content>PUBG Username</v-list-tile-content>
              </v-list-tile>
              <template v-for="participate of participateList">
                <v-divider/>
                <v-list-tile :key="participate._id">
                  <v-list-tile-content>{{ participate.pubgUsername }}</v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </template>

          <template v-if="(match.status === 3 )">

            <v-data-table
              :headers="tableHeaders"
              :items="participateList"
              class="elevation-1"
              hide-actions
              disable-initial-sort
            >
              <template v-slot:items="props">
                <td>{{ props.item.pubgUsername }}</td>
                <td class="text-xs-center">{{ props.item.kills }}</td>
                <td class="text-xs-center"><v-btn flat icon><v-icon :color="props.item.won ? 'orange' : 'blue-grey lighten-5'">mdi-star-circle</v-icon></v-btn></td>
                <td class="text-xs-center"><faircoin-icon/>{{ props.item.prize }}</td>
                <!--                <td class="text-xs-right">{{ props.item.fat }}</td>-->
                <!--                <td class="text-xs-right">{{ props.item.carbs }}</td>-->
                <!--                <td class="text-xs-right">{{ props.item.protein }}</td>-->
                <!--                <td class="text-xs-right">{{ props.item.iron }}</td>-->
              </template>
            </v-data-table>

          </template>


          <v-list v-if="! participateList.length">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>No one joined! Be the first one.</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
  import Loading from '../../components/Loading'
  import MatchCard from '../../components/match/MatchCard'
  import FaircoinIcon from "../../components/FaircoinIcon";

  export default {
    name: '_id',
    components: {FaircoinIcon, MatchCard, Loading },
    data() {
      return {
        loading: false,
        match: {},
        tableHeaders: [
          {
            text: 'PUBG Username',
            align: 'left',
            sortable: false,
            value: 'pubgUsername',
            width: "80%"
          },
          {
            text: 'Kills',
            align: 'center',
            value: 'kills'
          },
          { text: 'Won?',
            align: 'center',
            value: 'won' },
          { text: 'Prize',
            align: 'center',
            value: 'prize' }
        ]
      }
    },
    async mounted() {
      this.load()
    },

    methods: {
      calculateProgress(total, joined) {
        return ((joined / total) * 100)
      },
      async load(){
        this.loading = true;
        try {
          let match = await this.$axios.$get('/matches/' + this.$route.params.id)
          this.match = match.match
        } catch (e) {
          this.showAlert('error', 'Error in loading Data.')
        }
        this.loading = false
      }
    },
    computed: {
      participated() {
      },
      participateList() {
        if (this.match && this.match.participated) {
          return this.match.participated
        } else {
          return []
        }
      }
    }
  }
</script>

