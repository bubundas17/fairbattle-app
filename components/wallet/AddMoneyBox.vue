<template>
    <v-card flat>

        <v-card-title>Add Money To wallet</v-card-title>
        <v-card-text>
              <form>
                <v-text-field
                  label="Enter Amount"
                  type="number"
                  v-validate="'required|max_value:10000|min_value:5'"
                  data-vv-name="money"
                  v-model="rechargeAmount"
                  :error-messages="errors.collect('money')"
                ></v-text-field>
              </form>
        </v-card-text>
      <v-card-actions>
        <v-spacer/><v-btn @click="addMoney" flat color="teal" dark>Recharge</v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
  export default {
    name: 'addMoneyBox',
    $_veeValidate: {
      validator: 'new'
    },
    data(){
      return {
        rechargeAmount: 20,
      }
    },
    methods: {
      addMoney() {

        this.$validator.validate().then(async valid => {
          if (valid) {
            this.$router.push({path: "/addMoney", query: { amount: this.rechargeAmount }})
            // do stuff if not valid.
          }
        })
        // window.location = 'http://192.168.31.18:3001/checkout-mobile/?userid='+this.user._id + '&amount=' + this.rechargeAmount;
      },
    }
  }
</script>
