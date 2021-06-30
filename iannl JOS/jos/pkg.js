var canvas;
var ctx;
var jos = {
    write:function(i,x=canvas.width/2,y=canvas.height/2,font="30px Arial",fs='black',ta="center"){
        ctx.font = font;
        ctx.textAlign = ta
        ctx.fillStyle = fs
        ctx.fillText(i, x, y); 
    },
    img:function(imageUrl='', width=0, height=0, x=0, y=0){
        var h = height
        var w = width
        var px = x
        var py = y
        const image = new Image(60, 45); // Using optional size for image
        image.onload = drawImageActualSize; // Draw when image has loaded

        // Load an image of intrinsic size 300x227 in CSS pixels
        image.src = imageUrl;

        function drawImageActualSize() {
        ctx.drawImage(this, px, py, w, h);}
    },
    clear:function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    sleep:function(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    sudo:{
        load:'jos/sudo-load.jpa'
    },
    app:{
        terminal:'jos/app-terminal.jpa'
    },
    loadJPA:async function(url=''){
        const data = await fetch(url);
        alert(data);
        return data;
    },
    boot:function(){
        jos.clear()
    },
    load:'not loaded',
    app_terminal:{
        load:'not loaded'
    },
}
window.onload=function(){newJOS()}
function newJOS(inp='body'){
document.getElementsByTagName(inp)[0].innerHTML+='<canvas id="jos" width="500" height="500"></canvas>'
canvas = document.getElementById("jos");
ctx = canvas.getContext("2d");
//parseJPA("jos.write('Booting...',0,16,'20px Arial','black','left')")
parseJPA(`jos.loadJPA(jos.sudo.load)`)
}

function parseJPA(code='jos.write("Please supply code.")'){
    try{eval(code)}catch(e){console.warn('Error in parsing JPA: '+e);parseJPA('jos.write("Error in parsing JPA: '+e+'",canvas.width/2,canvas.height/2,"12px Comic Sans MS","red")')}
}
function stob(input) {
    var characters = input.split('');
  
    return characters.map(function(char) {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      // Just to make sure it is 8 bits long.
      return '0'.repeat(pad) + binary;
    }).join('');
  }
  
  function btos(input) {
    let bytesLeft = input;
    let result = '';
  
    // Check if we have some bytes left
    while (bytesLeft.length) {
      // Get the first digits
      const byte = bytesLeft.substr(0, 8);
      bytesLeft = bytesLeft.substr(8);
  
      result += String.fromCharCode(parseInt(byte, 2));
    }
  
    return result;
  }

  function convertBase(value, from_base, to_base) {
    var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);
    console.log(from_range)
    
    var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
      if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
      return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);
    
    var new_value = '';
    while (dec_value > 0) {
      new_value = to_range[dec_value % to_base] + new_value;
      dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
  }

  function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  
  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }  