const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
event.on('some_event', function() {
    console.log('some_event hello word.');
});
setTimeout(function() {
    event.emit('some_event');
}, 1000);