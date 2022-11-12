const rootElement = document.getElementById('root')

const UserList = () => {
	const [users, setUsers] = React.useState([])
	const getUsers = () => {
		axios.get('http://localhost:3000/api/users')
			.then((response) => {
				console.log(response.data)
				setUsers(response.data)
			}, (error) => {
				console.log(error)
			})
	}
	
	const list_of_users = () => {
		return users.map((user) =>
			<li key={user.user_id}> <p>{user.username}</p> </li>)
	}
	
	return (
		<div>
			<h1>Users</h1>
			<ul>
			{list_of_users()}
			</ul>
		</div>
	)
}

funciton App() {
	return (
		<div>
			<UserList/>
		</div>
	)
}

ReactDOM.reneder (
	<App/>, rootElement
)