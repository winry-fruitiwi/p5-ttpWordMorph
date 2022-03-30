class Confetti extends Particle {
    constructor(x, y) {
        super(x, y)

        // angle of confetti
        this.angle = 0

        // width of confetti
        this.width = random(5, 10)

        // height of confetti
        this.height = random(5, 10)
    }


    // display confetti as rotating square
    show() {
        push()

        noStroke()

        translate(this.pos.x, this.pos.y)
        rotate(this.angle)

        fill(this.hue, 80, 90, this.lifetime)

        if (this.isFinished()) {
            strokeWeight(1)
            stroke(random(360), 100, 100)
        }

        rect(0, 0, this.width, this.height)

        this.angle += 0.1 * noise(this.pos.x, this.pos.y)

        pop()
    }
}
