/**
 * Statistics model events
 */

'use strict';

import {EventEmitter} from 'events';
var Statistics = require('../../sqldb').Statistics;
var StatisticsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StatisticsEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Statistics) {
  for(var e in events) {
    let event = events[e];
    Statistics.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    StatisticsEvents.emit(event + ':' + doc._id, doc);
    StatisticsEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Statistics);
export default StatisticsEvents;
