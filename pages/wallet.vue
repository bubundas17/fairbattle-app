<template>
  <v-card class="ma-1">
    <v-card-title class="secondary">
      <h1 class="title white--text">Wallet</h1>
    </v-card-title>
    <v-tabs v-model="active" centered color="primary" dark slider-color="yellow">
      <v-tab ripple>Add Money</v-tab>
      <v-tab ripple> Withdrawal</v-tab>
      <v-tab ripple> Transfer</v-tab>

      <v-tab-item>
        <addMoneyBox/>
      </v-tab-item>
      <v-tab-item>
        <WithdrawlMoney/>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title>Transfer money to another user</v-card-title>
          <v-card-text>
            <v-text-field label="Username" v-model="sendUser"></v-text-field>
            <v-text-field label="Amount To Transfer" v-model="sendAmount" type="number"></v-text-field>
            <p class="body-2">Note: Money Will Be Sent to the userid you mentioned above. </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="teal" dark>Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
  import AddMoneyBox from '../components/wallet/AddMoneyBox'
  import WithdrawlMoney from '../components/wallet/WithdrawlMoney'

  export default {
    name: 'Wallet',
    components: {WithdrawlMoney, AddMoneyBox},

    data() {
      return {

        active: null,
        sendUser: '',
        sendAmount: null,
      }
    },
    methods: {

      withdrawalMoney() {
        this.$store.dispatch('withdrawalMoney', {amount: this.withdraw, upi: this.upi})
      }
    }
  }
</script>

