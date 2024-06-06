<template>
    <div class="contact">
        <h2>About us</h2>
        <Credits />
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.contact {
    margin-top: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        margin-bottom: 0.25em;
    }

    h2 {
        margin-bottom: 2em;

        span {
            font-size: 1.15em;
            color: var(--minglioGreen);
        }
    }
}

</style>