/**
 *  @author
 *  @date 2022.03.
 *
 *
 */


let font, bpdots, consola
let vehicles = []
let instructions


function preload() {
    consola = loadFont('data/consola.ttf')
    bpdots = loadFont('data/bpdots.otf')
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(640, 360)

    colorMode(HSB, 360, 100, 100, 100);

    textFont(font);
    textSize(32);
    fill(0, 50, 100);
    stroke(220, 80, 100);
    strokeWeight(5)

    vehicles = []

    let points = addTwosDay()

    for (let i = 0; i < points.length; i++) {
        let pt = points[i]
        let vehicleHue = int(map(i, 0, points.length - 1,
            0, 360))

        let vehicleColor = color([vehicleHue, 80, 80])

        vehicles.push(new Vehicle(pt.x, pt.y, vehicleColor))
    }

    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)
}


function draw() {
    background(234, 34, 24)

    let gravity = new p5.Vector(0, 0.1)

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.update()
        v.show()
        noStroke()
        // circle(mouseX, mouseY, 80)
        stroke(220, 80, 100);
        strokeWeight(5)
        v.behaviors()
    }

    displayDebugCorner()
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}

/** returns text point locations for "happy twosday! 2.22.22 2:22pm", centered
 *  313 points
 */
function addTwosDay() {
    let pts = bpdots.textToPoints('happy twosday!', 100, 100, 48, {
        sampleFactor: 0.01, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })

    pts = pts.concat(bpdots.textToPoints('2.22.22 2:22pm', 90, 175, 48, {
        sampleFactor: 0.06, // increase for more points
    }))

    return pts
}


/** returns text point locations for "Liya", centered
 *  313 points
 */
function addBigLiya() {
    return consola.textToPoints('Liya', 50, 200, 224, {
        sampleFactor: 0.2, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })
}


/** returns text point locations for "happy birthday, Liya!" centered
 *  237 points
 */
function addGiantTwo() {
    return consola.textToPoints('2', 200, 280, 384, {
        sampleFactor: 0.2
    })
}
