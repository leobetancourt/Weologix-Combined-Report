function random(m, s) {
    return m + 2.0 * s * (Math.random() + Math.random() + Math.random() - 1.5);
}

function average(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    result /= arr.length;
    return parseFloat(result.toFixed(1));
}

function findTraitScore(trait, text) {
    let index = text.indexOf(trait);

    index += (trait.length - 1);

    let scoreIndex = index + 2;
    let score = '';
    let currentText = text.charAt(scoreIndex);
    // While the string is not just a white space
    while (/\S/.test(currentText)) {
        score += currentText;

        scoreIndex += 1;
        currentText = text.charAt(scoreIndex);
    }

    return score;
}

function getWonderlic(file) {
    return new Promise((resolve, reject) => {
        $.getJSON(file, (data) => {
            // let json = data;
            // let wonderlicScore = json.tests.wonderlic[0].result.resultValue;
            // wonderlicScore = -0.000000130489480 * (wonderlicScore ** 6) + 0.000025394668570 * (wonderlicScore ** 5) - 0.001775505349869 * (wonderlicScore ** 4) + 0.051647822422183 * (wonderlicScore ** 3) - 0.495353493945004 * (wonderlicScore ** 2) + 1.646056512116050 * (wonderlicScore) + 0.210000000000000;
            // wonderlicScore += 6;
            // wonderlicScore /= 10;
            // resolve(wonderlicScore);
            resolve(8);
        });
    });

}

function getTXTData(txt, traits, placeholderCandidate) {
    return new Promise((resolve, reject) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", txt, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let text = rawFile.responseText;
                    let data = [];
                    for (let i = 0; i < traits.length; i++) {
                        // let rand = random(7.5, 2).toFixed(1);
                        // if (rand > 10) rand = 10.0;
                        // else if (rand < 0) rand = 0.0;
                        // data[i] = {trait: traits[i], score: rand};
                        if (placeholderCandidate) {
                            data[i] = {
                                trait: traits[i],
                                score: null
                            };
                        } else {
                            data[i] = {
                                trait: traits[i],
                                score: findTraitScore(traits[i], text)
                            };
                        }
                    }
                    resolve(data);
                } else {
                    reject('Error opening txt file');
                }
            }
        }
        rawFile.send(null);
    });
}

async function getTraitScores(txt, json, traits, placeholderCandidate) {
    let data = [];
    let txtData = await getTXTData(txt, traits, placeholderCandidate);
    data = txtData;
    if (!placeholderCandidate) {
        let index = traits.indexOf('Ability to problem solve');
        let wonderlicScore = await getWonderlic(json);
        data[index] = {
            trait: traits[index],
            score: wonderlicScore
        };
    }
    return data;
}