/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });
    QUnit.test('Корректно работает с пустыми массивами', (assert) => {
        const originalObject = { a: [], b: 1 };
        const transformFunction = (value) => value * 2;

        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [], b: 2 }, 'Пустой массив должен остаться пустым');
    });
    QUnit.test('Корректно работает с null значениями', (assert) => {
        const originalObject = { a: null, b: 2 };
        const transformFunction = (value) => value === null ? null : value * 5;

        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: null, b: 10 }, 'null должен корректно обрабатываться');
    });
});
