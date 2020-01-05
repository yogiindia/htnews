<template>
    <div class="bar">
        <logo />
        <h1>top news</h1>
    </div>
</template>

<script>
import Logo from './Logo';
export default {
    name: 'topbar',
    components: {
        Logo
    }
};
</script>

<style lang="scss" scoped>
.bar {
    position: fixed;
    display: grid;
    grid-template-columns: 1fr 9fr;
    grid-template-rows: 40px;
    width: 100%;
    padding: 10px 20px;
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #fff;
    box-shadow: 0 2.5px 3.6px rgba(0, 0, 0, 0.049),
        0 6.9px 10px rgba(0, 0, 0, 0.063), 0 16.6px 24.1px rgba(0, 0, 0, 0.077),
        0 55px 80px rgba(0, 0, 0, 0.13);

    & > h1 {
        margin: 0;
        padding: 0;
        text-transform: capitalize;
        color: #fb8042;
        text-align: center;
        font-family: 'Roboto', sans-serif;
    }
}
</style>
