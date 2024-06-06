<template>
    <div class="socialMedia">
        <h2>Our Official Socials</h2>
        <p>Feel free to reach out to us!</p>
        <div class="socials">
            <div class="social" v-for="social in socials">
                <a :href="social.link" target="_blank"><h3 :style="{ color: social.color }">{{ social.name }}</h3></a>
                <a :href="social.link" target="_blank"><p>{{ social.at }}</p></a>
                <img :src="social.img" :alt="`Click to visit our ${social.name} page!`">
                <a :href="social.link" target="_blank" class="visit"
                :class="{ twitter: social.name == 'Twitter/X', instagram: social.name == 'Instagram', discord: social.name == 'Discord', reddit: social.name == 'Reddit' }">
                    <p>{{ social.name == 'Discord' ? 'Join' : 'Visit' }}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Social = {
    name: string;
    img: string;
    at: string;
    link: string;
    color: string;
}

const socials: Social[] = [{
    name: "Twitter/X",
    img: "/icons/twitter.svg",
    at: "@Minglio_Official",
    link: "https://x.com/Minglio_Offical",
    color: "#00ACED"
}, {
    name: "Instagram",
    img: "/icons/instagram.svg",
    at: "@minglio_official",
    link: "https://www.instagram.com/minglio_official/",
    color: "#DD2A7B"
}, {
    name: "Discord",
    img: "/icons/discord.svg",
    at: "Minglio Server",
    link: "https://discord.gg/SKzcjMTxts",
    color: "#6665D2"
}, {
    name: "Reddit",
    img: "/icons/reddit.svg",
    at: "r/minglio",
    link: "https://www.reddit.com/r/minglio/",
    color: "#FF3A00"
}]

</script>

<style lang="scss" scoped>

.socialMedia {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3em;
    margin-top: 3em;

    .social {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--secondaryBodyColor);
        width: 15em;
        padding: 1em;
        border-radius: 1em;
        transition: background-color 0.5s;

        h3 {
            transition: all 0.25s;
        }

        img {
            width: 5em;
            margin-top: 2em;
            padding: 0.5em;
            border-radius: 1em;
            background-color: var(--scrollbarTrack);
            transition: background-color 0.5s;
        }

        .visit {
            margin-top: 2em;
            background-color: transparent;
            border-style: solid;
            border-width: 0.2em;
            padding: 0.5em;
            padding-left: 2em;
            padding-right: 2em;
            border-radius: 1em;
            transition: all 0.25s;
        }

        .twitter {
            border-color: #00ACED;
        }
        .instagram {
            border-color: #DD2A7B;
        }
        .discord {
            border-color: #6665D2;
        }
        .reddit {
            border-color: #FF3A00;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .socials {
        .social {
            h3:hover {
                text-decoration: underline;
            }

            .visit:hover {
                background-color: var(--minglioGreen);
            }

            .twitter:hover {
                color: black;
                background-color: #00ACED;
            }
            .instagram:hover {
                color: white;
                background-color: #DD2A7B;
            }
            .discord:hover {
                color: white;
                background-color: #6665D2;
            }
            .reddit:hover {
                background-color: #FF3A00;
            }
        }
    }
}

</style>