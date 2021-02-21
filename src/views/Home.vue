<template>
  <div>
    <h1 class="page-heading">Home</h1>
    <Converter />
  </div>
</template>
<script>
import Converter from "../components/Converter.vue"
export default {
  name: "Home",
  components: {
    Converter
  }
}
</script>
