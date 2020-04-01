var rec = new SpeechRecognition();
var textRecognized;
var font;
let semantic = ["bonsoir", "le", "ordinateur", "texte"];

var Words = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    font = loadFont("assets/myFont.otf");
    textFont(font);
    textSize(50);
    textAlign(CENTER, CENTER);
    /* ortho(); */
}

function draw() {
    background(255);
    text(textRecognized, 0, 0);

    /* var parallaxSize = HALF_PI;
    var parallaxX = map(mouseX, 0, width, -parallaxSize, parallaxSize);
    var parallaxY = map(mouseY, 0, height, -parallaxSize, parallaxSize);

    rotateX(parallaxY);
    rotateY(parallaxX); */
    orbitControl();

    for (var i = 0; i < Words.length; i++) {
        Words[i].draw();
    }
}

function receive(splitted) {
    console.log(splitted);
    splitted.forEach(function (w) {
        if (semantic.includes(w)) {
            Words.push(new Graphic(w));
        }
        Words.push(new Word(w));
    });
}