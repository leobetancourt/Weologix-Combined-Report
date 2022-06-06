const names = ['Alan Tang', 'Candidate 2', 'Candidate 3', 'Candidate 4', 'Candidate 5', 'Candidate 6',
    'Candidate 7', 'Candidate 8'
];

let sectionNames = ['LEADERSHIP', 'PROBLEM SOLVING', 'RELATIONSHIP WITH SELF AND OTHERS'];

let colorCodes = ['rgb(86, 23, 224)', 'rgb(127, 98, 227)'];

let icons = ['leadership.png', 'problem.svg', 'relationship.png']

let scatterColors = ['#3f3f3f', 'rgb(255, 238, 209)', 'rgb(184, 255, 232)', 'rgb(210, 201, 238)', 'rgb(201, 248, 252)',
    'rgb(255, 187, 227)', 'rgb(145, 180, 222)', 'rgb(150, 150, 150)'
];

let traitPairs = [
    [
        ['Coaching', 'Self-improvement'],
        ['Provides Direction', 'Receives Correction'],
        ['Authoritative', 'Collaborative'],
        ['Handles Autonomy', 'Organizational Compatibility'],
        ['Flexible', 'Persistent'],
        ['Open / reflective', 'Certain'],
        ['Self-motivated', 'Cause Motivated'],
        ['Wants To Lead', 'Enlists Cooperation'],
    ],
    [
        ['Judgment (strategic)', 'Ability to problem solve'],
        ['Optimistic', 'Analyzes Pitfalls'],
        ['Innovative', 'Systematic'],
        ['Analytical', 'Intuitive']
    ],
    [
        ['Self-improvement', 'Self-acceptance'],
        ['Handles Conflict', 'Warmth / empathy'],
        ['Frank', 'Diplomatic'],
        ['Assertive', 'Helpful']
    ]
];

let traitDescriptions = [
    [
        ['<b>Coaching</b>: The tendency to effectively facilitate the development of others (one to one interactions).\n\n <b>Self-improvement</b>: The tendency to attempt to develop or better oneself.'],
        ['<b>Provides Direction</b>: The tendency to provide others with clear direction or guidance.\n\n <b>Receives Correction</b>: The tendency to accept guidance intended to improve performance.'],
        ['<b>Authoritative</b>: The desire for decision-making authority and the willingness to accept decision-making responsibility. \n\n <b>Collaborative</b>: The tendency to collaborate with others when making decisions.'],
        ['<b>Handles Autonomy</b>: The tendency to have the motivation and self-reliance necessary for a significant amount of independence from immediate supervision.\n\n <b>Organizational Compatibility</b>: The tendency to work co-operatively with others (assuming sufficient job related knowledge and team compatibility).'],
        ['<b>Flexible</b>: The tendency to easily adapt to change.\n\n <b>Persistent</b>: The tendency to be tenacious despite encountering significant obstacles.'],
        ["<b>Open / reflective</b>: The tendency to reflect on many different viewpoints. \n\n <b>Certain</b>: The tendency to feel confident in one's opinions."],
        ['<b>Self-motivated</b>: The drive to achieve including taking initiative, wanting challenge, and being enthusiastic about goals.\n\n <b>Cause Motivated</b>: The tendency to be motivated to help society.'],
        ['<b>Wants To Lead</b>: The desire to be in a position to direct or guide others.\n\n <b>Enlists Cooperation</b>: The tendency to invite others to participate in or join an effort.']
    ],
    [
        ['<b>Judgment (strategic)</b>: The tendency to have a balance of traits necessary to discern pertinent information, and formulate an effective strategy.\n\n <b>Ability to problem solve</b>: Ability to learn and problem solve.'],
        ['<b>Optimistic</b>: The tendency to believe the future will be positive.\n\n <b>Analyzes Pitfalls</b>: The tendency to scrutinize potential difficulties related to a plan or strategy.'],
        ['<b>Innovative</b>: The tendency to create new and more effective ways of doing things.\n\n <b>Systematic</b>: The enjoyment of tasks that require carefully or methodically thinking through steps.'],
        ['<b>Analytical</b>: The tendency to logically examine facts and situations (not necessarily analytical ability).\n\n <b>Intuitive</b>: The tendency to use hunches to help make decisions (not necessarily intuitive capabilities).'],
    ],
    [
        ['<b>Self-improvement</b>: The tendency to attempt to develop or better oneself.\n\n <b>Self-acceptance</b>: The tendency to like oneself ("I\'m O.K. the way I am").'],
        ['<b>Handles Conflict</b>: The tendency to skillfully face discord or strife, and the interpersonal skills necessary to deal with it effectively.\n\n <b>Warmth / empathy</b>: The tendency to express positive feelings and affinity toward others.'],
        ['<b>Frank</b>: The tendency to be straightforward, direct, to the point, and forthright.\n\n <b>Diplomatic</b>: The tendency to state things in a tactful manner.'],
        ['<b>Assertive</b>: The tendency to put forward personal wants and needs.\n\n <b>Helpful</b>: The tendency to respond to others\' needs and assist or support others to achieve their goals.'],
    ]
];

function createScatterChart(data, pair) {
    tweakLib();
    let svgContext = C2S(350, 250);
    let scoreData = [];
    for (let i = 0; i < data.length; i++) {
        let avgScore = average([scoreFromTrait(pair[0], data[i]), scoreFromTrait(pair[1], data[i])]);
        let dataPoint = {
            label: names[i],
            // backgroundColor: `rgba(127, 98, 227, ${map_range(avgScore, 0, 10, 0, 1)})`,
            backgroundColor: scatterColors[i],
            borderWidth: 0,
            pointRadius: 7,
            data: [{
                x: scoreFromTrait(pair[0], data[i]),
                y: scoreFromTrait(pair[1], data[i])
            }]
        }
        scoreData.push(dataPoint);
    }
    let mySvg = new Chart(svgContext, {
        // The type of chart we want to create
        type: 'scatter',

        // The data for our dataset
        data: {
            labels: 'dataset',
            datasets: scoreData
        },

        // Configuration options go here
        options: {
            responsive: false,
            animation: false,
            maintainAspectRatio: true,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 10,
                    fontSize: 10,
                    usePointStyle: true,
                    padding: 13
                }
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5,
                        suggestedMax: 10,
                        fontSize: 11,
                        callback: function (value, index, values) {
                            if (value % 1 === 0) {
                                return value;
                            } else {
                                return ' ';
                            }
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: pair[1],
                        fontFamily: 'Hind-Bold',
                        fontSize: 12,
                        fontColor: '#3f3f3f'
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 5,
                        suggestedMax: 10,
                        fontSize: 11,
                        callback: function (value, index, values) {
                            if (value % 1 === 0) {
                                return value;
                            } else {
                                return ' ';
                            }
                        }
                    },

                    scaleLabel: {
                        display: true,
                        labelString: pair[0],
                        fontFamily: 'Hind-Bold',
                        fontSize: 12,
                        fontColor: '#3f3f3f'
                    }
                }]
            }
        }
    });
    let chartSvg = svgContext.getSerializedSvg(true);
    return 'data:image/svg+xml;base64,' + window.btoa(chartSvg);
}

function tweakLib() {
    C2S.prototype.getContext = function (contextId) {
        if (contextId == "2d" || contextId == "2D") {
            return this;
        }
        return null;
    }

    C2S.prototype.style = function () {
        return this.__canvas.style
    }

    C2S.prototype.getAttribute = function (name) {
        return this[name];
    }

    C2S.prototype.addEventListener = function (type, listener, eventListenerOptions) {
        //console.log("canvas2svg.addEventListener() not implemented.")
    }
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function createBarChart(data, trait) {
    let scores = [];
    let colors = [];
    let bestCands = getBestCands(data, trait);
    for (let i = 0; i < names.length; i++) {
        let score = scoreFromTrait(trait, data[i])
        scores.push(score);
        if (i == bestCands[0]) {
            colors[i] = colorCodes[0];
        } else if (i == bestCands[1]) {
            colors[i] = colorCodes[1];
        } else {
            colors[i] = `rgba(0, 0, 0, ${map_range(score, 0, 10, 0, 0.5)})`
        }
    }
    tweakLib();
    let svgContext = C2S(300, 200);
    let mySvg = new Chart(svgContext, {
        type: 'horizontalBar',
        data: {
            labels: names,
            datasets: [{
                label: 'Score',
                backgroundColor: colors,
                data: scores
            }]
        },
        options: {
            responsive: false,
            animation: false,
            maintainAspectRatio: true,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: trait,
                fontFamily: 'Hind-Bold',
                fontSize: 12,
                fontColor: '#7F66E0'
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 2,
                        beginAtZero: true,
                        fontSize: 11
                    },
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: 'Hind-Regular',
                        fontSize: 12,
                        fontColor: '#3f3f3f'
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        suggestedMax: 10,
                        fontSize: 11
                    },
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: 'Hind-Regular',
                        fontSize: 12,
                        fontColor: '#3f3f3f'
                    }
                }]
            }
        }
    });
    let chartSvg = svgContext.getSerializedSvg(true);
    return 'data:image/svg+xml;base64,' + window.btoa(chartSvg);
}



function getBestCands(data, trait) {
    let scores = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].trait == trait) {
                scores.push(parseFloat(data[i][j].score));
            }
        }
    }

    let firstHighest = -Infinity;
    let firstIndex = -1;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > firstHighest) {
            firstHighest = scores[i];
            firstIndex = i;
        }
    }
    scores[firstIndex] = -10;
    let secondHighest = -Infinity;
    let secondIndex = -1;
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > secondHighest) {
            secondHighest = scores[i];
            secondIndex = i;
        }
    }

    return [firstIndex, secondIndex];
}

function createTraitPairs(data) {
    let page = 1;
    for (let i = 0; i < traitPairs.length; i++) {
        let id = 0;
        for (let j = 0; j < traitPairs[i].length; j++) {
            let pair = traitPairs[i][j];
            let pairTmp = $('#trait-pair').html();
            Mustache.parse(pairTmp);
            let renderedPair = Mustache.render(pairTmp, {
                traitPair: `${j + 1}. ${pair[0].toUpperCase()} VS. ${pair[1].toUpperCase()}`,
                bar1: createBarChart(data, pair[0]),
                bar2: createBarChart(data, pair[1]),
                trait1Best: colorCodes,
                trait2Best: colorCodes,
                traitPairChart: createScatterChart(data, pair),
                traitPairDesc: traitDescriptions[i][j]
            });
            if (j % 2 == 0) {
                id = j;
                let section = $('#trait-pair-page').html();
                Mustache.parse(section);
                let renderedSection = Mustache.render(section, {
                    id: `${i}${id}`,
                    icon: "./images/" + icons[i],
                    section: sectionNames[i],
                    page: page
                })
                $('#trait-pairs').append(renderedSection);
                page++;
            }
            $(`#${i}${id} > div > div > div`).append(renderedPair);
        }
    }
    // let pair = ['Trait 1', 'Trait 2'];
    // let pairTmp = $('#trait-pair').html();
    // Mustache.parse(pairTmp);
    // let renderedPair = Mustache.render(pairTmp, {
    //     traitPair: `1. ${pair[0].toUpperCase()} VS. ${pair[1].toUpperCase()}`,
    //     bar1: createBarChart(data, pair[0]),
    //     bar2: createBarChart(data, pair[1]),
    //     trait1Best: getBestCands(data, pair[0]),
    //     trait2Best: getBestCands(data, pair[1]),
    //     traitPairChart: createScatterChart(data, pair),
    // });
    // let section = $('#trait-pair-page').html();
    // Mustache.parse(section);
    // let renderedSection = Mustache.render(section, {
    //     id: 'demo',
    //     section: 'REPORT LEGEND'
    // })
    // $('#trait-pairs').append(renderedSection);
    // $('#demo > div > div > div').append(renderedPair);
}

function populateTopCands(datatable, data) {
    let table = document.getElementById(datatable);

    let traitPairArr = [];
    // Organize trait pairs in two dimensional array
    for (let i = 0; i < traitPairs.length; i++) {
        for (let j = 0; j < traitPairs[i].length; j++) {
            traitPairArr.push(traitPairs[i][j]);
        }
    }

    for (let i = 0; i < traitPairArr.length; i++) {
        let avgScoreRecord = -Infinity;
        let avgScoreIndex = undefined;
        for (let j = 0; j < data.length; j++) {
            let trait1Score = scoreFromTrait(traitPairArr[i][0], data[j]);
            let trait2Score = scoreFromTrait(traitPairArr[i][1], data[j]);
            let avgScore = parseFloat(average([trait1Score, trait2Score]));
            if (avgScore > avgScoreRecord) {
                avgScoreRecord = avgScore;
                avgScoreIndex = j;
            }
        }
        let row = table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.innerHTML = `${traitPairArr[i][0]} <strong>vs.</strong> ${traitPairArr[i][1]}`;
        cell = row.insertCell(1);
        cell.innerHTML = names[avgScoreIndex];
    }
}

window.onload = function () {
    let traitData = [];
    for (let i = 0; i < names.length; i++) {
        if (i == 0) {
            traitData.push(getTraitScores('./data/Alan Tang.txt', './data/Alan Tang.json', traits, false));
        } else {
            traitData.push(getTraitScores('./data/Loreto Dominguez.txt', './data/Loreto Dominguez.json', traits, true));
        }
    }

    let getTraitData = Promise.all(traitData);
    getTraitData.then(data => {
            console.log(data);
            createTraitPairs(data);
            populateTopCands('top-cands', data);
        })
        .catch(err => console.error(err));
}