import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Users from './Users'

const UsersList = props => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users`)
            .then(res => {
                console.log(res)
                setUserList(res.data)
            })
            .catch(err => console.log('ERROR', err))
    }, [])

    return (
        <div>
            {userList.map(userData => {
                return (
                    <Users
                        key={userData.id}
                        name={userData.name}
                    />
                )
            })}
        </div>
    )
}

export default UsersList