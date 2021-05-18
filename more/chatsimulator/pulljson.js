fetch("book/happy.json")
.then(response => {
   return response.json();
})
.then(data => console.log(data));
alert(data)