const traits = [
    'Coaching',
    'Organizational Compatibility',
    'Provides Direction',
    'Takes Initiative',
    'Self-motivated',
    'Self-improvement',
    'Optimistic',
    'Enthusiastic',
    'Cause Motivated',
    'Helpful',
    'Flexible',
    'Persistent',
    'Enlists Cooperation',
    'Collaborative',
    'Authoritative',
    'Wants Challenge',
    'Wants Development',
    'Handles Autonomy',
    'Influencing',
    'Innovative',
    'Experimenting',
    'Risking',
    'Certain',
    'Open / reflective',
    'Judgment (strategic)',
    'Analytical',
    'Intuitive',
    'Analyzes Pitfalls',
    'Pressure Tolerance',
    'Negotiating',
    'Planning',
    'Organized',
    'Systematic',
    'Precise',
    'Self-acceptance',
    'Warmth / empathy',
    'Comfort With Conflict',
    'Manages Stress Well',
    'Receives Correction',
    'Interpersonal Skills',
    'People Oriented',
    'Assertive',
    'Enforcing',
    'Effective Enforcing',
    'Frank',
    'Diplomatic',
    'Handles Conflict',
    'Tolerance Of Bluntness',
    'Outgoing',
    'Ability to problem solve',
    'Wants To Lead'
];

let tableSections = [
    ['Coaching',
        'Organizational Compatibility',
        'Provides Direction',
        'Takes Initiative',
        'Self-motivated',
        'Self-improvement',
        'Optimistic',
        'Enthusiastic',
        'Cause Motivated',
        'Helpful',
        'Open / reflective',
        'Flexible',
        'Persistent',
        'Enlists Cooperation',
        'Collaborative',
        'Authoritative',
        'Wants Challenge',
        'Wants Development',
        'Handles Autonomy',
        'Influencing',
    ],
    ['Innovative',
        'Experimenting',
        'Risking',
        'Certain',
        'Open / reflective'
    ],
    ['Judgment (strategic)',
        'Analytical',
        'Intuitive',
        'Analyzes Pitfalls',
        'Pressure Tolerance',
        'Negotiating',
        'Planning',
        'Organized',
        'Systematic',
        'Precise',
    ],
    ['Self-acceptance',
        'Warmth / empathy',
        'Comfort With Conflict',
        'Manages Stress Well',
        'Receives Correction',
        'Interpersonal Skills',
        'People Oriented',
        'Assertive',
        'Enforcing',
        'Effective Enforcing',
    ],
    ['Frank',
        'Diplomatic',
        'Handles Conflict',
        'Tolerance Of Bluntness',
        'Outgoing'
    ]
];

function createTables(data, vars, tableID, type) {
    for (let s = 0; s < vars.length; s++) {
        let table = document.getElementById(tableID + s);
        let heading = table.insertRow(-1);
        let th = document.createElement('th');
        th.innerHTML = type;
        heading.appendChild(th);
        for (let i = 0; i < names.length; i++) {
            let th = document.createElement('th');
            th.innerHTML = names[i];
            heading.appendChild(th);
        }
        th = document.createElement('th');
        th.innerHTML = 'Avg';
        heading.appendChild(th);
        for (let i = 0; i < vars[s].length; i++) {
            let row = table.insertRow(-1);
            for (let j = 0; j < names.length + 2; j++) {
                let cell = row.insertCell(j);
                if (j == 0) {
                    cell.innerHTML = vars[s][i].replace(/-/g, ' ');
                } else if (j == names.length + 1) {
                    let scores = [];
                    for (let k = 0; k < names.length; k++) {
                        scores.push(scoreFromTrait(vars[s][i], data[k]));
                    }
                    let avg = average(scores);
                    cell.innerHTML = avg;
                } else {
                    cell.innerHTML = scoreFromTrait(vars[s][i], data[j - 1]);
                }
            }
        }
        let row = table.insertRow(1);
        let cell = row.insertCell(0);
        cell.className = 'average-cell';
        cell.innerHTML = "Avg";
        for (let i = 0; i < names.length; i++) {
            let scores = [];
            for (let j = 0; j < vars[s].length; j++) {
                scores.push(scoreFromTrait(vars[s][j], data[i]));
            }
            let avg = average(scores);
            let cell = row.insertCell(-1);
            cell.innerHTML = avg;
        }
        cell = row.insertCell(-1);
        cell.innerHTML = "";
    }
}

function colorizeTables() {
    let td = document.getElementsByTagName('td')
    let colors = ['#FFAC9D', '#FCFF9D', '#B6FFA5'];
    let score = parseFloat(td[0].innerHTML);
    for (let i = 0; i < td.length; i++) {
        let score = parseFloat(td[i].innerHTML);
        if (i % names.length + 2 != 0) {
            if (score < 5) {
                td[i].style.backgroundColor = colors[0];
            } else if (score < 8) {
                td[i].style.backgroundColor = colors[1];
            } else if (score <= 10) {
                td[i].style.backgroundColor = colors[2];
            }
        }
    }
}

function scoreFromTrait(traitName, traitData) {
    for (let i = 0; i < traitData.length; i++) {
        if (traitData[i].trait == traitName) {
            return parseFloat(traitData[i].score);
        }
    }
}