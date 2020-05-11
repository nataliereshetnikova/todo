export default class {
   constructor(baseUrl) {
      this.baseUrl = baseUrl;
   }
 
   async getTodos() {
      let raw = await fetch(this.baseUrl + 'todoitems/', {
         mode: 'cors',
         cache: 'no-cache',
         method: 'GET',
      });
 
      let pdata = await raw.json();
      //console.log(pdata);
      return pdata;
   }
 
   async addTodo(todo) {
      let req = await fetch(this.baseUrl + 'todoitems/', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(todo),
      });
 
      let res = await req.json();
      return res;
   }

   async deleteTodo(id){
	    let req = await fetch(this.baseUrl + 'todoitems/'+id, {
            method:'DELETE',
            
        });
        let res=await req.json();
        return res;
    }

    async setTodoComplete(todo,id){
	    let req = await fetch(this.baseUrl + 'todoitems/'+id, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify(todo),
        });
        return;
    }
}
