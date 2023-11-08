import React, { useRef, useEffect } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function FileUpload() {
    const pond = useRef(null);
  
    useEffect(() => {
      // Initialize FilePond with your configurations and plugins
      pond.current = FilePond.create({
        allowMultiple: true,
        // Add other configurations and plugins as needed
      });
    }, []);
  
    return (
      <div>
        <FilePond ref={pond} />
      </div>
    );
  }
  
  export default FileUpload;