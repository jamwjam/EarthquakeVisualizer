var feed_url = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-5-1&endtime=2051-6-9";
var x = [1, 2, 3];
console.log(x.shift());
x.push(5)
console.log(x);

function get_earthquake_data() {
    var features;
    var coordinate, id, magnitude, title, date;
    var colorScale = d3.scale.linear().domain([0, 10]).range(['white', 'red']);

    $.getJSON(feed_url, function (result) {

        var bubbleMap = new Datamap({
            element: document.getElementById('bubbleMap'),
            geographyConfig: {
                popupOnHover: false,
                highlightOnHover: false,
                borderWidth: .5,
                borderColor: '#9f9f9f'
            },
            bubblesConfig: {
                borderWidth: 0,
                popupOnHover: true,
                fillOpacity: 0.5,
                highlightOnHover: true,
                highlightBorderWidth: 0.5,
                highlightFillOpacity: 0.85
            },
            fills: {
                0: colorScale(0),
                1: colorScale(1),
                2: colorScale(2),
                3: colorScale(3),
                4: colorScale(4),
                5: colorScale(5),
                6: colorScale(6),
                7: colorScale(7),
                8: colorScale(8),
                9: colorScale(9),
                defaultFill: '#FFFFFF'
            },
            data: {
                0: {
                    fillKey: 0
                },
                1: {
                    fillKey: 1
                },
                2: {
                    fillKey: 2
                },
                3: {
                    fillKey: 3
                },
                4: {
                    fillKey: 4
                },
                5: {
                    fillKey: 5
                },
                6: {
                    fillKey: 6
                },
                7: {
                    fillKey: 7
                },
                8: {
                    fillKey: 8
                },
                9: {
                    fillKey: 9
                }
            }
        });

        var bubbles = [];
        var visibleBubbles = [];


        for (i in result.features) {
            features = result.features[i];
            coordinate = features.geometry.coordinates; // longitude, latitude
            id = features.id; // name
            magnitude = features.properties.mag;
            title = features.properties.title;
            date = features.properties.time;

            if (magnitude > 0) {
                bubbles.push({
                    time: date,
                    latitude: coordinate[1],
                    longitude: coordinate[0],
                    radius: Math.pow(magnitude,4) / 75,
                    title: title,
                    magnitude: magnitude,
                    fillKey: Math.floor(magnitude)
                });
            }
        }

        bubbles = bubbles.reverse();
        console.log(bubbles[0].time);
        console.log(bubbles[bubbles.length - 1].time);
        var option = new guiOption(bubbles[0].time, bubbles[bubbles.length - 1].time);

        var interval, popped;

        setUpGUI(option);

        function step() {
            option.timeCounter += 100000;
            console.log((new Date(option.timeCounter)).toString());

            if (bubbles.length > 0) {
                // bubbles array is not empty
                if (option.timeCounter > bubbles[0].time) {
                    popped = bubbles.shift();
                    visibleBubbles.unshift(popped);

                    // live update bubbles
                    bubbleMap.bubbles(visibleBubbles, {
                        popupTemplate: function (geo, data) {
                            return '<div class="hoverinfo">' + data.title + '</div>';
                        }
                    });
                }
            }

            if (visibleBubbles.length > 0) {
                if (option.timeCounter < bubbles[0].time) {
                    popped = visibleBubbles.shift();
                    bubbles.unshift(popped);
                }

                // live update bubbles
                bubbleMap.bubbles(visibleBubbles, {
                    popupTemplate: function (geo, data) {
                        return '<div class="hoverinfo">' + data.title + '</div>';
                    }
                });
            }

            if (option.timeCounter >= option.endDate) {
                option.timeCounter = option.startDate;
            }
        }

        function startClock() {
            interval = window.setInterval(step, 1);
        }

        startClock();

    });
}