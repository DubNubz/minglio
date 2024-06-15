<template>
  <div class="index">

    <div class="title">

      <h1>agiohsaohig</h1>
      <h1><span class="word">{{ currentWord }}</span> conversations</h1>
      <h1 style="font-size: 5em;">with <span class="strikethrough">strangers</span> <span class="underline">friends</span></h1>
    </div>

    <div class="description">
      <p>Minglio provides a safe and anonymous space to chat and form real connections with random people around the world,
        all for the low, low cost of FREE. See what the excitement is about!</p>
    </div>

    <div class="startButtons">
      <NuxtLink to="/login?sign-up=1" class="button signUp">
        <h4 v-if="!sessionStore().user">Sign up</h4>
        <h4 v-else>Continue</h4>
      </NuxtLink>
      <NuxtLink to="/home" class="button guest" v-if="!sessionStore().user"><h4>Continue as guest</h4></NuxtLink>
    </div>

    <span v-if="!sessionStore().user">Signing up with Minglio simply tracks your own statistics. No data is ever shared between users.</span>

    <div class="features">
      <div class="featureHolder">
        <div class="feature">
          <div class="text">
            <h1>Safety</h1>
            <p>Our top concern is your safety!</p>
            <p>All chats are limited to 90 seconds,</p>
            <p>but can be extended if both parties agree.</p>
            <p>Exiting conversations is trivially easy,</p>
            <p>and we moderate on a case-by-case basis.</p>
          </div>
          <img src="/icons/cyberHands.svg" alt="Safety is one of our top concerns">
        </div>
        <div class="feature">
          <img src="/icons/cyberUmbrella.svg" alt="We value user privacy">
          <div class="textOpposite">
            <h1>Privacy</h1>
            <p>We value user privacy!</p>
            <p>We do not collect or sell user data</p>
            <p>to third-party advertisers, because</p>
            <p>we wouldn't want our data sold, either!</p>
          </div>
        </div>
        <div class="feature">
          <div class="text">
            <h1>Security</h1>
            <p>All conversations are encrypted!</p>
            <p>No information is saved on our servers.</p>
            <p>Anything shared between users in conversations</p>
            <p>will not be recorded and will be immediately</p>
            <p>deleted when the chat expires.</p>
          </div>
          <img src="/icons/cyberMessages.svg" alt="All conversations are encrypted">
        </div>
      </div>
    </div>

    <Mission />

    <Credits />

    <SocialMedia style="margin-top: 5em;" />
  </div>
</template>

<script setup lang="ts">

const words = ["Free", "Safe", "Fast", "Quick", "Anonymous", "Secure", "Fun", "Silly", "Engaging", "Insightful", "Enlightening",
"Inspiring", "Enriching", "Refreshing", "Thoughtful", "Encouraging", "Supportive", "Uplifting", "Motivating", "Empowering", "Informative",
"Educational", "Eye-Opening", "Heartwarming", "Fulfilling", "Valuable", "Positive", "Collaborative", "Friendly", "Respectful", "Pleasant",
"Enjoyable", "Lively", "Vibrant", "Dynamic", "Cheerful", "Lighthearted", "Compelling", "Fascinating", "Captivating", "Intriguing", "Profound",
"Deep", "Comforting", "Mysterious", "Optimistic", "Joyful", "Amusing", "Calming", "Soothing", "Reassuring", "Exciting", "Rewarding", "Kind",
"Sympathetic", "Understanding", "Welcoming", "Inclusive", "Broadening", "Innovative", "Open-Minded", "Accepting"];
const currentWord = ref("");
const previousWord = ref("");

onMounted(() => {
  changeWord();
});

async function changeWord () {
  while (true) {
    const word = getRandomItemFromArray(words);
    if (word == previousWord.value) continue;
    else previousWord.value = word;

    for (let character of word) {
      currentWord.value += character;
      await delay(40);
    }
    await delay(300);
    for (let character of word) {
      currentWord.value = currentWord.value.slice(0, currentWord.value.length - 1);
      await delay(20);
    }
    await delay(50);
  }
}

</script>

<style lang="scss" scoped>

.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
  text-align: center;

  h1 {
    .word {
      color: var(--minglioBlue);
      text-shadow: var(--secondaryBodyColor) 5px 5px;
      transition: all 0.75s;
    }
  }
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5em;

  p {
    text-align: center;
    width: 30em;
    font-size: 1.75em;
  }
}

.strikethrough {
  text-decoration: line-through;
  text-decoration-color: red;
  text-decoration-thickness: 0.25em;
}

.underline {
  text-shadow: var(--minglioGreen) 0 0 0.5em;
}

.startButtons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50em;
  gap: 2em;
  margin-top: 3em;
  margin-bottom: 2em;

  .button {
    transition: all 0.25s;
    background-color: transparent;
    border-width: 0;
  }

  .signUp {
    border-width: 0.25em;
    border-color: var(--minglioGreen);
    border-style: solid;
    padding: 0.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    border-radius: 5em;
  }
}

.features {
  background-color: var(--secondaryBodyColor);
  margin-top: 4em;
  margin-bottom: 4em;
  padding-top: 4em;
  padding-bottom: 4em;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5em;
  transition: background-color 0.75s;

  .featureHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60em;
    gap: 2em;
  }

  .feature {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h1 {
      margin-bottom: 0.35em;
    }

    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    .textOpposite {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }

    img {
      width: 20em;
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .startButtons {
    .signUp:hover {
      background-color: var(--minglioGreen);
      color: black;
    }
    .guest:hover {
      color: var(--minglioGreen);
    }
  }
}

</style>