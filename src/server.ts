import express, { request, response } from 'express';
import cors from 'cors'
import fileUpload from "express-fileupload";
import appRoot from "app-root-path"; 

const app = express()

app.use(fileUpload())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (request,response) =>{
  return response.sendFile(appRoot+'/index.html')
})

app.post('/upload', function(request, response) {
  if(request.files){
    console.log(request.files)
    const file = request.files
    const fileBody =  Object.values(file)[0]

    fileBody.mv('./uploads/'+fileBody.name, error => {
      if(error){
        return response.send(error)
      }else{
        return response.status(200).json("successful upload of "+fileBody.name+" file")
      }
    })
  }
})

app.listen(3333, () => {
  console.log('🟢 Server started on port 3333!')
} )