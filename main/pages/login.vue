<template>
    <div class="login">
        <div class="loginForm" v-if="status == 'reset'">
            <h3>Enter your email to reset your password</h3>
            <form action="/login" @submit.prevent>
                <span class="error" v-if="emailMessage">Check your email for your password reset link!</span>
                <input type="email" required placeholder="Email" v-model="email" autocomplete="email" autofocus >
                <button class="submit" @click="resetPassword">Reset Password</button>
                <p><NuxtLink to="/login" @click="status = 'login'">Go back</NuxtLink></p>
            </form>
        </div>
        <div class="loginForm" v-else>
            <button @click="signInWithGoogle" class="google">
                <img src="/icons/google.svg" alt="Click to continue with Google">
                <h4>Continue with Google</h4>
            </button>
            <p class="or">or</p>
            <span class="error" v-if="showErrorMessage">{{ errorMessage }}</span>
            <form action="/login" @submit.prevent>
                <input type="email" required placeholder="Email" v-model="email" autocomplete="email" autofocus >
                <div class="password">
                    <input type="password" required placeholder="Password" v-model="password" autocomplete="current-password" >
                    <NuxtLink to="/login?password-reset=1" v-if="status == 'login'" @click="status = 'reset'">Forgot password?</NuxtLink>
                </div>
                <button v-if="status == 'signup'" class="submit" @click="signUp">Sign up</button>
                <button v-if="status == 'login'" class="submit" @click="login">Log in</button>
                <span v-if="status == 'signup'" style="margin-bottom: 1.5em;">Signing up with Minglio simply tracks your own statistics. No data is ever shared between users.</span>
            </form>
            <p v-if="status == 'login'">New to Minglio? <NuxtLink to="/login?sign-up=1" @click="status = 'signup'">Sign up</NuxtLink></p>
            <p v-if="status == 'signup'">Already have an account? <NuxtLink to="/login" @click="status = 'login'">Log in</NuxtLink></p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, type User, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const email = ref("");
const password = ref("");
const route = useRoute();
const router = useRouter();

const status = ref<"login" | "signup" | "reset"> ("login");
const showErrorMessage = ref(false);
const errorMessage = ref<"The email or password you entered is incorrect." | "The email you entered is already in use." |
"Your password should be at least 6 characters." | "Something went wrong. Try again later."> ();
const emailMessage = ref(false);

definePageMeta({ layout: 'login-layout' });
useHead({ title: "Log in - Minglio" });

watch(() => status.value, () => showErrorMessage.value = false);

onMounted(() => {
    if (sessionStore().user) router.push("/home");

    const signup = route.query["sign-up"] as string;
    const reset = route.query["password-reset"] as string;
    if (signup) status.value = "signup";
    else if (reset) status.value = "reset";
});

async function resetPassword () {
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email.value);
        emailMessage.value = true;

    } catch (error) {
        console.error(error);
    }
}

async function login () {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        sessionStore().user = user;
        localStorage.setItem("login-info", JSON.stringify(user));
        router.push("/home");
        
    } catch (error) {
        showErrorMessage.value = true;
        errorMessage.value = "The email or password you entered is incorrect.";
        console.error(error);
    }
}

async function signUp () {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        sessionStore().user = user;
        localStorage.setItem("login-info", JSON.stringify(user));
        router.push("/home");
        
    } catch (error) {
        showErrorMessage.value = true;
        if (password.value.length < 6) errorMessage.value = "Your password should be at least 6 characters.";
        else errorMessage.value = "The email you entered is already in use.";
        console.error(error);
    }
}

async function signInWithGoogle () {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        sessionStore().user = user;
        localStorage.setItem("login-info", JSON.stringify(user));
        router.push("/home");

    } catch (error) {
        showErrorMessage.value = true;
        errorMessage.value = "Something went wrong. Try again later.";
        console.error(error);
    }
}

</script>

<style lang="scss" scoped>

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}

.loginForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25em;
    text-align: center;

    h3 {
        margin-bottom: 0.5em;
    }
}

.google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    width: 100%;
    border-radius: 1em;
    border-style: solid;
    border-width: 0.1em;
    border-color: var(--secondaryTextColor);
    background-color: var(--secondaryBodyColor);
    transition: all 0.25s;

    img {
        width: 3em;
    }
}

.or {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    color: var(--secondaryTextColor);
}

.error {
    color: red;
    margin-bottom: 0.25em;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    input {
        width: 95%;
        font-size: 1.25em;
        padding: 0.5em;
        border-radius: 0.45em;
        border-width: 0.05em;
        border-style: solid;
        background-color: var(--secondaryBodyColor);
        transition: background-color 0.25s;
        margin-bottom: 0.75em;
    }

    input:focus-visible {
        outline-color: var(--minglioGreen);
    }

    .submit {
        font-size: 1.25em;
        padding: 0.5em;
        border-radius: 0.45em;
        border-width: 0.05em;
        border-style: solid;
        margin-bottom: 0.75em;
        width: 50%;
        background-color: var(--textColor);
        color: var(--bodyColor);
        margin-top: 1em;
        transition: all 0.25s;
    }
}

.password {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    input {
        margin-bottom: 0.25em;
    }
}

a {
    color: var(--minglioBlue);
    transition: all 0.25s;
    font-weight: bolder;
}

@media (hover: hover) and (pointer: fine) {
    .google:hover {
        background-color: var(--tertiaryBodyColor);
    }

    .submit:hover {
        color: black;
        background-color: var(--minglioGreen);
    }

    a:hover {
        text-decoration: underline;
    }
}

</style>