<template>
    <h5 v-if="story">{{ story.title }}</h5>
</template>

<script>
import { getStory } from '../utils/hnapi';

export default {
    name: 'story',
    props: ['id'],
    data() {
        return {
            story: null
        };
    },
    methods: {
        fetchStory(id) {
            getStory(id).then(data => {
                console.log(data);
                this.story = data;
            });
        }
    },
    beforeMount() {
        this.fetchStory(this.id);
    }
};
</script>

<style lang="sass" scoped></style>
