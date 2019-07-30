<template>
    <v-layout column wrap>
        <v-card class="ma-1">
            <v-card-title class="secondary"><h1 class="title white--text">Edit Profile</h1></v-card-title>
            <v-card-text>
                <v-text-field v-model="userdata.name" label="Name" required/>
                <v-text-field v-model="userdata.username" label="Username" disabled/>
                <v-text-field v-model="userdata.email" label="Email" required/>
                <v-text-field v-model="userdata.phone" label="Phone Number" type="number" required/>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" dark @click="updateUser" :loading="loading" :disabled="loading">Save<v-icon right>mdi-content-save</v-icon></v-btn>
            </v-card-actions>
        </v-card>

        <v-card class="ma-1">
            <v-card-title class="secondary"><h1 class="title white--text">Change Password</h1></v-card-title>
            <v-card-text>
                <v-text-field v-model="oldPass" label="Old Password" required/>
                <v-text-field v-model="newPass" label="New Password"/>
                <v-text-field v-model="confirmPass" label="Re-Enter Password" required/>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" dark>Change Password<v-icon right>mdi-lock-reset</v-icon></v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
    import vuex from "vuex"

    export default {
        name: "editProfile",
        data() {
            return {
                userdata: {},
                oldPass: "",
                newPass: "",
                confirmPass: "",
                loading: false
            }
        },
        computed: {
        },
        methods: {
            async updateUser() {
                this.loading = true;
                await this.$store.dispatch("updateProfile", this.userdata);
                this.loading = false
            }
        },
        mounted() {
            this.userdata = {...this.userdata, ...this.user}
        }
    }
</script>

