/*
 *	 	Design Programming at CASE, RPI, 2021
 *	 	Course instructor Prof. Dennis Shelden
 * 		Code developed by Nirvik Saha
 * 		Please do not modify unless you know what/how to...
 */

function Extrude_Shape(X, Y) {
	var a = [...X];
	a.push(a[0]);
	var b = Aa(a, Y);
	CSV(a, b);
	CSH1(a);
	CSH1(b);
}
function Construct_Wall(X, Y) {
	var A = [...X];
	var W = [];
	// console.log(Y.closed);
	try {
		W = [Y.height, Y.depth, Y.closed];
	} catch (e) {
		W = [100, 10];
	}
	if (Y.closed === undefined) {
		Y.closed = true;
	}
	try {
		if (Y.closed === true) {
			A.push(A[0]);
		}
	} catch (err) {
		A.push(A[0]); // closed not defined, default closed
	}
	var B = Aa(A, W[0]);
	if (Y.type && Y.type.curve === true) {
		if (Y.type.curvature > 0.49) {
			Y.type.curvature = 0.35;
		} else if (Y.type.curvature < 0.01) {
			Y.type.curvature = 0.35;
		}
		if (Y.type.smoothness > 49) {
			Y.type.smoothness = 20;
		} else if (Y.type.smoothness < 5) {
			Y.type.smoothness = 20;
		}
		let a = C(A, Y.type.curvature, Y.type.smoothness);
		let b = C(B, Y.type.curvature, Y.type.smoothness);
		CSV(a, b);
		CSV(O(a, W[1]), O(b, W[1]));
		CSH2(a, O(a, W[1]));
		CSH2(b, O(b, W[1]));
	} else {
		CSV(A, B, Y.closed);
		CSV(O(A, W[1], Y.closed), O(B, W[1], Y.closed), Y.closed);
		CSH2(A, O(A, W[1], closed));
		CSH2(B, O(B, W[1], Y.closed), Y.closed);
		if (Y.closed === false) {
			CSN(A, O(A, W[1], closed), B, O(B, W[1], closed));
		}
	}
}
var Aa = (A, e) => {
	let X = [];
	A.forEach((p) => {
		let q = { x: p.x, y: p.y, z: p.z + e };
		X.push(q);
	});
	return X;
};
var CSN = (A, B, C, D) => {
	fill(0, 10, 255);
	let i = 0;
	beginShape(TRIANGLE_STRIP);
	vertex(A[i].x, A[i].y, A[i].z);
	vertex(B[i].x, B[i].y, B[i].z);
	vertex(C[i].x, C[i].y, C[i].z);

	vertex(D[i].x, D[i].y, D[i].z);
	endShape();
	noFill();
	fill(0, 10, 255);
	let j = A.length - 1;
	beginShape(TRIANGLE_STRIP);
	vertex(A[j].x, A[j].y, A[j].z);
	vertex(B[j].x, B[j].y, B[j].z);
	vertex(C[j].x, C[j].y, C[j].z);
	vertex(D[j].x, D[j].y, D[j].z);
	endShape();
	noFill();
};
var CSV = (A, B, closed = true) => {
	fill(237, 34, 93, 150);
	stroke(0);
	var i = 0;
	while (i < A.length - 1) {
		beginShape(TRIANGLE_STRIP);
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		vertex(B[i].x, B[i].y, B[i].z);
		if (closed === true) {
			endShape(CLOSE);
		} else {
			endShape();
		}
		beginShape(TRIANGLE_STRIP);
		vertex(B[i + 1].x, B[i + 1].y, B[i + 1].z);
		vertex(B[i].x, B[i].y, B[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		if (closed === true) {
			endShape(CLOSE);
		} else {
			endShape();
		}
		beginShape();
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(B[i].x, B[i].y, B[i].z);
		if (closed === true) {
			endShape(CLOSE);
		} else {
			endShape();
		}
		i++;
	}
	noFill();
	noStroke();
};
var CSH1 = (A) => {
	noStroke();
	fill(0, 0, 255, 100);
	for (let i = 1; i < A.length - 1; i++) {
		beginShape(TRIANGLE_STRIP);
		vertex(A[0].x, A[0].y, A[0].z);
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		endShape();
	}
	noFill();
	stroke(0);
};
var CSH2 = (A, B, closed) => {
	stroke(0);
	fill(0, 0, 255, 100);
	for (let i = 0; i < A.length - 1; i++) {
		fill(0, 0, 255, 100);
		beginShape();
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(B[i].x, B[i].y, B[i].z);
		vertex(B[i + 1].x, B[i + 1].y, B[i + 1].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		vertex(A[i].x, A[i].y, A[i].z);
		endShape();
	}
	noFill();
	stroke(0);
};
var DS = (A) => {
	fill(237, 34, 93, 150);
	stroke(0);
	for (let i = 0; i < A.length - 1; i++) {
		beginShape();
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		endShape(CLOSE);
	}
	noFill();
	noStroke();
};
var C = (A, c, s) => {
	let X = [];
	for (let i = 0; i < A.length - 1; i++) {
		var p, q, r;
		if (i === 0) {
			p = A[A.length - 2];
			q = A[0];
			r = A[1];
		} else {
			p = A[i - 1];
			q = A[i];
			r = A[i + 1];
		}
		let m = {
			x: p.x + V(p, q).x * c,
			y: p.y + V(p, q).y * c,
			z: p.z + V(p, q).z * c,
		};
		let a = {
			x: q.x + V(q, p).x * c,
			y: q.y + V(q, p).y * c,
			z: q.z + V(q, p).z * c,
		};
		let b = {
			x: q.x + V(q, r).x * c,
			y: q.y + V(q, r).y * c,
			z: q.z + V(q, r).z * c,
		};
		let f = L(a, q, s);
		let g = L(q, b, s);
		let h = G(f, g, s);
		h.forEach((x) => {
			X.push(x);
		});
	}
	X.push(X[0]);
	DS(X);
	return X;
};
var D = (p, q) => {
	return Math.sqrt(
		Math.pow(V(p, q).x, 2) + Math.pow(V(p, q).y, 2) + Math.pow(V(p, q).z, 2)
	);
};
var D1 = (u, v) => {
	return u.x * v.x + u.y * v.y + u.z * v.z;
};
var D2 = (u, v) => {
	return u.x * v.y - u.y * v.x;
};
var G = (A, B, s) => {
	var e = [];
	let i = 0;
	while (i < A.length) {
		let r = L(A[i], B[i], s);
		e.push(r[i]);
		i++;
	}
	return e;
};
var I = (A, closed = true) => {
	var X = [];
	if (closed === false) {
		X.push(A[0].p);
	}
	let i = 0;
	while (i < A.length) {
		var a, b, c, d;
		if (closed === true) {
			if (i === 0) {
				a = A[A.length - 1].p;
				b = A[A.length - 1].q;
				c = A[0].p;
				d = A[0].q;
			} else {
				a = A[i - 1].p;
				b = A[i - 1].q;
				c = A[i].p;
				d = A[i].q;
			}
		} else {
			if (i === 0) {
				a = A[0].p;
				b = A[0].q;
				c = A[1].p;
				d = A[1].q;
			} else if (i > 1) {
				a = A[i - 1].p;
				b = A[i - 1].q;
				c = A[i].p;
				d = A[i].q;
			} else {
				i++;
				continue;
			}
		}
		var t1 = D2(V(a, c), V(c, d)) / D2(V(a, b), V(c, d));
		var p = { x: a.x + t1 * V(a, b).x, y: a.y + t1 * V(a, b).y, z: a.z };
		X.push(p);
		i++;
	}
	// console.log(closed);
	if (closed === true) {
		X.push(X[0]);
	} else {
		X.push(A[A.length - 1].q);
	}
	return X;
};
var L = (p, q, n) => {
	var X = [];
	let i = 0.0;
	while (i < 1.0 + 1.0 / n) {
		let r = {
			x: p.x + V(p, q).x * i,
			y: p.y + V(p, q).y * i,
			z: p.z + V(p, q).z * i,
		};
		X.push(r);
		i += 1.0 / n;
	}
	return X;
};
var M = (p, q) => {
	return { x: (p.x + q.x) * 0.5, x: (p.y + q.y) * 0.5, z: (p.z + q.z) * 0.5 };
};
var N1 = (u) => {
	return { x: -u.y, y: u.x, z: u.z };
};
var N2 = (u) => {
	return { x: u.y, y: -u.x, z: u.z };
};
var O = (A, e, closed = true) => {
	var R = [];
	let i = 0;
	while (i < A.length - 1) {
		let p = T(A[i], S(N1(U(A[i], A[i + 1])), e)),
			q = T(A[i + 1], S(N1(U(A[i], A[i + 1])), e));
		R.push({ p, q });
		i++;
	}
	let X = I(R, closed);
	return X;
};
var S = (u, r) => {
	return { x: u.x * r, y: u.y * r, z: u.z * r };
};
var T = (u, p) => {
	return { x: u.x + p.x, y: u.y + p.y, z: u.z + p.z };
};
var U = (p, q) => {
	return {
		x: V(p, q).x / D(p, q),
		y: V(p, q).y / D(p, q),
		z: V(p, q).z / D(p, q),
	};
};
var V = (p, q) => {
	return { x: q.x - p.x, y: q.y - p.y, z: q.z - p.z };
};
