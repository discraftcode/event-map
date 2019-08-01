const fetch = require('node-fetch'),
cors = require('cors'),
express = require('express'),
bodyParser = require('body-parser'),
compression = require('compression'),
app = express();

app.use(compression())
    .use(bodyParser.json())
    .use(express.static(__dirname + '/dist'));

// Middleware
app.use(cors());


/**
 * @param {*} month
 * @returns month -1 to reflect correct month
 */
function monthFormat(month) {
    const step1 =  +month - 1;
    return JSON.stringify(step1);
}


/**
 * @param {*} target 
 * @returns Date OBJ for event
 */
function format(target) {
    const year = target.slice(0, 4);
    const month = monthFormat(target.slice(5, 7));
    const day = target.slice(8, 10);
    const hours = target.slice(11, 13);
    const min = target.slice(14, 16);
    const sec = target.slice(17, 19);
    const milli = target.slice(20, -1); 
    return new Date(year, month, day, hours, min, sec, milli);
}

/**
 * Wix date does not have time integrated, this performs that function
 *
 * @param {*} date
 * @param {*} time
 * @returns A Fixed time stamp
 */
function timeFormat(date, time) {
    const dateTrim = date.slice(0, 10);
    return dateTrim+ 'T' + time + 'Z';
}


/**
 * Prevents the showing of Events that we  dont have details for
 *
 * @param {*} events
 * @returns Events without 'Coming Soon' title
 */
function filterEvents(events) {
    const actualEvents = []
    events.forEach((event, i) => {
        if (event.title !== "Coming Soon") {
            actualEvents.push(event);
        }
    });
    return actualEvents;
}


// Gets evetns from Wix Database
app.get('/get-events', (req, res) => {
    const eventsArray = [];
    fetch('https://discgolfacerace.com/_functions/events')
    .then(res => res.json())
    .then((eventInfo) => {

        const eventItems = eventInfo.events.items;
        const filteredEvents = filterEvents(eventItems);
        filteredEvents.forEach((item, i) => {
            if (i < 2) {
                console.log('item', item );
            }
            const eventValues = Object.values(item);
            const linkAceRaceEventsTitle_id = eventValues[eventValues.length -1];
            const wixDateTime = timeFormat(item.eventDate, item.eventTime);
            const formattedTime = format(wixDateTime);

            let event = {
                title: item.title,
                coursePark: item.coursePark,
                eventDate: formattedTime,
                eventUrl: item.eventUrl,
                latitude: item.latitude,
                longitude: item.longitude,
                meetupLocation: item.meetupLocation,
                mapEventLink: 'https://www.discgolfacerace.com' + linkAceRaceEventsTitle_id,
                draggable: false
            }
            eventsArray.push(event);
        })
        return eventsArray;
    })
    .then(e => res.send({events: eventsArray}));
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listenting on port ${port}`);
});