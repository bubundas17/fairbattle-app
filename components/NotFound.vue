<template>
  <div class="container">
    <div>
      <img src="@/assets/images/icons/game-controller.svg" class="image">
      <h1 class="headline text-xs-center">No Matches Found</h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'not-found'
  }
</script>
<style scoped>
  .container {
    display: flex;
    height: calc(100vh - 120px);
    justify-content: center;
    align-items: center;
  }

  .image {
    display: block;
    height: 150px;
    margin: 0 auto 15px;
  }

  div {
    align-items: center;
  }
</style>
