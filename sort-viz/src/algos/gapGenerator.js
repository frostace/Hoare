function gapGenerator(upperBound) {
	let t2 = 0,
		t3 = 0;
	let ugly = [];
	for (let i = 0; i < upperBound; i += 1) {
		ugly.push(0);
	}
	ugly[0] = 1;

	let i = 1;
	while (ugly[i - 1] < upperBound) {
		ugly[i] = Math.min(ugly[t2] * 2, ugly[t3] * 3);
		if (ugly[i] == ugly[t2] * 2) t2 += 1;
		if (ugly[i] == ugly[t3] * 3) t3 += 1;

		i += 1;
	}

	// if (ugly[i - 1] > 100) ugly.splice(i - 1, 1);
	return ugly.filter((entry) => entry != 0).reverse();
}

const gaps = gapGenerator(100);
export default gaps;
