// require('dotenv/config')

// const express = require('express')
// const multer = require('multer')
// const AWS = require('aws-sdk')
// const fs = require('fs');
// //const uuid = require('uuid/v4')
// const { v4: uuidv4 } = require('uuid');
// uuidv4();

// const app = express()
// const port = 3000

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_SECRET
// })

// const storage = multer.memoryStorage({
//     destination: function(req, file, callback) {
//         callback(null, '')
//     }
// })

// const upload = multer({storage}).single('image')

// app.post('/upload',upload,(req, res) => {

//     let myFile = req.file.originalname.split(".")
//     const fileType = myFile[myFile.length - 1]

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uuidv4()}.${fileType}`,
//         Body: req.file.buffer
//     }

//     s3.upload(params, (error, data) => {
//         if(error){
//             res.status(500).send(error)
//         }

//         res.status(200).send(data)
//     })
// })

// // app.get('/download',(req,res)=>{
// //     const filePath = './data/downloaded.json';
// //     const bucketName = process.env.AWS_BUCKET_NAME,
// //     const key =`${uuidv4()}.${fileType}`,

// //     var s3 = new AWS.S3();

    
// //     const params = {
// //         Bucket: bucketName,
// //         Key: key
// //     };
// //     s3.getObject(params, (err, data) => {
// //         if (err) console.error(err);
// //         fs.writeFileSync(filePath, data.Body.toString());
// //         console.log(`${filePath} has been created!`);
// //     });

// // })

// // app.post('/upload',upload,(req,res)=>{
// //     console.log(req.file)
// //     let myImage = req.file.originalname.split(".")
// //     res.send({
// //         message:"Hello world"
// //     })
// // })

// app.listen(port, () => {
//     console.log(`Server is up at ${port}`)
// })


const express = require('express')
const fs = require('fs')
const path =require('path')
const  fileUpload =require('express-fileupload')
const { upload, download, deletefile, allfiles,checkfile,copyfiles} =  require('./index.controllers')

// declare app
const app = express()
// file upload middleware
app.use(fileUpload({
    useTempFiles : true,
    createParentPath: true
}));

// upload/dowloand using s3.upload()
app.post('/upload', upload)
app.get('/download', download)
app.delete('/deletefile', deletefile)
app.get('/allfiles', allfiles)
app.get('/checkfile', checkfile)
app.get('/copyfiles', copyfiles)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server started ...')
})
