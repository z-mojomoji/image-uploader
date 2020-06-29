import * as React from 'react';
import { MouseEvent } from 'react';
import Photo, { PhotoProps } from '../Photo/Photo';
import './PhotoGallery.scss';

export interface PhotoGalleryProps {
    photos: PhotoProps[];
    currentPage: number;
    photoPerPage: number;
    onClickPagination: (e: MouseEvent<HTMLElement>) => void;
    deletePhoto: (id: string, album: string, name: string) => void;
}

const PhotoGallery = (props: PhotoGalleryProps) => {
    
    const indexOfLastPhotos = props.currentPage * props.photoPerPage;
    const indexOfFirstPhotos = indexOfLastPhotos - props.photoPerPage;
    const currentPhotos = props.photos.slice(indexOfFirstPhotos, indexOfLastPhotos);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.photos.length / props.photoPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
        <li key={number} className="photoGalleryPaginationItem">
            <button
                onClick={props.onClickPagination}
                id={number.toString()}
            >
                {number}
            </button>
        </li>
        );
    });

    return (
        <div className="photoGallery">
            { props.photos ? currentPhotos.map((items, i) =>
                <div className="photoGalleryItem" key={i}>
                    <Photo 
                        id={ items.id }
                        album={ items.album }
                        name={ items.name }
                        path={ items.path }
                        raw={ items.raw }
                     />
                    <button className="photoGalleryButton" onClick={ () => { 
                         if(window.confirm('Delete the photo?')) { props.deletePhoto(items.id, items.album, items.name) } 
                    } }>
                        Delete
                    </button>
                </div>
              ): null 
            }
            <ul className="photoGalleryPagination">
                {renderPageNumbers}
            </ul>
        </div>
    );
}

export default React.memo(PhotoGallery);

