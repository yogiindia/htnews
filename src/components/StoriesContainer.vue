<template>
    <div>
        <h1>Top Stories</h1>
        <story v-for="id of storyIdsToShow" :key="id" :id="id" />
    </div>
</template>

<script>
import axios from 'axios';
import Story from './Story';
import { getStoryIds } from '../utils/hnapi';

const MIN_STORIES_COUNT = 20;
const MAX_STORIES_COUNT = 500;

export default {
    name: 'storiescontainer',
    components: { Story },
    data() {
        return {
            loading: false,
            storyLimit: MIN_STORIES_COUNT,
            topStoriesIds: []
        };
    },
    methods: {
        fetchTopStories() {
            getStoryIds().then(data => {
                this.topStoriesIds = data;
            });
        },
        scroll() {
            const bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight;

            if (bottomOfWindow) {
                let limit = this.storyLimit + MIN_STORIES_COUNT;

                if (limit >= MAX_STORIES_COUNT) {
                    limit = MAX_STORIES_COUNT;
                }

                this.storyLimit = limit;
            }
        }
    },
    computed: {
        storyIdsToShow() {
            return this.topStoriesIds.slice(0, this.storyLimit);
        }
    },
    beforeMount() {
        this.fetchTopStories();
    },
    mounted() {
        window.addEventListener('scroll', this.scroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scroll);
    }
};
</script>

<style lang="scss" scoped>
.person {
    background: #ccc;
    border-radius: 2px;
    width: 20%;
    margin: 0 auto 15px auto;
    padding: 15px;

    img {
        width: 100%;
        height: auto;
        border-radius: 2px;
    }

    p:first-child {
        text-transform: capitalize;
        font-size: 2rem;
        font-weight: 900;
    }

    .text-capitalize {
        text-transform: capitalize;
    }
}
</style>
