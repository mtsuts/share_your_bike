import React, { useState} from "react"
import Card from '../UI/Card'
import './User.css'
import Button from '../UI/Button'
import ErrorModal from "../Popup/ErrorModal"



const User = props => {

    const [enteredName, setEnteredName] = useState('')
    const [enteredBrand, setEnteredBrand] = useState('')
    const [enteredModel, setEnteredModel] = useState('')
    const [error, setError] = useState();

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value)
    }
    const ageChangeHandler = (event) => {
        setEnteredBrand(event.target.value)
    }
    const modelChangeHandler = (event) => {
        setEnteredModel(event.target.value)
    }

    const addBikeHandler = (event) => {
        const user = {
            name: enteredName,
            brand: enteredBrand,
            model: enteredModel,
        }
        event.preventDefault()
        if (enteredName.trim().length === 0 || enteredModel.trim().length === 0 || enteredBrand.length === 0) {
            setError({
                text: 'Empty Input',
                title: "Invalid Input"
            });
            return;
        }
        props.onAddBike(user)
        setEnteredName('')
        setEnteredBrand('')
        setEnteredModel('')
    }

    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            {error && <ErrorModal
                text={error.text}
                onConfirm={errorHandler}
                title={error.title}
            />}
            <Card className='userForm'>
                <form className="form" onSubmit={addBikeHandler}>
                    <input
                        type='text'
                        placeholder="Your name"
                        onChange={nameChangeHandler}
                        value={enteredName}
                    />
                    <input
                        type='text'
                        placeholder="bicycle brand"
                        onChange={ageChangeHandler}
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
                    >
                        Add your bike </Button>
                </form>
            </Card>
        </>
    )
}

export default User 
