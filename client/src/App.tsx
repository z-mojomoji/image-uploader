import React, { Component } from 'react';
import { MouseEvent } from 'react';
import PhotoGallery from './Components/PhotoGallery/PhotoGallery';
import FileUpload from './Components/FileUpload/FileUpload';
import './App.css';

export interface AppProps {
	albums?: AlbumProps[];
}

export interface AppState {
	documents: AlbumProps[];
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
			documents: [
				{
					"id": "fef20926dc1b6ec6dd8f17acaa7a5ad9",
					"album": "Nature",
					"name": "road-1072823_1280.jpg",
					"path": "/albums/Nature/road-1072823_1280.jpg",
					"raw": "http://localhost:8888/photos/nature/road-1072823_1280.jpg"
				},
			],
			currentPage: 1,
			photoPerPage: 14,
			selectedFolder: 'Food',
		};
	}

	componentDidMount() {
		var raw = "{\n    \"skip\": 0,\n    \"limit\": 5\n}";

		var requestOptions: RequestInit = {
			method: 'POST',
			body: raw,
			redirect: 'follow',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		};

		fetch("http://localhost:8888/photos/list", requestOptions)
		.then(response => response.json())
		.then(result => this.setState({ documents: result.documents }))
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
		const { documents, currentPage, photoPerPage, selectedFolder } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<h1>React Image Uploader</h1>
					<FileUpload 
						selectedFolder={selectedFolder} 
						onChangeSelect={ this.handleSelectFolder } 
					/>
					<PhotoGallery 
						photos={documents} 
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
