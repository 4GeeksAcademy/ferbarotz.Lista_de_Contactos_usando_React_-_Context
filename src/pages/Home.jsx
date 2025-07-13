import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	function getContacts() {

		fetch('https://playground.4geeks.com/contact/agendas/Janky/contacts')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.contacts)
				dispatch({
					type: 'load_contact',
					payload: {
						newContacts: data.contacts
					}
				})
			})

	}

	useEffect(() => {
		console.log('se cargo home')
		getContacts()
	}, [store.updated])


	function deleteContact(idToDelete) {
		console.log(deleteContact + idToDelete)
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/contact/agendas/Janky/contacts/" + idToDelete, requestOptions)
			.then((response) => response.text())
			.then((result) => {
				console.log(result)
				getContacts()
			})

	}


	return (
		<div className="text-center mt-5">
			
			<div  style={{maxWidth: "1000px", margin: " auto",padding: "5px"}}>
			<ul className="list-group">
				{store && store.contacts?.map((item, index) => {
					return (
						<li
							key={index} 
							className="list-group-item d-flex justify-content-between"
						>
							<img
								src="https://images.icon-icons.com/185/PNG/512/Contacts_22705.png"
								alt="avatar genérico"
								style={{ width: "200px", height: "200px", borderRadius: "50%",objectFit: "cover",marginRight: "15px", marginLeft: 50  }}/>
							<div style={{ textAlign: "center" }}>
								<p style={{ fontWeight: "bold",lineHeight: "1"  }}>{item.name}</p>
								<p>Phone: {item.phone}</p>
								<p>email: {item.email}</p>
								<p>Id: {item.id}</p>
								<p>address: {item.address}</p>
							</div>
							<div>
								<button onClick={() => navigate(`/edit/${item.id}`)}>Editar</button>
								<button onClick={() => deleteContact(item.id)}>Eliminar </button>
							</div>

						</li>
					);
				})}
			</ul>
			</div>
		</div>
	);
}; 