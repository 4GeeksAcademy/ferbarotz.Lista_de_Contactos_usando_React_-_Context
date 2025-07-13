// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export const Edit = () => {

  const { store, dispatch } = useGlobalReducer()
  const { idToModify } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

useEffect(() => {
  const contact = store.contacts.find(c => c.id == idToModify);
  if (contact) {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setAddress(contact.address);
  }
}, [idToModify, store.contacts]);
 

function modificarContacto() {
    console.log(modificarContacto + idToModify)
    const updatedContact  = {
      name: name,
      email: email,
      address: address,
      phone: phone
    };

    fetch("https://playground.4geeks.com/contact/agendas/Janky/contacts/" + idToModify ,{
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(updatedContact)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Contacto_modificado:", data);
        dispatch({type: "modify_contact", payload: { newContact: data } });
        navigate("/"); 
      })
      .catch(err => {
        console.error("Error modificando contacto:", err);
      });
  }



  return (
    <div className="container">
      <h1 >Add a new contact</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        modificarContacto();
       
      }}
      >
        <div>
          <p>Name</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Email</p>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <p>Phone</p>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <p>Address</p>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Guardar Cambio</button>
        </div>
      </form>


    </div>

  )
};