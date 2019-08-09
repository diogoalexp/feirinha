import React, {Component} from 'react';
import classes from './ImageUpload.module.css';

class ImageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: ''
    };
  
    _handleSubmit = e => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }
  
    _handleImageChange = e =>{
        e.preventDefault();
  
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ file: file, imagePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
  
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
  
      return (
        <div>
            {/* <form onSubmit={this._handleSubmit}> */}
                <input type="file" onChange={this._handleImageChange} />
                {/* <button type="submit" onClick={this._handleSubmit}>Upload Image</button> */}
            {/* </form> */}
            <br/>
            {!$imagePreview && <img className={classes.ImageUpload} src={imagePreviewUrl} alt="Empty"/>}
        </div>
      )
    }
  
}


export default ImageUpload;