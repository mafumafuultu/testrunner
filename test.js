const {testRunner, test} = require('./testrunner.js');

testRunner('NumTest', () => {
	test('is_a > b_fail', 5).is(4);
	test('is_a===b_done', 5).is(5);
	test('is_a < b_fail', 5).is(6);

	test('eq_a > b_fail', 5).eq(4);
	test('eq_a===b_done', 5).eq(5);
	test('eq_a < b_fail', 5).eq(6);

	test('lt_a > b_fail', 5).lt(4);
	test('lt_a===b_fail', 5).lt(5);
	test('lt_a < b_done', 5).lt(6);

	test('gt_a > b_done', 5).gt(4);
	test('gt_a===b_fail', 5).gt(5);
	test('gt_a < b_fail', 5).gt(6);

	test('le_a > b_fail', 5).le(4);
	test('le_a===b_done', 5).le(5);
	test('le_a < b_done', 5).le(6);

	test('ge_a > b_done', 5).ge(4);
	test('ge_a===b_done', 5).ge(5);
	test('ge_a < b_fail', 5).ge(6);
});

testRunner('StrTest', () => {
	test('is_a===b_done', 'a').is('a');
	test('is_a!==b_fail', 'a').is('b');

	test('eq_a===b_done', 'a').eq('a');
	test('eq_a!==b_fail', 'a').eq('b');

	test('lt_no_imple_skip', 'a').lt('a');
	test('gt_no_imple_skip', 'a').gt('a');
	test('le_no_imple_skip', 'a').le('a');
	test('ge_no_imple_skip', 'a').ge('a');
});

testRunner('ObjTest', () => {
	test('eq_a===b_done', {a:10, b:20}).eq({b:20, a:10});
	test('eq_a!==b_fail', {a:10, b:20}).eq({a:10});

	test('is_no_imple_skip', {}).is({});
	test('lt_no_imple_skip', {}).lt({});
	test('gt_no_imple_skip', {}).gt({});
	test('le_no_imple_skip', {}).le({});
	test('ge_no_imple_skip', {}).ge({});
});

testRunner('ArrTest', () => {
	test('eq_[a,b,c]===[a,b,c]_done', [1,2,3]).eq([1,2,3]);
	test('eq_[a,b,c]===[a,c,b]_fail', [1,2,3]).eq([1,3,2]);
	test('hasAll_[a,b,c] has [a,c]_done', [1,2,3]).hasAll([1,3]);
	test('hasAll_[a,c] has [a,b,c]_fail', [1,3]).hasAll([1,3,2]);

	test('isThanRerationsip[a<b<c]_done', [1,2,3]).isThanRerationsip('<');
	test('isThanRerationsip[a< <c]_done', [1, ,3]).isThanRerationsip('<');
	test('isThanRerationsip[a<c<b]_fail', [1,3,2]).isThanRerationsip('<');
	test('isThanRerationsip[a<=a<=c]_done', [1,1,3]).isThanRerationsip('<=');
	test('isThanRerationsip[a<=c<=b]_fail', [1,3,2]).isThanRerationsip('<=');

	test('isThanRerationsip[a>b>c]_done', [3,2,1]).isThanRerationsip('>');
	test('isThanRerationsip[a>c>b]_fail', [2,3,1]).isThanRerationsip('>');
	test('isThanRerationsip[a>=a>=c]_done', [3,1,1]).isThanRerationsip('>=');
	test('isThanRerationsip[a>=c>=b]_fail', [2,3,1]).isThanRerationsip('>=');
});

testRunner('EmpTest', () => {
	test('isNull_done', () => null).isNull();
	test('isUndefined_done', () => undefined).isUndefined();
	test('likeNull_null_done', () => null).likeNull();
	test('likeNull_undefined_done', () => undefined).likeNull();
});