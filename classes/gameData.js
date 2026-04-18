import { Events } from "./events.js"
import { Person } from "./person.js"

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
        let gameData = localStorage.getItem(this._LOCAL_STORAGE_KEY)
        if (gameData) {
            gameData = JSON.parse(gameData)
            this._numberOfRejections = Number(gameData.numberOfRejections)
            this._mainHuman = new Person().createFromLocalStorage(gameData.mainHuman)
            this._eventsLeftInDay = gameData.eventsLeftInDay
            this._numberOfHouseholdsAdded = Number(gameData.numberOfHouseholdsAdded)
            
            this._currentHousehold = []
            for (const person of gameData.currentHousehold) {
                this._currentHousehold.push(new Person().createFromLocalStorage(person))
            }
        }
    }
    // Toggle an element's visibility
    _toggleElement(elementId) {
        const element = document.getElementById(elementId)
        element.classList.toggle("section-hidden")
    }
    // Process user input
    _processUserInput(userInput) {
        let response
        const currentEvent = this._eventsLeftInDay[0]
        // Add the event points to the person if there is any
        if (userInput?.points) {
            // If this is the main house or new house event the points go to the first person in the array
            // Else it goes to the person
            if (currentEvent.type === 'Main House' || currentEvent.type === 'New House') {
                response = this._currentHousehold[0].processEvent(userInput.points)
            } else {
                const person = this._currentHousehold.find((member) => member.name === currentEvent.person.name)
                response = person.processEvent(userInput.points)
            }
        }

        return response
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
        nextBtnElement.addEventListener('click', function (e) {
            e.stopPropagation()
            // Clear screen and play game
            this._GAME_SCREEN.replaceChildren()
            this._startDay()
        }.bind(this))

        const nextBtnContainerElement = document.createElement('section')
        nextBtnContainerElement.classList.add('section-text_right')
        nextBtnContainerElement.appendChild(nextBtnElement)

        // Add elements
        this._GAME_SCREEN.appendChild(introElement)
        this._GAME_SCREEN.appendChild(nextBtnContainerElement)
    }
    // Loads the current step onto the screen (helper function of _loadEvents)
    _loadStep(step) {
        // if step is undefined go to the next event
        if (!step) {
            this._eventsLeftInDay.shift()
            this._loadEvents(this._eventsLeftInDay[0])
            return
        }

        // Create element for intro flavor text
        const promptElement = document.createElement('p')
        promptElement.textContent = step.prompt

        // Add elements
        this._GAME_SCREEN.appendChild(promptElement)

        // Create wrapper element for the options
        const optionsContainerElement = document.createElement('section')
        optionsContainerElement.classList.add('section-step_options')

        // Create elements for each option
        if (step.options.length > 0) {
            for (const option of step.options) {
                let optionsBtnElement = document.createElement('button')
                optionsBtnElement.textContent = option.text
                optionsBtnElement.classList.add('button-step_options')
                optionsBtnElement.addEventListener('click', function (e) {
                    e.stopPropagation()

                    // Clear screen and go to the next step
                    this._GAME_SCREEN.replaceChildren()
                    const response = this._processUserInput(option)
                    this._loadStep(this._events.getNextStep(option, response))
                }.bind(this))
                optionsContainerElement.appendChild(optionsBtnElement)
            }
        } else {
            const nextBtnElement = document.createElement('button')
            nextBtnElement.textContent = 'Next'
            nextBtnElement.classList.add('button-step_options')
            nextBtnElement.addEventListener('click', function (e) {
                e.stopPropagation()
                // Clear screen and play game
                this._GAME_SCREEN.replaceChildren()
                this._loadStep(this._events.getNextStep('END'))
            }.bind(this))

            optionsContainerElement.appendChild(nextBtnElement)
        }

        // Add the options
        this._GAME_SCREEN.appendChild(optionsContainerElement)
    }
    // Loads the current event onto the screen
    _loadEvents(event) {
        // If there are not events to load return
        if (!event) {
            this._loadEndOfDay()

            return
        }
        // Add the main household member to the event so the prompts can be formatted
        event.mainHuman = this._mainHuman

        // Load the first step in the event
        this._loadStep(this._events.startEvent(event))
    }
    // Loads the end of day scene to the user
    _loadEndOfDay() {
        const endOfDayFlavorText = "That was a busy day I guess it's time to go to sleep"
        // Create element for the flavor text and scores
        const endOfDayFlavorTextElement = document.createElement('p')
        endOfDayFlavorTextElement.textContent = endOfDayFlavorText

        this._GAME_SCREEN.appendChild(endOfDayFlavorTextElement)

        const headerElement = document.createElement('h2')
        headerElement.textContent = "Current Friendship Levels:"
        this._GAME_SCREEN.appendChild(headerElement)

        // List the new friendship levels for everyone in the household
        for (const person of this._currentHousehold) {

            const personElement = document.createElement('p')
            personElement.textContent = `${person.name}: ${person.getFriendshipPercent()}%`
            this._GAME_SCREEN.appendChild(personElement)
        }

        // Create elements for next button
        const nextBtnElement = document.createElement('button')
        nextBtnElement.textContent = 'Next'
        nextBtnElement.addEventListener('click', function (e) {
            e.stopPropagation()
            
            // Clear screen
            this._GAME_SCREEN.replaceChildren()
            
            // Determine next screen to show
            this._endDay()
        }.bind(this))

        const nextBtnContainerElement = document.createElement('section')
        nextBtnContainerElement.classList.add('section-text_right')
        nextBtnContainerElement.appendChild(nextBtnElement)

        this._GAME_SCREEN.appendChild(nextBtnContainerElement)
    }
    // Loads new household conquered screen to user
    _loadHouseholdAdded() {
        const householdAddedFlavorText = "🎉A new household has been added to the kingdom!🎉"
        
        // Create element for the flavor text and scores
        const householdAddedFlavorTextElement = document.createElement('h2')
        householdAddedFlavorTextElement.textContent = householdAddedFlavorText

        this._GAME_SCREEN.appendChild(householdAddedFlavorTextElement)

        const householdAddedCountElement = document.createElement('p')
        householdAddedCountElement.textContent = `The total number of households in the kingdom is now: ${this._numberOfHouseholdsAdded}`
        this._GAME_SCREEN.appendChild(householdAddedCountElement)

        // Create elements for next button
        const nextBtnElement = document.createElement('button')
        nextBtnElement.textContent = 'Next'
        nextBtnElement.addEventListener('click', function (e) {
            e.stopPropagation()
            
            // Clear screen
            this._GAME_SCREEN.replaceChildren()
            
            // Determine next screen to show
            this._endDay()
        }.bind(this))

        const nextBtnContainerElement = document.createElement('section')
        nextBtnContainerElement.classList.add('section-text_right')
        nextBtnContainerElement.appendChild(nextBtnElement)

        this._GAME_SCREEN.appendChild(nextBtnContainerElement)
    }
    // Loads rejected screen to user
    _loadRejected() {
        const fromOtherHouseFlavorText = `You have been rejected from the household. ${this._mainHuman.name} ${this._mainHuman.getRejectionResponse(this._numberOfRejections)}`
        const fromMainHouseFlavorText = `${this._mainHuman.name} doesn't want you anymore and they have decided to return you to the shelter`

        const householdRejectedFlavorText = (this._numberOfHouseholdsAdded <= 0 ? fromMainHouseFlavorText : fromOtherHouseFlavorText)
        
        // Create element for the flavor text and scores
        const householdRejectedFlavorTextElement = document.createElement('h2')
        householdRejectedFlavorTextElement.textContent = householdRejectedFlavorText

        this._GAME_SCREEN.appendChild(householdRejectedFlavorTextElement)

        const householdRejectedCountElement = document.createElement('p')
        const gameContinuesFlavorText = `The number of households that have refused to join the kingdom in a row is now: ${this._numberOfRejections}. Better be more careful next time...`
        const gameOverFlavorText = `GAME OVER`
        householdRejectedCountElement.textContent = (this._isReturnedToShelter() ? gameOverFlavorText : gameContinuesFlavorText)
        householdRejectedCountElement.classList.add('section-text_center')
        this._GAME_SCREEN.appendChild(householdRejectedCountElement)

        // Create elements for next button
        const nextBtnElement = document.createElement('button')
        nextBtnElement.textContent = 'Next'
        nextBtnElement.addEventListener('click', function (e) {
            e.stopPropagation()
            
            // Clear screen
            this._GAME_SCREEN.replaceChildren()
            
            // Determines if Kiba is returned to the shelter then restart the game else load the next day
            if (this._isReturnedToShelter()) {
                this._mainHuman = undefined
                this._currentHousehold = []
                this._numberOfHouseholdsAdded = 0
                this._numberOfRejections = 0
                // remove current status to local storage, then starts a new day
                localStorage.removeItem(this._LOCAL_STORAGE_KEY)
                this._loadIntro()
            } else {
                this._endDay()
            }
        }.bind(this))

        const nextBtnContainerElement = document.createElement('section')
        nextBtnContainerElement.classList.add('section-text_right')
        nextBtnContainerElement.appendChild(nextBtnElement)

        this._GAME_SCREEN.appendChild(nextBtnContainerElement)
    }
    // Determines if Kiba is going to a new household today. Returns true if yes and false if not.
    _goingToNewHousehold() {
        for (const person of this._currentHousehold) {
            if (person.getFriendshipPercent() !== 100) {
                return false
            }
        }
        return true
    }
    // Determines if Kiba is returned to the shelter
    _isReturnedToShelter() {
        if (this._REJECTION_CAP <= this._numberOfRejections || this._numberOfHouseholdsAdded <= 0) {
            return true
        }

        return false
    }
    // Determines if Kiba is rejected from household
    _isRejectedFromHousehold() {
        for (const person of this._currentHousehold) {
            if (person.getFriendshipPercent() === 0) {
                return true
            }
        }
        return false
    }
    // Creates a new household
    async _createNewHousehold(isFirstHousehold) {
        const MAX_PEOPLE = 4
        if (isFirstHousehold) {
            this._mainHuman = await new Person().create(isFirstHousehold)
            this._currentHousehold.push(this._mainHuman)
        } else {
            const numberOfPeopleInHousehold = Math.floor(Math.random() * MAX_PEOPLE) + 1
            for (let i = 0; i < numberOfPeopleInHousehold; i++) {
                const newPerson = await new Person().create(isFirstHousehold)
                this._currentHousehold.push(newPerson)
            }
        }
    }
    // Processes what we are going for the day
    async _startDay() {
        this._eventsLeftInDay = []

        // Determine if we are going to a new household and if get an event for that and add it to the events to do today
        if (this._currentHousehold.length === 0) {
            const isFirstHousehold = (!this._mainHuman) ? true : false
            await this._createNewHousehold(isFirstHousehold)
            const newHouseEvent = this._events.getNewHouseholdEvent(isFirstHousehold, this._currentHousehold)
            this._eventsLeftInDay.push(newHouseEvent)
        }
        // Gets the rest of the events for the day
        this._eventsLeftInDay = [...this._eventsLeftInDay, ...this._events.getEventsForTheDay(this._currentHousehold)]

        this._loadEvents(this._eventsLeftInDay[0])
    }
    // End the day and start the next one
    _endDay() {
        let showingOtherScreen = false
        if (this._currentHousehold.length > 0) {
            // Determine if Kiba won over a new household
            if (this._goingToNewHousehold()) {
                this._currentHousehold = []
                this._numberOfHouseholdsAdded++
                this._numberOfRejections = 0
                showingOtherScreen = true
                this._loadHouseholdAdded()
            }
            
            // Determines if Kiba is rejected then loads the rejected screen as needed
            if (this._isRejectedFromHousehold()) {
                this._currentHousehold = []
                this._numberOfRejections++
                showingOtherScreen = true
                this._loadRejected()
            }
        }

        // Save current status to local storage, then starts a new day
        this._saveToLocalStorage()
        
        // We only want to start the next day if no other screens were shown
        if (!showingOtherScreen) {
            this._startDay()
        }
    }
    // Loads in the existing game if it exists (_loadFromLocalStorage()) and loads in the events for the game (loadEvents())
    gameStartup() {
        this._loadFromLocalStorage()
        this._events.loadEvents()
        // If there is no main human then load the intro screen
        if(!this._mainHuman) {
            this._loadIntro()
        } else {
            this._startDay()
        }
    }
}