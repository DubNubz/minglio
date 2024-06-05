<template>
  <div class="holder">

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

    <div class="">

    </div>
  </div>
</template>

<script setup lang="ts">

const words = ["Free", "Safe", "Fast", "Quick", "Anonymous", "Secure", "Fun", "Silly", "Engaging", "Insightful", "Enlightening", "Stimulating",
  "Inspiring", "Productive", "Constructive", "Enriching", "Refreshing", "Thoughtful", "Encouraging", "Supportive", "Uplifting", "Motivating",
  "Empowering", "Illuminating", "Revealing", "Informative", "Educational", "Eye-Opening", "Heartwarming", "Fulfilling", "Valuable", "Beneficial",
  "Positive", "Collaborative", "Friendly", "Respectful", "Harmonious", "Cordial", "Pleasant", "Enjoyable", "Lively", "Animated", "Vibrant",
  "Dynamic", "Amicable", "Cheerful", "Lighthearted", "Affable", "Compelling", "Fascinating", "Captivating", "Intriguing", "Engrossing", "Rich",
  "Profound", "Deep", "Interactive", "Heartening", "Comforting", "Invigorating", "Engaged", "Gratifying", "Luminous", "Nourishing", "Affirming",
  "Delightful", "Resonant", "Gracious", "Optimistic", "Joyful", "Amusing", "Radiant", "Hopeful", "Calming", "Soothing", "Reassuring", "Exciting",
  "Rewarding", "Complimentary", "Convivial", "Courteous", "Considerate", "Kind", "Sympathetic", "Understanding", "Welcoming", "Inclusive",
  "Broadening", "Holistic", "Innovative", "Open-Minded", "Reflective", "Tolerant", "Accepting", "Comprehensible", "Perceptive", "Astute", "Clever", "Persuasive"
];
const currentWord = ref("Free")

definePageMeta({
    layout: 'start'
});

onMounted(() => {
  changeWord();
});

async function changeWord () {
  while (true) {
    currentWord.value = getRandomItemFromArray(words);
    await delay(100);
  }
}

</script>

<style lang="scss" scoped>

.holder {
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