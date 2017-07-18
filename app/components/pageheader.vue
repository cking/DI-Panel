<template>
    <header>
        <div class='header-wrapper'>
            <div class='icon'></div>
            <h1>Discord Injections</h1>
        </div>
    </header>
</template>

<script>
export default {
    name: 'PageHeader'
}
</script>

<style scoped>
header {
    padding: 8px 0;
    margin: 0;
    background: #7289DA;
    width: 100%;
    color: #fff;
}

.header-wrapper {
    vertical-align: middle;
    margin-left: 50px;
}

.header-wrapper h1 {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
}

.header-wrapper .icon {
    display: inline-block;
    content: '';
    background-image: url(/img/logo.png);
    background-size: contain;
    height: 100px;
    width: 100px;
    vertical-align: middle;
}
</style>