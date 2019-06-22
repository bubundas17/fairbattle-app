<template>
  <v-app>

    <v-toolbar
      fixed
      app
      color="#8e44ad"
      dark
    >
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <nuxt-link to="/wallet" v-if="user.credits">
        <v-chip color="white" light class="font-weight-bold">₹{{ user.credits }}</v-chip>
      </nuxt-link>
    </v-toolbar>

    <v-content class="main-container">
      <nuxt/>
      <alerts/>
      <bottom-nav v-if="isLoggedIn" :matches="matches" :ongoing="ongoing" :profile-click="profileClick"
                  :results="results" :participated="participated"/>
    </v-content>

  </v-app>
</template>

<script>
  import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed
  } from '@capacitor/core'

  const { SplashScreen, StatusBar, PushNotifications } = Plugins

  import BottomNav from '../components/BottomNav'
  import Alerts from '../components/Alerts'
  import { FCM } from 'capacitor-fcm'

  const fcm = new FCM()


  export default {
    components: { Alerts, BottomNav },
    data() {
      return {
        title: 'Fair Battle'
      }
    },
    methods: {
      profileClick() {
        this.$router.push('/profile')
      },
      matches() {
        this.$router.push('/')
      },
      ongoing() {
        this.$router.push('/ongoing')
      },
      results() {
        this.$router.push('/results')
      },
      participated() {
        this.$router.push('/participated')
      }
    },
    watch: {
      async isLoggedIn(val) {
        if (val !== true) {
          this.$router.push('/')
          try {
            await fcm.subscribeTo({topic: 'loggedin'})
            await fcm.unsubscribeFrom({topic: 'notloggedin'})
          } catch (e) {
            console.warn(e)
          }

        } else {
          this.$router.push('/login')
          try {
            fcm.unsubscribeFrom({topic: 'loggedin'})
            fcm.subscribeTo({topic: 'notloggedin'})
          } catch (e) {
            console.warn(e)
          }

        }
      }
    },
    async mounted() {
      try {
        await SplashScreen.hide()
        await StatusBar.setBackgroundColor({ color: '#8e44ad' })
        console.log('Initializing HomePage')

        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register()
        await fcm.subscribeTo({ topic: 'general' })


        // On succcess, we should be able to receive notifications
        // PushNotifications.addListener('registration', (token) => {
        //     alert('Push registration success, token: ' + token.value)
        //   }
        // )

        // Some issue with our setup and push will not work
        // PushNotifications.addListener('registrationError', (error) => {
        //     alert('Error on registration: ' + JSON.stringify(error))
        //   }
        // )

        // Show us the notification payload if the app is open on our device
        // PushNotifications.addListener('pushNotificationReceived', (notification) => {
        //     alert('Push received: ' + JSON.stringify(notification))
        //   }
        // )

        // Method called when tapping on a notification
        // PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        //     alert('Push action performed: ' + JSON.stringify(notification))
        //   }
        // )

      } catch (e) {
        console.warn(e)
      }


    }
  }
</script>

<style>
  .main-container {
    background: #2c3e50;
  }

  a {
    text-decoration: none;
  }
</style>
