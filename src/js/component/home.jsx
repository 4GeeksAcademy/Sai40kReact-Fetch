import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [todoList, settodoList] = useState([]);

	const createUser = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sai40k",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};

	const getList = async () => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/sai40k");
			const data = await response.json();
			settodoList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const UpdateList = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/sai40k",
				{
					method: "PUT",
					body: JSON.stringify(todoList),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			settodoList(data);
		} catch (error) {
		}
	};

	useEffect(() => {
		getList();
		UpdateList()
		if (!createUser) {
			createUser();
		}
	}, [todoList]);
	

	const addTask = (e) => {
		if (e.key === "Enter" && input.trim() !== "") {
			settodoList([...todoList, { label: input, done: false }]);
			setInput("");
		}
	};

	const deleteTasks = (id) => {
		settodoList(todoList.filter((task, index) => index !== id));
	};

	return (
		<div className="container d-flex justify-content-center ">
			<div className="body m-4 p-5 border rounded bg-light" style={{width: 500,}}>
			<h1 className="text-center m-4 rounded bg-primary">To do List </h1>

			<div className="input-group mb-3">
				<input
					class="form-control"
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyUp={addTask}
					placeholder="Add task"
				/>
			</div>

			<ul className="list-group list-group-numbered pt-2 d-grid gap-2 d-flex">
				{todoList.length === 0 ? (
					<li className=" gap-3 fs-5 text-center rounded d-flex ">The list is empty</li>
				) : (
					todoList.map((task, index) => (
						<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center" key={index}>
							{task.label}{" "}
							<button className="btn btn-outline-danger ms-2 py-0 px-1" type="button" onClick={() => deleteTasks(index)}>	
							</button>
						</li>
					))
				)}
			</ul>
		</div>
		</div>
	);
};

export default Home;