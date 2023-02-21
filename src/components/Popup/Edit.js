import React, { useState } from "react";
import Card from '../UI/Card'
import Button from '../UI/Button'
import './Edit.css'
import ErrorModal from "./ErrorModal";

const Edit = props => {
    const [enteredName, setEnteredName] = useState(props.name)
    const [enteredBrand, setEnteredBrand] = useState(props.brand)
    const [enteredModel, setEnteredModel] = useState(props.model)
    const [error, setError] = useState();

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value)
    }

    const brandChangeHandler = event => {
        setEnteredBrand(event.target.value)
    }


    const modelChangeHandler = event => {
        setEnteredModel(event.target.value)
    }

    const errorHandler = () => {
        setError(null)
    }

    const editHandler = (event) => {
        const id = props.id
        const user = {
            name: enteredName,
            brand: enteredBrand,
            model: enteredModel, 
        }
        event.preventDefault()
        if (enteredName.length === 0 || enteredModel.length === 0 || enteredBrand.length === 0) {
            setError({
                text: 'Empty Input',
                title: "Invalid Input"
            });
            return;
        }
       props.onEdit(id, user)
       setEnteredBrand('')
       setEnteredModel('')
       setEnteredName('')
       props.onClose()
    }

    return (<>
        <div className="backdrop-edit" onClick={props.onClose}> </div>
        {error && <ErrorModal
            text={error.text}
            onConfirm={errorHandler}
            title={error.title}
        />}

        <Card className='modal-edit'>
            <header className='header'> Edit your data</header>
            <div className="content">
                <form className="form" onSubmit={editHandler}>
                    <input
                        type='text'
                        placeholder="Your name"
                        onChange={nameChangeHandler}
                        value={enteredName}
                    />
                    <input
                        type='text'
                        placeholder="bicycle brand"
                        onChange={brandChangeHandler}
                        value={enteredBrand}
                    />
                    <input
                        type='text'
                        placeholder="model"
                        onChange={modelChangeHandler}
                        value={enteredModel}
                    />
                    <Button
                        className='button'
                        type="submit"
                    >  Edit </Button>
                </form>

            </div>
            <footer className='actions'>
                <Button
                    className='errorBtn'
                    onClick={props.onClose}>
                    Close
                </Button>
            </footer>
        </Card>
    </>
    )
}

export default Edit;