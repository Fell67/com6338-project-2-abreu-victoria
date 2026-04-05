import { Events } from "./events.js"

export class GameData {
    _REJECTION_CAP = 3 // Once Kiba is rejected from three houses in a row is returned to the shelter
    _GAME_SCREEN = document.getElementById("game") // The screen that needs to be updated with game data
    _LOCAL_STORAGE_KEY = 'gameData' // The key for pulling and saving from local storage
    _numberOfRejections = 0 // Number of rejections that Kiba currently has.
    _mainHuman // The person that adopted you
    _events = new Events // Events that we have to pick from and the needed functions
    _eventsLeftInDay = [] // This holds the events left to do that day
    _numberOfHouseholdsAdded = 0 // The number of households that have been added to the kingdom
    _currentHousehold = [] // The people in the current household
    // Saves game data to local storage. Happens at end of day.
    _saveToLocalStorage() {
        console.log("Save Game data")
        let gameData = {
            numberOfRejections: this._numberOfRejections,
            mainHuman: this._mainHuman,
            eventsLeftInDay: this._eventsLeftInDay,
            numberOfHouseholdsAdded: this._numberOfHouseholdsAdded,
            currentHousehold: this._currentHousehold
        }

        localStorage.setItem(this._LOCAL_STORAGE_KEY, JSON.stringify(gameData))
    }
    // Loads in game data from local storage if it exists
    _loadFromLocalStorage() {
        console.log("Load from storage")
        let gameData = localStorage.getItem(this._LOCAL_STORAGE_KEY)
        if (gameData) {
            gameData = JSON.parse(gameData)
            console.debug("found game data: ", gameData)
            this._numberOfRejections = Number(gameData.numberOfRejections)
            this._mainHuman = gameData.mainHuman
            this._eventsLeftInDay = gameData.eventsLeftInDay
            this._numberOfHouseholdsAdded = Number(gameData.numberOfHouseholdsAdded)
            this._currentHousehold = gameData.currentHousehold
        }
    }
    // Loads the game intro to the screen
    _loadIntro() {        
        const introFlavorText = "You are a puppy that has just been adopted and are being brought home. You are excited for your new adventure but also nervous about leaving your mother for the first time. Before you left your mother told you that in order to grow and expand your kingdom you must win the hearts and minds of the people living in the houses of the homes you are brought to. If you don't you will be exiled and left at a shelter to live off the kindness of others."

        // Create element for intro flavor text
        const introElement = document.createElement('p')
        introElement.textContent = introFlavorText

        // Create elements for next button
        const nextBtnElement = document.createElement('button')
        nextBtnElement.textContent = 'Next'
        nextBtnElement.addEventListener('click', function () {
            // Clear screen and play game
            this._GAME_SCREEN.replaceChildren()
            this._playGame()
        }.bind(this))

        const nextBtnContainerElement = document.createElement('section')
        nextBtnContainerElement.classList = 'section-text_right'
        nextBtnContainerElement.appendChild(nextBtnElement)

        // Add elements
        this._GAME_SCREEN.appendChild(introElement)
        this._GAME_SCREEN.appendChild(nextBtnContainerElement)
    }
    // Loads the current event onto the screen
    _loadEvent(event) {
        console.log("load event: ", event)

        let step = this._events.startEvent(event)
        do {
            console.log('start step: ', step)

            step = this._events.processUserInput()
        } while(step)
    }
    // Loads the end of day scene to the user
    _loadEndOfDay() {
        console.log("load end of day")
    }
    // Loads rejected screen to user
    _loadRejected() {
        console.log("Load Rejected screen")
    }
    // Loads the returned screen to the user
    _loadReturned() {
        console.log("load the returned screen")
    }
    // Updates the scoreboard
    _updateScoreboard() {
        console.log("Update scoreboard")
    }
    // Updates the current household
    _updateCurrentHousehold() {
        console.log("Update current household")
    }
    // Determines if Kiba is going to a new household today. Returns true if yes and false if not.
    _goingToNewHousehold() {
        console.log("Going to new household?")
    }
    // Determines if Kiba is returned to the shelter
    _isReturnedToShelter() {
        console.log("Is returned")
    }
    // Determines if Kiba is rejected from household
    _isRejectedFromHousehold() {
        console.log("is rejected?")
    }
    // Gets the events for the day and returns them.
    // Requests new events if array is empty
    _getEventsForTheDay() {
        console.log("Get events")
    }
    // Processes what we are going for the day
    async _playGame() {
        let nextEvent
        console.log("Process Day")
        // Determine if we are going to a new household and if so loads an event for that (getNewHouseholdEvent(isFirstHousehold) and _loadEvent())
        if (this._currentHousehold.length === 0) {
            const isFirstHousehold = (!this._mainHuman) ? true : false
            nextEvent = await this._events.getNewHouseholdEvent(isFirstHousehold)
            this._loadEvent(nextEvent)
        }
        // Gets the events for the day (_getEventsForTheDay())
        // Goes through the events and loads those events (_loadEvent())
        // Loads the end of day screen (_loadEndOfDay())
        // Determines if Kiba is rejected (_isRejectedFromHousehold()) and if so if he is returned to the shelter (_isReturnedToShelter())
        // Loads rejected and returned screens as needed (_loadRejected(),_loadReturned())
        // Updates the scoreboard (_updateScoreboard())
    }
    // Loads in the existing game if it exists (_loadFromLocalStorage()) and loads in the events for the game (loadEvents())
    gameStartup() {
        this._loadFromLocalStorage()
        this._events.loadEvents()
        // If there is no main human then load the intro screen
        this._loadIntro()
    }
}