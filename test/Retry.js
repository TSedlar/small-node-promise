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
    it('should successfully retry', () => {
      Promises.retry(eq, ['A', 'A'])
        .then(result => assert.ok('Correctly resolved'))
        .catch(err => assert.fail(err, 'a === b', 'Should have resolved..'))
    })
    it('should fail to retry', () => {
      Promises.retry(eq, ['A', 'B'])
        .then(result => assert.fail(result, 'a !== b', 'Should not have been resolved..'))
        .catch(err => assert.ok('Purposely failed'))
    })
  })
})
