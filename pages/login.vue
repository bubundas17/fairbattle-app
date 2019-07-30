<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-2 login-box">
        <v-card-title class="secondary" dark><h1 class="title white--text">Login</h1></v-card-title>
        <v-card-text>
          <v-text-field label="Username or phone" prepend-icon="mdi-account-circle" v-model="username"></v-text-field>
          <v-text-field label="Password" prepend-icon="mdi-textbox-password" :type="showPass ? 'text' : 'password'" v-model="password">
            <template slot="append">
              <v-btn flat small :color="showPass ? 'teal' : 'gray'" @click="showPass =!showPass" icon>
                <v-icon>{{showPass ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="info" flat dark to="/signup"><v-icon left>mdi-account-plus</v-icon>Create An Account</v-btn>
          <v-spacer/>
          <v-btn flat color="success" dark @click="login" :loading="loading" :disabled="loading">Login <v-icon right>mdi-login</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12>
<!--      <v-card class="ma-2 login-box" flat>-->
        <v-card-actions>
<!--          <v-btn color="green"  block dark to="/signup">Create An Account</v-btn>-->
          <v-btn color="primary" block large dark to="/forgotpass">Password Reset<v-icon right>mdi-lock-reset</v-icon></v-btn>
<!--          <v-btn color="primary" block large dark @click="test">Test<v-icon right>mdi-lock-reset</v-icon></v-btn>-->
<!--          <v-btn color="orange" flat block dark @click="test">test</v-btn>-->
        </v-card-actions>
<!--      </v-card>-->
    </v-flex>
  </v-layout>
</template>
<script>
  import { Plugins,   } from '@capacitor/core'
  const { LocalNotifications, Toast, Device} = Plugins;

  export default {
    data() {
      return {
        showPass: false,
        username: '',
        password: '',
        loading: false
      }
    },
    methods: {
      async login() {
        this.loading = true;
        try {
          let data = await this.$store.dispatch('login', { username: this.username, password: this.password });
          this.showAlert('success', data)
        } catch (e) {
          this.showAlert('error', e)
        }
        this.loading = false
      },

      async test() {
        const info = await Device.getInfo();
        console.log(info);
        this.showAlert("info", info.uuid)
        // LocalNotifications.schedule({
        //   notifications: [
        //     {
        //       title: "Match Starting In 15m",
        //       body: "The match is about to start",
        //       id: 1,
        //       schedule: { at: new Date(Date.now() + 1000 * 5) },
        //       sound: null,
        //       attachments: null,
        //       actionTypeId: "",
        //       extra: null
        //     }
        //   ]
        // });

      }

    },
    watch: {
      isLoggedIn(value) {
        let self = this
        if (value) self.$router.push('/')
      }
    },
    mounted() {
    }
  }
</script>
<style>

</style>
