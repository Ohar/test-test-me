'use strict';

const chai          = require('chai'),
      testMe        = require('test.me'),
      sinon         = require('sinon'), // we've included sinon, so we can test internal calls
      assert        = chai.assert;

describe(
  'moduleForTest', () => {
      const resultA = [
              {
                foo: '2016-01-01',
                bar: 1,
                id : 42,
              }
            ],
            stubModuleA = () => Promise.resolve(resultA),
            resultB = [
              {
                foo: '2016-01-02',
                bar: 1,
                id : 42,
              }
            ],
            stubModuleB = () => Promise.resolve(resultB),
            resultC = [ 'resultC' ];

        let stubModuleC,
            moduleForTest;


    beforeEach(
      () => {
        stubModuleC = sinon.spy(() => Promise.resolve(resultC));

        moduleForTest = testMe(
          './module-for-test',

          // ! important thing here !
          //
          // You want to mock all module-for-test dependencies out
          // not just modules A and B, therefore you need to mock
          // moduleC as well.
          //
          // Also testMe expects you to pass your mocks under the
          // keys that precisely corrspond to the string you module
          // under test passes to requre() function, in you case these:
          //
          //    const moduleA = require('./module-a'),
          //          moduleB = require('./module-b'),
          //          moduleC = require('./module-c');
          //

          {
            './module-a': stubModuleA,
            './module-b': stubModuleB,
            './module-c': stubModuleC
          }
        ).module.exports;
      }
    );

    it(
      'should call moduleC with moduleA and moduleB results',
      () => moduleForTest().then(
        // then you test that moduleC is called with expected arguments
        result => assert(stubModuleC.calledWith(resultA, resultB))
      )
    );

    it(
      'should return moduleC result',
      () => moduleForTest().then(
        // and finally you test that your module really returns moduleC's
        // result.
        result => assert.equal(result, resultC)
      )
    );
  }
);
