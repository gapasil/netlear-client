import axios from "axios";

export const AddUser = async (objUser,img,cb,cbb,method) =>{
  const date = Date.now()
  const url = "https://netlear-server.site/"

  if(img){
    objUser.avatar = `${date}${img.name}`
  }else{
    objUser.avatar = "defaultimg.jpg"
  }
  let eror = (result) =>{
    result.errors.errors.map((obj,index)=>{
      const objErr = {}
      let ref = obj.param
      let message = obj.msg
      objErr.message = message
      objErr.ref = ref
      cb(objErr)
    })
  }
  if(method == "email"){
    delete objUser.phoneNumber
    fetch(`${url}auth/registeremail`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objUser)
    })
    .then(responce =>{
      return responce.json()
    })
    .then(result => {
      if(result.errors){eror(result)}
      {cbb(result.message)}
    })
  }else{
    delete objUser.email
    fetch(`${url}auth/registerphone`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(objUser)
    })
    .then(responce =>{
      return responce.json()
    })
    .then(result => {
      if(result.errors){eror(result)}
      {cbb(result.message)}
    })
  }

  if(img){  
    //изменение названия картинки 
    const blob = img.slice(0, img.size, 'image/png'); 
    const newFile = new File([blob], `${date}${img.name}`, {type: 'image/png'});
    const dataa = new FormData()

    dataa.append("avatar", newFile)

    await axios.post(`${url}auth/uploadavatar`,dataa,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
