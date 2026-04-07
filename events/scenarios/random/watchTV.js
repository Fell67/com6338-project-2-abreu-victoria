export default {
    type: "Random",
    person: undefined,
    steps: [
        {
            prompt: "<NAME> goes to the couch and turns on a box that shows images and makes sounds.",
            options: [
                {
                    text: "It's too loud! Get up and leave the room.",
                    points: 0,
                    nextStep: "END"
                },
                {
                    text: "Cuddle with the human. Relaxing sounds nice.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> <REACTION> and they start petting you. You both cuddle until the box turns off.",
            options: []
        }
    ]
}