// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/main.scss"],
  modules: [
    "@pinia/nuxt"
  ],
  app: {
    head: {
      bodyAttrs: {
        class: "dark"
      },
      title: "Minglio - Where introverts are heard",
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { hid: 'description', name: 'description', content: 'Minglio is a free, completely anonymous text-chatting platform to talk with anyone. Find your soulmate, make a new friend, or just chat with strangers for the fun of it!' },
        { name: 'keywords', content: 'anonymous, omegle, chat, stranger, anonymous, free, random' }
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/minglioSmall.svg" }],
    }
  }
})
