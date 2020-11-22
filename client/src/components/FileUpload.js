import React, {useState,useEffect} from 'react';
import UploadService from '../services/FileUploadService';

const UploadFiles =()=>{
    const [selectedFiles,setSelectedFiles]=useState(undefined);
    const [currentFile,setCurrentFile]=useState(undefined);
    const [message,setMessage]=useState("");
    const [progressInfos,setProgressInfos]=useState();

    const selectedFile=event=>{
        setSelectedFiles(event.target.files);
    }

    const upload=(idx,file)=>{

      let _progressInfos = [progressInfos];

      console.log(idx);
      //console.log(file);
      console.log("file=>"+_progressInfos);

      UploadService.upload(file, (event) => {
        _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
        setProgressInfos(_progressInfos);
      })
      .then((response) => {
        let prevMessage = message ? message + "\n" : "";
        setMessage(prevMessage + response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        //_progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);
      })
      .catch(() => {
          _progressInfos[idx].percentage = 0;
           setProgressInfos(_progressInfos);
          setMessage("Could not upload the file!");
          setCurrentFile(undefined);
      });
  }

    const uploadFiles=()=>{
      //console.log(selectedFiles);

        let currentFile=selectedFiles;
        let _progressInfos = [];


        for (let i = 0; i < currentFile.length; i++) {
          _progressInfos.push({ percentage: 0, fileName: currentFile[i].name });
        }

        //console.log(_progressInfos);
        console.log("Startt _progressInfos =>",_progressInfos);
        setMessage(null);
        console.log("Startt _progressInfos null =>",_progressInfos);
        setProgressInfos([_progressInfos]);

        console.log("Startt progress=>",progressInfos);

        for (let i = 0; i < currentFile.length; i++) {
          setCurrentFile(currentFile[i]); 
          upload(i, currentFile[i]);
          
        }
        setSelectedFiles(undefined);
      }


    return(
        <div className="row">
          
          <div className="form-group" style={{ width: "100%" }}>
            <div className="btn btn-default">
              <input type="file" onChange={selectedFile} multiple />
            </div>
          </div>
          <div className="form-group" style={{ width: "100%",marginLeft: "2%" }}>
            <button
              className="btn btn-success"
              disabled={!selectedFiles}
              onClick={uploadFiles}
            >
              Upload
            </button>
          </div>
    
          {currentFile &&
            progressInfos.map((progressInfo, index) => (
            <div className="mb-2">
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}
          
          {message && (
          <div className="alert alert-light" role="alert" style={{ width: "100%" }}>
            <ul>
              {message.split("\n").map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

          
      </div>
    )


};

export default UploadFiles ;


