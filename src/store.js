export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed1",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],

    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'delete_contact':

      const { indexDelete } = action.payload
      console.log('store delete_contact ' + indexDelete)
      return {
        ...store,
        contacts: store.contacts.filter((elementContact, index) => index != indexDelete)
      };


    case 'add_contact': {
      const { newContact } = action.payload;
      return {
        ...store,
        contacts: [...store.contacts, newContact]
      };
    }

    case 'modify_contact': {
      const { newContact } = action.payload;
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === newContact.id ? newContact : contact
        )
      };
    }

    //codigo//////////////////
    case 'load_contact':

      const { newContacts } = action.payload
      console.log('store load_contact ' + newContacts)
      return {
        ...store,
        contacts: newContacts
      };
    //codigo//////////////////


    default:
      throw Error('Unknown action.');
  }
}
