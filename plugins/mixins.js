import Vue from 'vue'
import vuex from "vuex"

Vue.mixin({
    computed: {
        ...vuex.mapGetters(["user", "isLoggedIn", "updateAvailable", "appUpdateRequired"])
    },
    // mounted() {
    //     if(this.isLoggedIn) {
    //         return;
    //     } else {
    //         this.$router.push("/login")
    //     }
    // }
});
