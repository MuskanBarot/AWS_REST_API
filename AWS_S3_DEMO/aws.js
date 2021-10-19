require('dotenv').config()
const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SK
  });

// initialize s3
const s3 = new AWS.S3();
const ext = '.pdf'


//need to put file in /data
const aws_upload = (f,d) => {

  //configuring parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body : d,
    Key : "folder/"+Date.now()+"_"+f.name
  };

  return s3.upload(params, function (err, data) {
    //console.log(data)
    //delete file from temp
    // fs.unlink(f.tempFilePath, function (err) {
    //     if (err) {
    //         console.error(err);
    //     }
    //     console.log('Temp File Delete');
    // });

    //handle upload error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  });
}
const aws_download = (res) => {
  const ext = '.pdf'
  const filePath = path.join('temp', 'x' + ext);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: '1633443322-Documentation.pdf'
  };

  return s3.getObject(params, (err, data) => {
    console.log(data)
    if (err) console.error(err);
    fs.writeFileSync(filePath, data.Body);

    //download
    res.download(filePath, function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
        console.log(res.headersSent)
       }
      // else {
      //   // decrement a download credit, etc. // here remove temp file
      //   fs.unlink(filePath, function (err) {
      //       if (err) {
      //           console.error(err);
      //       }
      //       console.log('Temp File Delete');
       // });
      //}
    })

    console.log(`${filePath} has been created!`);
  });
};

const aws_delete = (res)=>{
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'f1a6fe9d-5916-44bb-a766-d82c597fa2ee.png'
  };

  return s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);  // error
    }
    else{
          console.log("deleted");                 // deleted
    }
  });
}

const aws_allfiles = (res)=>{
  
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket :  process.env.AWS_BUCKET_NAME,
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });

}

const aws_checkfile = (res)=>{
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: '1633443322-Documentation.pdf',
  };
s3.getObject(params,
 function (error, data) {
   if (error) {
     console.log("File does not exist in S3 bucket");
   }
   else{
     console.log("File exist in S3 bucket");
   }
   });
}

const aws_copyfiles = (res)=>{
const sourceFolder = 'folder'
const fileName = '1634622112886_Q. Paper for DA 1.pdf'
const destFolder = 'copy'


const s3Params = {
        Bucket:process.env.AWS_BUCKET_NAME ,
        CopySource: `${process.env.AWS_BUCKET_NAME}/${sourceFolder}/${fileName}`,
        Key: `${destFolder}/${fileName}`
    };

    s3.copyObject(s3Params, function(err, data) {
      if (err) {
          console.log("Error", err);
      } else {
          console.log("Success", data);
      }
  });

}

module.exports={
  aws_upload,
  aws_download,
  aws_delete,
  aws_allfiles,
  aws_checkfile,
  aws_copyfiles,
}