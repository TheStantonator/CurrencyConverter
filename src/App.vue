<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import { mapActions } from "vuex";
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    ...mapActions(["fetchHistory"])
  },
  created() {
    /*
      I've put this here as some proofing for a non-existant future where I would put a smaller history table on the homepage
    */
    this.fetchHistory();
  }
}
</script>

<style>
  *,
  *::before,
  *:after{
   box-sizing: border-box;
   margin: 0;
   padding: 0;
   position: relative;
  }
  body, html {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    height: 100%;
    width: 100%;
    background: #659DBD;
    font-size:13px;
  }
  .content {
    padding: 12px;
  }

  .page-heading {
    margin-bottom: 12px;
  }

  h1, h2 {
    color: white;
    text-align: center;
    font-size: 2em;
  }

  .widget {
    background: white;
    border-radius: 10px;
    display: block;
    max-width: 900px;
    margin: auto;
    padding: 1em;
    overflow: hidden;
  }

  button {
    display: inline-block;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin: 0;
    text-decoration: none;
    background-color: #0069ed;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background-color 250ms ease-in-out, 
                transform 150ms ease,
                opacity 250ms ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
}

button:hover,
button:focus {
    background: #0053ba;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

button:active {
    transform: scale(0.99);
}

button:disabled {
  opacity: 0.2;
}

</style>
