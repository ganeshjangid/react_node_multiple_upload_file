const express=require('express');
const app=express();
const port=6595;
const multer=require('multer');
const fs=require('fs');
const cors =require('cors');


const excelFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("excel") ||
      file.mimetype.includes("spreadsheetml")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only excel file.", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/upload_files/");
    },
    filename: (req, file, cb) => {
      //console.log(file.originalname);
      cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    },
});
  
const uploadFile = multer({ storage: storage, fileFilter: excelFilter });



app.use(cors());

app.post('/upload',uploadFile.array("file"),async (req,res)=>{
    
    try {
      res.status(200).send({
      message: "Uploaded the file successfully ",
      name:req.file.originalname
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
        });
    }
    //return res.json(sendMsg);

});

app.get('/getFiles',async (req,res)=>{
    
  try {
    res.status(200).send({
    message: "Uploaded the file successfully "
  });
  } catch (error) {
      console.log(error);
      res.status(500).send({
      message: "Could not upload the file: ",
      });
  }
  //return res.json(sendMsg);

});



app.listen(port,()=> console.log(`This server is running on port no ${port}`));
