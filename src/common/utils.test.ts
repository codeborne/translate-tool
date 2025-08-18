import { containsHTMLTags, decodeBase64Unicode, deepEqual, encodeBase64Unicode, insertNestedKey } from './utils';

describe('areObjectsEqual', () => {
  it('returns true if objects are equal, false if not', () => {
    const obj1 = { t1: 1, t2: 2, t: { t3: 3, t4: 4, t: { t5: 5, t6: 6 } } };
    const obj2 = { t1: 1, t2: 2, t: { t3: 3, t4: 4, t: { t5: 5, t6: 6 } } };
    expect(deepEqual(obj1, obj2)).toEqual(true);

    const obj3 = { t1: 1 };
    const obj4 = { t1: 1 };
    expect(deepEqual(obj3, obj4)).toEqual(true);

    const obj5 = { t1: 1, t2: 2, t: { t3: 3, t4: 4, t: { t5: 5, t6: 7 } } };
    const obj6 = { t1: 1, t2: 2, t: { t3: 3, t4: 4, t: { t5: 5, t6: 6 } } };
    expect(deepEqual(obj5, obj6)).toEqual(false);

    const obj7 = { t1: 1, t2: 'weeeoo', t: { t3: 3, t4: 4, t: { t5: 5, t6: 7 } } };
    const obj8 = { t1: 1, t2: 2, t: { t3: 3, t4: 4, t: { t5: 5, t6: 'beooo' } } };
    expect(deepEqual(obj7, obj8)).toEqual(false);

    const obj9 = {};
    const obj10 = {};
    expect(deepEqual(obj9, obj10)).toEqual(true);

    const obj11 = { name: 'a', nested: {} };
    const obj12 = { name: 'a', nested: {} };
    const obj13 = { name: 'a', nested: { test: 'test' } };
    expect(deepEqual(obj11, obj12)).toEqual(true);
    expect(deepEqual(obj11, obj13)).toEqual(false);
  });
});

describe('encode/decodeBase64Unicode', () => {
  it('encodes and decodes UTF-8 base64', () => {
    expect(encodeBase64Unicode('õun')).toEqual('w7V1bg==');
    expect(decodeBase64Unicode('w7V1bg==')).toEqual('õun');
  });
});

describe('insertNestedKey', () => {
  it('adds a new key in specified order to an object', () => {
    const dict = { x: '1', aa: '10', v: '3' };
    insertNestedKey(dict, 'z', 1);
    expect(JSON.stringify(dict)).toEqual(`{"x":"1","aa":"10","z":"","v":"3"}`);
  });

  it('adds a new nested key, separated by dots', () => {
    const dict = { x: '1', aa: '10', v: '3' };
    insertNestedKey(dict, 'hello.world.baz', 1);
    expect(JSON.stringify(dict)).toEqual(`{"x":"1","aa":"10","hello":{"world":{"baz":""}},"v":"3"}`);
  });

  it('adds a new deep key to existing sub keys', () => {
    const dict = { x: { y: { z: '1' } } };
    insertNestedKey(dict, 'x.y.zz', 1);
    expect(JSON.stringify(dict)).toEqual(`{"x":{"y":{"z":"1","zz":""}}}`);
  });
});

describe('containsHTMLTags', () => {
  it('given strings do not contain HTML', () => {
    let html = 'this is a test';
    expect(containsHTMLTags(html)).toBeFalsy();
    html = 'this is a test ////';
    expect(containsHTMLTags(html)).toBeFalsy();
    html = 'with {url} now';
    expect(containsHTMLTags(html)).toBeFalsy();
  });
  it('given strings contain HTML', () => {
    let html = 'this is a <p>test</p>';
    expect(containsHTMLTags(html)).toBeTruthy();
    html = 'this is a <br> test';
    expect(containsHTMLTags(html)).toBeTruthy();
    html = 'this is a <a href="someurl"> test>';
    expect(containsHTMLTags(html)).toBeTruthy();
    html = '<div>broken html';
    expect(containsHTMLTags(html)).toBeTruthy();
  });
});
