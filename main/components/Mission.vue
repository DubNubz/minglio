<template>
    <div class="mission">
        <h1>Our Mission</h1>
        <p>In our fast-paced and ever-changing world, we sometimes</p>
        <p>forget about the thing that makes us all human:</p>
        <span><h3>Interacting with our fellow humans.</h3></span>
        <p style="margin-top: 1.25em;">Some of us can't talk with others.</p>
        <p>Some of us don't know how to talk with others.</p>
        <p><strong style="color: var(--minglioGreen);">Our goal at Minglio is to change that.</strong></p>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.mission {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 3em;
    text-align: center;
    
    h1 {
        margin-bottom: 0.25em;
        text-decoration: underline;
    }
        
    p {
        margin-bottom: 0.25em;
    }

    span {
        font-size: 1.15em;
        color: var(--minglioBlue);
    }
}

</style>