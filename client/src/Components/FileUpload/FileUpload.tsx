import * as React from 'react';
// import './FileUploadGallery.scss';

export interface FileUploadProps {
    selectedFolder: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onSubmit: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}

// main class
const FileUpload = (props: FileUploadProps) => {
    return (
        <form>
            <input type='file' id='uploadPicFile' />
            <select value={props.selectedFolder} 
                onChange={props.onChange} 
            >
                <option value="Food">Food</option>
                <option value="Nature">Nature</option>
                <option value="Travel">Travel</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
            </select>
            <input type="submit" value="Upload" />
            <p>{`You selected ` + props.selectedFolder}</p>
        </form>
    );
}

export default React.memo(FileUpload);

