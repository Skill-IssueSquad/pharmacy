import React from 'react';
import filePond from './filePond'; // Import your FilePond component



const ImageUploadForm = () => {
    return (
        <div>
            <label htmlFor="cover">Cover:</label>
            <input type="file" id="cover" name="cover" className="filepond" />
            <filepond />
        </div>
    );
};

export default ImageUploadForm;
