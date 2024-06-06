<template>
  <div class="index">

    <div class="title">
      <h1><span class="word">{{ currentWord }}</span> conversations</h1>
      <h1 style="font-size: 5em;">with <span class="strikethrough">strangers</span> <span class="underline">friends</span></h1>
    </div>

    <div class="description">
      <p>Minglio provides a safe and anonymous space to chat and form real connections with random people around the world, all for the low, low cost of FREE. See what the excitement is about!</p>
    </div>

    <div class="startButtons">
      <NuxtLink to="/login" class="button signUp"><h4>Sign up</h4></NuxtLink>
      <NuxtLink to="/home" class="button guest"><h4>Continue as guest</h4></NuxtLink>
    </div>

    <div class="features">
      <div class="feature">
        <h1>Safety</h1>
        <p>smth</p>
      </div>
      <div class="feature">
        <h1>Privacy</h1>
        <p>We value user privacy! We do not use cookies to collect user data.</p>
      </div>
      <div class="feature">
        <h1>Anonymity</h1>
        <p>smth</p>
      </div>
    </div>

    <Credits />
  </div>
</template>

<script setup lang="ts">

const words = ["Free", "Safe", "Fast", "Quick", "Anonymous", "Secure", "Fun", "Silly", "Engaging", "Insightful", "Enlightening", "Stimulating",
  "Inspiring", "Constructive", "Enriching", "Refreshing", "Thoughtful", "Encouraging", "Supportive", "Uplifting", "Motivating",
  "Empowering", "Revealing", "Informative", "Educational", "Eye-Opening", "Heartwarming", "Fulfilling", "Valuable",
  "Positive", "Collaborative", "Friendly", "Respectful", "Harmonious", "Cordial", "Pleasant", "Enjoyable", "Lively", "Animated", "Vibrant",
  "Dynamic", "Cheerful", "Lighthearted", "Compelling", "Fascinating", "Captivating", "Intriguing", "Engrossing", "Rich",
  "Profound", "Deep", "Interactive", "Heartening", "Comforting", "Invigorating", "Gratifying", "Affirming",
  "Resonant", "Optimistic", "Joyful", "Amusing", "Hopeful", "Calming", "Soothing", "Reassuring", "Exciting",
  "Rewarding", "Complimentary", "Courteous", "Considerate", "Kind", "Sympathetic", "Understanding", "Welcoming", "Inclusive",
  "Broadening", "Holistic", "Innovative", "Open-Minded", "Reflective", "Tolerant", "Accepting", "Comprehensible", "Perceptive", "Persuasive"
];
const currentWord = ref("");
const previousWord = ref("");

/*definePageMeta({
    layout: 'start'
});*/

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

  h1 {
    .word {
      color: var(--minglioGreen);
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
  margin-top: 5em;
  margin-bottom: 5em;
  padding-top: 5em;
  padding-bottom: 5em;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4em;
  transition: background-color 0.75s;

  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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