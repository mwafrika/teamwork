var menu1 = document.getElementById('drp');
var men1 = document.getElementById('drp1');
var men2 = document.getElementById('drp2');

var menu2 = document.getElementById('myDropdown');

var close1 = document.getElementsByClassName('dropdown');

var swit = document.getElementById('switch');

var modal = document.getElementById('myModal');
var modal1 = document.getElementById('myModal1');
var deleteModal = document.getElementById('modalDelete');

var modalDel = document.getElementById('myModal2');

var btn = document.getElementById('openModal');
var btn1 = document.getElementById('myBut');
var btn2 = document.getElementById('myBut1');
var btnDelete = document.getElementById('deletePost');

// delete button
var del = document.getElementById('btnDel');
var card = document.getElementById('cart');


var span = document.getElementsByClassName('close')[0];
var cloz = document.getElementsByClassName('close1')[0];
var closeDel = document.getElementsByClassName('close2')[0];
var delet = document.getElementsByClassName('approve1')[0];

var confirm1 = document.getElementById('myBtn1');

span.onclick = function () {
  modal.style.display = 'none';
}

btn.onclick = function () {
  modal.style.display = 'block';
}
btn1.onclick = function () {
  modal.style.display = 'block';
}
btn2.onclick = function () {
  modal.style.display = "block";
}
btnDelete.onclick = function () {
  modalDel.style.display = "block";
}
// delete the card onclick button confirm
delet.onclick = function () {
  card.style.display = 'none';

}
closeDel.onclick = function () {
  modalDel.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  if (event.target == modal1) {
    this.modal1.style.display = 'none';
  }
  if (event.target == this.menu1) {
    this.menu1.style.display = 'none';
  }
}

// to open the first modal
confirm1.onclick = function () {
  modal.style.display = 'none';
  modal1.style.display = 'block';
}
cloz.onclick = function () {
  modal1.style.display = 'none';
  // card.style.display = 'none';
}


function myFunction() {
  var menuBox = menu1;
  if (menuBox.style.display == "block") {
    menuBox.style.display = "none";
  }
  else {
    menuBox.style.display = "block";
  }
}
function function2() {
  var x = men2;
  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function myFunction1() {
  var second = men1;
  if (second.style.display == "block") {
    second.style.display = "none";
  } else {
    second.style.display = "block";
  }
}


function settings() {
  var menuBox = menu2;
  if (menuBox.style.display == "block") {
    menuBox.style.display = "none";
  }
  else {
    menuBox.style.display = "block";
  }
}


