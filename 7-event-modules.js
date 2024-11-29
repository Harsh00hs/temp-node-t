const EventEmiitter = require('events')

const emitter = new EventEmiitter()

// on set the event to event call name
emitter.on('response', (name, id) => {
    console.log(`data received user: ${name} and id: ${id}`)
})  // name of event, callback 

emitter.on('response', () => {
    console.log('any other logic here')
})  // name of event, callback 


//always stay at end
emitter.emit('response', 'jhon', 54)