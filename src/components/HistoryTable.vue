<template>
  <table>
      <thead>
        <th 
          v-bind:key="col.key" 
          v-for="col in columns"
          v-bind:class="{'active':currentSort === col.key,'desc': currentSort === col.key && currentSortDir === 'desc'}"
          @click="sort(col.key)"
        >
          {{col.header}}
          <div class="sort-icon" v-if="currentSort === col.key">
            <font-awesome-icon icon="sort-up" />
          </div>
        </th>
        <th></th>
      </thead>
      <tr v-for="history in sortedHistory" :key="history.id">
        <td :key="col.key" v-for="col in columns">{{history[col.key]}}</td>
        <td class="cl-delete">
          <font-awesome-icon @click="deleteHistoryItem(history.id)" icon="trash" />
        </td>
      </tr>
    </table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HistoryTable",
  data(){
    return {
      currentSort: "id",
      currentSortDir: "desc",
      columns: [{
        key: "currencyFrom",
        header: "From"
      },
      {
        key: "currencyTo",
        header: "To"
      },
      {
        key: "amountFrom",
        header: "Original Value"
      },
      {
        key: "amountTo",
        header: "Converted Value"
      }]
    }
  },
  methods: {
    ...mapActions(["deleteHistoryItem"]),
    sort(sortBy) {
      // Reverse the sort direction if we're clicking the same column again
      if(sortBy === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc"
      } else {
        this.currentSortDir = "asc";
      }
      this.currentSort = sortBy;
    }
  },
  computed: {
    ...mapGetters(["allHistory"]),
    sortedHistory() {
      const history = this.allHistory;
      return history.sort((a, b) => {
        // Alters the sort direction
        const modifier = this.currentSortDir === "desc" ? -1 : 1;
        if(a[this.currentSort] < b[this.currentSort])
          return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort])
          return 1 * modifier;
        return 0;
      })
    }
  }
}
</script>

<style scoped>

table{
  width: 100%;
}

table, th, td {
  border: 1px solid black;
  border-collapse: collapse
}

thead {
  cursor: pointer;
}

td.cl-delete {
  text-align: center;
}

td.cl-delete svg {
  color: red;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
  font-size: 1.25em;
}
td.cl-delete svg:hover {
  opacity:0.3;
}
td, th {
  padding: 0.25em
}

th.active {
  background-color: rgba(0,0,0,.1);
}

th.active .sort-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5em;
  transition: transform 0.25s ease-in;
}

th.active.desc .sort-icon {
  transform: rotate(-180deg);
}
</style>