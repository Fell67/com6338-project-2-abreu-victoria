export class Events {
    _DAILY_EVENTS = ['foodEvent', 'walkEvent', 'randomEvent', 'walkEvent', 'foodEvent'] // This array keeps track of what events happens when
    _foodEvents = [] // Holds the events that relate to getting food
    _walkEvents = [] // Holds the walking events that could happen during the day
    _randomEvents = [] // Holds the random events that could happen during the day
    // Should be called on start up. Will then load all the saved events into the class and classify them.
    loadEvents() {
        console.log('Load events')
    }
    // Randomly generates the events for the day and assigns household members to them
    // Uses the _DAILY_EVENTS variable as a guide for the order of the events
    getEventsForTheDay(householdMembers) {
        console.log('Get events for the day: ', householdMembers)
    }
    // Returns the correct new household event
    getNewHouseholdEvent (isFirstHousehold) {
        console.log('get new household event: ', isFirstHousehold)
    }
    processUserInput(event, step, response) {
        console.log('Process user response. event: ', event, 'Step: ', step, 'Response: ', response)
    }
}