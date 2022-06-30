import {useState, useEffect} from 'react'
import './App.css';
import Todo from './components/Todo'

function App() {

  const [inputData, setinputData] = useState('')

  const [TodoArray, setTodoArray] = useState([])

  const [editMode,setEditMode] = useState(false)

  const [editId, seteditId] = useState()
  
  useEffect(()=>{
    fetch('http://localhost:3000/getTodos')
    .then(todos=>{
        todos.json()
        .then(res=>{
          setTodoArray(res.todos) 
        })
    })
  },[inputData])

  function submitHandler(event){
    event.preventDefault()
    if(editMode){
      fetch('http://localhost:3000/editTodo',{
        headers : { 
          "Content-Type": "application/json"
        },
        method:'POST',
        body:JSON.stringify({id:editId, newText:inputData})
      })
      .then(res=>{
        setinputData('')
        setEditMode(false)
      })
    }else{
      fetch('http://localhost:3000/addTodo',{
        headers : { 
          "Content-Type": "application/json"
        },
        method:'POST',
        body:JSON.stringify({item:inputData})
      })
      .then(res=>{
        setTodoArray([...TodoArray,inputData])
        setinputData('')
      }) 
    }          
  }

  return (
    <div>
      <h1 className='header'>My TODO's</h1>
      <form>
        <input id="input" placeholder="add your Todo" onChange={e=> setinputData(e.target.value)} value={inputData}/>
        <button onClick={e=>submitHandler(e)}>{editMode?'Update':'Submit'}</button>
      </form>
      {TodoArray.length>0 && TodoArray.map(eachTodo=>{ 
        return <Todo key={eachTodo._id} inputData={inputData} setEditMode={setEditMode} 
                      setinputData={setinputData} setTodoArray={setTodoArray} 
                      eachTodo={eachTodo} seteditId={seteditId}/>
      })}
      {!TodoArray.length && <h1 className='mssg'>You can Chill !! No todos😊</h1>}
    </div>
  );
}

export default App;
