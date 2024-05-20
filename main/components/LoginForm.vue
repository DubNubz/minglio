<template>
    <div>
        <form @submit.prevent="handleAuth(login ? 'login' : 'signup')">
            <input class="email" required type="email" placeholder="Email" v-model="email" />
            <input class="password" required type="password" placeholder="Password" v-model="password" />
            <input class="submit" type="submit" :value="login ? 'Log in' : 'Sign up'" />
        </form>
        <button @click="loginAsGuest">Login as guest</button>
    </div>
</template>

<script setup lang="ts">

const email = ref("");
const password = ref("");

const login = ref(true);

const emit = defineEmits(["login"]);

async function handleAuth (type: "login" | "signup") {

    // if successful
    // emit("login");

}

async function loginAsGuest () {

    // if successful
    // emit("login");

}

</script>

<style scoped>

</style>