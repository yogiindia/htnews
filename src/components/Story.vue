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
            <div class="story__info">
                <h1 v-if="story" class="story__title">
                    <a :href="story.url" target="_blank">
                        <span>{{ story.title }}</span>
                        <span>({{ story.url | domain }})</span>
                    </a>
                </h1>
                <div class="post__info">
                    <svgicon
                        name="clock"
                        width="14"
                        height="14"
                        color="#fb8042"
                        :fill="false"
                    ></svgicon>
                    <span>{{ story.time | formatTimeStamp }}</span>
                </div>
                <div class="post__info">
                    <svgicon
                        name="user"
                        width="14"
                        height="14"
                        color="#fb8042"
                        :fill="false"
                    ></svgicon>
                    <span>{{ story.by }}</span>
                </div>
                <div class="post__info">
                    <svgicon
                        name="comment"
                        width="14"
                        height="14"
                        color="#fb8042"
                        :fill="false"
                    ></svgicon>
                    <span>{{ story.descendants }}</span>
                </div>
            </div>
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
    position: relative;
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;
    margin-top: 1px;
    margin-bottom: 2px;
    min-height: 80px;
    padding: 30px;
}

.story {
    position: absolute;
    width: 100%;
    left: -20px;
    display: grid;
    grid-template-columns: 5% 10% 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. . .';
}

.story__score {
    height: 52px;
    color: #fb8042;
    font-weight: 900;
    font-size: 18px;
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

.story__info {
    padding-top: 5px;
    line-height: 1.5em;
}

.post__info {
    margin-right: 20px;
    display: inline-block;

    & > svg {
        vertical-align: text-top;
    }
    & > span {
        font-size: 12px;
        color: rgba($color: #000000, $alpha: 0.65);
        margin-left: 8px;
        font-weight: 900;
        vertical-align: text-bottom;
    }
}

.story__title {
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
    width: 50px;
    height: 50px;
    padding: 1px;
    color: #fff;
    font-size: 22px;
    background-color: #fb8042;
    margin: 5px auto;
}
</style>
