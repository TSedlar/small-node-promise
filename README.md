# small-node-promise
[![](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![](https://travis-ci.org/TSedlar/small-node-promise.svg)](https://travis-ci.org/TSedlar/small-node-promise)

#### A small library for basic built-in promise utility functions

## Code Style

This library adheres to the [StandardJS code style]((https://github.com/feross/standard)).

[![](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Supported Functions
- Promises#retry({Promise} Promise, {array} args, {number} maxTries)
- Promise#forceAll({array} Promise)
- Promise#resolveMap({map} map)
- Promise#forceResolveMap({map} map)