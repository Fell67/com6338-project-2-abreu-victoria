export default {
    type: "Walk",
    person: undefined,
    if: {
        key: "friendship",
        greaterThan: 70,
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
            prompt: "<NAME> <REACTION> while getting you ready for your walk. They walk you to a four wheel contraption that smells bad. They open the door then lift you up.",
            options: [
                {
                    text: "STRUGGLE! If it smells this bad on the outside it must smell like a skunk on the inside. Why do humans like these smelly contraptions?",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. However after much difficulty they get you inside.",
                        options: []
                    }
                },
                {
                    text: "Let them lift you up and place you inside.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "It doesn't smell that bad on the inside. <NAME> starts driving and rolls down the window so you can poke your head outside.",
            options: [
                {
                    text: "FREEDOM! Silly human now I can escape. See ya!",
                    points: -10,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. Sadly are escape failed… <NAME> rolls up the window and you lay down for the rest of the trip.",
                        options: []
                    }
                },
                {
                    text: "Enjoy the ride and smell the fresh air.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> drive you to a nature trail and takes you out for a hike.",
            options: []
        },
        {
            prompt: "On your hike you encounter an interesting smell. I wonder where it leads to…",
            options: [
                {
                    text: "Let's search for it! Try and pull the human off trail with you so you can see where it leads to...",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. They hold you back and tell you no.",
                        options: []
                    }
                },
                {
                    text: "Ignore it. Let's see what else is on this trail.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "You both finish your hike and head back home.",
            options: []
        }
    ]
}