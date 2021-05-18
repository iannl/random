var obj
fetch("book/book.json")
.then(response => {
   return response.json();
})
.then(data => sessionStorage.setItem('temp', JSON.stringify(data)));
var data = sessionStorage.getItem('temp')
window.onload = function() {
    obj = JSON.parse(data);
}

function getTrigger(str) {
    return str.split('<').pop().split('>')[0];
}

function test() {
    alert(randomTopic('greeting'))
}

function randomTopic(topic) {
    let fulltop = eval('data.'+topic+'.n'+random(1, 4))
    return fulltop.replace('<'+getTrigger(fulltop)+'>', '')
}

function random(min, max) {
    return  Math.floor(Math.random() * (max+1 - min) + min)
}