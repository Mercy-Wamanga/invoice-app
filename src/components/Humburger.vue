<template>
  <button type="button" class="btn my-4">
    <span class="icons">
      <fa icon="bars" @click="$emit('toggleNav')" />
    </span>
  </button>
</template>
<style scoped>
.icons {
  font-size: 30px;
}
button {
  float: left;
}
</style>
