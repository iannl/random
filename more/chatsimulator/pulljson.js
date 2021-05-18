fetch("book/happy.json")
.then(response => {
   return response.json();
})
.then(data => sessionStorage.setItem('temp', data));
var data = sessionStorage.getItem('temp')
window.onload = function() {
    alert(data.greeting.n1)
}