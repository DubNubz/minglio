<template>
  <div class="queue" v-if="!room">
    <h2>You are about to enter a chat room!</h2>
    <h4>Some quick reminders:</h4>
    <br>
    <br>
    <p><strong>NEVER</strong> share any sensitive information to <strong>ANYONE</strong>.</p>
    <p style="font-size: 1.12em;">This includes your name, address, phone number, and/or any other piece of identifying information.</p>
    <br>
    <p>If you ever feel unsafe, click the <strong>LEAVE</strong> button to immediately leave the conversation.</p>

    <h3 style="margin-top: 2em;">You are logged in as: <span style="color: var(--minglioBlue);">{{ sessionStore().user?.displayName ?? "anonymous user" }}</span></h3>
    <span v-if="sessionStore().user">Your name will not be shown to other users.</span>
    <button class="join" @click="joinQueue" :class="{ leave: inQueue }">
      <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g><path d="M2.23 2.674a.75.75 0 00-.96 1.152L3.578 5.75 1.27 7.674a.75.75 0 00.96 1.152l3-2.5a.75.75 0 000-1.152l-3-2.5zM8.25 5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM5.5 9.25a.75.75 0 01.75-.75h8a.75.75 0 010 1.5h-8a.75.75 0 01-.75-.75zM6.25 12a.75.75 0 000 1.5h8a.75.75 0 000-1.5h-8z"/></g>
      </svg>
      <h4 v-if="!inQueue">Join Queue</h4>
      <h4 v-else>Leave Queue</h4>
    </button>
    <p>Others in queue: {{ queueLength }}</p>
  </div>

  <div class="chat" v-else>
    <div class="countdown">
      <h4>This chat expires in {{ Math.floor(countdown / 60) }}:<span v-if="Math.floor(countdown % 60).toString().length == 1">0</span>{{ Math.floor(countdown % 60) }}</h4>
    </div>

    <div class="history" ref="history">
      <div class="start" v-if="messages.length == 0">
        <h3>This is the start of your conversation.</h3>
        <p>Say hello!</p>
      </div>
      <div v-for="message in messages" class="message" :class="{ sent: message.author == 'You' }">
        <p><span :class="{ author: message.author == 'You' }"><strong>{{ message.author }}:</strong></span> <span>{{ message.message }}</span></p>
        <span class="timestamp">{{ new Date(message.timestamp).toLocaleString() }}</span>
      </div>
      <div class="message typingIndicator">
        <p v-if="otherUserIsTyping"><strong>Other</strong> is typing...</p>
      </div>
    </div>

    <div class="send">
      <div class="inputBox">
        <input type="text" placeholder="Send a message" v-model="message" @keydown.enter="sendMessage" autofocus>
        <p>{{ message.length }}/100</p>
      </div>
  
      <button @click="sendMessage" class="sendButton" :class="{ noSend: message.length == 0 }">
        <img src="/ui/send.svg" alt="Click to send a message">
      </button>
    </div>

    <button @click="leaveRoom" class="leaveButton">
      <img src="/ui/exit.svg" alt="Click to exit conversation">
      <h4>Leave conversation</h4>
    </button>
  </div>
</template>

<script setup lang="ts">

type Message = {
  message: string;
  timestamp: number;
  author: "You" | "Other";
}

const router = useRouter();
const history = ref();

const message = ref("");
const messages = ref<Message[]> ([]);

const room = ref();
const queueLength = ref(0);
const inQueue = ref(false);
const otherUserIsTyping = ref(false);

const countdown = ref(90);

socket.on("matched", (data) => {
  room.value = data.room;
  inQueue.value = false;
  router.push(`/chat?secure=1&connection=${room.value}`);
  decrementCountdown();
  determineTime(data.endTime);
});

socket.on("queue length", (length) => queueLength.value = length);

socket.on("leave", () => {
  router.push("/chat");
  room.value = undefined;
  message.value = "";
  messages.value.length = 0;
  otherUserIsTyping.value = false;
  window.location.reload();
});

socket.on("typing", async () => {
  otherUserIsTyping.value = true;
  scrollToBottom();
  await delay(5000);
  if (otherUserIsTyping.value) otherUserIsTyping.value = false;
});

socket.on("stop typing", () => {
  otherUserIsTyping.value = false;
});

watch(() => room.value, (newRoom) => {
  if (newRoom) {
    socket.on("message", ({ message, timestamp }) => {
      messages.value.push({ message, timestamp, author: "Other" });
      otherUserIsTyping.value = false;
      scrollToBottom();
    });
  }
});

watch(() => message.value, (newMessage) => {
  if (newMessage.length > 100) message.value = newMessage.slice(0, 100);
  if (newMessage.length != 0) socket.emit("typing", room.value);
  if (newMessage.length == 0) socket.emit("stop typing", room.value);
});

async function decrementCountdown () {
  while (true) {
    if (!room.value) return;
    if (countdown.value == 0) return;
    await delay(1000);
    countdown.value--;
  }
}

async function determineTime (epoch: number) {
  while (true) {
    if (!room.value) return;
    await delay(1000);

    if ((new Date()).getTime() >= epoch) leaveRoom();
  }
}

function sendMessage () {
  if (message.value.length == 0) return;
  socket.emit("message", { room: room.value, message: message.value, timestamp: Math.floor((new Date()).getTime()) });
  messages.value.push({ message: message.value, timestamp: Math.floor((new Date()).getTime()), author: "You" })
  message.value = "";
  scrollToBottom();
}

function joinQueue () {
    if (inQueue.value) {
      inQueue.value = false;
      socket.emit("leave queue");
      return;
    }

    inQueue.value = true;
    socket.emit("join queue");
}

function scrollToBottom () {
  nextTick(() => {
    if (history.value) {
      history.value.scrollTop = history.value.scrollHeight;
    }
  });
}

function leaveRoom () {
  socket.emit("leave", room.value);
}

</script>

<style lang="scss" scoped>

.queue {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3em;

  .join {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
    background-color: var(--tertiaryBodyColor);
    border-style: solid;
    border-width: 0.1em;
    border-radius: 0.5em;
    border-color: var(--secondaryTextColor);
    padding: 0.25em;
    width: 20em;
    transition: all 0.25s;

    svg {
      width: 3em;
      height: 3em;

      g {
        fill: var(--textColor);
        transition: all 0.25s;
      }
    }
  }

  .leave {
    background-color: var(--red);
  }
}

.chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60em;
  margin-top: 3em;

  .history {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 30em;
    width: 95%;
    padding: 1em;
    background-color: var(--secondaryBodyColor);
    margin-bottom: 2em;
    border-radius: 1em;
    overflow-y: scroll;
    transition: all 0.25s;
    margin-top: 1em;

    .start {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 3em;
    }

    .message {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-left: 2.5%;
      padding-right: 2.5%;
      padding-top: 0.33em;
      padding-bottom: 0.33em;
      width: 95%;
      border-radius: 0.75em;

      p {
        width: 100%;
        text-wrap: wrap;
        word-wrap: break-word;
      }

      .author {
        color: var(--minglioBlue);
        text-decoration: underline;
      }

      .timestamp {
        color: var(--tertiaryTextColor);
      }
    }

    .typingIndicator {
      align-items: flex-end;

      p {
        width: fit-content;
      }
    }
  }

  .send {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1em;

    .inputBox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      gap: 2%;

      input {
        width: 80%;
        font-size: 1.25em;
        height: 1.5em;
        border-radius: 0.5em;
        border-style: solid;
        border-width: 0.1em;
        padding-left: 0.5em;
        padding-right: 0.5em;
        background-color: var(--secondaryBodyColor);
        transition: background-color 0.25s;
      }

      input:focus-visible {
        outline-color: var(--minglioBlue);
      }

      p {
        text-align: center;
        width: 12.5%;
      }
    }

    .sendButton {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3em;
      border-style: solid;
      border-width: 0.1em;
      width: 4em;
      height: 4em;
      transition: all 0.25s ease-in-out;
      background-color: var(--minglioBlue);

      img {
        width: 3em;
      }
    }

    .noSend {
      background-color: rgb(220, 220, 220);
    }

    }
  .leaveButton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
    background-color: var(--red);
    border-style: solid;
    border-width: 0.1em;
    border-radius: 0.5em;
    border-color: var(--secondaryTextColor);
    padding: 0.25em;
    width: 25em;
    transition: all 0.25s;

    img {
      width: 3em;
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .queue {
    .join:hover {
      color: black;
      background-color: var(--minglioGreen);

      svg {
        g {
          fill: black;
        }
      }
    }

    .leave:hover {
      background-color: #ff2019;
    }
  }

  .chat {
    .history {
      .message:hover {
        background-color: var(--tertiaryBodyColor);
      }
      .typingIndicator:hover {
        background-color: transparent;
      }
    }
  }
}

</style>