<template>
  <div class="container">
    <story v-for="(id, index) of storiesToShow" :count="index + 1" :key="index" :id="id">{{ index }}</story>
    <div class="loading__container" v-show="storyLimit !== storyMaxLimit">Loading ...</div>
  </div>
</template>

<script>
import axios from "axios";
import Story from "./Story";
import { getStoryIds } from "../utils/hnapi";
import { debounce } from "../utils/debounce";

const MIN_STORIES_COUNT = 20;
// const MAX_STORIES_COUNT = 500;

export default {
  name: "storiescontainer",
  components: { Story },
  data() {
    return {
      loading: false,
      storyLimit: MIN_STORIES_COUNT,
      topStoriesIds: []
    };
  },
  computed: {
    storiesToShow() {
      return this.topStoriesIds.slice(0, this.storyLimit);
    },
    storyMaxLimit() {
      return this.topStoriesIds.length;
    }
  },
  methods: {
    fetchTopStories() {
      getStoryIds().then(data => {
        this.topStoriesIds = data;
      });
    },

    scroll: debounce(function() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      const MAX_STORIES_COUNT = this.storyMaxLimit;

      if (bottomOfWindow) {
        let limit = this.storyLimit + MIN_STORIES_COUNT;

        if (limit >= MAX_STORIES_COUNT) {
          limit = MAX_STORIES_COUNT;
        }

        this.storyLimit = limit;
      }
    }, 500)
  },
  beforeMount() {
    this.fetchTopStories();
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0 auto;
  padding-top: 90px;
}

.loading__container {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: lowercase;
  padding: 5px 0;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  color: #fb8042;
}
</style>
