<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout column v-if="loading">
    <Loading></Loading>
  </v-layout>
  <v-layout v-else>

    <v-card class="ma-1">
      <v-card-title class="primary white--text"><h1 class="title">Transactions</h1></v-card-title>
      <v-expansion-panel>
        <template v-for="transaction in cTransactions">
          <v-divider></v-divider>
          <v-expansion-panel-content dark class="mx-2" :key="transaction._id"
                                     :class="transaction.color">

            <template v-slot:header>
              <v-card flat :class="transaction.color" dark>
                <v-card-actions>{{transaction.title}}
                  <v-spacer/>
                  {{ transaction.amount }}
                </v-card-actions>
              </v-card>

            </template>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs6 class="body-2">
                    Status: {{ transaction.status | tnxStatusText}}
                  </v-flex>
                  <v-flex xs6>
                    <span class="body-2">TXN ID: #{{ transaction.txnId }}</span>
                  </v-flex>
                  <v-flex xs6 class="body-2">
                    Date:
                  </v-flex>
                  <v-flex xs6 class="body-2">
                    {{ transaction.date | formatDate }}
                  </v-flex>
                </v-layout>
                <p class="body-2" v-if="transaction.note">
                  More info: {{ transaction.note }}
                </p>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </template>
      </v-expansion-panel>
    </v-card>

  </v-layout>
</template>
<script>
  import vuex from 'vuex'
  import Loading from '../components/Loading'

  export default {
    components: {Loading},
    data() {
      return {
        transactions: [],
        loading: false
      }
    },
    methods: {
      txnColor(txn) {
        if (txn.amount > 0) {
          return 'green darken-3'
        } else if (txn.amount < 0) {
          return 'red darken-3'
        } else if (txn.status === 2) {
          return 'orange darken-2'
        } else if (txn.amount > 0) {
          return 'green'
        }
      },

    },
    computed: {
      cTransactions(){
        let self = this;
        return this.transactions.map(txn => {
          let color = self.txnColor(txn);
          return {
            color,
            ...txn
          }
        })
      }
      // ...vuex.mapGetters(['transactions'])
    },
    async mounted() {
      this.loading = true
      try {
        let data = await this.$axios.$get('/transaction')
        this.transactions = data.transactions
      } catch (e) {
        this.showAlert('error', 'Something is wrong')
      }
      this.loading = false
    }
  }
</script>
