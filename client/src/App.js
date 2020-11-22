import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div className="my-3">
        <h2>ITA Project</h2>
        <h4> Please Upload Excel Files</h4>
      </div>

      <FileUpload />
    </div>
  );
}

export default App;
