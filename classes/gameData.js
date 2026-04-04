export class GameData {
    _REJECTION_CAP = 3 // Once Kiba is rejected from three houses in a row is returned to the shelter
    _GAME_SCREEN = document.getElementById('game') // The screen that needs to be updated with game data
    _numberOfRejections = 0 // Number of rejections that Kiba currently has.
    _mainHuman // The person that adopted you
    _eventsLeftInDay = [] // This holds the events left to do that day
    _numberOfHouseholdsAdded = 0 // The number of households that have been added to the kingdom
    _currentHousehold = [] // The people in the current household
    // Saves game data to local storage. Happens at end of day.
    _saveToLocalStorage() {
        console.log('Save Game data')
    }
    // Loads in game data from local storage if it exists
    _loadFromLocalStorage() {
        console.log('Load from storage')
    }
    // Loads the game intro to the screen
    _loadIntro() {
        console.log('Load Intro')
    }
    // Loads the current event onto the screen
    _loadEvent(event) {
        console.log('load event: ', event)
    }
    // Loads the end of day scene to the user
    _loadEndOfDay() {
        console.log('load end of day')
    }
    // Loads rejected screen to user
    _loadRejected() {
        console.log('Load Rejected screen')
    }
    // Loads the returned screen to the user
    _loadReturned() {
        console.log('load the returned screen')
    }
    // Updates the scoreboard
    _updateScoreboard() {
        console.log('Update scoreboard')
    }
    // Updates the current household
    _updateCurrentHousehold() {
        console.log('Update current household')
    }
    // Determines if Kiba is going to a new household today. Returns true if yes and false if not.
    _goingToNewHousehold() {
        console.log('Going to new household?')
    }
    // Determines if Kiba is returned to the shelter
    _isReturnedToShelter() {
        console.log('Is returned')
    }
    // Determines if Kiba is rejected from household
    _isRejectedFromHousehold() {
        console.log('is rejected?')
    }
    // Gets the events for the day and returns them.
    // Requests new events if array is empty
    _getEventsForTheDay() {
        console.log('Get events')
    }
    // Loads in the existing game if it exists (_loadFromLocalStorage()) and loads in the events for the game (loadEvents())
    gameStartup() {
        console.log('start up the game')
    }
    // Processes what we are going for the day
    playGame() {
        console.log('Process Day')
        // Determines if we are going to a new household and if so loads an event for that (getNewHouseholdEvent(isFirstHousehold) and _loadEvent())
        // Gets the events for the day (_getEventsForTheDay())
        // Goes through the events and loads those events (_loadEvent())
        // Loads the end of day screen (_loadEndOfDay())
        // Determines if Kiba is rejected (_isRejectedFromHousehold()) and if so if he is returned to the shelter (_isReturnedToShelter())
        // Loads rejected and returned screens as needed (_loadRejected(),_loadReturned())
        // Updates the scoreboard (_updateScoreboard())
    }
}