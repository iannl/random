var topics = []
var obj
fetch("book/book.json")
.then(response => {
   return response.json();
})
.then(data => sessionStorage.setItem('temp', JSON.stringify(data)));
var data = sessionStorage.getItem('temp')
window.onload = function() {
    obj = JSON.parse(data);
    console.log(randomTopic('greeting'))
    loop()
}

function getTrigger(str) {
    return str.split('<').pop().split('>')[0];
}

function test() {
    alert(randomTopic('greeting'))
}

function randomTopic(topic) {
    let fulltop = eval('obj.'+topic+'.n'+random(1, 4))
    let out = fulltop.replace('<'+getTrigger(fulltop)+'>', '')
    topics.push(out)
    return out
}

function random(min, max) {
    return  Math.floor(Math.random() * (max+1 - min) + min)
}

function getNextChat(prev) {
    let trigger = getTrigger(prev)
    let next = eval('obj.'+trigger+'.n'+random(1, 4))
    return next
}

function loop() {
    let pre = topics[topics.length-1]
    if (pre == 'end') {
        return
    }
    console.log(getNextChat(pre))
    setTimeout(loop(), random(1000, 3000))
}