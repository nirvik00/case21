const a = 100;
const base_points = [
	{ x: -a, y: -a, z: 0 },
	{ x: 0, y: -a * 2, z: 0 },
	{ x: a, y: -a, z: 0 },
	{ x: a, y: a, z: 0 },
	{ x: 0, y: 2 * a, z: 0 },
	{ x: -a, y: a, z: 0 },
];

// straight wall with polygon basse
const wall_data1 = {
	height: 200,
	depth: 30,
};

//also straight wall with polygon basse
const wall_data2 = {
	type: { curve: false },
	height: 200,
	depth: 10,
};

// curved wall
const wall_data3 = {
	type: { curve: true, curvature: 0.5, smoothness: 10 },
	height: 100,
	depth: 10,
};

function setup() {
	createCanvas(500, 500, WEBGL);
	setAttributes('antialias', true);
	fill(237, 34, 93, 100);
	strokeWeight(1);
}

function draw() {
	background(255);
	camera(500, 500, 500, 0, 0, 0, 0, 0, 1);
	// calls utils.js to create a "wall-mesh" off the base points
	// use wall_data to provide the wall height and wall depth (thickness)
	Construct_Wall(base_points, wall_data1);
}
