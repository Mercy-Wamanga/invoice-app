<template>
  <div id="add-button">
    <button type="button" class="btn btn-secondary btn-sm p-2">
      {{ title }}
    </button>
  </div>
</template>
<script>
export default {
  name: "AddButton",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
button {
  background-color: #2eac6d;
  border: 1px solid #2eac6d;
}
</style>
