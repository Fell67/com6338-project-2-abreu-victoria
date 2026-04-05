export default {
    type: "Food",
    person: undefined,
    steps: [
        {
            prompt: "Your stomach growls with hunger.",
            options: [
                {
                    text: "Find NAME and start whimpering and jumping until you are fed.",
                    points: -5,
                    nextStep: {
                        prompt: "NAME REACTION. You decide to wait by your food bowl until they are ready.",
                        options: []
                    }
                },
                {
                    text: "Wait patiently by your food bowl. Maybe NAME will notice…",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: {
                if: {
                    key: "friendship",
                    greaterThan: 90,
                    prompt: "NAME sings happily while giving you your food. You quickly eat your food.",
                },
                else: {
                    prompt: "NAME gives you your food. You quickly eat your food.",
                }
            },
            options: []
        }
    ]
}