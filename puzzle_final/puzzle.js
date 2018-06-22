var imagen_array = [];
var img_random = [];
var myIndex1 =0;
var myIndex2 =0;
var myIndex3 =0;
var minutes = 0;
var hours = 0;
var seconds = 0;
var countingInterval;
var carrouselInterval;
var saveit;
var winning=[];
var img = [];
var folder;
var highscore;
var player;

var uwin = function(){
	for (i=0; i < imagen_array.length; i++){
		if (imagen_array[i].replace(/^f.*[\\\/]/, '').split(".")[0] !== winning[i]){
				return false;
		};
	};
	return true;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function random_img(){
	var type = document.getElementById("imageType").src;
	var rand = "pos";
	var num;
	var put_black;
	randoms = [];
	for(i=1; i<10; i++){
		rand = "pos" + i;
		num = getRandomInt(1, 9);
		while (randoms.includes(num)){
			num = getRandomInt(1, 9);
		}
		randoms.push(num);
		if (num == 9) {
			put_black = true;
		}
		if (put_black){
			document.getElementById(rand).src = "white.jpg";
			put_black = false;
		}else{
			document.getElementById(rand).src = folder + num + ".jpg"};
	}
}

//Funcion gestion mi slider
function carrousel(){
	//el objetivo es establecer inline nuestra imagen con la que queremos jugar.
  var i;
  var x = document.getElementsByClassName("slide1");
  for(i=0; i<x.length; i++){
    x[i].style.display = "none";
  }
  myIndex1++;
  if ( myIndex1 > x.length){myIndex1=1};
  x[myIndex1-1].style.display = "inline";

  x = document.getElementsByClassName("slide2");
  for(i=0; i<x.length; i++){
    x[i].style.display = "none";
  }
  myIndex2++;
  if ( myIndex2 > x.length){myIndex2=1};
  x[myIndex2-1].style.display = "inline";

  x = document.getElementsByClassName("slide3");
  for(i=0; i<x.length; i++){
    x[i].style.dispaly = "none";
  }
  myIndex3++;
  if ( myIndex3 > x.length){myIndex3=1};
  x[myIndex3-1].style.display = "inline";
}


// Contador del tiempo pantalla
function start_counting(){
	var counter = hours + ":" + minutes + ":" + seconds;
	seconds += 1;
	if (seconds == 60) {
		minutes += 1;
		seconds = 0;
		if (minutes == 60){
			hours += 1;
			minutes = 0;
		}
	}
	document.getElementById("counter").innerHTML = counter;
};


//Selecionar imagen slider.
function displayID(clicked){
  var change = clicked.src.replace(/^f.*[\\\/]/, '').split(".")[0];
  document.getElementById("imageType").src = change + ".jpg";
  //console.log(change);
  imagen_array=[];
  clearInterval(countingInterval);
  clearInterval(carrouselInterval);
  seconds = 0;
  hours = 0;
  minutes= 0;
  main();
};

function main(){
  carrousel();
  folder = document.getElementById("imageType").src.replace(/^f.*[\\\/]/, '').split(".")[0];
	winning = [folder + "1", folder + "2", folder + "3", folder + "4", folder + "5",
						 folder + "6", folder + "7", folder + "8", "white"];
	random_img();
	for(i=1; i<10; i++){
		pos = "pos" + i;
		img = document.getElementById(pos);
		imagen_array.push(img.src);
	};
	carrouselInterval = setInterval(carrousel, 5000); // cambia imagenes carrousel cada 5 s
	countingInterval = setInterval(start_counting, 1000);
	//document.addEventListener("keydown", show ,false);
};

// Para cambiar los elementos de mi array
var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

// optimizamos los cambios array, mas fluido
Array.prototype.swap = function(indexA, indexB) {
   swapArrayElements(this, indexA, indexB);
};


  function Mov1(){
    var pos1 = document.getElementById('pos1')
    var pos4 = document.getElementById('pos4')
    var pos2 = document.getElementById('pos2')
    if(pos2.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos2.src = imagen_array[0];
			pos1.src = imagen_array[1];
			imagen_array.swap(0,1);
    }else if(pos4.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos4.src = imagen_array[0];
			pos1.src = imagen_array[3];
			imagen_array.swap(0,3);
    };
		check_win();
		for (i=0; i < imagen_array.length; i++){
			console.log(imagen_array[i].replace(/^f.*[\\\/]/, '').split(".")[0]);
		};
  };

  function Mov2(){
    var pos5 = document.getElementById('pos5')
    var pos1 = document.getElementById('pos1')
    var pos2 = document.getElementById('pos2')
    var pos3 = document.getElementById('pos3')
    if(pos1.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos1.src=imagen_array[1];
			pos2.src=imagen_array[0];
			imagen_array.swap(1, 0);
    }else if(pos5.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos5.src=imagen_array[1];
			pos2.src=imagen_array[4];
			imagen_array.swap(1, 4);
    }else if(pos3.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos3.src=imagen_array[1];
			pos2.src=imagen_array[2];
			imagen_array.swap(1, 2);
    };
		check_win();
  };
  function Mov3(){
    var pos3 = document.getElementById('pos3')
    var pos6 = document.getElementById('pos6')
    var pos2 = document.getElementById('pos2')
    if(pos2.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos2.src=imagen_array[2];
			pos3.src=imagen_array[1];
			imagen_array.swap(1, 2);
    }else if(pos6.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos6.src=imagen_array[2];
			pos3.src=imagen_array[5];
			imagen_array.swap(2, 5);
    };
		check_win();
  };
  function Mov4(){
    var pos4 = document.getElementById('pos4')
    var pos5 = document.getElementById('pos5')
    var pos1 = document.getElementById('pos1')
    var pos7 = document.getElementById('pos7')
    if(pos1.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos1.src=imagen_array[3];
			pos4.src=imagen_array[0];
			imagen_array.swap(0, 3);
    }else if(pos5.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos5.src=imagen_array[3];
			pos4.src=imagen_array[4];
			imagen_array.swap(3, 4);
    }else if(pos7.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos7.src=imagen_array[3];
			pos4.src=imagen_array[6];
			imagen_array.swap(3, 6);
    };
		check_win();
  };
  function Mov5(){
    var pos5 = document.getElementById('pos5')
    var pos2 = document.getElementById('pos2')
    var pos4 = document.getElementById('pos4')
    var pos6 = document.getElementById('pos6')
    var pos8 = document.getElementById('pos8')
    if(pos2.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos2.src=imagen_array[4];
			pos5.src=imagen_array[1];
			imagen_array.swap(1,4);
    }else if(pos4.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos4.src=imagen_array[4];
			pos5.src=imagen_array[3];
			imagen_array.swap(3,4);
    }else if(pos6.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos6.src=imagen_array[4];
      pos5.src=imagen_array[5];
			imagen_array.swap(4,5);
    }else if(pos8.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos8.src=imagen_array[4];
			pos5.src=imagen_array[7];
			imagen_array.swap(4,7);
		};
		check_win();
  };

  function Mov6(){
    var pos6 = document.getElementById('pos6')
    var pos9 = document.getElementById('pos9')
    var pos3 = document.getElementById('pos3')
    var pos5 = document.getElementById('pos5')
    if(pos9.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos9.src=imagen_array[5];
      pos6.src=imagen_array[8];
			imagen_array.swap(5,8);
    }else if(pos3.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos3.src=imagen_array[5];
      pos6.src=imagen_array[2];
			imagen_array.swap(5,2);
    }else if(pos5.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos5.src=imagen_array[5];
      pos6.src=imagen_array[4];
			imagen_array.swap(5,4);
    };
		check_win();
  };
  function Mov7(){
    var pos8 = document.getElementById('pos8')
    var pos7 = document.getElementById('pos7')
    var pos4 = document.getElementById('pos4')
    if(pos8.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos8.src=imagen_array[6];
      pos7.src=imagen_array[7];
			imagen_array.swap(6,7);
    }else if(pos4.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos4.src=imagen_array[6];
      pos7.src=imagen_array[3];
			imagen_array.swap(6,3);
    };
		check_win();
  };
  function Mov8(){
    var pos8 = document.getElementById('pos8')
    var pos9 = document.getElementById('pos9') //sacamos la id de las posiciones
    var pos7 = document.getElementById('pos7')
    var pos5 = document.getElementById('pos5')
    if(pos7.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos7.src=imagen_array[7];
      pos8.src=imagen_array[6];
			imagen_array.swap(7,6);
    }else if(pos5.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos5.src=imagen_array[7];
      pos8.src=imagen_array[4];
			imagen_array.swap(7,4);
    }else if(pos9.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos9.src=imagen_array[7];
      pos8.src=imagen_array[8];
			imagen_array.swap(7,8);
    };
		check_win();
  };
  function Mov9(){
    var pos8 = document.getElementById('pos8')
    var pos9 = document.getElementById('pos9') //sacamos la id de las posiciones
    var pos6 = document.getElementById('pos6')
    if(pos6.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos6.src=imagen_array[8];
      pos9.src=imagen_array[5];
			imagen_array.swap(8,5);
    }else if(pos8.src.replace(/^.*[\\\/]/, '') == "white.jpg"){
			pos8.src=imagen_array[8];
      pos9.src=imagen_array[7];
			imagen_array.swap(8,7);
    };
		check_win();
  };

function check_win(){
	if(uwin()){
		highscore = String(hours)+":"+String(minutes)+":"+String(seconds);
		var win = document.createElement("img");
		win.src="winner.gif";
		win.id="winner";
		win.width = window.innerWidth;
		win.display
		win.height = window.innerHeight;
		win.setAttribute("onclick", "hideimage()");
		document.getElementById("slider").appendChild(win);
	};
};

function hideimage(){
	document.getElementById("slider").removeChild(document.getElementById("winner"));//Quita imagen winner
	var nickname = prompt("NEW HIGHSCORE! WRITE YOUR NAME", "YOUR NAME");
	if (nickname != "" && nickname != null){
		player = nickname;
	}else{
		player = "no name (write yours the next time)";
	};
	imagen_array = [];
	clearInterval(countingInterval); //para volver a empezar el contador
	seconds=0;
	hours=0;
	minutes=0;
	main();
};
function showhighscore(){
	if (player == undefined){
		alert("NO ONE HAS PLAYED YET!\n Try your best NOW");
	}else{
		alert("THE BEST PLAYER IS:\n\n" + player +"\n Finish in: " + highscore);
	}
};
