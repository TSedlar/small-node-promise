const assert = require('assert')

const Promises = require('../lib/app').Promises

/* global describe, it */

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
  describe('forceResolveMap', () => {
    it('should force resolve all values -- undefined included', () => {
      let map = { 1: eq('A', 'A'), 2: eq('A', 'B') }
      let expected = { 1: 'a === b', 2: undefined }
      Promises.forceResolveMap(map)
        .then(result => {
          assert.equal(result, expected)
        })
    })
  })
})
