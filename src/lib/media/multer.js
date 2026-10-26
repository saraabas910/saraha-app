import multer, { diskStorage } from "multer";
import crypto from "node:crypto"

 
function multerUpload(allowedTypes){

 return multer({
    fileFilter: function (req, file,cb){
       if (!allowedTypes.includes(file.mimetype)){
      return cb(new Error('invalid type') , false)
       }
       cb(null ,  true)


    },
    storage : diskStorage({
        destination : 'uploads',
        filename: function(req,file,cb){

            cb(null ,`${crypto.randomUUID()}-${file.originalname}`)
        }
    })

}) ;



}

export function uploadSingleFile(fieldName,allowedTypes = ['image/png' , 'image/jpeg']){

   return multerUpload().single(fieldName)
}

export function uploadFilesArray(fieldName){

   return multerUpload().array(fieldName)
}

function uploadFileds(fields){

  return  multerUpload().fields(fields)
}