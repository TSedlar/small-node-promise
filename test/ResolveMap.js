const assert = require('assert')

const Promises = require('../lib/app').Promises

/* global describe, it */
/* eslint handle-callback-err: 1 */

let eq = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a === b) {
      resolve('a === b')
    } else {
      reject('a ! == b')
    }
  })
}

describe('Promises', () => {
  describe('resolveMap', () => {
    it('should resolve all truthy values', () => {
      let map = { 1: eq('A', 'A'), 2: eq('B', 'B') }
      let expected = { 1: 'a === b', 2: 'a === b' }
      Promises.resolveMap(map)
        .then(result => {
          assert.equal(result, expected)
        })
    })
    it('should fail to resolve all truthy values', () => {
      let map = { 1: eq('A', 'A'), 2: eq('A', 'B') }
      Promises.resolveMap(map)
        .then(result => assert.fail(result, undefined, 'This test should have not resolved the map.'))
        .catch(err => assert.ok('This test ran correctly -- it did not resolve the map.'))
    })
  })
})
