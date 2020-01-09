<template>
    <div id="app">
        <top-bar />
        <stories-container />
    </div>
</template>

<script>
import StoriesContainer from './components/StoriesContainer';
import Logo from './components/Logo';
import TopBar from './components/TopBar';

export default {
    name: 'app',
    components: {
        StoriesContainer,
        TopBar
    }
};
</script>

<style lang="scss">
html,
body {
    background-color: #f5f6fa;
    margin: 0;
    padding: 0;
    /* box-sizing: border-box; */
}

h1,
h2,
h3,
h4,
h5 {
    margin: 0;
    padding: 0;
}
</style>
