<template>
  <header class="header">
    <h1>Currency Converter</h1>
    <div id="nav" class="nav">
      <div class="nav-items">
        <router-link to="/">Home</router-link>
        <router-link to="/history">History</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>
<style scoped>
  .header {
    background: #05386B;
    color: #fff;
    text-align: center;
    padding: 10px;
  }


  .nav a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
    font-size: 1.25em;
    display:inline-block;
    padding: .25em;
  }
</style>