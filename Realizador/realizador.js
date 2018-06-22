

var canvas, ctx, video;
var barra_temporal, volumen;
var cameras = [];


function main(){
  canvas = document.getElementById("canvas"); //Crea canvas
  ctx = canvas.getContext("2d"); // esto es lo que vas a meter en el canvas
  Init();
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.addEventListener('play', render); //Espera a pulsar el video
  barra_temporal.addEventListener('change', barra_temporal); // espera por si quieres modificar el puntero de la barra de barra_tiempo
  volumen.addEventListener('change', volumenControl); //Espera por si quieres modificar el volumen.

};


//Inicializo escena
function Init(){
  barra_temporal = document.getElementById("barra_temporal");
  barra_temporal.value = 0;
  volumen = document.getElementById("volumen");
  volumen.value = 1;
  Cameras();
  ChooseCam(1); //En un principio eliges la 1
}

//Actualizo escena con requestAnimationFrame()
function render(){
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  Refreshbar();
  Refreshclock();
  requestAnimationFrame(render);
}
function Play(){
  if (video.paused || video.ended){
    document.getElementById("play-pause").innerHTML = "u";
    for (var i=0; i<cameras.length; i++){
      cameras[i].play();
    }
  }else{
    document.getElementById("play-pause").innerHTML = "P";
    for (var i=0; i<cameras.length; i++){
      cameras[i].pause();
    }
  }console.log(video.currentTime);
}

function barra_temporal(){
  var tiempo = barra_temporal.value * (video.duration/barra_temporal.max)
  for(var i=0; i< cameras.length; i++){
    cameras[i].currentTime = tiempo;
  }
}

function Refreshbar(){
  var value = video.currentTime * (barra_temporal.max/video.duration) //Estima el porcentaje de la barra respecto al tiempo de reproduccion.
  barra_temporal.value = value;
}

function volumenControl(){
  video.volume = volumen.value; //Se ajusta segun lo movamos.
}
function mute(){
  if (video.muted){
    video.muted = false;
    document.getElementById("mute").innerHTML="Q"
  }else{
    video.muted = true;
    document.getElementById("mute").innerHTML = "g";
  }
}
function Cameras(){ //Crear el array de camaras.
  var c1=document.getElementById("aux1");
  var c2=document.getElementById("aux2");
  var c3=document.getElementById("aux3");
  var c4=document.getElementById("aux4");
  cameras.push(c1,c2,c3,c4);
}

function Refreshclock(){
  var t;
  t = Math.round(video.currentTime);
  if(t>=10){
    document.getElementById("clock").innerHTML = "00:"+t;
  }else{
    document.getElementById("clock").innerHTML = "00:0"+t;
  }
}
function ChooseCam(x){
  switch(x){
    case 1:
      Select(1);
      break;
    case 2:
      Select(2);
      break;
    case 3:
      Select(3);
      break;
    case 4:
      Select(4);
      break;
    default:
      Select(1);
  }
}
function Select(y){ //Te coloca el marco en el video seleccionado.
    if (video != undefined){video.muted = true;}
    video=document.getElementById("aux"+y);
    video.muted = false;
    for (var i = 1; i <= 4; i++) {
      if (i == y){
        document.getElementById("aux"+i).style.border = "thick solid #005500";
      }else{
        document.getElementById("aux"+i).style.border = "none";
      }
    }
}
