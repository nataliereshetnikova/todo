import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './css/styles.css';
import TodoView from './hbs/TodoItemsTemplate.hbs';
import TodoItems from './hbs/todoItems.hbs';

import Todos from './js/todoApi';

let app = document.getElementById('app');
app.innerHTML = TodoView({ now: new Date().toISOString() });

let todos = new Todos('https://localhost:5001/api/');
let items = {};
let refresh=()=>{
	todos.getTodos().then((list) => {
		items = list;
		let itemsList = document.getElementById('items');
		console.log(list);
		itemsList.innerHTML = TodoItems(list);

		let deleteBtns = document.getElementsByClassName('delete-task');
		deleteBtns.forEach((btn)=>{
			btn.addEventListener('click',(e)=>{
				let id = e.target.dataset.id;
				todos.deleteTodo(id).then((res)=>{
					refresh();
				});
			});
		});

		let completeCheckbox = document.getElementsByClassName('complete-task');
		completeCheckbox.forEach((checkbox)=>{
			checkbox.addEventListener('change',(e)=>{
				let id = e.target.dataset.id;
				let item = null;
				list.forEach((todo)=>{
					if(todo.id == id){
						item=todo;
					}
				});
				if(item===null){
					return;
				}
				if(checkbox.checked){
					item.isComplete = true;
				} else{
					item.isComplete = false;
				}
				todos.setTodoComplete(item, id).then((res)=>{
					refresh();
				});
			});
		});

	});
}

document.getElementById("add").addEventListener("click", ()=>{
	let fields= document.querySelectorAll("#new input, #new textarea");
	console.log(fields);
	if(fields.length>0){
		let newTodo= {};
		fields.forEach((field)=>{
		let val = field.value.trim();
		if(val !==""){
			newTodo[field.id]=val;
		}
		});
		console.log(newTodo);
		todos.addTodo(newTodo).then((res)=>{
			refresh();
		});
	}

});

refresh();
