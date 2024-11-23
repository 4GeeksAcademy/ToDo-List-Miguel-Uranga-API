import React, {useState} from "react";


//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [cantTareas, setCantTareas] = useState([]);
	


	return (
		<div className="container">
			<p>My To-Dos</p>
			<ul>
				<li id = "listItems">
					<input className="text-body-secondary"
						type="taskAdder" 
						placeholder="Add a task..." 
						onChange={(e) => setInput(e.target.value)}
						value = {input}
						onKeyPress={(e) => {
							console.log("Key pressed", e.key);
							if(e.key == "Enter" )
								setCantTareas(cantTareas.concat(input)) 	
						}}
						/>
				</li>
				{cantTareas.map((item, index)=>(
					<li id = "listItems"> 
						<div className="container d-flex justify-content-between text-body-secondary">
							{item} <i 
										id= "exFontAwesome"
										className="fa-solid fa-x mt-3"
										style={{"text-align-last":"right;"}}
										onClick={() => setCantTareas(
												cantTareas.filter(
													(t, currentIndex) => index != currentIndex)
													)}>

							</i>
						</div>
						
					</li>
				))}
				<li id= "numberItems">{cantTareas.length != 0 ? cantTareas.length : ""} {cantTareas.length != 0 ? "item(s) left" : "No items yet"}</li>
				
			</ul>

		</div>

		
	);
};

export default Home;
