'use strict';

/**
 * Функция, преобразующая поля объекта с помощью переданной функции.
 * @param {Object|Array} obj - исходный объект или массив
 * @param {Function} transformFn - функция преобразования значений
 *
 * @example
 * // returns { a: 2, b: { c: 4 } }
 * transform({ a: 1, b: { c: 2 } }, x => x * 2);
 *
 * @example
 * // returns { a: [2, 3], b: 4 }
 * transform({ a: [1, 2], b: 3 }, x => x + 1);
 *
 * @returns {Object|Array}
 */
const transform = (obj, transformFn) => {

    if ((typeof obj !== 'object' && !Array.isArray(obj)) || obj === null || typeof transformFn !== 'function') {
        return console.error("Входные данные должны быть объектом или массивом, а transformFn должен быть функцией");
    }

    if (Array.isArray(obj)) {
        return obj.map(item => (item !== null && typeof item === 'object') ? transform(item, transformFn) : transformFn(item));
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {                 
                return [key, transform(value, transformFn)];
            } else {
                return [key, transformFn(value)];
            }
        })
    )
}