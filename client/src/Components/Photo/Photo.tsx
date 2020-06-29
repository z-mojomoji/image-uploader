import * as React from 'react';
import './Photo.scss';

export interface PhotoProps {
    id: string;
    album: string;
    name: string;
    path: string;
    raw: string;
}

const Photo = (props: PhotoProps) => {
    return (
        <div className="photo">
            <div className="photoCrop">
                <img src={props.raw} alt={props.album} className="photoImage" />
            </div>
            <h5 className="photoAlbum">{ props.album }</h5>
            <p className="photoName">{ props.name }</p>
        </div>
    );
}

export default React.memo(Photo);

