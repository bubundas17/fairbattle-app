<template>
  <v-card class="ma-1">
    <v-card-actions class="loading justify-center align-center">
      <div>
        <h1 class="headline loadingBox mx-5">Loading</h1>
        <v-progress-linear color="teal" :indeterminate="true" height="4"></v-progress-linear>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style scoped>
  .loading {
    height: 300px;
  }

  /*.loadingBox {*/
  /*  margin: 250px 0;*/
  /*}*/
</style>
