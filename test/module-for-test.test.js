'use strict';

const chai          = require('chai'),
      testMe        = require('test.me'),
      moduleForTest = require('./../module-for-test'),
      assert        = chai.assert;

describe(
  'moduleForTest', () => {

    it(
      'test.me',
      done => {
        const stubModuleA = () => Promise.resolve(
                [
                  {
                    foo: '2016-01-01',
                    bar: 1,
                    id : 42,
                  }
                ]
              ),
              stubModuleB = () => Promise.resolve(
                [
                  {
                    foo: '2016-01-02',
                    bar: 1,
                    id : 42,
                  }
                ]
              );

        const expectedResult = [
          {
            eA: {foo: '2016-01-01'},
            eB: {foo: '2016-01-02'}
          }
        ];

        const FakeModuleForTest = testMe(
          './module-for-test',
          {
            moduleA: stubModuleA,
            moduleB: stubModuleB,
          }
        );

        FakeModuleForTest
          .moduleForTest()
          .then(
            result => {
              console.log('Result', result);
              assert.deepEqual(result, expectedResult);
              done();
            }
          )
          .catch(
            err => {
              console.error('Err', err);
            }
          );
      }
    );
  }
);
