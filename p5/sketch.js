/*
 *	 	Design Programming at CASE, RPI, 2021
 *	 	Course instructor Prof. Dennis Shelden
 * 		Code developed by Nirvik Saha
 *		Look for the following functions to manipulate:
 * 		1. extrude a shape:
 * 			Extrude_Shape ( base_points, extrusion_height )
 * 		2. shell/wall-mesh construction:
 * 			Construct_Wall ( base_points, wall_data )
 *
 * 		Closed Walls Segments: in wall_data set `closed` key as true or do not insert `closed` key
 * 		Open Wall Segments: set `closed` key as false
 * 		by default, the walls are assumed to be closed,
 * 			=> if closed key is not set, then it will be considered as closed
 */

const a = 100;
const base_points_2pt_de0 = [
	{ x: -a, y: -a, z: a / 3 },
	{ x: 0, y: -a * 2, z: a / 3 },
];
const base_points_2pt_de1 = [
	{ x: 0, y: 0, z: a / 2 },
	{ x: 0, y: -a * 2, z: a / 2 },
];
const base_points_2pt_de2 = [
	{ x: -a, y: -a, z: a },
	{ x: 0, y: 0, z: a },
];
const wall_data_2pt_de = {
	height: 30,
	depth: 20,
	closed: false,
};

//
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
	closed: true, // closed curve to generate walls
};

//also straight wall with polygon basse
const wall_data2 = {
	type: { curve: false },
	height: 100,
	depth: 10,
	closed: false, // curve is open & walls are generated off this curve
};

// curved wall
const wall_data3 = {
	type: { curve: true, curvature: 0.5, smoothness: 10 },
	height: 100,
	depth: 30,
	closed: false, // default closed curve is assumed
};

// curved wall
const wall_data4 = {
	type: { curve: true, curvature: 0.5, smoothness: 10 },
	height: 100,
	depth: 30,
	closed: true, // default closed curve is assumed
};
// test 2
var base_points_test_2 = [
	{ x: -240, y: -240, z: 0 },
	{ x: 240, y: -240, z: 0 },
	{ x: 240, y: 240, z: 0 },
	{ x: -240, y: 240, z: 0 },
];
var wall_data_test_2 = {
	type: { curve: true, curvature: 0.5, smoothness: 10 },
	height: 120,
	depth: 10,
	closed: false, // curve is open & walls are generated off this curve
};

function setup() {
	createCanvas(700, 700, WEBGL);
	setAttributes('antialias', true);
	strokeWeight(1);
}

function draw() {
	background(255);
	// camera(500, 500, 500, 0, 0, 0, 0, 0, 1);
	orbitControl();
	rotateX(0.5);

	// calls utils.js to create a "wall-mesh" off the base points
	// use wall_data to provide the wall height and wall depth (thickness)

	/* Construct_Wall(base_points, wall_data1);
	Construct_Wall(base_points_ht, wall_data2);
	Construct_Wall(base_points_ht_, wall_data3); */

	//Construct_Wall(base_points_test_2, wall_data_test_2);

	// test this
	Construct_Wall(base_points_2pt_de0, wall_data_2pt_de);
	Construct_Wall(base_points_2pt_de1, wall_data_2pt_de);
	Construct_Wall(base_points_2pt_de2, wall_data_2pt_de);

	// extrusion
	/* 
	let extrusion_height = 100;
	Extrude_Shape(base_points, extrusion_height);
	*/
}
