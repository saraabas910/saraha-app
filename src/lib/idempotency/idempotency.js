import cacheProvider from '../cache/init.js';

export function idempotency (ttl= 3600){
    return async function (req, res, next) {

        const id = req.headers['idempotency-key'];
         let key = `${req.method}:${req.originalUrl}:${id}`;
          const result = await cacheProvider.get(key);
          if (result) {
           res.setheader('X-Idempotency-Key', id);
           return res.json(JSON.parse(result));
          }

          const originalSend = res.json.bind(res);
          res.send = (async (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              await cacheProvider.set(key, JSON.stringify(body), ttl);
              res.setheader('x-cache', 'MISS');
            }
            return originalSend(body);
          });
          next();
}

}