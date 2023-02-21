import React from "react";
import './UsersList.css'
import Card from '../UI/Card'
import Button from '../UI/Button'


const UsersList = props => {

    return (
        <Card className='userList'>
            {props.users.map((user, i) => {

                return <li key={i} >
                    {user.name}: I have {user.brand}  {user.model}  <br />

                    <Button onClick={() => props.delete(user.id)}> Delete </Button>
                    <Button onClick={() => props.edit(user)} className='editBtn'> Edit</Button>
                </li>
            })}
        </Card >
    )
}

export default UsersList;
