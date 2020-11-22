import axios from 'axios';

const upload=(file,onUploadProgress)=>{
    let formData=new FormData();
    formData.append("file",file);

    return axios.post('http://localhost:6595/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const getFiles = () => {
  return axios.get("http://localhost:6595/getFiles");
};

export default {
  upload,
  getFiles
};