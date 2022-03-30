class Emitter {
    constructor(emissionRate) {
        // particle list
        this.particles = []

        // emitter pos
        this.pos = new p5.Vector(mouseX, mouseY)

        // the base number of emitted particles
        this.emissionRate = emissionRate
    }


    // displays the emitter as a little white dot
    show() {
        // display the rest of its particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i]

            particle.show()
            if (particle.isFinished()) {
                this.particles.splice(i, 1)
            }
        }

        fill(0, 0, 100)
        noStroke()

        circle(this.pos.x, this.pos.y, 6)
    }


    // emits some number of particles based on this.emissionRate
    emit() {
        let types = ["confetti", "particle"]
        let emittedParticles = this.emissionRate + int(random(-5, 5))
        for (let i = 0; i < emittedParticles; i++) {
            let type = random(types)

            if (type === "confetti")
                this.particles.push(new TriangleConfetti(this.pos.x, this.pos.y))
            if (type === "particle")
                this.particles.push(new Particle(this.pos.x, this.pos.y))
        }
    }


    // updates particles and emitter
    update() {
        this.pos.x = mouseX
        this.pos.y = mouseY

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i]

            particle.update()
            particle.edges()
            particle.applyForce(gravity)
        }
    }
}
