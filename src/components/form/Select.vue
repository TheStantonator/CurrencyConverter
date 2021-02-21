<!-- Note - with this file I attempted to make a reusable Select component but couldn't get the model to bind. Leaving it here as proof of concept.  -->
<template>
  <select @change="updateValue($event.target.value)">
    <option 
      v-bind:key="option.value" 
      v-for="option in options" 
      :value="option.value"
    >
      {{option.label}}
    </option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    value: {
      type: String
    },
    options: {}
  },
  methods: {
    updateValue(value) {
      this.$emit("change", value);
    }
  }
}
</script>

<style scoped>

</style>