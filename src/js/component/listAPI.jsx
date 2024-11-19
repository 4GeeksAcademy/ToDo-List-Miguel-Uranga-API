import React, {useState, useEffect} from "react";

//create the To Do List API
const ToDoAPI = () => {
    let counter = 0;
    const [userName, setUserName] = useState("");
    const [inputValue, setInputValue] = useState("");
	const [cantTareas, setCantTareas] = useState([]);
    const [listItem, setListItem] = useState(
        {
            label: "",
            is_done: false,
            id: 0
        }

    );

    useEffect(() => {
        createUser();
        getList();
    }, []);

    useEffect(() => {
        //Cambio del estado de listItem
        if(listItem.label != ''){
            console.log(cantTareas)
            putItems();
            getList();
        }

    }, [listItem]);


    const createUser = async () => {
        //Creacion del usuario
        
        const response = await fetch('https://playground.4geeks.com/todo/users/Miguel-U', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response.ok) {
            const data = await response.json();
            setUserName(data.name)
            console.log(counter)
            counter != 0 ? alert("User created!") : counter++
        } else {
            console.log('error: ', response.status, response.statusText);
            counter != 0 ? alert("User already exists.") : counter++
            /* Handle the error returned by the HTTP request */
            return {error: {status: response.status, statusText: response.statusText}};
        };
    }

    const getList = async () => {
        //Solicitud GET del API
        const response = await fetch('https://playground.4geeks.com/todo/users/Miguel-U');
        if (response.ok) {
            const data = await response.json();
            setCantTareas(data.todos);
            setUserName(data.name)
            console.log(data.name)

            //console.log(cantTareas);
        } else {
            console.log('error: ', response.status, response.statusText);
            /* Handle the error returned by the HTTP request */
            return {error: {status: response.status, statusText: response.statusText}};
        };
    
    }

    
    const putItems  = async () => {
        //Cambio del estado de cantTareas y adicion al API
        const response = await fetch('https://playground.4geeks.com/todo/todos/Miguel-U', {
            method: "POST",
            body: JSON.stringify(listItem),
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setCantTareas([...cantTareas, data])
        } else {
            console.log('error: ', response.status, response.statusText);
            /* Handle the error returned by the HTTP request */
            return {error: {status: response.status, statusText: response.statusText}};
        };

    }

    function deleteTodoItem(index){
        //Borrar item de la lista en el API
        const deleteItem = async () => {
            const response = await fetch('https://playground.4geeks.com/todo/todos/' + cantTareas[index].id, {
                method: "DELETE",
                body: JSON.stringify(cantTareas[index].label),
                headers: {
                  "Content-Type": "application/json"
                }
              });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                console.log('error: ', response.status, response.statusText);
                /* Handle the error returned by the HTTP request */
                alert("Unable to delete the item")
                return {error: {status: response.status, statusText: response.statusText}};
            };
        }
        console.log(cantTareas[index].id)
        deleteItem()
    } 

    const deleteUser = async () => {
        //Borrar el usuario
        setUserName("Deleted user")
        setCantTareas([])
        const response = await fetch('https://playground.4geeks.com/todo/users/Miguel-U', {
            method: "DELETE",
            body: JSON.stringify("Miguel-U"),
            headers: {
                "Content-Type": "application/json"
            }
            });
        if (response.ok) {
            const data = await response.json();
            alert("User deleted!")
            console.log(data)
        } else {
            alert("This user does not exist")
            console.log('error: ', response.status, response.statusText);
            /* Handle the error returned by the HTTP request */
            return {error: {status: response.status, statusText: response.statusText}};
        };
    }

    return (
        <>
            <p>{userName} To-Dos</p>
            <ul>
            <li id = "listItems">
					<input className="text-body-secondary"
						type="taskAdder" 
						placeholder="Add a task..." 
						onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
						value = {inputValue}
						onKeyPress={(e) => {
							console.log("Key pressed", e.key);
							if(e.key == "Enter" ){
                                //setCantTareas([...cantTareas, listItem])
                                setListItem({
                                    ...listItem,
                                    label: inputValue
                                });
                            }
								 	
						}}
						/>
				</li>
				{cantTareas.length != 0 ? cantTareas.map((item, index)=>(
					<li id = "listItems"> 
						<div className="container d-flex justify-content-between text-body-secondary">
							{item.label} <i 
										id= "exFontAwesome"
										className="fa-solid fa-x mt-3"
										style={{"text-align-last":"right;"}}
										onClick={() => {
                                            setCantTareas(
												cantTareas.filter(
													(t, currentIndex) => index != currentIndex)
													);
                                            console.log(cantTareas[index].id)
                                            deleteTodoItem(index);        
                                            
                                        }}>
							</i>
						</div>
						
					</li>
				)) : false}
				<li id= "numberItems">{cantTareas.length != 0 ? cantTareas.length : ""} {cantTareas.length != 0 ? "item(s) left" : "No items yet"}</li>
            </ul>
            <div className="d-flex justify-content-center">
                <button id = "createButton" className = "mt-5" type = "button" style={{height:"50px", width: "200px"}} onClick={createUser}>Create User</button>
                <button id = "deleteButton" className = "mt-5" type = "button" style={{height:"50px", width: "200px"}} onClick={deleteUser}>Delete User</button>
		    </div>
        </>
        
    )
}

export default ToDoAPI;