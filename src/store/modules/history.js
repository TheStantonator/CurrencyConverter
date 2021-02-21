import { getStoredConversionHistory, setStoredConversionHistory } from "../../helpers/localStorage";

const state = {
  history: []
}

const getters = {
  allHistory: (state) => state.history
}

const actions = {
  fetchHistory({commit}) {
    const history = getStoredConversionHistory();
    commit("setHistory", history)
  },
  addHistory({commit}, newHistoryEntry) {
    const history = getStoredConversionHistory();
    history.unshift(newHistoryEntry);
    
    setStoredConversionHistory(history);
    commit("addHistoryItem", newHistoryEntry);
  },
  deleteHistoryItem({commit}, id) {
    const history = getStoredConversionHistory();
    setStoredConversionHistory(history.filter(historyItem => historyItem.id !== id))

    commit("removeHistoryItem", id)
  }
}

const mutations = {
  setHistory: (state, history) => state.history = history,
  addHistoryItem: (state, historyItem) => 
    state.history.unshift(historyItem),
  removeHistoryItem: (state, id) => state.history = state.history.filter(historyItem => historyItem.id !== id)
}

export default {
  state,
  getters,
  actions,
  mutations
}