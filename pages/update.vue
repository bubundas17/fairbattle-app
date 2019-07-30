<template>
  <v-layout wrap row>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title class="secondary"><h1 class="title white--text">App Updates</h1></v-card-title>
        <v-card-text v-if="updateAvailable">
          <p>Current Version: {{ version }}</p>
          <p>Latest Version: {{ appLatestVersion }}</p>
          <p>Update Available: {{ updateAvailable }}</p>
          <p v-if="updateAvailable">Update Required: {{ appUpdateRequired }}</p>
          <p class="body-2">Release Info</p>
          <p v-html="latestReleaseInfo.meta.release_notes"></p>
        </v-card-text>
        <v-card-text v-else class="success align-center text-xs-center">
          <v-icon dark large style="font-size: 100px">mdi-check-decagram</v-icon>
          <p class="body-2 white--text">Your App is Up To Date</p>
        </v-card-text>
        <v-card-actions v-if="updateAvailable" class="primary">
          <v-btn :disabled="loading" v-if="latestReleaseInfo.meta.direct_dl_link" dark flat block
                 @click="downloadAndOpenLatestApp">
            <v-icon left v-if="!loading">mdi-cloud-download</v-icon>
            {{loading? "Downloading..." : "Direct Download"}}
          </v-btn>
          <v-btn v-if="latestReleaseInfo.meta.google_play_link" dark flat block
                 :href="latestReleaseInfo.meta.google_play_link">
            <v-icon left>mdi-google-play</v-icon>
            Google Play
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import packege from "../package"
  import vuex from 'vuex'
  import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
  import {FileOpener} from '@ionic-native/file-opener/ngx';
  import {File} from '@ionic-native/file/ngx';


  export default {
    name: "update",
    data() {
      return {
        version: packege.version,
        loading: false
      }
    },
    computed: {
      ...vuex.mapGetters(['appLatestVersion', 'appUpdateRequired', 'latestReleaseInfo', 'updateAvailable'])
    },
    methods: {
      downloadAndOpenLatestApp() {
        this.showAlert("info", "Please Wait While the file downloads.");
        const fileMime = 'application/vnd.android.package-archive';
        let file = new File();
        let fileTransfer = new FileTransfer();
        let fileOpener = new FileOpener();
        let ftp = fileTransfer.create();
        const downloadLink = this.latestReleaseInfo.meta.direct_dl_link;
        const basePath = file.externalDataDirectory;
        const filename = basePath + "latest.apk";
        this.loading = true;
        ftp.download(downloadLink, filename)
          .then(file => {
            this.showAlert("success", "File Downloaded");
            this.loading = false;
            fileOpener.open(file.toURL(), fileMime).then(ok => {
              console.log(ok)
            }).catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            this.loading = false;
            console.warn(err)
          })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
