<template>
    <div class='floaty-wrapper'>
        <div class='circle bubble1'>
            <div class='overlay'>
                <span>Placeholder Text</span>
            </div>
        </div>
        <div class='circle bubble2 github'>
            <div class='overlay'>
                <span>Github</span>
            </div>
        </div>
        <div class='circle bubble3 plugins'>
            <div class='overlay'>
                <span>Placeholder Text</span>
            </div>
        </div>
        <div class='circle bubble4 bd'>
            <div class='overlay'>
                <span></span>
            </div>
        </div>
        <div class='circle bubblemain di'>
            <div class='overlay'>
                <span>Placeholder Text</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
    })
}
</script>

<style scoped>
.floaty-wrapper {
    min-width: 60%;
    width: 60%;
    max-width: 100%;
    margin: 0 auto;
    max-height: 50vh;
    min-height: 10vh;
    height: 50vmin;
    padding: 0;
    position: relative;
    overflow: hidden;
}

.circle {
    position: absolute;
    border-radius: 1000px;
    background: #aaa;
    display: block;
    animation: floatyMain 2s infinite alternate ease-in-out;
    background-size: cover !important;
    overflow: hidden;
}

.circle:hover .overlay {
    opacity: 1;
}

.circle .overlay {
    opacity: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1000px;
}

.circle .overlay span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 10%;
    width: 100%;
    margin: auto !important;
}

.circle.bubblemain {
    background: url(/img/logo.png);
    left: calc(50% - 10vmax);
    top: calc(50% - 10vmax);
    width: 20vmax;
    height: 20vmax;
}

.circle.bubble1 {
    background: url(https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png);
    left: calc(70% - 5vmax);
    top: calc(30% - 5vmax);
    animation-duration: 1s;
    width: 10vmax;
    height: 10vmax;
}

.circle.bubble2 {
    background: url(https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png);
    left: calc(73% - 3vmax);
    top: calc(67% - 3vmax);
    animation-duration: 0.7s;
    animation-delay: -0.3s;
    width: 6vmax;
    height: 6vmax;
}

.circle.bubble3 {
    background: url(https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png);
    left: calc(28% - 5vmax);
    top: calc(58% - 5vmax);
    animation-duration: 0.8s;
    animation-delay: -0.3s;
    width: 10vmax;
    height: 10vmax;
}

.circle.bubble4 {
    background: url(https://cdn.discordapp.com/icons/257299803397029899/64e14b2d61fb592c2657eb72a1e71040.png?size=512);
    left: calc(32% - 3vmax);
    top: calc(23% - 3vmax);
    animation-duration: 0.5s;
    width: 6vmax;
    height: 6vmax;
}

@keyframes floatyMain {
    0% {
        margin-top: 0px;
    }
    100% {
        margin-top: 15px;
    }
}

@media only screen and (max-width: 768px) {
    /* Mobile */
}
</style>