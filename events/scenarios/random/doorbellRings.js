export default {
    type: "Random",
    person: undefined,
    steps: [
        {
            prompt: "DING! DONG! Looks like a guest has come to visit the kingdom.",
            options: [
                {
                    text: "Bark and jump excitedly! I love making new friends!",
                    points: -5,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Go get the human and let them know that someone is at the door. Maybe they didn't hear…",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> <REACTION> but they go and answer the door. Looks like someone decided to present the kingdom with a gift! It's wrapped in a brown box.",
            options: [
                {
                    text: "TEAR THE BOX APART! I want to see what is inside the box and the faster the better.",
                    points: -10,
                    nextStep: "CONTINUE"
                },
                {
                    text: "Sniff the box to see what is inside.",
                    points: 5,
                    nextStep: "CONTINUE"
                }
            ]
        },
        {
            prompt: "<NAME> <REACTION>. They get something sharp and open the box. Seems like someone decided to present you with a new toy. Looks like fun!",
            options: []
        }
    ]
}