import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const {store, dispatch} =useGlobalReducer()
	



	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Contact list</span>
				</Link>
				<p>{store.gato}</p>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Add New Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};