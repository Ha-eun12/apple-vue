<template>
  <div class="post-container">
    <div v-if="step == 1">
      <Post :instaData = instaData />
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step == 2">
      <div :class="selectFilter" class="upload-image" :style="{ backgroundImage : `url(${image})` }"></div>
      <div class="filters">
        <FilterBox :image = image
                    :filter = filter
                    v-for="filter in filters" :key="filter">
          <template v-slot:a><span class="filter-name">{{ filter }}</span></template>
          <!-- <template v-slot:default="helloMsg"><span class="filter-name">{{ helloMsg.msg }}</span></template> -->
        </FilterBox>
      
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 3">
      <div :class="selectFilter" class="upload-image" :style="{ backgroundImage : `url(${image})` }"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>

  </div>
</template>

<script>
  import Post from './Post.vue'
  import FilterBox from './Filterbox.vue'

  export default {
    name: 'TheContainer',
    data() {
      return {
        filters: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        selectFilter: '',
      }
    },
    components: {
      Post,
      FilterBox,
    },
    props: {
      instaData: Array,
      step: Number,
      image: String
    },
    mounted() {
      this.emitter.on('boxClick', (a) => {
        this.selectFilter = a
        console.log(a)
      })
    }
  }
</script>

<style scoped>
  .upload-image{
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size : cover;
  }
  .filters{
    overflow-x:scroll;
    white-space: nowrap;
  }
  .filters::-webkit-scrollbar {
    height: 5px;
  }
  .filters::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  .filters::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
  }
  .filters::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  .filter-name {
    display: inline-block;
    padding: 2px 4px;
    color: #fff;
    background-color: #555;
    box-sizing: border-box;
  }
  .write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
  }
</style>