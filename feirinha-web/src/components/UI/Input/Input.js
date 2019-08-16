import React from 'react';

import classes from './Input.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';
import Button from '../Button/Button';

const input = ( props ) => {
    let inputElement = null;
    let inputLabel = null;
    const inputClasses = [classes.InputElement];
    if (props.readOnly)
        inputClasses.push(classes.ReadOnly);
    const hasElements = props.elementConfig != null && props.elementConfig.options != null;


    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    function dataFormatada(date){
        const data = new Date(date),
            dia  = data.getUTCDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return anoF+"-"+mesF+"-"+diaF;
    }

    let rem = (e) =>{
        console.log("[rem]");
        // console.log(value.key);
        props.unselect(e.target.value, "participantes")
        // return value;
    }

    // function fileRead(event){
    //     console.log(event);
    //     event.preventDefault();
    //     const reader = new FileReader();
    //     const file = event.target.files[0];
        
    //     reader.onloadend = () => onFileLoaded(reader.result);//this.props.onFileLoaded(reader.result);
    //     reader.readAsDataURL(file);
    //     console.log(file);
    // }

    // function onFileLoaded(param){
    //     console.log(param);
    // }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <div>
                <input
                    className={inputClasses.join(' ')}
                    readOnly={props.readOnly}
                    {...props.elementConfig}
                    value={props.value}                
                    onChange={props.changed} />
                </div>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                readOnly={props.readOnly}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    disabled={props.readOnly}
                    value={props.value}
                    onChange={props.changed}>
                    {hasElements ? props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    )) : hasElements}
                </select>
            );
            break;
        case ( 'select-multiple' ):
                inputElement = (
                    <div className={classes.Container}>
                        <div className={props.readOnly ? classes.Hidden : null} /*className={classes.DivMain}*/>
                            <div /*className={classes.DivLeft}*/> 
                                <select id="selecteTest"
                                    // multiple={true}
                                    className={inputClasses.join(' ')}
                                    disabled={props.readOnly}
                                    value={0}
                                    onChange={props.changed}
                                    
                                    >
                                    {props.elementConfig.options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.displayValue}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className={classes.DivRight}> 
                                <Button btnType="Success" type="button" clicked={add} value={valor}>+</Button> 
                            </div> */}
                        </div>
                        {props.value.map(val => (
                            <div key={val.id} className={classes.DivMain}>
                                <div className={classes.DivLeft}> 
                                    <p key={val.id}>{val.nome}  </p>     
                                </div>  
                                <div>
                                    {!props.readOnly ? <Button key={val.id} btnType="Danger" type="button" clicked={rem} value={val.id} >-</Button> : null}
                                </div> 
                            </div>                            
                        ))}                           
                    </div>
                    
                );
                break;
        case ( 'date' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                readOnly={props.readOnly}
                {...props.elementConfig}
                 value={dataFormatada(props.value)}
                onChange={props.changed} />;
            break;
        case ( 'img' ):
            inputElement = (
                    <div className="row justify-content-center mb-2">
                        {/* <input type="file" onChange={(event) => fileRead(event)}/>
                        <div id="result">teste</div>
                        <img src={imagem} /> */}

                        <ImageUpload file={props.value} {...props}/>
                    </div>
                );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                readOnly={props.readOnly}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;