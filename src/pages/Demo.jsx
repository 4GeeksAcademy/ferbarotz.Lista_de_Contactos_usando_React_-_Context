// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Demo = () => {

  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");



  function crearNuevoContacto() {
    const nuevoContacto = { name, email, phone, address }

    fetch("https://playground.4geeks.com/contact/agendas/Janky/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoContacto)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Contacto creado:", data);
        dispatch({
          type: "add_contact",
          payload: { newContact: data }
        });
        navigate("/");
      })

  }

 



  return (
    <div className="container">
      <h1 >Add a new contact</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        crearNuevoContacto();
       
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
          <button type="submit" className="btn btn-primary">Guardar contacto</button>
        </div>
      </form>


    </div>

  )
};