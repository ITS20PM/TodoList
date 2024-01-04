import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8000/api/todo', {description: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:8000/api/todo')
        setListItems(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:8000/api/todo/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }

  //Update item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:8000/api/todo/${isUpdating}`, {description: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  return (
    <div className="App">
      <h1 className='text-4xl font-bold tracking-wide mb-10'>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input className='rounded p-1.5 drop-shadow-lg' type="text" placeholder='Add Todo Item' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button className="bg-slate-400 hover:bg-neutral-300 ml-6 rounded p-1.5 drop-shadow-lg mb-10" type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content bg-emerald-500">{item.description}</p>
                  <button className="update-item bg-slate-400 hover:bg-neutral-300 ml-6 rounded p-1.5 drop-shadow-lg mr-10 mt-4 mb-6" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="delete-item bg-slate-400 hover:bg-neutral-300 ml-6 rounded p-1.5 drop-shadow-lg mt-4 mb-6" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                </>
            }
          </div>
          ))
        }
        

      </div>
    </div>
  );
}

export default App;
