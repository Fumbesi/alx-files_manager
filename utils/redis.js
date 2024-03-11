#!/usr/bin/node

/** The `RedisClient` class in JavaScript creates a Redis client,
 *  handles connection events.
 */

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /**
     * This JavaScript constructor function creates a
     * Redis client and handles connection events.
     */
  constructor() {
    this.client = createClient();
    this.isconnected = true;
    this.client.on('connect', () => {
      // console.log(`Redis client connected`)
      this.isconnected = true;
    });
    this.client.on('error', (err) => {
      console.log(`Redis connection error ${err}`);
      this.isconnected = false;
    });
  }

  /**
     * The function isAlive() returns the value of the isconnected property.
     * @returns The `isAlive()` function is returning the value of the `isconnected` property.
     */
  isAlive() {
    return this.isconnected;
  }

  /**
     * @param key - The `key` parameter is used to specify the key for which you
     * want to retrieve the value from the data store.
     */
  async get(key) {
    const GET = promisify(this.client.GET).bind(this.client);
    const result = await GET(key);
    return result;
  }

  /**
     * @param key - The `key` parameter is a name for the data that you want to
     * store in the database.
     * @param value - The `value` parameter represents the value that you want to
     * associate with the specified key in the data store.
     * @param duration - The `duration` parameter is the expiration time in seconds for the
     * key-value pair being set in the Redis database.
     */
  async set(key, value, duration) {
    const SET = promisify(this.client.SET).bind(this.client);
    await SET(key, value, 'EX', duration);
  }

  /**
     * The `del` function asynchronously deletes a key from a Redis database.
     * @param key - The `key` parameter represents the key of the data
     * that you want to delete from the database or cache.
     */
  async del(key) {
    const DEL = promisify(this.client.DEL).bind(this.client);
    await DEL(key);
  }
}

const redisClient = new RedisClient();

// export = redisClient;
export default redisClient;
