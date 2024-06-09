<template>
    <div class="home">
        <div class="title">
            <div class="welcome" v-if="user && !user.displayName">
                <h2>Welcome to Minglio, user!</h2>
                <p>What should you be called?</p>
                <input type="text" placeholder="Create a username" v-model="username">
                You can change your name at any time in your Account settings.
                <h3>My name is: <span>{{ username }}</span></h3>
                <span v-if="showNameError" style="color: red;">Name must be longer than 5 characters.</span>
                <button class="changeName" @click="changeName" :class="{ disabled: username.length < 5 }">
                    <img src="/ui/check.svg" alt="Click to change your name">
                    <h4>Looks good!</h4>
                </button>
            </div>
            <div class="welcome" v-if="!user || (user && user.displayName)">
                <h2 v-if="user && user.displayName">Welcome back, <span>{{ user.displayName }}!</span></h2>
                <h2 v-if="!user">Welcome to Minglio, <span>user!</span></h2>
                <p>What would you like to do today?</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getAuth, updateProfile, type User } from 'firebase/auth';

const router = useRouter();

const user = ref<User> ();
const username = ref("");
const showNameError = ref(false);

watch(() => username.value, (name) => {
    showNameError.value = false;
    if (name.length > 16) username.value = name.slice(0, 16);
})

onMounted(() => {
    user.value = sessionStore().user;
});

async function changeName () {
    if (username.value.length < 5) {
        showNameError.value = true;
        return;
    }

    const auth = getAuth();
    try {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, {
            displayName: username.value
        });
        sessionStore().user = auth.currentUser;
        user.value = auth.currentUser;
        localStorage.setItem("login-info", JSON.stringify(auth.currentUser));
        router.go(0);

    } catch (error) {
        console.error(error);
    }
}

</script>

<style lang="scss" scoped>

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        input {
            margin-top: 2em;
            font-size: 1.25em;
            padding: 0.5em;
            border-radius: 0.45em;
            border-width: 0.05em;
            border-style: solid;
            background-color: var(--secondaryBodyColor);
            transition: background-color 0.25s;
            margin-bottom: 0.25em;
        }

        input:focus-visible {
            outline-color: var(--minglioGreen);
        }

        h3 {
            margin-top: 1em;
        }

        .changeName {
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            background-color: var(--minglioGreen);
            width: 20em;
            padding: 0.25em;
            border-radius: 0.75em;
            border-width: 0.15em;
            border-style: solid;
            margin-top: 1em;
            gap: 1em;
            transition: all 0.25s;

            img {
                width: 3em;
            }
        }

        .disabled {
            filter: grayscale(1);
        }
    }
    
    span {
        color: var(--minglioBlue);
    }
}

@media (hover: hover) and (pointer: fine) {
    .title {
        .welcome {
            .changeName:hover {
                background-color: #73ff00;
            }
        }
    }
}

</style>