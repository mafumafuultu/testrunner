# Test runner js
Simple JavaScript test tool

## how 2 use

Output the test result to the console (`Ctrl + Shift + I` OR `F12` OR `node ~~.js`).

```js
const {testRunner, test} = require('./testrunner.js');
testRunner('test group name', () => {
	test('test name', 10).is(10);
});
```

sample `node test.js`


### Grouping

```js
testRunner(testGroupName, () => {/* tests */});
```

### Test

```js
/**
 * @param testName 'string'
 * @param actor `value` OR `() => value` 
 */
test(testName, actor)
```

```js
test('Test name', 'value') // String
test('Test name', () => [1]) // Array
test('Test name', () => ({obj:0})) // Object
test('Test name', () => 10) // Number
```

### Run

Functions that can be used depend on the type of actor.

#### .is(expect)

```js
/**
 * is
 * @param actor String OR Number OR Array(no sort) OR Object
 * @param expect
 */
test('', actor).is( expect );
```

#### .eq(expect)

```js
/**
 * equal
 * @param actor String OR Number OR Array(no sort) OR Object
 * @param expect
 */
test('', actor).eq( expect );
```

#### Comparison

```js
/**
 * @param actor Number
 * @param expect
 */
test('', actor).lt( expect );
test('', actor).gt( expect );
test('', actor).le( expect );
test('', actor).ge( expect );
```

#### .hasAll(expect)

```js
/**
 * @param actor Array
 * @param expect Array OR value
 */
test('', actor).hasAll(expect);
```

#### .isThanRerationsip(mode)
```js
/** 
 * Skip in case of NaN
 * [a < b < c < d < e]
 *
 * @param actor Array
 * @param mode '<', '<=', '>', '>='
 */
test('', actor).isThanRerationsip( mode );
```

### Result

```js
// run

testRunner('Test sample', () => {
	test('num_eq_1 a === b', 5).eq(5);
	test('num_eq_2 a === b', 5).eq(20);
	test('not imple test', 'test').lt('test');
});
```

```
// console

Running : Test sample
  done : num_eq_1 a === b
  fail : num_eq_2 a === b act : 5 exp : 20
  skip : not imple test StrTest not implements lt
```