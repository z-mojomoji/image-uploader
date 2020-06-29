import * as React from 'react';
import './FileUpload.scss';

export interface FileUploadProps {
    selectedFolder: string;
    onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface FileUploadState {
    newDocuments: any[];
    selectedFolder: string;
}

// main class
const FileUpload = (props: FileUploadProps) => {
    const [newDocuments, setNewDocuments] = React.useState('');
    const [fileTypeError, setfileTypeError] = React.useState(false);
    const [fileStatus, setFileStatus] = React.useState('');
    const [fileStatusColor, setFileStatusColor] = React.useState('');

    const validFileType = /(\.jpg|\.jpeg|\.svg|\.gif|\.png|\.tif)$/i;

    const onFileChange = React.useCallback(
        (event) => {
            const fileList = event.target.files;
            for(let file = 0; file < fileList.length; file++) {
                if(!validFileType.exec(fileList[file].name)) {
                    setfileTypeError(true)
                    setFileStatus("Error, your file is not supported type")
                    setFileStatusColor("error")
                } else {
                    setfileTypeError(false)
                    setFileStatus('')
                }
            }

            !fileTypeError ? setNewDocuments(fileList) : setNewDocuments('');
        },
        [fileTypeError, validFileType]
    );

    const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        var formData = new FormData();
        formData.append('album', props.selectedFolder.toLowerCase())

        for (let fileName of Object.values(newDocuments)) {
            console.log(fileName[0]);
          }
          
        if (newDocuments.length < 1) {
            setFileStatus('Please upload something (or something else)')
            setFileStatusColor('error')
        } else {
            for (let i = 0; i < newDocuments.length; i++) {
                formData.append('documents', newDocuments[i])
            }
            setFileStatus('File has successfully uploaded')
            setFileStatusColor('success')
        }
        
        var requestOptions: RequestInit = {
            method: 'PUT',
            body: formData,
            redirect: 'follow'
        };

        fetch("http://localhost:8888/photos", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return (
        <div className="fileUpload">
            <form onSubmit={onSubmit}>
                <input 
                    className="fileUploadInput" 
                    type="file" 
                    name="newDocuments" 
                    id="newDocument" 
                    onChange={onFileChange} 
                    accept="image/*" multiple 
                />
                {/* <label htmlFor="newDocument">Choose File to upload..</label> */}
                <select value={props.selectedFolder} 
                    onChange={props.onChangeSelect} 
                    className="fileUploadSelect"
                >
                    <option value="Food">Food</option>
                    <option value="Nature">Nature</option>
                    <option value="Travel">Travel</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                </select>
                <button className="fileUploadButton" type="submit">Upload</button>
                <p className="fileUploadFolder">{`You have selected to upload to "` + props.selectedFolder + `" folder`}</p>
                <p className={`fileUploadStatus `+ fileStatusColor}>{fileStatus}</p>
            </form>
            </div>
    );
}

export default React.memo(FileUpload);
