<template>
    <div class="credits">
        <h2>Meet the Team</h2>
        <p>We're humans too!</p>
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
                <!--<a :href="currentPerson.link" v-if="currentPerson?.link"><h3>{{ currentPerson.name }}</h3></a>-->
                <h3 v-if="currentPerson">{{ currentPerson.name }}</h3>
                <p v-for="role in currentPerson.role">{{ role }}<span v-if="role != currentPerson.role[currentPerson.role.length - 1]">,</span></p>
                <div class="questions">
                    <div class="question" v-for="answer in currentPerson.answers">
                        <h4>{{ questions[currentPerson.answers.findIndex((answer2) => answer2 == answer)] }}?</h4>
                        <p>{{ answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Profile = {
    name: string;
    role: string[];
    answers: string[];
    link: string | null;
}

const questions = ["Favorite boba flavor", "Favorite language", "Are you sane"]

const profiles: Profile[] = [{
    name: "Kenneth Ng",
    role: ["Co-Founder", "Lead Developer", "Lead Designer"],
    answers: ["Mango", "JavaScript", "Yesn't"],
    link: "https://github.com/DubNubz"
}, {
    name: "XuanTing Lin",
    role: ["Co-Founder", "Developer"],
    answers: ["None", "Fuck JavaScript", "Insane"],
    link: "https://github.com/ryan027151"
}, {
    name: "Brandon Yeung",
    role: ["Co-Founder", "Financial Adviser"],
    answers: ["I hate boba", "Russian", "Ok"],
    link: null
}, {
    name: "Leo Yang",
    role: ["Co-Founder", "Outreach Coordinator"],
    answers: ["Taro", "English", "Uhhh"],
    link: null
}];

const currentPerson = ref<Profile> ({
    name: "Kenneth Ng",
    role: ["Co-Founder", "Lead Developer", "Lead Designer"],
    answers: ["Mango", "JavaScript", "Yesn't"],
    link: "https://github.com/DubNubz"
});

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
    margin-top: 2em;
    background-color: var(--secondaryBodyColor);
    padding: 2em;
    border-radius: 1em;
    transition: background-color 0.5s;
    width: 60em;
    height: 25em;

    .names {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 19.25em;
        height: 25em;

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
                color: var(--minglioBlue);
            }
            .dividers {
                .divider {
                    background-color: var(--minglioBlue);
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
        height: 25em;

        h3 {
            text-decoration: underline;
        }

        .questions {
            margin-top: 2.5em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1em;

            .question {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .profiles {
        .names {
            .nameHolder:hover {
                .name {
                    color: var(--minglioBlue);
                }
                .dividers {
                    .divider {
                        background-color: var(--minglioBlue);
                    }
                }
            }
        }
    }
}

</style>