<template>
    <div class="credits">
        <h2>Meet the team</h2>
        <div class="profiles">
            <div class="names">
                <div @click="currentPerson = profile" class="nameHolder" v-for="profile in profiles" :class="{ activeName: currentPerson?.name == profile.name }">
                    <div class="name">
                        <h4>{{ profile.name }}</h4>
                    </div>
                    <div class="dividers">
                        <div class="divider"></div>
                    </div>
                </div>
            </div>
            <div class="content">
                <h3>{{ currentPerson?.name }}</h3>
                <p v-for="role in currentPerson?.role">{{ role }}<span v-if="role != currentPerson?.role[currentPerson?.role.length - 1]">,</span></p>
                <p style="margin-top: 2em;">blah blah blah</p>
                <p>description or image</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Profile = {
    name: string;
    role: string[];
    img: string;
}

const profiles: Profile[] = [{
    name: "Kenneth Ng",
    role: ["Co-Founder", "Lead Developer"],
    img: ""
}, {
    name: "XuanTing Lin",
    role: ["Co-Founder", "Developer"],
    img: ""
}, {
    name: "Brandon Yeung",
    role: ["Co-Founder", "smth"],
    img: ""
}, {
    name: "Leo Yang",
    role: ["Co-Founder", "smth"],
    img: ""
}];

const currentPerson = ref<Profile> ();

watch(() => currentPerson.value, () => console.log(currentPerson.value))

</script>

<style lang="scss" scoped>

.credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.profiles {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
    background-color: var(--secondaryBodyColor);
    padding: 2em;
    border-radius: 1em;
    transition: background-color 0.5s;
    width: 60em;
    height: 20em;

    .names {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 19.25em;
        height: 20em;

        .nameHolder {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 25%;

            .name {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 95%;
                text-align: center;
                transition: all 0.25s;

                h4 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }
            }

            .dividers {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 5%;
                height: 100%;
            }

            .divider {
                background-color: var(--tertiaryBodyColor);
                width: 100%;
                height: 100%;
                transition: all 0.25s;
            }
        }

        .nameHolder:nth-child(1) {
            .dividers {
                .divider {
                    border-top-left-radius: 3em;
                    border-top-right-radius: 3em;
                }
            }
        }
        .nameHolder:nth-last-child(1) {
            .dividers {
                .divider {
                    border-bottom-left-radius: 3em;
                    border-bottom-right-radius: 3em;
                }
            }
        }

        .activeName {
            .name {
                color: var(--minglioGreen);
            }
            .dividers {
                .divider {
                    background-color: var(--minglioGreen);
                }
            }
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 40em;
        height: 20em;

        h3 {
            text-decoration: underline;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .profiles {
        .names {
            .nameHolder:hover {
                .name {
                    color: var(--minglioGreen);
                }
                .dividers {
                    .divider {
                        background-color: var(--minglioGreen);
                    }
                }
            }
        }
    }
}

</style>