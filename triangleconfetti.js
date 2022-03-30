class TriangleConfetti extends Particle {
    constructor(x, y) {
        super(x, y)

        // angle of confetti
        this.angle = 0

        // variation of confetti vertices
        this.variation = random(-5, 5)

        // size of confetti
        this.size = random(5, 10)
    }


    // display confetti as rotating triangle
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

        triangle(
            this.variation, this.variation,
            -this.size + this.variation, -this.size + this.variation,
            this.size + this.variation, -this.size + this.variation
        )

        this.angle += 0.1 * noise(this.pos.x, this.pos.y)

        pop()
    }
}
