import * as userService from "../service/user.service.js"

export async  function UploadPic(req, res, next){

 try{
      await userService.UploadProfilePic(req.user.id ,req.file)

  res.json({message: "uploaded successfully"})
 }catch(error){
   next(error)
 }


}