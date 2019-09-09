var menu1 = document.getElementById('drp');
var menu2 = document.getElementById('myDropdown');
var close1 = document.getElementsByClassName('dropdown');
var swit = document.getElementById('switch');

function myFunction() {
    var menuBox = menu1;   
    if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
      menuBox.style.display = "none";
    }
    else { // if is menuBox hidden, display it
      menuBox.style.display = "block";
    }
   }

function settings(){
    var menuBox = menu2;    
    if(menuBox.style.display == "block") { // if is menuBox displayed, hide it
      menuBox.style.display = "none";
    }
    else { // if is menuBox hidden, display it
      menuBox.style.display = "block";
    }
   }
   
   window.onclick = function(event){
       
       if(event.target ==  swit){
        swit.style.display = 'none';
       }
       
   }



//     window.onclick = function(event){
//        if(!event.target.matches('.dropb')){
//            var targ = document.getElementsByClassName("drop-content");
//            var i;
//            for(i=0; i< targ.length;i++){
//                var cont = targ[i];
//                if(cont.classList.contains("show")){
//                   cont.classList.remove('show');
//                }
//            }
//        }
//    }