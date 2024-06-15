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
                <h2 v-if="!user">Welcome to Minglio, <span>User!</span></h2>
                <p>What would you like to do today?</p>
            </div>
        </div>

        <div class="cardHolder" v-if="!user || (user && user.displayName)">
            <div class="card" @click="router.push('/chat')">
                <svg fill="var(--minglioBlue)" width="800px" height="800px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M23,26a1,1,0,0,1-1,1H8c-.22,0-.43.2-.61.33L4,30V14a1,1,0,0,1,1-1H8.86V11H5a3,3,0,0,0-3,3V32a1,1,0,0,0,.56.89,1,1,0,0,0,1-.1L8.71,29H22.15A2.77,2.77,0,0,0,25,26.13V25H23Z" class="clr-i-outline clr-i-outline-path-1"></path>
                    <path d="M31,4H14a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3H27.55l4.78,3.71a1,1,0,0,0,1,.11,1,1,0,0,0,.57-.9V7A3,3,0,0,0,31,4ZM32,22.94,28.5,20.21a1,1,0,0,0-.61-.21H14a1,1,0,0,1-1-1V7a1,1,0,0,1,1-1H31A1.1,1.1,0,0,1,32,7.06Z" class="clr-i-outline clr-i-outline-path-2"></path>
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                </svg>
                <h3>Find a conversation</h3>
                <NuxtLink to="/chat" class="button"><h4>Chat</h4></NuxtLink>
            </div>
            <div class="card" @click="sessionStore().user ? router.push('/stats') : router.push('/login')">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3V6M17 3V6M7.10002 20C7.56329 17.7178 9.58104 16 12 16C14.419 16 16.4367 17.7178 16.9 20M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21ZM14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" stroke="var(--minglioBlue)" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Track your stats</h3>
                <NuxtLink to="/stats" class="button" v-if="sessionStore().user"><h4>Go</h4></NuxtLink>
                <NuxtLink to="/login" class="button" v-else><h4>Log in</h4></NuxtLink>
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
        color: var(--minglioGreen);
    }
}

.cardHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
    gap: 2em;

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30em;
        height: 20em;
        background-color: var(--secondaryBodyColor);
        border-radius: 1.5em;
        transition: all 0.25s;

        svg {
            width: 10em;
            height: 10em;
        }

        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            background-color: var(--minglioBlue);
            padding: 0.5em;
            width: 10em;
            border-radius: 1em;
            margin-top: 0.5em;
            transition: all 0.25s;
        }
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

    .cardHolder {
        .card:hover {
            background-color: var(--tertiaryBodyColor);

            .button {
                width: 15em;
            }
        }
    }
}

</style>