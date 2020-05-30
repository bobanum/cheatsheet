<template>
<header>
    <svg style="fill:white;" height="120"><use href="/images/logo_memento.svg#logo"></use></svg>
    <h1>Memento</h1>
</header>

</template>
<style lang="scss" scoped>
#app > header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: center;
    gap: 1em;
    svg {
        fill:white;
        height: 50px;
        width: 64px;
    }
    h1 {
        font-size: 2em;
        margin: 0;
    }
}
</style>

<script>
export default {
    data() {
        return {
            data: 0,
        }
    },
    props: {

    },
    components: {
    },
}
</script>
