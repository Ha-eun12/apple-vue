<template>
  <div @click="fire" :class="filter + ' filter-item'" :style="{ backgroundImage : `url(${image})` }">
    <slot name="a"></slot>
    <!-- <slot :msg = "msg"></slot> -->
    <button @click="fire">버튼</button>
  </div>
  
</template>

<script>
  export default {
    name: 'TheFilterbox',
    data() {
      return {
        msg: 'hello',
      }
    },
    props: {
      image: String,
      filter: String
    },
    methods: {
      fire() {
        this.emitter.emit('boxClick', this.filter)
      }
    }
  }
</script>

<style>
  .filter-item {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    background-position: center;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color : white;
    background-size: cover;
  }
</style>