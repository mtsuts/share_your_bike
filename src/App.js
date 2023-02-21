import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import User from './components/User/User'
import UsersList from './components/User/UsersList';
import Edit from './components/Popup/Edit';



function App() {
  const [users, setUsers] = useState([])
  const [editData, setEditData] = useState()


  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`https://user-add-b88d6-default-rtdb.firebaseio.com/user.json`)
      const datum = await response.json()
      const loadedUsers = Object.keys(datum).map(key => {
        return {
          ...datum[key],
          id: key
        }
      })
      setUsers(loadedUsers)
    } catch (error) {
    }
  }, [])


  const deleteObject = useCallback(async (id) => {
    await fetch(`https://user-add-b88d6-default-rtdb.firebaseio.com/user/${id}.json`, {
      method: 'DELETE',
    })
    setUsers(users.filter(d => d.id !== id))
  }, [users]);

  const addBikeHandler = useCallback(async (bike) => {
    const response = await fetch(`https://user-add-b88d6-default-rtdb.firebaseio.com/user.json`, {
      method: 'POST',
      body: JSON.stringify(bike),
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await response.json()
    setUsers([
      ...users,
      {
        name: bike.name,
        brand: bike.brand,
        model: bike.model,
        id: data.name
      }
    ])
  }, [users])

  async function editUser(key, user) {
    await fetch(`https://user-add-b88d6-default-rtdb.firebaseio.com/user/${key}.json`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json'
      },
    })

    const newArray = [...users];
    const found = newArray.findIndex(x => x.id === key);

    if (found > -1) {
      newArray[found] = { ...user, id: key }
      setUsers(newArray)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const showPop = (user) => {
    setEditData(user)
  }

  const closePop = () => {
    setEditData(null)
  }

  return (
    <div className="App">
      <h1> <span> Share your bike </span></h1>
      <User onAddBike={addBikeHandler} />

      <UsersList users={users} delete={deleteObject} edit={showPop} />
      {editData && <Edit onClose={closePop} onEdit={editUser}
        name={editData.name}
        brand={editData.brand}
        model={editData.model}
        id={editData.id} />}
    </div>
  );
}

export default App;
