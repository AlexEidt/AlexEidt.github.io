let timeline = {
    2020: {
        'Autumn': {
            'Coursework': [
                '*',
                'uw.png'
            ],
            'Personal Website!': [
                '*',
                'pin.png'
            ],
            'Word Separator': [
                'Word Separator',
                'python.png'
            ],
            'Directory Grapher': [
                'Directory Grapher',
                'python.png'
            ],
            'End of UW Solar': [
                '*',
                'uwsolar.png'
            ]
        },
        'Summer': {
            'UW Solar/UIL Websites': [
                '*',
                'vuejs.png',
                'javascript.png',
                'wordpress.png'
            ],
            'Word Search Generator': [
                'Word Search Generator',
                'python.png'
            ]
        },
        'Spring': {
            'Coursework': [
                '*',
                'uw.png'
            ]
        },
        'Winter': {
            'Coursework': [
                '*',
                'uw.png'
            ],
            'Frogger': [
                'Frogger',
                'logicgate.png'
            ]
        }
    },
    2019: {
        'Autumn': {
            'Coursework': [
                '*',
                'uw.png'
            ]
        },
        'Summer': {
            'UW Course Planner': [
                'UW Course Planner',
                'python.png',
                'javascript.png'
            ],
            'Manastash Ridge Observatory': [
                '*',
                'telescope.png'
            ]
        },
        'Spring': {
            'Coursework': [
                '*',
                'uw.png'
            ]
        },
        'Winter': {
            'Coursework': [
                '*',
                'uw.png'
            ],
            'Basketball Statistics Tracking': [
                'Basketball Statistics Tracking',
                'java.png'
            ]
        }
    },
    2018: {
        'Autumn': {
            'Coursework': [
                '*',
                'uw.png'
            ],
            'UW Solar': [
                '*',
                'uwsolar.png'
            ]
        }
    }
}

$(document).ready(() => {    
    const timelineDiv = document.createElement('div');
    const br = document.createElement('br');
    timelineDiv.className = 'timeline';
    Object.keys(timeline).reverse().forEach(year => {
        timelineDiv.appendChild(createRow('Year', year));
        console.log(year);
        timelineDiv.appendChild(br);
        for (const quarter in timeline[year]) {
            timelineDiv.appendChild(createRow(quarter, timeline[year][quarter]));
            timelineDiv.appendChild(br);
        }
    });
    document.getElementById('Timeline').appendChild(timelineDiv);
});

function createRow(icon, data) {
    const row = document.createElement('div');
    row.className = 'row';
    const col1 = document.createElement('div');
    col1.className = 'col-2';
    const img = document.createElement('img');
    img.className = 'invert timeline-icon'
    img.src = `Icons/${icon.toLowerCase()}.png`;
    img.alt = `${icon} Icon`;
    col1.appendChild(img);
    const col2 = document.createElement('div');
    const isYear = icon === 'Year';
    col2.className = `col timeline-${isYear ? "year" : "data"}`;
    if (!isYear) {
        for (const event in data) {
            eventData = data[event];
            const link = document.createElement('div');
            if (eventData[0] !== '*') {
                link.className = 'link';
                link.onclick = 'toggleLeft(this)';
                const eventText = document.createElement('div');
                eventText.innerHTML = eventData[0];
                link.appendChild(eventText);
            } else {
                link.innerHTML = event;
            }
            for (var i = 1; i < eventData.length; i++) {
                const imgIcon = document.createElement('img');
                imgIcon.className = 'classIcon invert';
                imgIcon.src = `Icons/${eventData[i]}`;
                link.appendChild(imgIcon);
            }
            col2.appendChild(link);
        }
    } else {
        col2.innerHTML = data;
    }
    row.appendChild(col1);
    row.appendChild(col2);
    return row;
}