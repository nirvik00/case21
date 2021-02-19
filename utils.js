/*
 * Design Programming at CASE, RPI, 2021
 * Course instructor Prof. Dennis Shelden
 * Code implemented by Nirvik Saha
 * Do not modify unless you know what/how to...
 */

function Construct_Wall(X, Y) {
	var A = [...X];
	A.push(A[0]);
	var W = [];
	try {
		W = [Y.height, Y.depth];
	} catch (e) {
		W = [100, 10];
	}
	var B = Aa(A, W);
	if (Y.type.curve === true) {
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
		CS(a, b);
		CS(O(a, W[1]), O(b, W[1]));
	} else {
		CS(A, B);
		CS(O(A, W[1]), O(B, W[1]));
	}
}
var Aa = (A, e) => {
	let X = [];
	A.forEach((p) => {
		let q = { x: p.x, y: p.y, z: p.z + e[0] };
		X.push(q);
	});
	return X;
};
var CS = (A, B) => {
	var i = 0;
	while (i < A.length - 1) {
		beginShape(TRIANGLE_STRIP);
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		vertex(B[i].x, B[i].y, B[i].z);
		endShape(CLOSE);
		beginShape(TRIANGLE_STRIP);
		vertex(B[i + 1].x, B[i + 1].y, B[i + 1].z);
		vertex(B[i].x, B[i].y, B[i].z);
		vertex(A[i + 1].x, A[i + 1].y, A[i + 1].z);
		endShape(CLOSE);
		beginShape();
		vertex(A[i].x, A[i].y, A[i].z);
		vertex(B[i].x, B[i].y, B[i].z);
		endShape(CLOSE);
		i++;
	}
};
var DS = (A) => {
	for (let i = 0; i < A.length - 1; i++) {
		let p = A[i];
		let q = A[i + 1];
		beginShape();
		vertex(p.x, p.y, p.z);
		vertex(q.x, q.y, q.z);
		endShape(CLOSE);
	}
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
			x: p.x + (q.x - p.x) * c,
			y: p.y + (q.y - p.y) * c,
			z: p.z + (q.z - p.z) * c,
		};
		let a = {
			x: q.x + (p.x - q.x) * c,
			y: q.y + (p.y - q.y) * c,
			z: q.z + (p.z - q.z) * c,
		};
		let b = {
			x: q.x + (r.x - q.x) * c,
			y: q.y + (r.y - q.y) * c,
			z: q.z + (r.z - q.z) * c,
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
		Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2)
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
var I = (A) => {
	var X = [];
	for (let i = 0; i < A.length; i++) {
		var a, b, c, d;
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
		var t1 = D2(V(a, c), V(c, d)) / D2(V(a, b), V(c, d));
		var p = { x: a.x + t1 * V(a, b).x, y: a.y + t1 * V(a, b).y, z: a.z };
		X.push(p);
	}
	X.push(X[0]);
	return X;
};
var L = (p, q, n) => {
	var X = [];
	let i = 0.0;
	while (i < 1.0 + 1.0 / n) {
		let r = {
			x: p.x + (q.x - p.x) * i,
			y: p.y + (q.y - p.y) * i,
			z: p.z + (q.z - p.z) * i,
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
var O = (A, e) => {
	var R = [];
	for (let i = 0; i < A.length - 1; i++) {
		let p = T(A[i], S(N1(U(A[i], A[i + 1])), e)),
			q = T(A[i + 1], S(N1(U(A[i], A[i + 1])), e));
		R.push({ p, q });
	}
	let X = I(R);
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
