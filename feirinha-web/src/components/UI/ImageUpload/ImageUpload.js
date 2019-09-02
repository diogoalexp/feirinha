import React, {Component} from 'react';
import classes from './ImageUpload.module.css';
import noImg from '../../../assets/images/no-image-icon.png';

class ImageUpload extends Component {
    
    state = {
        file: '',
        imagePreviewUrl: ''
    };
  
    _handleSubmit = e => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('TODO: do something with -> this.state.file');
    }
  
    _handleImageChange = e =>{
        e.preventDefault();
        let result = null;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            result = reader.result;
            this.setState({ file: file, imagePreviewUrl: reader.result });
            this.props.upload(result, "img")
        }
        reader.readAsDataURL(file)
        // this.props.file = file;
        // this.props.upload(e.target.files[0], "img")
    }
  
    render() {
        let imagem = noImg;
        let {imagePreviewUrl} = this.state;
        if (this.props.value != null){
            imagem = "data:image/png;base64,"+this.props.value;
        }
        let $imagePreview = null;
      return (
        <div>
            {/* <form onSubmit={this._handleSubmit}> */}
                {!this.props.readOnly ? <input type="file" onChange={this._handleImageChange} /> : null}
                {/* <input type="file" onChange={this.props.upload} /> */}
                {/* <button type="button" onClick={this.props.imageHandler}>Upload Image</button> */}
            {/* </form> */}
            <br/>
            {/* {!$imagePreview && <img className={classes.ImageUpload} src={imagePreviewUrl} alt="Empty"/>} */}
            {!$imagePreview && 
                <div className={classes.Imagem}>
                    <img className={classes.ImageUpload} src={imagem} alt={noImg}/>
                </div>
                }
            {/* {<img className={classes.ImageUpload} src={"data:image/png;base64,"+this.props.value} alt="vazio"/>} */}
        </div>
      )
    }
  
}


export default ImageUpload;