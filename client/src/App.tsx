import React, { Component } from 'react';
import { MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import PhotoGallery from './Components/PhotoGallery/PhotoGallery';
import FileUpload from './Components/FileUpload/FileUpload';

export interface AppProps {
	albums?: AlbumProps[];
}

export interface AppState {
	apiResponse: any;
	currentPage: number,
	photoPerPage: number,
	selectedFolder: string;
}

export interface AlbumProps {
	id: string;
	album: string;
	name: string;
	path: string;
	raw: string;
}

class App extends Component<AppProps, AppState> {
	constructor(props: any) {
		super(props);
		this.onClickPagination = this.onClickPagination.bind(this);
		this.state = {
			apiResponse: {
				"message": "OK",
				"documents": [
					{
						"id": "fef20926dc1b6ec6dd8f17acaa7a5ad9",
						"album": "Nature",
						"name": "road-1072823_1280.jpg",
						"path": "/albums/Nature/road-1072823_1280.jpg",
						"raw": "http://localhost:8888/photos/nature/road-1072823_1280.jpg"
					},
					{
						"id": "f4d11f680804c766edbb1f83867b3f34",
						"album": "Food",
						"name": "food-1932466_1280.jpg",
						"path": "/albums/Food/food-1932466_1280.jpg",
						"raw": "http://localhost:8888/photos/food/food-1932466_1280.jpg"
					},
					{
						"id": "e0f684f32e8252e5d0296998deb11c3b",
						"album": "Travel",
						"name": "japan-2014618_1280.jpg",
						"path": "/albums/Travel/japan-2014618_1280.jpg",
						"raw": "http://localhost:8888/photos/travel/japan-2014618_1280.jpg"
					},
					{
						"id": "d1be8d58bd74ab9a5ce065b79a81f526",
						"album": "Nature",
						"name": "forest-3119826_1280.webp",
						"path": "/albums/Nature/forest-3119826_1280.webp",
						"raw": "http://localhost:8888/photos/nature/forest-3119826_1280.webp"
					},
					{
						"id": "d087db08da2a8cb391a6106c817c465f",
						"album": "Other",
						"name": "taxi-cab-381233_1280.jpg",
						"path": "/albums/Other/taxi-cab-381233_1280.jpg",
						"raw": "http://localhost:8888/photos/other/taxi-cab-381233_1280.jpg"
					},{
						"id": "e0f684f32e8252e5d0296998deb11c3b",
						"album": "Travel",
						"name": "japan-2014618_1280.jpg",
						"path": "/albums/Travel/japan-2014618_1280.jpg",
						"raw": "http://localhost:8888/photos/travel/japan-2014618_1280.jpg"
					},
					{
						"id": "d1be8d58bd74ab9a5ce065b79a81f526",
						"album": "Nature",
						"name": "forest-3119826_1280.webp",
						"path": "/albums/Nature/forest-3119826_1280.webp",
						"raw": "http://localhost:8888/photos/nature/forest-3119826_1280.webp"
					},
					{
						"id": "d087db08da2a8cb391a6106c817c465f",
						"album": "Other",
						"name": "taxi-cab-381233_1280.jpg",
						"path": "/albums/Other/taxi-cab-381233_1280.jpg",
						"raw": "http://localhost:8888/photos/other/taxi-cab-381233_1280.jpg"
					},{
						"id": "e0f684f32e8252e5d0296998deb11c3b",
						"album": "Travel",
						"name": "japan-2014618_1280.jpg",
						"path": "/albums/Travel/japan-2014618_1280.jpg",
						"raw": "http://localhost:8888/photos/travel/japan-2014618_1280.jpg"
					},
					{
						"id": "d1be8d58bd74ab9a5ce065b79a81f526",
						"album": "Nature",
						"name": "forest-3119826_1280.webp",
						"path": "/albums/Nature/forest-3119826_1280.webp",
						"raw": "http://localhost:8888/photos/nature/forest-3119826_1280.webp"
					},
					{
						"id": "d087db08da2a8cb391a6106c817c465f",
						"album": "Other",
						"name": "taxi-cab-381233_1280.jpg",
						"path": "/albums/Other/taxi-cab-381233_1280.jpg",
						"raw": "http://localhost:8888/photos/other/taxi-cab-381233_1280.jpg"
					}
				],
				"count": 50,
				"skip": 0,
				"limit": 5
			},
			currentPage: 1,
			photoPerPage: 14,
			selectedFolder: 'Food'
		};
	}

	componentDidMount() {
		var raw = {
			"skip": 0,
			"limit": 5
		};

		var requestOptions: RequestInit = {
			method: 'POST',
			body: JSON.stringify(raw),
			redirect: 'follow'
		};

		fetch("http://localhost:8888/photos/list", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	}

	deletePhoto = (id: string, album: string, name: string) => {
		var requestOptions: RequestInit = {
			method: 'DELETE',
			redirect: 'follow'
		  };
		  
		fetch(`http://localhost:8888/photos/`+ album + `/` + name , requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	}

	uploadPhoto = (e: React.ChangeEvent<HTMLButtonElement>) => {
		e.preventDefault()

        var formData = new FormData();
        // for (const key of Object.keys(this.state.imgCollection)) {
        //     formData.append('imgCollection', this.state.imgCollection[key])
		// }
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

	handleSelectFolder = (e:React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({selectedFolder: e.target.value})
	}

	onClickPagination (e: MouseEvent<HTMLElement>) {
		const target = e.target as HTMLButtonElement;

		this.setState({
		  currentPage: Number(target.id),
		});
	  }

	render() {
		const { apiResponse, currentPage, photoPerPage, selectedFolder } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<FileUpload selectedFolder={selectedFolder} onChange={ this.handleSelectFolder } onSubmit={this.uploadPhoto}/>
					<PhotoGallery 
						photos={apiResponse.documents} 
						deletePhoto={this.deletePhoto} 
						currentPage={currentPage} 
						photoPerPage={photoPerPage}
						onClickPagination={this.onClickPagination}
					/>
				</header>
			</div>
		);
	}
}

export default App;
