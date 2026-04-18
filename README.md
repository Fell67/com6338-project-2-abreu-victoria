# Project 2 Instructions

## Background

In this solo project, you will create an interactive text-based adventure game using modern JavaScript.
Your game will present players with narrative choices that lead to different outcomes - a "choose-your-own-adventure" experience. 

Listed below are a few examples of this type of game in case you're unfamiliar. Your game DOES NOT have to have feature parity with these examples (you may choose to use buttons instead of textual links, add combat or resource management, etc.). These are only meant to familiarize you with the concept.

- [Thaxted Havershill And the Golden Wombat](https://ukrestrict.ifarchive.org/if-archive/games/competition2016/Thaxted%20Havershill%20And%20the%20Golden%20Wombat/ThaxtedHavershillAndTheGoldenWombat.html)
- [Untitled Ghost Game](https://damonwakes.itch.io/untitled-ghost-game)
- [The Hall of the Sorcerer King](https://celia14.itch.io/sorcerer-king)

Before coding, you should plan the story structure and logic flow using pseudocode or a flowchart, then implement your design as a modular JavaScript application. The emphasis for this project is on program structure, organization, and logic rather than external data or styling.

## Requirements

To receive full credit for this assignment, the finished application **MUST**:

- Be an original interactive text-based game that reacts to player input and includes branching paths leading to multiple possible endings or outcomes.
- Be written entirely in JavaScript, using functions, objects, or arrays to manage game state and choices.
- Demonstrate modular program structure, including:

    - Well-organized functions with single, clear purposes.
    - Descriptive, meaningful variable and function names.
    - Logical data structures (e.g., arrays or objects) for storing story elements, options, or game state.
- Display text and user options dynamically using the DOM (e.g., updating the story and buttons in response to player input).
- Include enough basic styling to make the game readable and usable. The focus is JavaScript logic, but it should not look unfinished.
- Be deployed to GitHub Pages.
- Include a README.md describing:

    - The game concept and structure.
    - Pseudocode or logic overview.

In addition, the application **MUST NOT**:

- Use any external game engines or libraries (e.g., Phaser, jQuery, React, etc.).
- Use external APIs or fetch data from outside sources.
- Contain lorem text or placeholder story content.

## Example Project Themes

Projects that would meet requirements:

1. **Mystery Mansion** - Players explore a haunted house and choose which rooms to enter, uncovering clues that lead to different endings.
1. **Space Explorer** - Players navigate choices in a space mission, balancing risk and reward to survive or achieve different outcomes.
1. **Survival Island** - Players make decisions to find resources and escape an island, with choices affecting their fate.

Projects that would NOT meet requirements:

1. A single linear story without choices or branches.
1. A game that only prints text to the console and doesn't update dynamically in the browser.
1. A project that relies on a third-party library or prebuilt engine to handle logic.

## Submission

Please include **BOTH** the repository link as well as the live site link in your submission.

## Kiba's Kingdom
### Game Concept
In Kiba's Kingdom you play the game as a puppy named Kiba and is being adopted from a shelter. Before you leave your mother told you that you have to grow and expand your kingdom by winning the hearts and minds of the people living in the houses of the homes you are brought to. During the game you are brought to different households and you have to gain the friendship of everyone in the house in order to add the house to your kingdom but if you are kicked out of three houses in a row then you are returned to the shelter. 
### Logic overview
Each day will have the following events take place
1.	Food event
2.	Walk event
3.	Random event
4.	Walk event
5.	Food event

At the end of the day the user get the following prompt: “That was a busy day I guess it’s time to go to sleep” after that they will get the total percent of friendship points with the people in the house. If the points dip below 0 for anyone in the house then Kiba is not invited back. If it is the first house or if you fail at three houses in a row then Kiba is taken back to the shelter.

Based on the difficulty of the person there will be a multiplier added to the point values.
- Easy: 
    - positive events: x1.5
    - negative events: x.5 (each event is worth half as much)
- Medium:
    - positive events: x1 (no extra points)
    - negative events: x1 (no extra points)
- Hard: 
    - positive events: x.5 (each event is worth half as much)
    - negative events: x1.5

NOTE: The first person is always easy.

The following are the users responses based on points gained or lost durning the event:
- Greater or equal to 10: laughs and looks really happy
- Less than 10 but greater than or equal to 5: looks happy 
- Less than 5 but greater than or equal to 0: looks content
- Less than 0 but greater than or equal to -5: seems to get upset
- Less than -5 but greater than or equal to -10: looks annoyed
- Less than -10: gets really angry

### Game Structure
#### Classes
The game consists of three classes:
1. Game Data (gameData.js): This holds all the game data needed to play the game. Will save things off to local storage and retrieve them on load. It is in charge of going through all the events for the day, updating the display, and running through the game.
2. Events (events.js): This is in charge of assigning all the events for the day and figuring out which person from the household will be in the event. It will parse through the steps in the events, and format the text appropriately by replacing and of the reserved words.
3. Person (person.js): This keeps track of the name, friendship level, and what their difficulty level is at for the person. It assigns the name at random using the offlineNames array. There is a future enhancement to get the names from a random name api however this is currently disabled as per the assignment instructions. It will determine the response of the person based on the difficulty/points earned during events and initially meeting Kiba. This class is also responsible for applying the friendship multiplier to the event points and then adding the friendship points to the person.
#### Events
All the events are located in event/scenarios folder and a list of all of them are in /events/index.js
In the scenarios folder the events are organized by type and each JavaScript file is structured in a way the the event class can read in. I chose to use a JavaScript file instead of a JSON file so that comments could be easily added to the event files without making it part of the object structure.

These files use the following reserved words that are replaced by the event class (_formatText) with the correct replacement at runtime:
- NAME: The name of the person in the event
- REACTION: The reaction of the human in response to something that Kiba did
- REACTION_TO_KIBA: The initial reaction to Kiba's presence (Seen on at the new house events)
- MAIN_HUMAN: The name of the person that adopted Kiba
- NUMBER_OF_OTHER_HUMANS: The number of other humans in the household
- HOUSEHOLD_NAMES: The names of all the humans in the household

These reserved words are surrounded by '<>' in order to help tell them apart from other text in the event files.

##### An example of the structure for the new house events:
```
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
```

##### An example of the structure for other events:
```
export default {
    type: "Food",
    person: undefined,
    steps: [
        {
            prompt: "Your stomach growls with hunger.",
            options: [
                {
                    text: "Find <NAME> and start whimpering and jumping until you are fed.",
                    points: -5,
                    nextStep: {
                        prompt: "<NAME> <REACTION>. You decide to wait by your food bowl until they are ready.",
                        options: []
                    }
                },
                {
                    text: "Wait patiently by your food bowl. Maybe <NAME> will notice…",
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
                    prompt: "<NAME> sings happily while giving you your food. You quickly eat your food.",
                },
                else: {
                    prompt: "<NAME> gives you your food. You quickly eat your food.",
                }
            },
            options: []
        }
    ]
}
```

## Important URLs
- Github URL: https://github.com/Fell67/com6338-project-2-abreu-victoria
- Website URL: https://fell67.github.io/com6338-project-2-abreu-victoria/