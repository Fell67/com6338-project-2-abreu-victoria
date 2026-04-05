export default {
    type: "Random",
    person: undefined,
    steps: [
        {
            prompt: "NAME walks into the kitchen and starts cooking food.",
            options: [
                {
                    text: "Walk into the kitchen. Maybe there will be some snacks to munch on.",
                    points: 0,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Curl up on the couch and wait for them to be done.",
                    points: 5,
                    nextStep: {
                        prompt: "NAME finishes and sees you waiting for them. They thank you for waiting and decide to give you a treat.",
                        options: [],
                        nextStep: "END"
                    }
                }
            ]
        },
        {
            prompt: "Food drops to the ground while NAME is cooking.",
            options: [
                {
                    text: "Looks like they have not noticed yet. Time to get a quick snack.",
                    points: -5,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Ignore the food and patiently wait for the human to be done.",
                    points: 5,
                    nextStep: {
                        prompt: "NAME finishes and sees you waiting for them. They thank you for waiting and decide to give you a treat.",
                        options: [],
                        nextStep: "END"
                    }
                },
                {
                    prompt: "NAME sees you and REACTION. They tell you No! You drop the food and curl up on the couch. Hopefully they will forgive you soon.",
                    options: [],
                    nextStep: "END"
                }
            ]
        }
    ]
}