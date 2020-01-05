<template>
    <div class="logo">
        <div>H</div>
    </div>
</template>

<script>
export default {
    name: 'logo'
};
</script>

<style lang="scss" scoped>
.logo {
    font-family: 'Roboto', sans-serif;
    width: 40px;
    height: 40px;
    color: #fff;
    background-color: #fb8042;
    border-radius: 4px;
    text-align: center;
    line-height: 2em;
    padding: 1px;

    & > div {
        border: 2px solid;
        margin: 2px;
        font-size: 30px;
    }
}
</style>
