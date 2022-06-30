import './todo.css'
function Todo(props){

    function editHandler(){
        props.setEditMode(true)
        props.setinputData(props.eachTodo.name)
        props.seteditId(props.eachTodo._id)
      }
    
      function deleteHandler(){
        console.log(props.eachTodo._id)
        props.setTodoArray(prevTodo=>{
            const newTodo = prevTodo.filter(todo=>todo._id!==props.eachTodo._id)
            return newTodo
        })
        fetch('http://localhost:3000/deleteTodo',{
          headers : { 
            "Content-Type": "application/json"
          },
          method:'POST',
          body:JSON.stringify({id:props.eachTodo._id})
        })
      } 

    return <div className="row" key={props.eachTodo._id}>
        <h1 className="title"><i>{props.eachTodo.name}</i></h1>
        <button className='edit' onClick={editHandler}>Edit</button>
        <button classname='delete' onClick={deleteHandler} >Delete</button>
  </div>
}

export default Todo