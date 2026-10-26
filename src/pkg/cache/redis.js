import Redis from "ioredis";

export class RedisCache {
  client;

  constructor(config) {
    this.client = new Redis({
      port: config.port,
      host: config.host,
      password: config.password,
      lazyconnect: true,
      maxLoadingRetryTime: 3,
    });
    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });
    this.client.connect().then(() => {
      console.log("Connected to Redis");
    });
  }

  async set(key, value, ttl) {
  this.client.set(key,value,"EX", ttl);}

  async get(key) {
    return this.client.get(key);
  }

  async del(key) {
    return this.client.del(key);
  }   

}