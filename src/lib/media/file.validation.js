import { fileTypeFromBuffer } from "file-type";
import { error } from "node:console";
import fs from "node:fs";


export const allowedFields={
    images : ['image/png','imageljpeg'],
    files:['application/pdf','application/msword'],
    videos:['video/mp4'],
    audioes:['audio/mp3'],
}


export const fileValidation =(allowedTypes= allowedFields.images)=>  async (req, res, next) => {
    try {
        
        if(req.file.size>5*1024*1024){
            throw new error ('exceeded size allowed')
        }
        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);
        const type = await fileTypeFromBuffer(buffer);
        
       
        if (!type || !allowedTypes.includes(type.mime))
            fs.unlinkSync(filePath)
            return next(new Error("Invalid file type"));

        return next();
    } catch(error) {
        return next(new Error("Internal server error"));
    }

};