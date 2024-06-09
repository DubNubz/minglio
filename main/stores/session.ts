
import type { User } from "firebase/auth";

export const sessionStore = defineStore("session", () => {
    const isDarkMode = ref(true);
    const user = ref<User> ();

    return { isDarkMode, user }
});
