import React from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const User = () => {
    const {id} = useParams();
    const [user, setUser] = React.useState({user_id:0, username:""});
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(
        () => {
            const getUser = () => {
                axios.get('http://localhost:3000/api/users/'+id)
                    .then(
                        (response) => {
                            setErrorFlag(false)
                            setErrorMessage("")
                            setUser(response.data)
                        }, (error) => {
                            setErrorFlag(true)
                            setErrorMessage(error.toString)
                        }
                    )
            }
            getUser()
        }, [id]
    )
    if (errorFlag) {
        return (
            <div>
                <h1>User</h1>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
                <Link to={"/users"}>Back to users</Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>User</h1>
                {user.user_id}: {user.username}
                <Link to={"/users"}>Back to users</Link>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
            </div>
        )
    }
}

export default User;