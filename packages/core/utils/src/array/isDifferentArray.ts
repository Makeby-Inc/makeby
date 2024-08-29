/** 주어진 배열이 다른지 검사하는 유틸 함수입니다. 
 * @example
 const foo = { foo: 'bar' };
 const bar = { bar: 'foo' };
 isDifferentArray([foo, bar], [foo, bar]); // false
 isDifferentArray([foo, bar], [{ foo: 'bar' }, { bar: 'foo' }]); // true
*/

export function isDifferentArray(a: unknown[] = [], b: unknown[] = []) {
	return (
		a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
	)
}
