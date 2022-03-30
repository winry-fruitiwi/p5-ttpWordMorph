/**
 *  @author
 *  @date 2022.03.
 *
 *
 */

let emitter
let particles
let gravity

// font, bpdots.otf, consola.ttf, vehicle home points when initialized.
let font, bpdots, consola, vehicleHomePoints

// vehicles array.
let vehicles = []

// instructions for controls.
let instructions


function preload() {
    // font initialization
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
    particles = []
    emitter = new Emitter(1)
    gravity = new p5.Vector(0, 0.05)

    vehicleHomePoints = addTwosDay()

    initializeVehicles(vehicleHomePoints)

    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3] → happy twosday, giant 2, big "Liya"
        z → freeze sketch</pre>`)
}


function draw() {
    background(234, 34, 24)

    // draw the vehicles.
    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.update()
        v.show()
        v.behaviors()
    }

    emitter.show()
    emitter.emit()
    emitter.update()

    // display useful debug info.
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

    // change to twosday message
    if (key === "1") {
        let points = addTwosDay()
        changeVehicleHomes(points)
    }

    // change to giant two
    if (key === "2") {
        let points = addGiantTwo()
        changeVehicleHomes(points)
    }

    // change to big "Liya" message
    if (key === "3") {
        let points = addBigLiya()
        changeVehicleHomes(points)
    }
}

/** returns text point locations for "happy twosday! 2.22.22 2:22pm", centered
 *  313 points
 */
function addTwosDay() {
    let pts = bpdots.textToPoints('happy twosday!', 100, 130, 48, {
        sampleFactor: 0.01, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })

    pts = pts.concat(bpdots.textToPoints('2.22.22 2:22pm', 90, 205, 48, {
        sampleFactor: 0.06, // increase for more points
    }))

    return pts
}


/** returns text point locations for "Liya", centered
 *  313 points
 */
function addBigLiya() {
    return consola.textToPoints('Liya', 50, 230, 224, {
        sampleFactor: 0.2, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })
}


/** returns text point locations for "happy birthday, Liya!" centered
 *  237 points
 */
function addGiantTwo() {
    return consola.textToPoints('2', 200, 320, 384, {
        sampleFactor: 0.2
    })
}


// code to initialize vehicles
function initializeVehicles(points) {
    // we have to clear the vehicles array because otherwise we'll always be
    // adding vehicles, so we'll have very low framerate and different scenes!
    vehicles = []
    for (let i = 0; i < points.length; i++) {
        let pt = points[i]
        let vehicleHue = int(map(i, 0, points.length - 1,
            0, 360))

        let vehicleColor = color([vehicleHue, 80, 80])

        vehicles.push(new Vehicle(pt.x, pt.y, vehicleColor))

        vehicleHomePoints = points
    }
}


/*
    Pseudocode:
        given: array points.

        if points.length > vehicles.length, iterate through vehicles.
        find point at variable i.
        find vehicle "v" at variable i.
        set v.target to that point. (it's a PVector)
        add more vehicles until vehicle array length === point array length.
        set vehicleHomePoints to points

        tracing: points.length > vehicles.length
        points.length = 2
        vehicles.length = 1
        i = 0
        v = vehicles[0]
        pt = points[1]
        v.target = pt
        vehicles.length after adding vehicles: 2
        vehicleHomePoints = points

        Tracing successful

        if points.length === vehicles.length, do the same thing as first case.

        if points.length < vehicles.length, iterate through points.
        find vehicle "v" at variable i.
        find point "pt" at variable i.
        set v.target to that point.

        remove the rest of the vehicles.
*/

function changeVehicleHomes(points) {
    // if there are more new points, set the vehicle targets.
    if (points.length >= vehicles.length) {
        for (let i = 0; i < vehicles.length; i++) {
            let pt = points[i]
            let v = vehicles[i]

            // for some reason, v.target = pt doesn't work.
            v.target.x = pt.x
            v.target.y = pt.y
        }

        // after setting the targets we need to make new vehicles.
        for (let i = vehicles.length; i < points.length; i++) {
            // add a new vehicle
            let pt = points[i]

            let vehicleHue = int(map(i, 0, points.length - 1,
                0, 360))

            let vehicleColor = color([vehicleHue, 80, 80])

            vehicles.push(new Vehicle(pt.x, pt.y, vehicleColor))
        } // if there are less new points, we set the vehicle targets and
        // remove the rest of the unnecessary vehicles.
    } else {
        // set the vehicle homes
        for (let i = 0; i < points.length; i++) {
            let pt = points[i]
            let v = vehicles[i]

            v.target.x = pt.x
            v.target.y = pt.y
        }

        // remove unnecessary vehicles
        vehicles.splice(points.length)
    }
}
