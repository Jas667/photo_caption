//import node-cache
const NodeCache = require("node-cache");

//create a cache class 
module.exports = class Cache {
      constructor() {
            this.cache = new NodeCache({
                  stdTTL: 60 * 60 * 1, //cache for one hour
                  checkperiod: ttlSeconds * 0.2,
                  useClones: false
            });
      }
      get(key, storeFunction) {
            const value = this.cache.get(key);
            if (value) {
                  return Promise.resolve(value);
            }

            return storeFunction().then((result) => {
                  this.cache.set(key, result);
                  return result;
            });
      }
      del(keys) {
            this.cache.del(keys);
      }
      flush() {
            this.cache.flushAll();
      }
}