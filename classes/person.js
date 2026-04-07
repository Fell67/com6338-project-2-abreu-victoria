export class Person {
    _MAX_FRIENDSHIP = 100 // This is the max friendship that you can achieve
    _DIFFICULTY_LEVELS = [{ level: "easy", reaction: "happy" }, { level: "medium", reaction: "content" }, { level: "hard", reaction: "annoyed" }]
    // Contains the responses based on points gained or loosed 
    _RESPONSES = {
        greaterOrEqualTo10: "laughs and looks really happy",
        lessThan10GreaterOrEqualTo5: "looks happy",
        lessThan5GreaterOrEqualTo0: "looks content",
        lessThan0GreaterOrEqualToNegative5: "seems to get upset",
        lessThanNegative5GreaterOrEqualToNegative10: "looks annoyed",
        lessThanNegative10: "gets really angry"
    }
    // Based on the difficulty level of the person an event multiplier is added to the event points
    _EVENT_MULTIPLIER = {
        easy: {
            positive: 2,
            negative: .5
        },
        medium: {
            positive: 1,
            negative: 1
        },
        hard: {
            positive: .5,
            negative: 2
        }
    }
    // These are the responses as more household's reject Kiba
    // NAME is the name of the mainHuman. Will be replaced with the mainHuman’s name in another function.
    _REJECTION_RESPONSES = {
        1: "<NAME> is starting to feel lonely…",
        2: "<NAME> really wishes that they could hangout with their friends and family more. I should be a good pup and try and make it work.",
        3: "<NAME> looks like they are on their last legs. They decide that they were not ready yet to have a dog and return you to the shelter."
    }
    // How hard it will be to gain the friendship of the human. Will be randomly picked when the person is created.
    _difficulty = ''
    // How good of friends the person is with Kiba
    // Starting point is 10
    _friendship = 10
    // Applies the multiplier of the user to the event point value and returns it
    _applyEventMultiplier(eventPoints) {
        const multiplierValues = this._EVENT_MULTIPLIER[this._difficulty]
        if (eventPoints < 0) {
            return Number(multiplierValues.negative) * Number(eventPoints)
        } else {
            return Number(multiplierValues.positive) * Number(eventPoints)
        }
    }
    // Returns the response based on the point value given
    // (assumes it is getting the point value that will be applied to the person)
    _getResponse(friendshipPoints) {
        friendshipPoints = Number(friendshipPoints)

        if (friendshipPoints >= 10) {
            return this._RESPONSES.greaterOrEqualTo10
        } else if (friendshipPoints < 10 && friendshipPoints >= 5) {
            return this._RESPONSES.lessThan10GreaterOrEqualTo5
        } else if (friendshipPoints < 5 && friendshipPoints >= 0) {
            return this._RESPONSES.lessThan5GreaterOrEqualTo0
        } else if (friendshipPoints < 0 && friendshipPoints >= -5) {
            return this._RESPONSES.lessThan0GreaterOrEqualToNegative5
        } else if (friendshipPoints < -5 && friendshipPoints >= -10) {
            return this._RESPONSES.lessThanNegative5GreaterOrEqualToNegative10
        } else {
            return this._RESPONSES.lessThanNegative10
        }
    }
    // Takes the point value and updates the friendship. Makes sure the new value is between 0 and _MAX_FRIENDSHIP
    // (assumes it is getting the point value that will be applied to the person)
    _updateFriendship(friendshipPoints) {
        friendshipPoints = Number(friendshipPoints)
        this._friendship = Math.min(Math.max(0, this._friendship + friendshipPoints), this._MAX_FRIENDSHIP)
        console.log("VA name: " + this.name + " is now at: " + this._friendship + " friendship was updated by: " + friendshipPoints)
    }
    // Comes up with a random name to assign the human and returns it.
    async _getRandomName() {
        const randomNameURL = 'https://randomuser.me/api/?nat=us'
        try {
            const response = await fetch(randomNameURL)
            if (response.status === 200) {
                const { results: [{ name: { first } }] } = await response.json()
                return first

            } else {
                console.error(`${response.status}: ${response.statusText}`)
                return 'Victoria'
            }
        } catch (error) {
            const errorObj = {
                status: 'Unable to fetch the information',
                statusText: error
            }
            console.error(`${errorObj.status}: ${errorObj.statusText}`)
            return 'Victoria'
        }
    }
    name = ''
    // returns the percent of friendship that Kiba is at with the person
    getFriendshipPercent() {
        return (this._friendship / this._MAX_FRIENDSHIP) * 100
    }
    // Processes the users response to the event
    processEvent(eventPoints) {
        // Takes the points from the event, applies the multiplier to it using _applyEventMultiplier(eventPoints)
        const friendshipPoints = this._applyEventMultiplier(eventPoints)
        // Updates the persons friendship using _updateFriendship(friendshipPoints)
        this._updateFriendship(friendshipPoints)
        // Gets the persons response with _getResponse(friendshipPoints) then returns the response
        return this._getResponse(friendshipPoints)
    }
    // Gets the response for the amount of rejections given and changes <NAME> to the name of the person then returns it.
    getRejectionResponse(numberOfRejections) {
        console.log("VA get rejection response: ", numberOfRejections)
    }
    // Gets init reaction of Kiba (used in the new household event)
    getInitReaction() {
        for ( const difficulty of this._DIFFICULTY_LEVELS) {
            if (difficulty.level === this._difficulty) {
                return difficulty.reaction
            }
        }
    }
    // Creates the person. Sets the name and difficulty.
    // If it’s the main human then the difficulty is easy.
    async create(isMainHuman) {
        this.name = await this._getRandomName()
        if (isMainHuman) {
            this._difficulty = 'easy'
        } else {
            this._difficulty = this._DIFFICULTY_LEVELS[Math.floor(Math.random() * this._DIFFICULTY_LEVELS.length)].level
        }

        return this
    }
}