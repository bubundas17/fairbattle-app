import Vue from 'vue'
import moment from "moment";

Vue.filter("formatDate", (val) => {
    return moment(val).format("Do MMM, YYYY.  h:ma");
});
Vue.filter("fromNow", (val) => {
    return moment(val).fromNow()
});

Vue.filter("tnxStatusText", val => {
    switch (val) {
      case 1:
        return 'SUCCESS';
      case 2:
        return 'PENDING';
      case 3:
        return 'FAILED';
      case 4:
        return 'CANCELLED';
    }
});
