import Vue from 'vue'
import moment from "moment";

Vue.filter("formatDate", (val) => {
    return moment(val).format("Do MMM, YYYY.  h:ma");
});
Vue.filter("fromNow", (val) => {
    return moment(val).fromNow()
});
