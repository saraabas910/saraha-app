import {z} from "zod";


export function validate(dtoSchema, data) {

    const result = dtoSchema.safeParse(data);

       if (!result.success) 
    throw new Error(result.error.issues.map(e => `${e.path[0]}: ${e.message}`).join(', '));
   return result.data;

  
}