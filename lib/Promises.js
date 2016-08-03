import { Objects, Arrays } from 'small-node-collections'

export class Promises {

  /**
   * Retries the given promise with supplied arguments.
   *
   * @static
   * @param {any} promise The promise to retry.
   * @param {any} args The arguments to use with the given promise.
   * @param {number} [maxTries=3] The amount of times to retry; this value is 3 by default.
   * @returns A new promise that will retry with the supplied arguments.
   */
  static retry (promise, args, maxTries = 3) {
    let apply = (resolve, reject) => {
      promise.apply(this, args)
        .then(result => resolve(result))
        .catch(err => {
          if (maxTries <= 1) {
            reject(err)
          } else {
            maxTries--
            apply(resolve, reject, maxTries)
          }
        })
    }
    return new Promise((resolve, reject) => apply(resolve, reject))
  }

/**
 * Forces Promise#all to execute for all given promises, filling undefined in for those that are rejected.
 *
 * @static
 * @param {any} promises The array of promises to iterate.
 * @returns A promise that resolves values, and places undefined in for those that are rejected.
 */
  static forceAll (promises) {
    promises = promises.map(promise => new Promise((resolve, reject) => {
      promise
        .then(result => resolve(result))
        .catch(err => resolve(undefined)) // eslint-disable-line handle-callback-err
    }))
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(results => {
          let filtered = Arrays.filter(results, (result) => result !== undefined)
          if (filtered && filtered.length > 0) {
            resolve(filtered)
          } else {
            reject('No successfully resolved promises found')
          }
        })
        .catch(err => reject(err))
    })
  }

  static _resolveMap (map, func) {
    let promises = []
    Objects.forEach(map, (key, value) => {
      if (value.constructor.name === 'Promise') {
        promises.push(new Promise((resolve, reject) => {
          value.then(result => {
            map[key] = result
            resolve(result)
          }).catch(err => {
            map[key] = undefined
            reject(err)
          })
        }))
      }
    })
    return new Promise((resolve, reject) => {
      func(promises)
        .then(result => resolve(map))
        .catch(err => reject(err))
    })
  }

  /**
   * Resolves the values in the given map using Promise#all.
   *
   * @static
   * @param {any} map The map to resolve. Values should be promises.
   * @returns The given map with promise values translated to their resolved values.
   */
  static resolveMap (map) {
    return this._resolveMap(map, array => Promise.all(array))
  }

  /**
   * Resolves the values in the given map using this#forceAll.
   *
   * @static
   * @param {any} map The map to resolve. Values should be promises.
   * @returns The given map with promise values translated to their force resolved values.
   */
  static forceResolveMap (map) {
    return this._resolveMap(map, this.forceAll)
  }
}
