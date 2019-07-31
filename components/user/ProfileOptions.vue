<template>
  <v-list class="mb-5">

    <v-list-tile to="/profile/edit" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-account-circle</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Profile</v-list-tile-content>
    </v-list-tile>

    <v-list-tile @click="refer" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-account-multiple-plus</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Refer and Earn</v-list-tile-content>
    </v-list-tile>

<!--    <v-list-tile @click="" avatar to="/wallet">-->
<!--      <v-list-tile-avatar>-->
<!--        <v-icon color="grey darken-2">mdi-wallet</v-icon>-->
<!--      </v-list-tile-avatar>-->
<!--      <v-list-tile-content>Wallet</v-list-tile-content>-->
<!--    </v-list-tile>-->

    <v-list-tile to="/purchase" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-cart</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Purchase Faircoins</v-list-tile-content>
    </v-list-tile>

    <v-list-tile to="/redeem" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-wallet-giftcard</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Redeem Faircoins</v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/transactions" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-view-list</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Wallet Transactions</v-list-tile-content>
    </v-list-tile>

    <v-list-tile to="/update" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-apple-icloud</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>App Updates</v-list-tile-content>
    </v-list-tile>

    <v-list-tile href="https://fairbattle.net/about" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-information</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>About Us</v-list-tile-content>
    </v-list-tile>

    <v-list-tile href="https://fairbattle.net/privacy-policy" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-information</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Trams And Conditions</v-list-tile-content>
    </v-list-tile>

    <v-list-tile href="https://fairbattle.net/terms-and-condition" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-information</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Privacy Policy</v-list-tile-content>
    </v-list-tile>


    <v-list-tile @click="logout" avatar>
      <v-list-tile-avatar>
        <v-icon color="grey darken-2">mdi-logout</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>Log Out</v-list-tile-content>
    </v-list-tile>


  </v-list>
</template>
<script>
  export default {
    name: 'profile-options',
    methods: {
      logout() {
        this.$store.dispatch("logout");
        this.$router.push("/login")
      },
      refer(){
        this.$router.push("/refer")
      }
    }
  }
</script>
