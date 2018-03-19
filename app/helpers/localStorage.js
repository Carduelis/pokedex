export function clear() {
	return new Promise((resolve, reject) => {
		try {
			localStorage.clear();
			resolve(null);
		} catch (err) {
			reject(err);
		}
	});
}
export function getItem(key, { async = true }) {
	if (async) {
		return new Promise((resolve, reject) => {
			try {
				const value = localStorage.getItem(key);
				resolve(JSON.parse(value));
			} catch (err) {
				reject(err);
			}
		});
	}
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.error(err);
		return null;
	}
}

export function removeItem(key) {
	return new Promise((resolve, reject) => {
		try {
			localStorage.removeItem(key);
			resolve(null);
		} catch (err) {
			reject(err);
		}
	});
}

export function setItem(key, value) {
	return new Promise((resolve, reject) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			resolve(null);
		} catch (err) {
			reject(err);
		}
	});
}
