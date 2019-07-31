<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-2 login-box">
        <v-card-title class="secondary"><h1 class="title white--text">Create An Account</h1></v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              label="Enter Full Name"
              v-model="name"
              v-validate="'required|min:3'"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              required
            ></v-text-field>

            <v-text-field
              label="Choose Username"
              v-model="username"
              v-validate="'required|min:6'"
              data-vv-name="username"
              :error-messages="errors.collect('username')"
              required
            >

            </v-text-field>

            <v-text-field
              label="Enter Email"
              v-model="email"
              v-validate="'required|email'"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              required
            ></v-text-field>

            <v-text-field
              label="Enter 10 Digit Phone Number"
              v-model="phoneNumber"
              :counter="10"
              v-validate="'required|length:10'"
              data-vv-name="phone"
              :error-messages="errors.collect('phone')"
              type="number"
              required
            >

              <template slot="append" v-if="showSendOtp">
                <v-btn flat small color="teal" :disabled="disableOtpBtn" @click="sendOtp">{{ sendotptext }}</v-btn>
              </template>
            </v-text-field>

<!--            :disabled="!otp"-->

            <v-text-field
              label="Enter Otp"
              v-model="otp"
              type="number"
              v-validate="'required|min:5'"
              data-vv-name="otp"
              :error-messages="errors.collect('otp')"
              required
            >
            </v-text-field>


            <v-text-field
              label="Password"
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              v-validate="'required|min:6'"
              data-vv-name="password"
              :error-messages="errors.collect('password')"
              required
            >
              <template slot="append">
                <v-btn flat small :color="showPass ? 'teal' : 'gray'" @click="showPass =!showPass" icon>
                  <v-icon>{{showPass ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
                </v-btn>
              </template>
            </v-text-field>


            <v-text-field
              label="Referral Code (Optional)"
              v-model="referral"
            >
            </v-text-field>
            <v-checkbox
              data-vv-name="agree"
              v-model="agree"
              v-validate="'required'"
              :error-messages="errors.collect('agree')"
            > <template slot="label"><h2 class="subheading mt-1">
              I agree to <a href="https://fairbattle.net/terms-and-condition">Trams And Conditions</a> and
              <a href="https://fairbattle.net/privacy-policy">Privacy Policy</a></h2>
            </template></v-checkbox>

          </form>

        </v-card-text>
        <v-card-actions>
          <v-btn flat class="primary"  block dark @click="signup" light>Signup
            <v-icon right>mai-account-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {ErrorBag} from 'vee-validate';
  import {Plugins,} from '@capacitor/core'
  const {Device} = Plugins;

  let validTimeout = null;
  let oldcount = 120;
  let count = oldcount;
  // import OTPAutoVerification from 'cordova-plugin-otp-auto-verification'

  export default {
    name: 'signup',
    $_veeValidate: {
      validator: 'new'
    },
    data() {
      return {
        agree: '',
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        otp: null,
        referral: '',
        uuid: 'default',
        sendotptext: 'Send Otp',
        disableOtpBtn: false,
        showSendOtp: false,
        showPass: false,
      }
    },
    methods: {

      async signup() {
        this.$validator.validate().then(async valid => {
          if (valid) {
            try {
              let data = await this.$axios.$post('/auth/signup', {
                username: this.username,
                email: this.email,
                name: this.name,
                password: this.password,
                otp: this.otp,
                phone: this.phoneNumber,
                referral: this.referral,
                uuid: this.uuid
              });
              this.$store.dispatch('token', data.token);
              this.$store.dispatch('reloadProfile')
            } catch (e) {
              console.log(e)
            }
            // do stuff if not valid.
          }
          console.log("Form Is not valid")
        })
      },
      addError(fieldName, error, isVlied = false) {
        let key = "email";
        const field = this.$validator.fields.find({name: fieldName, scope: this.$options.scope});
        this.$validator.errors.add({
          id: field.id,
          field: fieldName,
          msg: error,
          scope: this.$options.scope,
        });

        field.setFlags({
          invalid: true,
          valid: false,
          validated: isVlied,
        });
      },
      startSmsListening() {
        let self = this;
        try {
          console.log('Trying to register sms');
          // SMSReceive.startWatch();
          // document.addEventListener('onSMSArrive', function (e) {
          //   let IncomingSMS = e.data;
          //   if (String(IncomingSMS.address).includes("ETRNMT")) {
          //     let otp = IncomingSMS.body.match(/\b\d{5}\b/g);
          //     self.otp = otp[0];
          //
          //     self.stopSmsListening()
          //   }
          //   // console.log(IncomingSMS);
          // });
        } catch (e) {
          console.warn('Error In Listening SMS');
        }
      },
      stopSmsListening() {
        try {
          // SMSReceive.stopWatch();
        } catch (e) {
        }
      },

      async sendOtp() {
        try {
          this.sendotptext = 'Sending OTP'
          this.disableOtpBtn = true
          let data = await this.$axios.$post('/auth/requestotp', {phone: this.phoneNumber})
          this.sendotptext = 'OTP SENT!'
          this.otp = true
          this.startSmsListening()
          let interval = setInterval(() => {
            this.sendotptext = `wait ${count}s`
            count--
            if (count <= 0) {
              clearInterval(interval)
              this.sendotptext = 'RESEND'
              this.disableOtpBtn = false
              // this.stopSmsListening()
              count = oldcount * 2
              oldcount = count
            }
          }, 1000)
        } catch (e) {
          this.sendotptext = 'ERROR!'
          this.disableOtpBtn = false
          this.stopSmsListening()
        }
      }
    },
    watch: {
      async username(value) {
        let isValied = await this.$validator.validate('username');
        if (isValied) {
          clearTimeout(validTimeout);
          validTimeout = setTimeout(async _ => {
            let used = await this.$axios.$get("auth/checkAvailability", {
              params: {
                username: value
              }
            });

            if (used.used) {
              return this.addError("username", "The Username is already taken, Please try logging in instead")
            }
          }, 200);
        }
      },
      async email(value) {
        let isValied = await this.$validator.validate('email');
        if (isValied) {
          clearTimeout(validTimeout);
          validTimeout = setTimeout(async _ => {
            let used = await this.$axios.$get("auth/checkAvailability", {
              params: {
                email: value
              }
            });

            if (used.used) {
              return this.addError("email", "The email is already used")
            }
          }, 200);
        }
      },

      async phoneNumber(value) {
        if (value.length === 10) {
          clearTimeout(validTimeout);
          validTimeout = setTimeout(async _ => {
            let used = await this.$axios.$get("auth/checkAvailability", {
              params: {
                phone: value
              }
            });

            if (used.used) {
              return this.addError("phone", "The Phone Number Is Already Used")
            }
          }, 200);


          this.showSendOtp = true

        } else {
          this.showSendOtp = false
        }
      },
      isLoggedIn(value) {
        let self = this;
        if (value) self.$router.push('/')
      }


    },
    beforeDestroy() {
      this.stopSmsListening()
    },
    async mounted() {
      try {
        const info = await Device.getInfo();
        this.uuid = info.uuid;
      } catch (e) {

      }

    }
  }
</script>

<style scoped>

</style>
