import * as userRepository from "../repository/user.repository.js"

export async function UploadProfilePic(userId, file){
  const user = userRepository.findUserByid(userId)
  if(!user){
    throw error('user doesnt exist ')
  }  
  if(user.profilePicPath){
    fs.unlinkSync(user.profilePicPath)
  }
  await userRepository.updateUserByEmail(user.email,{profilePicPath:file.path})
  


}