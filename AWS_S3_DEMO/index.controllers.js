const {aws_download, aws_upload, aws_delete,aws_allfiles,aws_checkfile,aws_copyfiles} = require('./aws')
const fs = require('fs')
const path = require('path')

const upload = (req, res) => {
  try {

    console.log("calleddd")
    // if there is no file
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "file") to retrieve the uploaded file
      let file = req.files.file;
      console.log(file)
      //read file and upload data (stream)
      fs.readFile(file.tempFilePath, function(err,data) {
        if (err) throw err; // Something went wrong!

        aws_upload(file,data)
      })

      //send response
      res.send({
          status: true,
          message: 'File is uploaded',
          data: {
              name: file.name,
              mimetype: file.mimetype,
              size: file.size,
              path:file.path
          }
      });
    }
  } catch(e) {
    console.error(e)
    res.status(500).end()
  }
}
const download = async (req, res) => {
  try {
    // download filepath
    aws_download(res)
    const fileLocation = path.join('temp', 'x.pdf');
  } catch(e) {
    console.error(e)
    res.status(400).end()
  }
}

const deletefile = async(req,res)=>{
   try{
     aws_delete(res)
    } catch(e) {
      console.error(e)
      res.status(400).end()
    }
}

const allfiles = async(req,res)=>{
  try{
    aws_allfiles(res)
   } catch(e) {
     console.error(e)
     res.status(400).end()
   }
}

const checkfile = async(req,res)=>{
  try{
    aws_checkfile(res)
   } catch(e) {
     console.error(e)
     res.status(400).end()
   }
}

const copyfiles = async(req,res)=>{
  try{
    aws_copyfiles(res)
   } catch(e) {
     console.error(e)
     res.status(400).end()
   }
}
module.exports={
  upload,
  download,
  deletefile,
  allfiles,
  checkfile,
  copyfiles,
}