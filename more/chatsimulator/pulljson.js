var obj
fetch("book/happy.json")
.then(response => {
   return response.json();
})
.then(data => sessionStorage.setItem('temp', JSON.stringify(data)));
var data = sessionStorage.getItem('temp')
window.onload = function() {
    obj = JSON.parse(data);
}

function getTrigger(str) {
    return str.split('/').pop().split('//')[0];
}