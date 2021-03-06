export default class {
	constructor(baseClass) {
		this.checkForString(baseClass, 'BaseClass');
		this.baseClass = baseClass;
		this.result = this.baseClass;
	}
	spacedDashedConcat(text) {
		return ` ${this.baseClass}-${text}`;
	}
	checkForString(string, name) {
		if (typeof string !== 'string') {
			const errorMessage = `${name} should be a string, given ${typeof string} instead`;
			throw new Error(errorMessage, this);
		}
	}
	push(text) {
		this.checkForString(text, 'Class');
		this.result += this.spacedDashedConcat(text);
	}
	remove(text) {
		this.checkForString(text, 'Class');
		this.result = this.result.replace(this.spacedDashedConcat(text), '');
	}

	getClass() {
		return this.result;
	}
}
