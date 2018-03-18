export default function({ current, first, last, epsilon }) {
	const getPage = i => Math.abs(i) === epsilon ? null : current - i;
	const pages = [];
	pages.push(first);
	for (let i = 0; i < epsilon; i++) {
		if (Math.abs(current - first) > epsilon - i) {
			pages.push(getPage(epsilon - i));
		}
	}
	if (Math.abs(current - first) > 0 && (Math.abs(current - last) > 0)) {
		pages.push(current);
	}
	for (let i = 0; i < epsilon; i++) {
		if (Math.abs(current - last) > i + 1) {
			pages.push(getPage( -i - 1));
		}
	}
	if (first !== last) {
		pages.push(last);
	}
	console.log(current, pages);
	return pages;
		// for (let i = 0; i <= epsilon*2; i++) {
		// 	console.log(`getPage = ${epsilon - i}; `);
		// 	const delta = epsilon - i;
		// 	if (Math.abs(current - first) > epsilon - Math.abs(delta)) {
		//
		// 	}
		// 	if ((Math.abs(current - first) > epsilon - Math.abs(delta)) && (Math.abs(current - last) > epsilon - Math.abs(delta))) {
		// 		if (delta === 0) {
		// 			pages.push(self.currentPage);
		// 		} else {
		// 			pages.push(getPage(delta));
		// 		}
		// 	}
		// }
	// if (Math.abs(current - first) > epsilon) {
	// 	pages.push(getPage(3));
	// }
	// if (Math.abs(current - first) > epsilon - 1) {
	// 	pages.push(getPage(2));
	// }
	// if (Math.abs(current - first) > epsilon - 2) {
	// 	pages.push(getPage(1));
	// }
	// if (Math.abs(current - first) > epsilon - 3 && (Math.abs(current - last) > epsilon -3)) {
	// 	pages.push(self.currentPage);
	// }
	// if (Math.abs(current - last) > epsilon - 2) {
	// 	pages.push(getPage(-1));
	// }
	// if (Math.abs(current - last) > epsilon - 1) {
	// 	pages.push(getPage(-2));
	// }
	// if (Math.abs(current - last) > epsilon) {
	// 	pages.push(getPage(-3));
	// }
}
