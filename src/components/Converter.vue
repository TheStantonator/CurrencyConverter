<template>
  <div class="widget">
    <form @submit="onSubmit">
      <div class="form-group">
        <label>From</label>
        <!--
        <Select v-bind:options="options" v-model="currencyFrom"/>
        -->
        <div class="group-content">
          <input 
            type="text" 
            name="amountFrom" 
            id="amountFrom"
            v-model.number="amountFrom" 
            v-bind:class="{'error': !amountFromValid}"
          >
          <select v-model="currencyFrom">
            <option :key="option.value" v-for="option in options" :value="option.value">
              {{option.label}}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>To</label>
        <div class="group-content">
          <div class="conversion-result">{{amountTo}}</div>
          <select v-model="currencyTo">
            <option :key="option.value" v-for="option in options" :value="option.value">
              {{option.label}}
            </option>
          </select>
        </div>
        
        
      </div>
      <div class="errors">
        <p v-if="!this.currencyTypesValid">Please select two different currencies</p>
        <p v-if="!this.amountFromValid">Please enter a valid monetary amount, to a maximum of 2 decimal places</p>
      </div>
      <div class="btn-wrap">
        <button :disabled="!this.formIsValid">Convert Currency</button>
      </div>
    </form>
    <div v-if="this.loading" class="loading">
      <font-awesome-icon icon="spinner" /> Loading...
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import axios from "axios";
export default {
  name:"Converter",
  components: {
    
  },
  computed: {
    amountFromValid() {
      let regex = /^\d*(\.\d{1,2})?$/
      return this.amountFrom.toString().match(regex) && this.amountFrom != '';
    },
    currencyTypesValid() {
      return this.currencyFrom !== this.currencyTo;
    },
    formIsValid() {
      return this.currencyTypesValid && this.amountFromValid;
    }
  },
  data() {
    return {
      loading: false,
      loadedRate: {
        code: "",
        rates: []
      },
      currencyFrom: "GBP",
      currencyTo: "USD",
      amountFrom: 1,
      amountTo: 0,
      options: []
    }
  },
  methods: {
    ...mapActions(["addHistory"]),
    onSubmit(event) {
      event.preventDefault();
      if (this.currencyFrom === this.currencyTo) return;
      
      const convertAndStore = () => {
        const conversionRate = this.loadedRate.rates[this.currencyTo.toLowerCase()].rate;
        this.amountTo = (this.amountFrom * conversionRate).toFixed(2);

        // Add to history and ensure amounts are numeric
        this.addHistory({
          id: Date.now(),
          currencyFrom: this.currencyFrom,
          currencyTo: this.currencyTo,
          amountFrom: this.amountFrom * 1,
          amountTo: this.amountTo * 1
        });
      };

      /*
       * If we haven't changed the currencyFrom, no need to reget * the rates. Use what is in state.
       */
      if(this.loadedRate.code === this.currencyFrom) {
        convertAndStore();
      } else {
        this.loading = true;
        axios.get(`http://floatrates.com/daily/${this.currencyFrom}.json`)
          .then((response) => {
            // Multiply to convert to number
            this.amountFrom = this.amountFrom.toFixed(2) * 1;

            this.loadedRate = {
              code: this.currencyFrom,
              rates: response.data
            }
            convertAndStore();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  created() {
    
    this.loading = true;
    /*
     * Initial Load - Get a list of all available currencies,
     * unfortunately requires a hack as GBP isn't available in its own feed, so we add that in manually.
     */
    axios.get(`http://floatrates.com/daily/${this.currencyFrom}.json`)
    .then((response) => {
      const result = [];

      result.push({
        label: "U.K. Pound Sterling",
        value: "GBP"
      });

      Object.keys(response.data).map((key) => {
        const rateInfo = response.data[key];
        result.push({
          label: rateInfo.name,
          value: rateInfo.code
        });
      });
      this.options = result;

      // Load GBP into memory so as to avoid having to load again
      this.loadedRate = {
        code: this.currencyFrom,
        rates: response.data
      }
    }).finally(() => {
      this.loading = false;
    });
  }
}
</script>
<style scoped>
  .widget {
    max-width: 500px;;
  }
  input.error {
    border-color: red;
    outline-color: red;
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2em
  }

  .loading svg {
    animation: spin 2s linear infinite;
    margin-right: 0.5em
  }

  label {
    display:block;
    font-weight: bold;
    margin-bottom: 3px;
  }
  .form-group, .errors {
    margin-bottom: 12px
  }

  .errors {
    color: red;
  }

  .group-content {
    display: flex;
  }

  .group-content > * {
    width:50%
  }

  select {
    margin-left: 12px;
  }

  .btn-wrap {
    text-align: right;
  }


  .group-content input[type="text"], .conversion-result {
    padding: 0.25em 0.5em;
    font-size: 1.25em;
  }
  .conversion-result {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: black;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>