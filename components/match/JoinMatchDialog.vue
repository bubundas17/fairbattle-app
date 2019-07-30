<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="">
      <v-btn flat @click.prevent="dialog = true" :class=" canJoin ? 'teal' :  match.userJoined ? 'green':'red'"
             class="ma-1" dark
             :disabled="!canJoin"> {{
        joinBtnText }}
      </v-btn>
    </template>

    <v-card v-if="match.entryFees <= this.user.credits">
      <v-card-title class="headline">Join Match</v-card-title>
      <v-card-text>
        <p class="body-1">Please Enter your PUBG Username To Join the match.</p>
        <v-text-field label="Pubg Username" v-model="pubgUsername"></v-text-field>
        <p class="body-1">Please Make sure the username is correct.</p>
        <v-checkbox label="Remember This Username" v-model="rememberUsername"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" flat @click="joinMatch">Join Match</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="title secondary white--text">Not enough credits</v-card-title>
      <v-card-text>
        <p class="body-1">Sorry but you do not have enough credits to join the match.
          You need {{ match.entryFees - this.user.credits }} more Faircoins  to join the match.</p>
        <p class="body-2">Please purchase remaining Faircoins and join the match.</p>
      </v-card-text>
      <v-card-actions><v-btn block flat color="primary" to="/purchase"><v-icon left>mdi-cart</v-icon>Buy Coins</v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'JoinMatchDialog',
    props: {
      canJoin: {},
      dialog: {},
      joinMatch: {},
      match: {},
      pubgUsername: {},
      rememberUsername: {},
      joinBtnText: {}
    }
  }
</script>
