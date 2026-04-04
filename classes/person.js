export class Person {
    _MAX_FRIENDSHIP = 100 // This is the max friendship that you can achieve
    _DIFFICULTY_LEVELS = ['easy', 'medium', 'hard']
    // Contains the responses based on points gained or loosed 
    _RESPONSES = {
        greaterOrEqualTo10: 'laughs and looks really happy',
        lessThan10GreaterOrEqualTo5: 'looks happy',
        lessThan5GreaterOrEqualTo0: 'looks content',
        lessThan0GreaterOrEqualToNegative5: 'seems to get upset',
        lessThanNegative5GreaterOrEqualToNegative10: 'looks annoyed',
        lessThanNegative10: 'gets really angry'
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
        1: 'NAME is starting to feel lonely…',
        2: 'NAME really wishes that they could hangout with their friends and family more. I should be a good pup and try and make it work.',
        3: 'NAME looks like they are on their last legs. They decide that they were not ready yet to have a dog and return you to the shelter.'
    }
    // How hard it will be to gain the friendship of the human. Will be randomly picked when the person is created.
    _difficulty = ''
    // How good of friends the person is with Kiba
    // Starting point is 10
    _friendship = 10
    // Applies the multiplier of the user to the event point value and returns it
    _applyEventMultiplier(eventPoints) {
        console.log('apply event multiplier: ', eventPoints)
    }
    // Returns the response based on the point value given
    // (assumes it is getting the point value that will be applied to the person)
    _getResponse(friendshipPoints) {
        console.log('Get response: ', friendshipPoints)
    }
    // Takes the point value and updates the friendship.
    // (assumes it is getting the point value that will be applied to the person)
    _updateFriendship(friendshipPoints) {
        console.log('Update friendship: ', friendshipPoints)
    }
    // Comes up with a random name to assign the human and returns it.
    _getRandomName() {
        console.log('Get random name')
        return 'Victoria'
    }
    name = ''
    // If at max friendship return true else return false
    isAtMaxFriendship() {
        console.log('is at max friendship?')
    }
    // returns the percent of friendship that Kiba is at with the person
    getFriendshipPercent() {
        console.log('get friendship %')
    }
    // Sees if friendship is at or below 0.
    // Returns true if rejected and false if not.
    isRejected() {
        console.log('is rejected?')
    }
    // Processes the users response to the event
    processEvent(eventPoints) {
        console.log('Process Event: ', eventPoints)
        // Takes the points from the event, applies the multiplier to it using _appyEventMultiplier(eventPoints)
        // Updates the persons friendship using _updateFriendship(friendshipPoints)
        // Gets the persons response with _getResponse(friendshipPoints) then returns the response
    }
    // Gets the response for the amount of rejections given and changes NAME to the name of the person then returns it.
    getRejectionResponse(numberOfRejections) {
        console.log('get rejection response: ', numberOfRejections)
    }
    // Creates the person. Sets the name and difficulty.
    // If it’s the main human then the difficulty is easy.
    constructor (isMainHuman) {
        this.name = this._getRandomName()
        if (isMainHuman) {
            this._difficulty = 'easy'
        } else {
            this._difficulty = this._DIFFICULTY_LEVELS[Math.floor(Math.random() * this._DIFFICULTY_LEVELS.length)]
        }
    }

}