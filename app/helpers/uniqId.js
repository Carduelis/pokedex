/**
 * Генерация уникального идентификатора, базирующегося на текущем времени и встроенном в библиотеку Math генераторе псевдослучайных чисел
 * @module
 */
/**
 * The function
 * @param {number} base сложность алфавита; по умолчанию base = 32;
 * @returns {string} Уникальный идентификатор
 */
const BASE = 32;
const uniqId = function(base = BASE) {
	return (
		new Date().getTime().toString(base) + Math.random().toString(base).slice(2)
	);
};

export { uniqId };
