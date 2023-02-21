import React from "react";
import './ErrorModal.css'
import Card from '../UI/Card'
import Button from '../UI/Button'

const ErrorModal = (props) => {
    return <>
        <div className="backdrop" onClick={props.onConfirm}> </div>
        <Card className='modal'>
            <header className='header'> {props.title}</header>
            <div className="content"> {props.text}</div>
            <footer className='actions'> <Button className='errorBtn' onClick={props.onConfirm}> Close</Button></footer>
        </Card>
    </>
}

export default ErrorModal;