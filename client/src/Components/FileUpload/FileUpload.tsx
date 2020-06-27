import * as React from 'react';
// import './FileUploadGallery.scss';

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

    const onFileChange = React.useCallback(
        (event) => setNewDocuments(event.target.files),
        []
    );

    const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        var formData = new FormData();
        formData.append('album', props.selectedFolder.toLowerCase())

        for (let i = 0; i < newDocuments.length; i++) {
            formData.append('documents', newDocuments[i])
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
        <div className="container">
                <div className="row">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="file" name="newDocuments" id="newDocument" onChange={onFileChange} accept="image/*" multiple />
                        </div>
                        <select value={props.selectedFolder} 
                                onChange={props.onChangeSelect} 
                            >
                                <option value="Food">Food</option>
                                <option value="Nature">Nature</option>
                                <option value="Travel">Travel</option>
                                <option value="Personal">Personal</option>
                                <option value="Other">Other</option>
                            </select>
                            <p>{`You selected ` + props.selectedFolder}</p>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default React.memo(FileUpload);
