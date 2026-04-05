// Food events
import normalFood from './scenarios/food/normalFood.js'
import specialOccasionFood from './scenarios/food/specialOccasionFood.js'

// Walk events
import normalWalk from './scenarios/walk/normalWalk.js'
import bikeRideToThePark from './scenarios/walk/bikeRideToThePark.js'
import goOnAHike from './scenarios/walk/goOnAHike.js'

// Random Events
import doorbellRing from './scenarios/random/doorbellRings.js'
import kitchen from './scenarios/random/kitchen.js'
import play from './scenarios/random/play.js'
import watchTV from './scenarios/random/watchTV.js'


export const dailyEvents = [
    normalFood,
    specialOccasionFood,
    normalWalk,
    bikeRideToThePark,
    goOnAHike,
    doorbellRing,
    kitchen,
    play,
    watchTV
]