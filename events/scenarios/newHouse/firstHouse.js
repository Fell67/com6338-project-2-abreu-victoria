export default {
    type: "Main House",
    household: [],
    steps: [
        {
            prompt: 'A human opens the door for you and says "Welcome to you new home! You are such a cute puppy. I am going to call you Kiba. My name is <NAME>.',
            options: [
                {
                    text: "Bark happily and jump up and down.",
                    points: 10,
                    nextStep: {
                        prompt: "<NAME> smiles and laughs. They look very happy and encourage you to explore the house. You go explore the house and see where everything is.",
                        options: []
                    }
                },
                {
                    text: "Run around the house and explore your new home.",
                    points: 0,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "You explored the house and don't see anyone else. You decide to go back to the human and see what they are doing.",
            options: []
        }
    ]
}