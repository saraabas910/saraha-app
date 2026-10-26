import crypto from 'crypto';


export function generateCorrelationId(req,res,next){

    const correlationId = crypto.randomUUID();
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-ID',correlationId);
    next();
} 