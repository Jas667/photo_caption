//import node-cache
const NodeCache = require("node-cache");

//create a cache class 
module.exports = class Cache {
      constructor(ttlSeconds) {
            this.cache = new NodeCache({
                  stdTTL: ttlSeconds,
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


//I NEED TO CHECK IF CACHE WORKS ON USERS ROUTE WHERE USER IS UPDATED AND DELETED