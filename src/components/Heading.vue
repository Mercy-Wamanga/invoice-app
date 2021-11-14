<template>
  <div>
    <h3 class="text-start">{{ heading }}</h3>
    <small>{{ subHeading }}</small>
  </div>
</template>
<script>
export default {
  name: "PageHeading",
  props: {
    heading: {
      type: String,
      required: true,
    },
    subHeading: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
div {
  text-align: left;
}
</style>
