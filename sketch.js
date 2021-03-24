/*
 *	 	Design Programming at CASE, RPI, 2021
 *	 	Course instructor Prof. Dennis Shelden
 * 		Code developed by Nirvik Saha
 *		Look for the following functions to manipulate:
 * 		1. extrude a shape:
 * 			Extrude_Shape ( base_points, extrusion_height )
 * 		2. shell/wall-mesh construction:
 * 			Construct_Wall ( base_points, wall_data )
 */

const a = 100;
const base_points = [
	{ x: -a, y: -a, z: 0 },
	{ x: 0, y: -a * 2, z: 0 },
	{ x: a, y: -a, z: 0 },
	{ x: a, y: a, z: 0 },
	{ x: 0, y: 2 * a, z: 0 },
	{ x: -a, y: a, z: 0 },
];
let ht = 100;
const base_points_ht = [
	{ x: -a, y: -a, z: ht },
	{ x: 0, y: -a * 2, z: ht },
	{ x: a, y: -a, z: ht },
	{ x: a, y: a, z: ht },
	{ x: 0, y: 2 * a, z: ht },
	{ x: -a, y: a, z: ht },
];
let ht_ = 250;
const base_points_ht_ = [
	{ x: -a, y: -a, z: ht_ },
	{ x: 0, y: -a * 2, z: ht_ },
	{ x: a, y: -a, z: ht_ },
	{ x: a, y: a, z: ht_ },
	{ x: 0, y: 2 * a, z: ht_ },
	{ x: -a, y: a, z: ht_ },
];
// straight wall with polygon basse
const wall_data1 = {
	height: 100,
	depth: 20,
	closed: false,
};

//also straight wall with polygon basse
const wall_data2 = {
	type: { curve: false },
	height: 100,
	depth: 10,
	closed: false,
};

// curved wall
const wall_data3 = {
	type: { curve: true, curvature: 0.5, smoothness: 10 },
	height: 100,
	depth: 30,
	// closed: false,
};

function setup() {
	createCanvas(700, 700, WEBGL);
	setAttributes('antialias', true);
	strokeWeight(1);
	// debug();
}

function draw() {
	background(255);
	// camera(500, 500, 500, 0, 0, 0, 0, 0, 1);
	orbitControl();
	rotateX(0.5);
	// calls utils.js to create a "wall-mesh" off the base points
	// use wall_data to provide the wall height and wall depth (thickness)
	Construct_Wall(base_points, wall_data3);
	/* Construct_Wall(base_points_ht, wall_data1);
	Construct_Wall(base_points_ht_, wall_data2);  */

	//
	let extrusion_height = 100;
	// Extrude_Shape(base_points, extrusion_height);
}

function debug() {
	rotateX(0.5);
	// Construct_Wall(base_points, wall_data1);
}
