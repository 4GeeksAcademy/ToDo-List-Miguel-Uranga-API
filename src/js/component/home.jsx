import React, {useState} from "react";
import ToDoAPI from "./listAPI";

//create your first component
const Home = () => {
	return (
		<div className="container">
			<ToDoAPI/>
		</div>
	);
};

export default Home;
