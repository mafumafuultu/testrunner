/**
* Test runner js
* author : mafumafuultu
* LICENSE : MIT
*/
class Test {
	constructor(title, val) {
		this.title = title;
		this.val = val;
	}
	static of(title, val) {return new Test(title, val)}
	is(exp) {return this._noimpl_('is')}
	eq(exp) {return this._noimpl_('eq')}
	lt(exp) {return this._noimpl_('lt')}
	gt(exp) {return this._noimpl_('gt')}
	le(exp) {return this._noimpl_('le')}
	ge(exp) {return this._noimpl_('ge')}

	_same_(exp, doSort = false) {
		return Test.json(this.val, doSort) === Test.json(exp, doSort);
	}
	static json(e, doSort) {
		let k = Object.keys(e);
		doSort ? k.sort() : void 0;
		return JSON.stringify(k.reduce((o, v) => (o[v] = e[v], o), {}));
	}
	_print_(exp, fn) {
		let result = fn(exp)
			? console.log(`done : ${this.title}`)
			: console.error(`fail : ${this.title} act : `, this.val, ` exp : `, exp);
		return result;
	}
	_noimpl_(fn) {
		console.info(`skip : ${this.title} ${this.constructor.name} not implements ${fn}`);
		return false;
	}
}

class NumTest extends Test {
	static of(title, val) {return new NumTest(title, val)}
	is(exp) {return super._print_(exp, v => this.val === v)}
	eq(exp) {return super._print_(exp, v => this.val === v)}
	lt(exp) {return super._print_(exp, v => this.val < v)}
	gt(exp) {return super._print_(exp, v => this.val > v)}
	le(exp) {return super._print_(exp, v => this.val <=v)}
	ge(exp) {return super._print_(exp, v => this.val >=v)}
}

class StrTest extends Test {
	static of(title, val) {return new StrTest(title, val)}
	is(exp) {return super._print_(exp, v => this.val === v)}
	eq(exp) {return super._print_(exp, v => this.val === v)}
}

class ObjTest extends Test {
	static of(title, val) {return new ObjTest(title, val)}
	eq(exp) {return super._print_(exp, v => this._same_(v, true))}
}

class ArrTest extends Test {
	static of(title, val) {return new ArrTest(title, val)}
	eq(exp) {return super._print_(exp, v => this._same_(v, false))}
	hasAll(exp) {return super._print_(exp, v => (v.constructor.name === 'Array' ? v : [v]).map(o => this.val.includes(o)).every(r => r) )}
	isThanRerationsip(mode) {
		let f = [
			[(a, i)=>a[i-1]< a[i], 'lt', '<'],
			[(a, i)=>a[i-1]> a[i], 'gt', '>'],
			[(a, i)=>a[i-1]<=a[i], 'le', '<='],
			[(a, i)=>a[i-1]>=a[i], 'ge', '>=']
		].reduce((fn, a) => a.includes(mode, 1) ? a[0] : fn, () => false);
		let flg = true, rmNaN = this.val.reduce((a, v) => ( isNaN(Number(v)) ? void 0 : a.push(Number(v)), a), []);
		for (let i = 1, l = rmNaN.length; i < l; i++) flg &= f(rmNaN, i);
		return super._print_(flg, Boolean);
	}
}

module.exports = exports = {
	testRunner : (title, fn) => {
		console.groupCollapsed(`Running : ${title}`);
		try{fn()}catch(e){console.log(e)}
		console.groupEnd(title);
	},
	test : (title, actor) => {
		let val = typeof actor === 'function'
			? actor()
			: actor;
		switch(val.constructor.name) {
		case 'Number': return NumTest.of(title, val);
		case 'Array': return ArrTest.of(title, val);
		case 'Object': return ObjTest.of(title, val);
		case 'String': return StrTest.of(title, val);
		default : return Test.of(title, val);
		}
	},
};