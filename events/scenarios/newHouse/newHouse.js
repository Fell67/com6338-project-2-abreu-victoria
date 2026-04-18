export default {
    type: "New House",
    household: [],
    steps: [
        {
            prompt: "<MAIN_HUMAN> has brought you to a new house to play. There is a human there that looks <REACTION_TO_KIBA> to see you. <MAIN_HUMAN> tells you the new human is named <NAME>.",
            options: [
                {
                    text: "Bark happily and jump up and down.",
                    points: 10,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. You go explore the house and see where everything is.",
                        options: []
                    }
                },
                {
                    text: "Run around the house and explore.",
                    points: 0,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: {
                if: {
                    key: "household",
                    greaterThan: 1,
                    prompt: "You explore the house and notice <NUMBER_OF_OTHER_HUMANS> other human(s) called <HOUSEHOLD_NAMES>. You decide to go back to the first human and see what they are doing.",
                },
                else: {
                    prompt: "You explored the house and don't see anyone else. You decide to go back to the human and see what they are doing."
                }
            },
            options: []
        }
    ]
}