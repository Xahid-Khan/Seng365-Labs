import {Link, useParams} from "react-router-dom";
import React from "react";
import axios from "axios";

function validateUsername() {
    // @ts-ignore
    let newUserName = document.getElementById("newUserName").ariaValueText;
    if (newUserName === "") {
        alert("Must not be empty");
        return false;
    } else {
        return true;
    }
}

const EditUser = () => {
    const {id} = useParams();
    const [user, setUser] = React.useState({user_id: 0, username:""});
    const [errorFlag, setErrorflag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(
        () => {
            const updateUser = () => {
                axios.put('http://localhost:3000/api/users/'+ id)
                    .then(
                        (response) => {
                            setErrorflag(false)
                            setErrorMessage("")
                            setUser(response.data)
                        }, (error) => {
                            setErrorflag(true)
                            setErrorMessage(error.toString)
                        }
                    )
            }
        }, [id]
    )
    if (errorFlag) {
        return (
            <div>
                <h1>Edit User</h1>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
                <Link to={"/users"}>Back to users</Link>
            </div>
        )
    } else {
        return (
            <div>
                <form id="editUserForm" action="#/users" onSubmit="return validateUsername()">
                    <text values="Enter User Name">New Username</text>
                    <input type="text" id="newUserName"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}