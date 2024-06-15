<template>
    <div class="account">
        <h1>account</h1>
        <h2>Change name</h2>
        <input type="text" placeholder="name" v-model="username">
        <button @click="changeName">done</button>

        <button @click="signOutAccount">sign out</button>
    </div>
</template>

<script setup lang="ts">
import { getAuth, signOut, updateProfile, type User } from 'firebase/auth';

const router = useRouter();

const user = ref<User> ();
const username = ref("");

watch(() => username.value, (name) => {
    if (name.length > 16) username.value = name.slice(0, 16);
})

onMounted(() => {
    if (!sessionStore().user) router.push("/home");
    user.value = sessionStore().user;
});

async function changeName () {
    const auth = getAuth();
    try {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, {
            displayName: username.value
        });
        sessionStore().user = auth.currentUser;
        user.value = auth.currentUser;
        localStorage.setItem("login-info", JSON.stringify(auth.currentUser));

    } catch (error) {
        console.error(error);
    }
}

async function signOutAccount () {
    const auth = getAuth();
    try {
        await signOut(auth);
        sessionStore().user = undefined;
        user.value = undefined;
        localStorage.removeItem("login-info");
        router.push("/");

    } catch (error) {
        console.error(error);
    }
}

</script>

<style lang="scss" scoped>

.account {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}

</style>