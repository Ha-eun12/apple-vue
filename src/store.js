import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'kim',
      age: 20,
      likes: 30,
      likesPush: false,
      more: {}
    }
  },

  mutations : {
    setMore(state, data) {
      state.more = data
    },
    nameChange(state) {
      state.name = 'Park'
    },

    ageIncrease(state, payload) {
      state.age += payload
    },

    likeBtn(state) {
      if(state.likesPush == false) {
        state.likes ++ 
        state.likesPush = true
      }else {
        state.likes --
        state.likesPush = false
      }
    }
  },
  actions: {
    getData(context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((a) => {
        context.commit('setMore', a.data)
      })
    }
  },

})

export default store