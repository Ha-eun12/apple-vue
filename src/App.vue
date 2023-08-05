<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 2" @click="step++">Next</li>
      <li v-if="step == 3" @click="publish">Create</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <h4>hi {{ $store.state.name }}</h4>
  <!-- <button @click="$store.commit('nameChange')">name button</button> -->
  <button @click="nameChange()">name button</button>

  <h4>{{ $store.state.age }}</h4>
  <!-- <button @click="$store.commit('ageIncrease', 10)">age button</button> -->
  <button @click="ageIncrease(10)">age button</button>

  <h4>{{ $store.state.more }}</h4>
  <h4>{{ name }} {{ myname }} {{ age }} {{ myage }} {{ likes }}</h4>
  <button @click="$store.dispatch('getData')">더보기버튼</button>

  <p>{{ now2 }} {{ counter }}</p>
  <button @click="counter++">버튼</button>

  <Container :instaData = instaData 
              :step = step
              :image = image
              @write="writeText = $event" />
  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!-- <div v-if="step === 1">내용1</div>
  <div v-if="step === 2">내용2</div>
  <div v-if="step === 3">내용3</div>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button>
  <button @click="step = 3">버튼3</button> -->
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Data from './assets/insta'
import Container from './components/Container.vue'
import axios from 'axios'

axios.get()
export default {
  name: 'App',
  data() {
    return {
      step: 1,
      instaData: Data,
      moreNumber: 0,
      tabOpen: false,
      image: '',
      writeText: '',
      selectFilter: '',
      counter: 0,
    }
  },
  mounted() {
    this.emitter.on('boxClick', (a) => {
      this.selectFilter = a
    })
  },  
  components: {
    Container
  },
  computed: {
    // name() {
    //   return this.$store.state.name
    // },
    now2() {
      return new Date()
    },
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ myname : 'name', myage: 'age' })
  },
  methods: {
    ...mapMutations(['setMore', 'likeBtn', 'nameChange', 'ageIncrease']),
    now() {
      return new Date()
    },
    publish() {
      let myInsta =  {
          name: "Kim Hyun",
          userImage: "https://picsum.photos/100?random=3",
          postImage: this.image,
          likes: 36,
          date: "May 15",
          liked: false,
          content: this.writeText,
          filter: this.selectFilter,
      };
      this.instaData.unshift(myInsta);
      this.step = 1
    },
    more() {

      axios.get(`https://codingapple1.github.io/vue/more${this.moreNumber}.json`)
      .then( res => {
        console.log(res.data)
        this.instaData.push(res.data)
        this.moreNumber++
      })
    },
    upload(e) {
      let file = e.target.files
      console.log(file[0]);
      let url = URL.createObjectURL(file[0])
      console.log(url);
      this.image = url;
      this.step++
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
