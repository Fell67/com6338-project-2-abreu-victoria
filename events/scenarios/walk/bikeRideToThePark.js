export default {
    type: "Walk",
    person: undefined,
    if: {
        key: "friendship",
        greaterThan: 60,
    },
    steps: [
        {
            prompt: "It's time to go on a walk! <NAME> calls for you by the door.",
            options: [
                {
                    text: "Yay, it is time for a walk. Run to the door then wait for your leash to be put on.",
                    points: 5,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Yay! Run to the door, circle around the human, jump a few times then wait for your leash to be put on.",
                    points: 10,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> <REACTION> while getting you ready for your walk. They walk you to a two wheel contraption that has a basket and lifts you up.",
            options: [
                {
                    text: "STRUGGLE! I must be free! I don't want to go near the two wheel contraption!",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. However after much difficulty they get you into the basket.",
                        options: []
                    }
                },
                {
                    text: "Let them lift you up into the basket.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "You are in the basket as <NAME> starts to pedal and you feel the wind on your face. This is wonderful! <NAME> takes you to a fenced in area where there are other dogs roaming free. You are taken out of the basket and lead into the fenced in area.",
            options: [
                {
                    text: "Explore the area. I wonder what is around here…",
                    points: 0,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Play with the other dogs! It's time to make new friends.",
                    points: 0,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> calls your name. Looks like it's time to go…",
            options: [
                {
                    text: "RUN AWAY! I want to stay here FOREVER! I don't want to go home.",
                    points: -10,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. After much running around and the help of the other humans at the park they eventually get you back on your leash.",
                        options: []
                    }
                },
                {
                    text: "Walk back to your human.",
                    points: 10,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "They walk you back to the two wheel contraption that has a basket and lifts you up.",
            options: [
                {
                    text: "STRUGGLE! I must be free! I don't want to go near the two wheel contraption!",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. However after much difficulty they get you into the basket.",
                        options: []
                    }
                },
                {
                    text: "Let them lift you up into the basket.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "You are in the basket as <NAME> starts to pedal and you feel the wind on your face. This is wonderful! <NAME> takes back home.",
            options: []
        }
    ]
}