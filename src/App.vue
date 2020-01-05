<template>
    <div id="app">
        <top-bar />
        <logo />
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
        Logo,
        TopBar
    }
};
</script>

<style lang="scss">
html,
body {
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
