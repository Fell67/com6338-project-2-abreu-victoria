export default {
    type: "Random",
    person: undefined,
    steps: [
        {
            prompt: "<NAME> picks up one of your toys and throws it.",
            options: [
                {
                    text: "Bark at them. HOW DARE THEY DO THAT! Then go get your toy and bring it to your bed where you can protect it.",
                    points: -5,
                    nextStep: "END"
                },
                {
                    text: "Run and pick up your toy and bring it back.",
                    points: 10,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> <REACTION> and continues to play with you for a few hours.",
            options: []
        }
    ]
}