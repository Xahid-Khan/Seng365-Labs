const rootElement = document.getElementById('root')
const UserList = () => {
    let editUserForm = true
    const [users, setUsers] = React.useState([])
    const [username, setUsername] = React.useState("")
    const [newUserName, setNewUserName] = React.useState("")

    const getUsers = () => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
            }, (error) => {
                console.log(error)
            })
    }

    const addUser = () => {
        if (username === "") {
            alert("Please enter a username!")
        } else {
            axios.post('http://localhost:3000/api/users', {"username": username})
        }
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    const updateUsernameState = (event) => {
        setUsername(event.target.value)
    }

    const setNewUserNameState = (event) => {
        setNewUserName(event.target.value)

    }

    let editingForm = "";
    const editUser = (item) => {
        editingForm = true;
    }

    const list_of_users = () => {
        return users.map((item) =>
            <li key={item.user_id}> <p>{item.username}</p>
                {editUserForm ? (
                    <div>
                        <form onSubmit={() => updateUser(item)}>
                            <input type="text" defaultValue={item.username} onChange={setNewUserNameState}/>
                            <input type="Submit" value="Submit"/>
                            <input type="Submit" value="Cancel"/>
                        </form>
                </div>): ""}
                <button onClick={() => deleteUser(item)}>Delete</button>
                <button onClick={()=> editUser(item)}>Edit</button>
            </li>)
    }

    const updateUser = (user) => {

        axios.put('http://localhost:3000/api/users/' + user.user_id, {"username" : newUserName})
            .then((response) => {
                setUsername(response.toString)
                editUserForm = false
            })
    }

    const deleteUser = (user) => {
        axios.delete('http://localhost:3000/api/users/' + user.user_id)
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {list_of_users()}
            </ul>

            <h2>Add a new user:</h2>
            <form onSubmit={addUser}>
                <input type="text" value={username} onChange={updateUsernameState}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

function App() {
    return(
        <div>
            <UserList/>
        </div>
    )
}

ReactDOM.render(
    <App/>, rootElement
)