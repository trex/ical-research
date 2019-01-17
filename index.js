const rrule = require('rrule')
const ics = require('ics')
const ical = require('ical.js')

// Serialization using ics
const event = {
  start: [2018, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true },
    { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton' }
  ]
}

var icsEvent
ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error)
    return
  }
  console.log("Serialized value: \r\n" + value)
  icsEvent = value
})

// Parsing using ical
const jcalData = ical.parse(icsEvent)
console.log("JSON calendar data: \r\n" + jcalData)
var vcalendar = new ical.Component(jcalData);
var vevent = vcalendar.getFirstSubcomponent('vevent');
var summary = vevent.getFirstPropertyValue('summary');
console.log("Parsed Event Summary: " + summary)


// Recurring rules using rrule
const rule = new rrule.RRule({
  freq: rrule.RRule.WEEKLY,
  interval: 5,
  byweekday: [rrule.RRule.MO, rrule.RRule.FR],
  dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
  until: new Date(Date.UTC(2012, 12, 31))
})
console.log("Events in rule: \r\n" + rule.all())
console.log("Slice of events in rule: \r\n" + rule.between(new Date(Date.UTC(2012, 7, 1)), new Date(Date.UTC(2012, 8, 1))))
