<template>
    <div class="story-container">
        <div class="story" v-if="story">
            <div class="counter">{{ count }}</div>
            <div>{{ story.score }}</div>
            <h1 v-if="story" class="title">
                <a :href="story.url">
                    <span>{{ story.title }}</span>
                    <span>({{ story.url | domain }})</span>
                </a>
                <span>{{ story.time | formatTimeStamp }}</span>
            </h1>
        </div>
    </div>
</template>

<script>
import { getStory } from '../utils/hnapi';
import { format } from 'timeago.js';
import '../compiled-icons';

export default {
    name: 'story',
    props: ['id', 'count'],
    data() {
        return {
            story: null
        };
    },
    filters: {
        formatTimeStamp(timestamp) {
            return format(new Date(timestamp * 1000));
        },
        domain(value) {
            console.log('url:', value);
            try {
                const url = new URL(value);
                return url.hostname;
            } catch (e) {
                return value;
            }
        }
    },
    methods: {
        fetchStory(id) {
            getStory(id).then(data => {
                this.story = data;
            });
        }
    },
    beforeMount() {
        this.fetchStory(this.id);
    }
};
</script>

<style lang="scss" scoped>
.story-container {
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 9.6px 17.3px rgba(0, 0, 0, 0.09),
        0 40px 100px rgba(0, 0, 0, 0.046);
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 100px;
    padding: 30px;
}

.story {
    display: grid;
    grid-template-columns: 10% 10% 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. . .';
}

.title {
    a {
        text-decoration: none;
        cursor: pointer;
        color: #000;
        font-size: 24px;
        font-weight: 900;

        span:nth-child(2) {
            color: rgba($color: #000000, $alpha: 0.8);
            font-weight: 400;
            margin-left: 10px;
            font-size: 22px;
        }
    }
}

.counter {
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    line-height: 2.2em;
    width: 40px;
    height: 40px;
    padding: 1px;
    color: #fff;
    font-size: 18px;
    background-color: #fb8042;
}
</style>
