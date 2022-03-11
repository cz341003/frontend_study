import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list: [],
    initialVal: 'aaa',
    nextId: 4,
    status: 'all'
  },
  mutations: {
    setList (state, list) {
      state.list = list
    },
    setIntialVal (state, val) {
      state.initialVal = val
    },
    addList (state) {
      const listItem = {
        id: state.nextId,
        info: state.initialVal,
        done: false
      }
      state.list.push(listItem)
      state.nextId++
      state.initialVal = ''
    },
    delListItem (state, id) {
      const index = state.list.findIndex(item => {
        return item.id === id
      })
      if (index > -1) {
        state.list.splice(index, 1)
      }
    },
    setStatus (state, listItem) {
      const index = state.list.findIndex(item => {
        return item.id === listItem.id
      })
      if (index > -1) {
        state.list[index].done = listItem.status
      }
    },
    clearDone (state) {
      state.list = state.list.filter(item => {
        return item.done === false
      })
      console.log(state.list)
    },
    showSelectList (state, type) {
      switch (type) {
        case 'all':
          state.status = 'all'
          break
        case 'undone':
          state.status = 'undone'
          break
        case 'done':
          state.status = 'done'
          break
      }
    }
  },
  actions: {
    getList (context) {
      axios.get('/static/list.json').then(({data}) => {
        context.commit('setList', data)
      })
    }
  },
  getters: {
    showNum (state) {
      return state.list.filter(item => {
        return item.done === false
      }).length
    },
    infoList (state) {
      if (state.status === 'all') {
        return state.list
      }
      if (state.status === 'undone') {
        return state.list.filter(item => {
          return item.done === false
        })
      }
      if (state.status === 'done') {
        return state.list.filter(item => {
          return item.done === true
        })
      }
    }
  }
})

export default store
