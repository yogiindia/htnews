<template>
    <div class="story__container">
        <div class="story" v-if="story">
            <div class="story__counter">{{ count }}</div>
            <div class="story__score">
                <svgicon
                    name="triangle"
                    width="12"
                    height="12"
                    color="#fb8042"
                ></svgicon>
                <span>
                    {{ story.score }}
                </span>
            </div>
            <h1 v-if="story" class="story__title">
                <a :href="story.url">
                    <span>{{ story.title }}</span>
                    <span>({{ story.url | domain }})</span>
                </a>
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
.story__container {
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
    grid-template-columns: 5% 10% 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. . .';
}

.story__score {
    height: 42px;
    color: #fb8042;
    font-weight: 900;
    font-size: 16px;
    text-align: center;
    margin: 5px auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    & > svg {
        align-self: end;
        justify-self: center;
        margin-bottom: 2px;
    }
}

.story__title {
    padding-top: 5px;
    line-height: 0.85em;
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

.story__counter {
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
    margin: 5px auto;
}
</style>
