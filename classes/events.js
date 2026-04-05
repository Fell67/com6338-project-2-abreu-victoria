// New House Events
import firstHouseEvent from '../events/scenarios/newHouse/firstHouse.js'
import newHouseEvent from '../events/scenarios/newHouse/newHouse.js'

import { dailyEvents } from '../events/index.js'
import { Person } from './person.js'

export class Events {
    _DAILY_EVENTS = ["foodEvent", "walkEvent", "randomEvent", "walkEvent", "foodEvent"] // This array keeps track of what events happens when
    _foodEvents = [] // Holds the events that relate to getting food
    _walkEvents = [] // Holds the walking events that could happen during the day
    _randomEvents = [] // Holds the random events that could happen during the day
    _currentEvent
    _copyObject(object) {
        return JSON.parse(JSON.stringify(object))
    }
    // Determines if the person can do the event
    canDoEvent(person, event) {
        console.log("can do event: ", event, " person ", person)
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
    // Format the prompt for the given step so it is ready to be displayed
    formatPrompt(mainHuman) {
        console.log("format prompt mainHuman: ", mainHuman)
    }
    // Randomly generates the events for the day and assigns household members to them
    // Uses the _DAILY_EVENTS variable as a guide for the order of the events
    // Returns a copy of the events
    getEventsForTheDay(householdMembers) {
        console.log("Get events for the day: ", householdMembers)
    }
    // Returns a copy of the correct new household event
    async getNewHouseholdEvent (isFirstHousehold) {
        if (isFirstHousehold) {
            const houseEvent = this._copyObject(firstHouseEvent)
            houseEvent.household.push(await new Person().create(isFirstHousehold))
            return houseEvent
        } else {
            const houseEvent = this._copyObject(newHouseEvent)
            houseEvent.household.push(await new Person().create(isFirstHousehold))
            return houseEvent
        }
    }
    // Start the event
    startEvent(event) {
        this._currentEvent = event

        return [this._currentEvent.steps]
    }
    // Processes the users input for an event and returns the next step.
    processUserInput(response) {
        console.log("Process user response. event: ", this._currentEvent, "Response: ", response)
    }
}