class Word {
    constructor(w) {
        this.w = w;
        this.gridStep = 80;
        this.x = Math.round(random(-5, 5)) * this.gridStep;
        this.y = Math.round(random(-5, 5)) * this.gridStep;
        this.rotation = Math.floor(random(-1,1)) * 90;
    }

    draw() {
        push();
        translate(this.x, this.y, 0);
        //rotateY(frameCount * .001);
        rotateY(radians(this.rotation));
        fill(0);
        for (var i = 0; i < 5; i++) {
            translate(0, 0, i * .5);
            text(this.w, 0, 0);
        }
        pop();
    }


}