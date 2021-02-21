<template>
  <div>
    <h1 class="page-heading">History</h1>
    <div class="widget">
      <HistoryTable />
    </div>
  </div>
</template>
<script>
import HistoryTable from "../components/HistoryTable.vue";
export default {
  name: "History",
  components: {
    HistoryTable
  }
}
</script>
