import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };
        this.onDrop = this.onDrop.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    uploadImages(picture) {
        let uploadPromises = this.state.pictures.map(image => {
            let data = new FormData();
            data.append('image', image,image.name);
            return axios.post('/api/uploadImage', data);
        })
        axios.all(uploadPromises)
            .then(results => {
                console.log('server response: ')
                console.log(results);
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <section className="upload-section">
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Select images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <button onClick={this.uploadImages}>Upload Images</button>
            </section>

        );
    }
}


export default Upload;