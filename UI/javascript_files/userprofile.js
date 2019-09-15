var menu1 = document.getElementById('drp');
var men1 = document.getElementById('drp1');
var men2 = document.getElementById('drp2');
var menu2 = document.getElementById('myDropdown');
var swit = document.getElementById('switch');
var modal = document.getElementById('myModal');
var modal1 = document.getElementById('myModal1');
var delMod = document.getElementById('modalDelete');
var cart = document.getElementById('card1');
var delBtn = document.getElementById('delID');

var btn = document.getElementById('myBtn');
var btn1 = document.getElementById('myBut');
var btn2 = document.getElementById('myBut1');

var close1 = document.getElementsByClassName('dropdown')[0];
var span = document.getElementsByClassName('close')[0];
var cloz = document.getElementsByClassName('close1')[0];
var delButton = document.getElementsByClassName('approve1')[0];
var cloze = document.getElementsByClassName('close2')[0];

var del1 = document.getElementById('btnDelete');
var confirm1 = document.getElementById('myBtn1');

span.onclick = function () {
  modal.style.display = 'none';
}

delBtn.onclick = function () {
  delMod.style.display = 'block';
}
delButton.onclick = function () {
  cart.style.display = 'none';
}
cloze.onclick = function () {
  delMod.style.display = 'none';
}

del1.onclick = function () {
  delMod.style.display = 'block';
}


btn1.onclick = function () {
  modal.style.display = 'block';
}

btn.onclick = function () {
  modal.style.display = "block";
}
btn2.onclick = function () {
  modal.style.display = "block";
}

window.onclick = function (event) {
 
  
  if (event.target == this.menu1) {
    this.menu1.style.display = 'none';
  }
  
}

confirm1.onclick = function () {
  modal.style.display = 'none';
  modal1.style.display = 'block';
}

cloz.onclick = function () {
  modal1.style.display = 'none';
}


function DropDown(){
  document.getElementById("drp").classList.add("show");
}
function DropDown1(){
  document.getElementById("drp1").classList.add("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropb')) {
    var dropdowns = document.getElementsByClassName("drop-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  if (event.target == modal) {
    modal.style.display = 'none';
  }
  if (event.target == modal1) {
    this.modal1.style.display = 'none';
  }
  if (event.target == this.delMod) {
    this.delMod.style.display = 'none';
  }
}