var canvas
var narratorCursor = 0;
var setupThings = false;
var spokenText;
var textHistory = [];
var chosenText;
var breaks = [0];
var currentBreak;
var sentences = [];
var playing = false;

var textDisplay;
var textVisualizer;



var mouseWheeling;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    textDiv = createDiv();
    font = loadFont("assets/myFont.otf");
    console.log("loaded font");
    textFont(font);
    textAlign(CENTER, CENTER)
    textSize(16);
}

function draw() {
    if (loaded) {
        /* if (frameRate % 10 == 0) {
            console.log(currentBreak);
        } */
        /* responsiveVoice.speak(wyrdSisters, "UK English Male", {pitch: 1}); */
        if (!setupThings) {
            chosenText = wyrdSisters;
            setupThings = true;
            console.log(">> loaded data")
            //console.log(narratorCursor)
            //findBreak(wyrdSisters,0);
            breaks = findBreaks(chosenText);
            chopSentences(chosenText);
            cleanSentences();
            currentBreak = Math.floor(Math.random() * sentences.length);

            textVisualizer = new textViz();
            /*textDisplay = new textDivs(10);*/
            responsiveVoice.debug = false;

        }
        if (!responsiveVoice.isPlaying() && playing) {

            tell(chosenText);
        }

        background(255);
        textWheel();
        /* textDisplay.draw();*/
        textVisualizer.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function displayText() {
    /* fill("black")
    text(spokenText, 30, 30); */
    //textDiv.html(sentences[currentBreak]);
}

function mouseWheel(event) {
    mouseWheeling = event;
    responsiveVoice.cancel();
    console.log(Math.sign(event.delta))
    if (Math.sign(event.delta) == -1) {
        currentBreak++;
        console.log(currentBreak);
    } else if (Math.sign(event.delta) == 1) {
        currentBreak--;
        if (playing) {
            currentBreak--;
        }
        console.log(currentBreak);
    }
}

function textWheel() {
    for (var i = 0; i < 3; i++) {
        rotateX((i * 30));
        text(sentences[currentBreak - i], 0, 0);
    }
}

function findBreak(data, narratorCursor) {
    var pos = narratorCursor;
    //console.log(narratorCursor)
    while (data[pos].match(/\n/g) == null) {
        //console.log(pos)
        pos++;

    }
    //console.log(data[pos]);
    return pos;
}

/* function tell(data) {
    var breakPoint = findBreak(data, narratorCursor)
    console.log(breakPoint);
    spokenText = data.slice(narratorCursor, breakPoint);
    textHistory.push(spokenText);
    narratorCursor = breakPoint + 1;

    responsiveVoice.speak(spokenText, "UK English Male", {
        onstart: startedSpeaking()
    });
} */

function tell(data) {
    currentBreak++;
    /* var start = breaks[currentBreak];
    var breakPoint = breaks[currentBreak + 1];
    console.log(start, breakPoint);
    spokenText = data.slice(start, breakPoint); */
    spokenText = sentences[currentBreak];
    textHistory.push(spokenText);

    responsiveVoice.speak(spokenText, "UK English Male", {
        onstart: startedSpeaking(),
        onend: stoppedSpeaking(),
        rate: 1.2
    });

}


function startedSpeaking(event) {
    console.log(event);
}

function stoppedSpeaking() {

}

function pausePlay() {
    if (playing) {
        playing = false;
        responsiveVoice.cancel();
        currentBreak--;
    } else {
        playing = true;
    }
}

function keyPressed() {
    if (keyCode == "32") {
        pausePlay();
    }
}

function findBreaks(data) {
    var theseBreaks = [0];
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i].match(/\n/g))
        if (data[i].match(/\n/g) != null) {
            theseBreaks.push(i);
        }
    }
    return theseBreaks;
}

function chopSentences(data) {
    for (var i = 0; i < breaks.length - 1; i++) {
        var start = breaks[i];
        var breakPoint = breaks[i + 1];
        //console.log(data.slice(start, breakPoint));
        spokenText = data.slice(start, breakPoint);
        sentences.push(spokenText);
    }
}

function cleanSentences() {
    for (var i = 0; i < sentences.length; i++) {
        if (sentences[i] == "\n") {
            sentences.slice(i, 1);
            console.log(sentences[i]);
        }
    }
}

function debugBreaks() {
    var txt = "";
    var brk = 0;
    for (var i = 0; i < 500; i++) {
        if (breaks[brk] == i) {
            txt = txt.concat("ARFDHGAERG");
            brk++
        } else {
            txt = txt.concat(chosenText[i]);

        }
    }
    console.log(txt);
}

class textDivs {

    constructor(divNumber) {
        this.divs = [];

        for (var i = 0; i < divNumber; i++) {
            var leDiv = createDiv();
            this.divs.push(leDiv);
        }
    }

    draw() {
        for (var i = 0; i < this.divs.length; i++) {
            this.divs[i].html = sentences[currentBreak - i]
        }
    }
}

class textViz {
    constructor() {
        this.vizPos;
    }

    draw() {
        this.vizPos = map(currentBreak, 0, sentences.length, 0, height);
        noStroke();
        fill(220);
        rectMode(CORNERS);
        rect(width - 20, 0, width, height)
        fill(99, 255, 149);
        fill("turquoise");
        rect(width - 20, this.vizPos, width, this.vizPos + 20);
        fill("black")
        /* text(vizPos,width-5,vizPos+20); */

        var actPos = map(this.vizPos, 0, height, 0, sentences.length);
        if (mouseIsPressed && this.mouseInScrollBar()) {
            currentBreak = Math.round(actPos);
        }

    }

    mouseInScrollBar() {
        if (mouseX > width - 20 && mouseX < width && mouseY < this.vizPos + 20 && mouseY > this.vizPos) {
            console.log("mouse in scrollbar")
            return true;
        } else {
            return false;
        }
    }
}