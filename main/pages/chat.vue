<template>
    <div class="chatPage">
        <Transition name="showWarning">
            <div class="warningBackground" v-if="showWarning">
                <div class="warning">
                    <h2>Disclaimer</h2>
                    <p>By using Minglio, you have agreed to our <NuxtLink to="/info/tos" style="text-decoration: underline;"><strong>Terms of Service</strong></NuxtLink></p>
                    <p>and acknowledge the risks associated with conversing with strangers.</p>
                    <p style="margin-top: 0.5em;">Minglio is not responsible for any information shared between users,</p>
                    <p>and it is your responsibility to not share any sensitive information.</p>
                    <div class="acknowledge">
                        <h2 v-if="countdown >= 0">{{ countdown }}</h2>
                        <button @click="acknowledge" class="button" :class="{ disabled: countdown >= 0 }">
                            <img src="/ui/check.svg" alt="Click to close this disclaimer">
                            <h4>Understood</h4>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <Connection />
    </div>
</template>

<script setup lang="ts">

const router = useRouter();

const showWarning = ref(false);
const countdown = ref(5);

onMounted(() => {
    router.push("/chat");

    const seenDisclaimer = localStorage.getItem("seenDisclaimer");
    if (!seenDisclaimer) {
        showWarning.value = true;
        countdown.value = 5;
        startCountdown();
    }
});

async function startCountdown () {
    while (countdown.value >= 0) {
        await delay(1000);
        countdown.value--;
    }
}

function acknowledge () {
    if (countdown.value >= 0) return;
    localStorage.setItem("seenDisclaimer", "true");
    showWarning.value = false;
}

</script>

<style lang="scss" scoped>

.chatPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.warningBackground {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 1;
}

.warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--bodyColor);
    padding: 3em;
    border-radius: 0.75em;

    h2 {
        margin-bottom: 0.5em;
    }

    .acknowledge {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 3em;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        width: 20em;
        border-radius: 0.75em;
        border-style: solid;
        border-width: 0.1em;
        background-color: var(--minglioGreen);
        transition: all 0.25s;
        color: black;

        img {
            width: 3em;
        }
    }

    .disabled {
        filter: grayscale(1);
    }
}

.showWarning-enter-active, .showWarning-leave-active {
    transition: all 0.5s ease-in-out;

    .warningBackground {
        transition: all 0.15s ease-in-out;
    }
    
    .warning {
        transition: all 0.25s ease-in-out;
    }
}

.showWarning-enter-from, .showWarning-leave-to {
    opacity: 0;

    .warningBackground {
        opacity: 0.001;
    }

    .warning {
        transform: translateY(30px);
        opacity: 0.001;
    }
}

@media (hover: hover) and (pointer: fine) {

}

</style>