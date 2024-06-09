<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app';
import { getAuth, type User } from 'firebase/auth';
import { firebaseConfig } from './utils/firebase';


watch(() => sessionStore().isDarkMode, (newValue) => {
    document.body.classList.remove(newValue ? "light" : "dark");
    document.body.classList.add(newValue ? "dark" : "light");
    localStorage.setItem("theme", JSON.stringify(newValue ? "dark" : "light"));
});

onMounted(() => {
    const localLogin = localStorage.getItem("login-info");
    if (localLogin) sessionStore().user = JSON.parse(localLogin) as User;
  
    const lastUsedTheme = localStorage.getItem("theme");
    if (lastUsedTheme) {
      const value = JSON.parse(lastUsedTheme) as "dark" | "light";
      sessionStore().isDarkMode = value == "dark" ? true : false;
    }

    document.body.style.display = "flex";

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
});

</script>

<style lang="scss" scoped>

.app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>