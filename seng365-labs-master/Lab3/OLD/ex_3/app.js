
const rootElement = document.getElementById('root')

const ShoppingList = () => {
	let visible = true;
	if (visible) {
		return (
			<div>
				<h1>My Shopping List</h1>
			</div>
		)
	}
}


function App(){
	return (
		<div>
			<ShoppingList/>
		</div>
	)
}

ReactDOM.render(<App/>, rootElement)
