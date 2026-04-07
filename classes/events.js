// New House Events
import firstHouseEvent from '../events/scenarios/newHouse/firstHouse.js'
import newHouseEvent from '../events/scenarios/newHouse/newHouse.js'

import { dailyEvents } from '../events/index.js'
import { copyObject } from '../commonFunctions.js'

export class Events {
  _DAILY_EVENTS = ["foodEvent", "walkEvent", "randomEvent", "walkEvent", "foodEvent"] // This array keeps track of what events happens when
  _foodEvents = [] // Holds the events that relate to getting food
  _walkEvents = [] // Holds the walking events that could happen during the day
  _randomEvents = [] // Holds the random events that could happen during the day
  _currentEvent

  // Figures out with prompt to use and returns it
  _getPrompt(prompt, person, household) {
    if (prompt.if) {
      if (prompt.if.key === "friendship") {
        console.log('VA Number(person.getFriendshipPercent()): ', Number(person.getFriendshipPercent()))
        if (Number(person.getFriendshipPercent()) > Number(prompt.if.greaterThan)) {
          return prompt.if.prompt
        } else {
          return prompt.else.prompt
        }
      } else if (prompt.if.key === "household") {
        if (household.length > Number(prompt.if.greaterThan)) {
          return prompt.if.prompt
        } else {
          return prompt.else.prompt
        }
      } else {
        console.error("ERROR: Unknown event key in event conditional: ", prompt.if.key)
      }
    }

    return prompt
  }
  // Format the text for the given step so it is ready to be displayed
  _formatText(text, reaction) {
    const reservedWords = ["<NAME>", "<REACTION>", "<REACTION_TO_KIBA>", "<MAIN_HUMAN>", "<NUMBER_OF_OTHER_HUMANS>", "<HOUSEHOLD_NAMES>"]

    for (const reservedWord of reservedWords) {
      switch (reservedWord) {
        case '<NAME>':
          // If this is the main house or new house event the <NAME> field is replaced with the name of the first person in the array
          // Else its replaced with person
          if (this._currentEvent.type === 'Main House' || this._currentEvent.type === 'New House') {
            text = text.replaceAll(reservedWord, this._currentEvent.household[0].name)
          } else {
            text = text.replaceAll(reservedWord, this._currentEvent.person.name)
          }
          break
        case '<REACTION>':
          text = text.replaceAll(reservedWord, reaction)
          break
        case "<REACTION_TO_KIBA>":
          if (this._currentEvent.household) {
            text = text.replaceAll(reservedWord, this._currentEvent.household[0].getInitReaction())
          }
          break
        case '<MAIN_HUMAN>':
          text = text.replaceAll(reservedWord, this._currentEvent.mainHuman.name)
          break
        case '<NUMBER_OF_OTHER_HUMANS>':
          if (this._currentEvent.household) {
            text = text.replaceAll(reservedWord, this._currentEvent.household.length - 1)
          }
          break
        case '<HOUSEHOLD_NAMES>':
          if (this._currentEvent.household) {
            text = text.replaceAll(reservedWord, this._currentEvent.household.slice(1).map((person, index) => {
              const isSecondToLastOne = (index === this._currentEvent.household.slice(1).length - 2)
              const isLastOne = (index === this._currentEvent.household.slice(1).length - 1)
              if (isLastOne) {
                return `${person.name}`
              } else if (isSecondToLastOne) {
                return `${person.name}, and`
              } else {
                return `${person.name},`
              }
            }).join(' '))
          }
          break
      }

    }
    return text
  }
  // Determines if the person can do the event
  _canDoEvent(person, event) {
    if (event.if) {
      if (event.if.key === "friendship") {
        if (Number(person.getFriendshipPercent()) < Number(event.if.greaterThan)) {
          return false
        }
      } else {
        console.error('ERROR: Unknown event key in event conditional: ', event.if.key)
      }
    }

    return true
  }
  // picks a random person from the household to do the event
  _pickRandomPerson(household) {
    return household[Math.floor(Math.random() * household.length)]
  }
  // gets the random event that a person can do
  // Returns an updated copy of the event that has the person assigned to it
  _pickRandomEvent(person, eventOptions) {
    const randomEvent = copyObject(eventOptions[Math.floor(Math.random() * eventOptions.length)])

    // If the person can do the event then return it else pick another one
    if (this._canDoEvent(person, randomEvent)) {
      randomEvent.person = person
      return randomEvent
    } else {
      return this._pickRandomEvent(person, eventOptions)
    }
  }
  // Should be called on start up. Will then load all the saved events into the class and classify them.
  loadEvents() {
    for (let event of dailyEvents) {
      if (event.type === "Food") {
        this._foodEvents.push(event)
      } else if (event.type === "Walk") {
        this._walkEvents.push(event)
      } else if (event.type === "Random") {
        this._randomEvents.push(event)
      } else {
        console.error("ERROR: Can't identify event of type ", event.type, " for event: ", event)
      }
    }
  }
  // Randomly generates the events for the day and assigns household members to them
  // Uses the _DAILY_EVENTS variable as a guide for the order of the events
  // Returns a copy of the events
  getEventsForTheDay(householdMembers) {
    let eventsForTheDay = []

    for (const eventType of this._DAILY_EVENTS) {
      let event
      if (eventType === "foodEvent") {
        event = this._pickRandomEvent(this._pickRandomPerson(householdMembers), this._foodEvents)
      } else if (eventType === "walkEvent") {
        event = this._pickRandomEvent(this._pickRandomPerson(householdMembers), this._walkEvents)
      } else if (eventType === "randomEvent") {
        event = this._pickRandomEvent(this._pickRandomPerson(householdMembers), this._randomEvents)
      } else {
        console.error("ERROR: Invalid event type ", eventType)
      }

      if (event) {
        eventsForTheDay.push(event)
      }
    }
    
    return eventsForTheDay
  }
  // Returns a copy of the correct new household event
  getNewHouseholdEvent(isFirstHousehold, household) {
    if (isFirstHousehold) {
      const houseEvent = copyObject(firstHouseEvent)
      houseEvent.household = household
      return houseEvent
    } else {
      const houseEvent = copyObject(newHouseEvent)
      houseEvent.household = household
      return houseEvent
    }
  }
  // Start the event and return the first step
  startEvent(event) {
    this._currentEvent = event

    return this.getNextStep()
  }
  // Finds the next step, formats it, returns it
  getNextStep(response, personsReaction) {
    let nextStep
    // If there is no response from the user go to the next step
    // else figure out what step is next
    if (!response && this._currentEvent.steps.length > 0) {
      // Get the next step and format the prompt
      nextStep = this._currentEvent.steps.shift()
    } else {
      // If there is an intermediate step run that
      // else if the next step is continue then go to the next step
      // else end the event
      if (response?.nextStep && typeof response.nextStep === 'object') {
        nextStep = response.nextStep
      } else if (response?.nextStep.toLowerCase() === 'continue' && this._currentEvent.steps.length > 0) {
        nextStep = this._currentEvent.steps.shift()
      } else {
        return
      }
    }

    // Format the prompt and the options
    nextStep.prompt = this._formatText(this._getPrompt(nextStep.prompt, this._currentEvent.person, this._currentEvent.household), personsReaction)
    for (const option of nextStep.options) {
      option.text = this._formatText(option.text, personsReaction)
    }
    return nextStep
  }
}