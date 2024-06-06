<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

watch(() => sessionStore().isDarkMode, (newValue) => {
    document.body.classList.remove(newValue ? "light" : "dark");
    document.body.classList.add(newValue ? "dark" : "light");
    localStorage.setItem("theme", JSON.stringify(newValue ? "dark" : "light"));
});

onMounted(() => {
    const lastUsedTheme = localStorage.getItem("theme");
    if (lastUsedTheme) {
      const value = JSON.parse(lastUsedTheme) as "dark" | "light";
      sessionStore().isDarkMode = value == "dark" ? true : false;
    }
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