import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";
import axios from "axios";

const User = () => {
    const {id} = useParams();
    const [user, setUser] = React.useState<User>({user_id:0, username:""});
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [newUsername, setNewUsername] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(
        () => {
            const getUser = () => {
                axios.get("http://localhost:3000/api/users/" + id)
                    .then((response) => {
                        setErrorFlag(false)
                        setErrorMessage("")
                        setUser(response.data)
                    }, (error) => {
                        setErrorFlag(true)
                        setErrorMessage(error.toString)
                    })
            }
            getUser()
        }, [id]
    )

    const deleteUser = (user: User) => {
        axios.delete('http://localhost:3000/api/users/' + user.user_id)
            .then((response) => {
                navigate('/users')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const updateNewUsernameState = (event: any) => {
        setNewUsername(event.target.value)
    }

    const editUser = (user: User) => {
        if (newUsername === "") {
            alert("Username cannot be blank!")
        } else {
            axios.put('http://localhost:3000/api/users/' + user.user_id, {username: newUsername})
                .then((response) => {
                    navigate('/users/')
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString)
                })
        }
    }

    if(errorFlag) {
        return (
            <div>
                <h1>User</h1>
                <div style={{color: "red"}}>
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
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editUserModal">
                    Edit
                </button>
                <div className="modal fade" id="editUserModal" tabIndex={-1}
                     role="dialog"
                     aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="textbox">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditUserModalLabel">Edit User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" defaultValue="Username" onChange={updateNewUsernameState}/>
                                <button type="button" value="editUsername" data-dismiss="modal"
                                    onClick={()=> editUser(user)} style={{marginLeft:40}}>Update</button>
                            </div>

                        </div>
                    </div>
                </div>


                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
                    Delete
                </button>

                <div className="modal fade" id="deleteUserModal" tabIndex={-1}
                     role="dialog"
                     aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"
                                    id="deleteUserModalLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure that you want to delete this user?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary"
                                        data-dismiss="modal"
                                        onClick={() => deleteUser(user)}>
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default User;