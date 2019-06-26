<template>
  <v-card flat>
    <v-card-title>Withdrawal Money</v-card-title>
    <v-card-text>
      <v-select
        :items="withdrawalMethods"
        v-model="withdrawalMethod"
        label="Select Method"
      ></v-select>
      <form>

        <template v-if="paytmSelected">
          <v-text-field
            label="10 Digit Paytm Number"
            v-model="paytmNumber"
            v-validate="'required|min:10|max:10'"
            data-vv-name="paytm"
            :error-messages="errors.collect('paytm')"
            counter="10"
          >

          </v-text-field>
          <v-text-field
            label="Amount To Withdraw"
            type="number"
            v-model="amount"
            data-vv-name="amount"
            :error-messages="errors.collect('amount')"
            v-validate="'required|min_value:50|max_value:10000'"
          ></v-text-field>
          <p class="body-2">Money will be sent to the PayTm number within 48 hours</p>
          <p class="body-1">Please make sure that the PayTm number you entered is valid and able to receive
            Money.</p>
        </template>

        <template v-if="upiSelected">
          <v-text-field
            label="UPI ID"
            v-model="upi"
            v-validate="{ required: true, regex: /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/ }"
            data-vv-name="upi"
            :error-messages="errors.collect('upi')"
          ></v-text-field>
          <v-text-field
            label="Amount To Withdraw"
            type="number"
            v-model="amount"
            data-vv-name="amount"
            :error-messages="errors.collect('amount')"
            v-validate="'required|min_value:50|max_value:10000'"
          >
          </v-text-field>
          <p class="body-2">Money will be sent to the UPI ID within 48 hours</p>
          <p class="body-1">just enter the UPI id from Google Pay or PhonePe or any Other app. </p>
          <p class="body-1">Please make sure that the UPI ID you entered is valid and able to receive Money.</p>
        </template>
      </form>


    </v-card-text>

    <v-card-actions v-if="withdrawalMethod">
      <v-spacer/>
      <v-btn color="teal" dark @click="withdrawalMoney" :loading="loading">Withdraw</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'WithdrawalMoney',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        loading: false,
        withdrawalMethods: [
          'PayTm',
          'UPI'
        ],
        paytmNumber: null,
        upi: null,
        withdrawalMethod: "UPI",
        amount: null,

        validator: {
          custom: {
            upi: {
              required: 'Please enter your UPI ID',
              regex: 'Please Enter Valid UPI ID'
            }
          }
        }
      }
    },
    methods: {
      withdrawalMoney() {
        this.$validator.validate().then(async valid => {
          if (valid) {
            try {
              let res = await this.$axios.$post('/transaction/withdrawal', {
                method: this.withdrawalMethod,
                upi: this.upi,
                paytm: this.paytmNumber,
                amount: this.amount
              })
              this.showAlert('success', res.message)
              this.$store.dispatch('addMoney', - Math.abs(Number(this.amount)))
              // this.withdrawalMethod = null
              // this.amount = null
              // this.paytmNumber = null
              // this.upi = null
              this.$router.push('/transactions')
            } catch (e) {
              console.log(e)
              this.showAlert('error', "Error In Submitting Req")
            }
          } else {
            this.showAlert("info", "Please Check The Data You Entered.")
          }
        })
      }
    },
    computed: {
      paytmSelected(){
        return this.withdrawalMethod === 'PayTm'
      },
      upiSelected(){
        return this.withdrawalMethod === 'UPI'
      }
    },
    watch: {
      withdrawalMethod(value) {
        this.$validator.reset()
      }
    },
    mounted() {
      this.$validator.localize('en', this.validator)
    }
  }
</script>
