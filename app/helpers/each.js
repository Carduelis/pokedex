export default (startIndex, endIndex, callback) => {
	for (let i = startIndex; i < endIndex; i++) {
		if (callback(i) === false) {
			break;
		}
	}
};
