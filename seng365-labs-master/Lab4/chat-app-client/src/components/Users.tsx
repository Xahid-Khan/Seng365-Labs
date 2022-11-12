import React from "react";
import axios from "axios";
import user from "./User";
import {Link} from "react-router-dom";


const Users = () => {
    const [users, setUsers] = React.useState<Array<User>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(
        () => {
            getUsers()
        }, []
    )

    const getUsers = () => {
        axios.get('http://localhost:3000/api/users')
            .then(
                (response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setUsers(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString)
                }
            )
    }

    const list_of_users = () => {
        return (
            users.map((subUser) =>
                <tr>
                    <th scope="row"> {subUser.user_id} </th>
                    <td> {subUser.username} </td>
                    <td> <Link to={"/users/" + subUser.user_id }> Go To User </Link> </td>
                    <td>
                        <button type="button">Delete</button>
                        <button type="button">Edit</button>
                    </td>
                </tr>
            )
        )
    }

    if (errorFlag) {
        return (
            <div>
                <h1>Users</h1>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username</th>
                        <th scope="col">link</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_of_users()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Users