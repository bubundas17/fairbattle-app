<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="ma-1">
        <v-card-title class="secondary white--text"><h1 class="title">{{ method.title }}</h1></v-card-title>
        <v-card-text>
          <!--          <h2 class="subtitle"></h2>-->
          <p class="body-2" v-html="method.description"></p>
          <template v-if="fields.length">
            <!--            <span class="title">More Options</span>-->
            <form>
              <v-text-field
                v-for="field in fields"
                :key="field._id" :label="field.label"
                :type="field.fieldType"
                :data-vv-name="field.label"
                v-model="field.value"
                :error-messages="errors.collect(field.label)"
                v-validate="contractValidator(field.validator)"
              ></v-text-field>
            </form>
          </template>
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn flat block class="primary" @click="submit" :disabled="canRedem">Redeem For {{ method.cost }} FC</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    async asyncData({app, route}) {
      let method = (await app.$axios.$get("/redeem/" + route.params.id)).method;
      return {
        method
      }
    },
    data() {
      return {
        fields: []
      }
    },
    methods: {
      contractValidator(validator) {
        if (validator) {
          return {
            required: true,
            regex: new RegExp(validator)
          }
        }
      },
      async submit() {
        try {
          this.$validator.validate().then(async valid => {
            if(valid) {
              await this.$axios.$post(`/redeem/${this.method._id}/buy`, {fields: this.fields});
              this.showAlert("success", "Redeem Request Sent!");
              this.fields = this.fields.map(_ => {
                delete _.value;
                return {
                  ..._
                }
              });
              this.$store.dispatch('reloadProfile');
            }
            else {
              this.showAlert("info", "Please Make Sure The Fields Are Valid.");
            }
          })
        } catch (e) {
          this.showAlert("error", "Error in sending request!");

        }
      },
    },
    computed: {
      canRedem() {
        return !(this.user.credits > this.method.cost);
      }
    },
    mounted() {
      this.fields = this.method.fields
    }
  }
</script>
