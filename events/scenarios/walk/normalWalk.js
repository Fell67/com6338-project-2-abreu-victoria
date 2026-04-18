export default {
    type: "Walk",
    person: undefined,
    steps: [
        {
            prompt: "It's time to go on a walk! <NAME> calls for you by the door.",
            options: [
                {
                    text: "Yay, it is time for a walk. Run to the door then wait for your leash to be put on.",
                    points: 2,
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
            prompt: "<NAME> <REACTION> while getting you ready for your walk. On your walk you encounter a strange animal. They look like they would be fun to play with…",
            options: [
                {
                    text: "LETS PLAY! I want to make some new friends, run full speed ahead before they run away!",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. They hold you back and tell you no.",
                        options: []
                    }
                },
                {
                    text: "Ignore them. Today is about spending quality time with the human.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "That was a fun walk! Can't wait for the next one.",
            options: []
        }
    ]
}