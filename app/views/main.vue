<template>
    <main>
        <PageHeader></PageHeader>
        <div id="main">
            <FloatyThing></FloatyThing>
    
            <section>
                <h1>What's this?</h1>
                <p>DiscordInjections (DI) is a utility to inject your Discord client with CSS and JS, in the form of plugins.</p>
            </section>
            <section>
                <h1>Warning</h1>
                <p>Site is very WIP</p>
            </section>
        </div>
        <PageFooter></PageFooter>
    </main>
</template>

<script>
export default {
    data: () => ({
        info: 'Hello World!'
    })
}
</script>

<style scoped>
#main {
    color: #fff;
}
</style>