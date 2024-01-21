const cloudinary = require("cloudinary").v2;


exports.upload2Cloudinary = async(file,folder,quality,height) => {
   try{
    console.log("Upload krne aya hoon")
    const options = {folder}
    if(height){
        options.height=height
    }
    if(quality){
        options.quality = quality
    }
    options.resource_type = "auto"
    const result = await cloudinary.uploader.upload(file.tempFilePath,options)
    return  result
   }
   catch(error){

    console.log("error aa gya miterakjdgfbuwufhkw: ",error)
   }
}