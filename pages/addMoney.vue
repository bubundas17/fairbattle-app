<template>
  <v-layout row wrap column>


    <v-card class="ma-2" v-if="processing" >

      <v-card-actions class="loading justify-center align-center" v-if="success">
        <div>
          <h1 class="title loadingBox mx-5 text-xs-center"><v-btn icon class="teal" :ripple="false" color="white" dark right><v-icon >mdi-shield-check</v-icon></v-btn>Payment Successful</h1>
        </div>
      </v-card-actions>

      <v-card-actions class="loading justify-center align-center" v-else>
        <div>
          <h1 class="title loadingBox mx-5 text-xs-center"><v-btn icon class="orange darken-3" :loading="true" :ripple="false" color="white" dark right><v-icon >mdi-shield-check</v-icon></v-btn>Processing Payment</h1>
        </div>
      </v-card-actions>

    </v-card>

    <v-card class="ma-2" v-else>
      <v-card-title primary-title><h1 class="title">TopUp Your Account</h1></v-card-title>
      <v-card-text>
        <p class="body-2">Amount: ₹{{ $route.query.amount }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.go(-1)" outline color="orange">
          <v-icon left>mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <v-spacer/>
        <v-btn @click="pay" outline color="green darken-2">Proceed
          <v-icon right>mdi-credit-card</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="ma-2">
        <v-layout row>
            <img class="ma-2" :src="require('~/assets/256_encryption-png.png')" height="80px" alt=""/>
          <v-card-text>
            <div class="justify-center align-center green--text text--darken-2">
              <h1 class="title mb-1">SECURE PAYMENTS</h1>
              <h1 class="body-1">Your payments are protected by 256 bit encryption</h1>
            </div>
          </v-card-text>
        </v-layout>
    </v-card>

    <v-card class="ma-2">
      <v-card-text>
        <p class="body-1 blue-grey--text lighten-4">Note: Don't worry if somehow your payment fails and money
          deducted from your Bank
          Account (Which is very unlikely! Because about 99.5% payment Are completed without any issues), Your money is
          totally safe! And will be automatically refunded to the original Payment method within a few days.</p>
        <p class="body-2">If you are still having issues, Please don't hesitate to contact us WhatsApp:
          9093769664</p>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import { Plugins } from '@capacitor/core'

  const { Modals } = Plugins

  export default {
    name: 'addMoney',
    data() {
      return {
        processing: false,
        success: false
      }
    },
    methods: {
      pay() {
        let self = this
        let amount = this.$route.query.amount
        try {
          let options = {
            key: 'rzp_live_2nxI5C6aYg0wnJ',
            name: 'FairBattle.net',
            description: 'Recharge of ₹' + amount + ' for ' + self.user.username,
            amount: Number(amount) * 100,
            prefill: {
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone
            },
            // external: {
            //   wallets: ['paytm']
            // },
            notes: {
              username: self.user.username,
              userId: self.user._id
            },
            theme: {
              color: '#232323'
            }
          }

          let successCallback = async function(success) {
            // alert('payment_id: ' + success.razorpay_payment_id)
            // var orderId = success.razorpay_order_id;
            // var signature = success.razorpay_signature;
            self.processing = true;
            try {

              // self.showAlert('success', payment.message)
              self.$store.dispatch('addMoney', amount)
              self.success = true;
            } catch (e) {
              self.showAlert('error', 'Failed To Capture!')
            }
            // self.processing = false;
            // console.log(success)
          }

          let cancelCallback = function(error) {
            self.showAlert('info', 'Payment cancelled by user. Please retry')
          }

          RazorpayCheckout.on('payment.success', successCallback)
          RazorpayCheckout.on('payment.cancel', cancelCallback)
          RazorpayCheckout.open(options)
        } catch (e) {
          this.showAlert('error', 'Cannot Find Gateway!')
        }
      },
      async yourCallBackFunction() {
        let confirmRet = await Modals.confirm({
          title: 'Confirm',
          message: 'Are you sure you\'d like to press the red button?'
        });
        console.log('Confirm ret', confirmRet);
      }
    },
    watch: {
      success(value){
        if(value){
          let self = this;
          setTimeout(() => {
            self.$router.go(-1)
          }, 3000)
        }
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this.success = true
      // }, 1500)
      // document.addEventListener('backbutton', this.yourCallBackFunction, false)
    },
    // beforeDestroy() {
    //   document.removeEventListener('backbutton', this.yourCallBackFunction)
    // }
  }
</script>

<style scoped>
  .loading {
    height: 150px;
  }
</style>
