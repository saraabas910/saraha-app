import {cacheProvider} from '../lib/cache/init.js'

async function withCache(ttl =3600){

    return async function(req, res, next) {

        let key =`${req.method}:${req.originalUrl}`;
         const cached = await cacheProvider.get(key);
         if (cached) {
           res.setHeader('X-Cache', 'HIT');
            return res.json(JSON.parse(cached));
         }
        
          const originalJson = res.json.bind(res);
         res.json = async (body) => {
           if(res.statusCode>= 200 && res.statusCode<300 ){
             //chache first 
            await cacheProvider.set(key,JSON.stringify(body),ttl);
            //then send the response
            res.setHeader('X-Cache', 'MISS');
           
          }
           return originalJson(body);
        }
         next();

         

    }
}