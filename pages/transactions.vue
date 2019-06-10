<template>
  <v-layout>
    <v-expansion-panel>
      <template v-for="transaction in transitions">
        <v-divider></v-divider>
        <v-expansion-panel-content dark :key="transaction._id"
                                   :class="txnColor(transaction)">
          <template v-slot:header>
            <v-card flat :class="txnColor(transaction)" dark>
              <v-card-actions>{{transaction.title}}
                <v-spacer/>
                {{ transaction.amount }}
              </v-card-actions>
            </v-card>

          </template>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  Status: {{ statusText(transaction) }}
                </v-flex>
                <v-flex xs6>
                  Date: {{ transaction.date | formatDate }}
                </v-flex>
              </v-layout>
              <p class="body-2" v-if="transaction.note">
                More info:
              </p>
              <p class="body-1" v-if="transaction.note">{{ transaction.note }}</p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </template>

    </v-expansion-panel>
  </v-layout>
</template>
<script>
  import vuex from 'vuex'

  export default {
    data() {
      return {
        transitions: []
      }
    },
    methods: {
      txnColor(txn) {
        if (txn.status === 4) {
          return 'blue-grey'
        } else if (txn.status === 3) {
          return 'blue-grey'
        } else if (txn.amount < 0) {
          return 'red'
        } else if (txn.amount > 0) {
          return 'green'
        }
      },
      statusText(txn) {
        switch (txn.status) {
          case 1:
            return 'SUCCESS'
          case 2:
            return 'PENDING'
          case 3:
            return 'FAILED'
          case 4:
            return 'CANCELLED'
        }
      }
    },
    computed: {
      // ...vuex.mapGetters(['transactions'])
    },
    async mounted() {
      try {
        let data = await this.$axios.$get('/transitions')
        this.transitions = data.transitions
      } catch (e) {
        this.showAlert('error', 'Something is wrong')
      }
    }
  }
</script>
