var mainDropClass = document.getElementsByClassName('dropdown')[0];
var imgDrop = document.getElementsByClassName('dropb')[0];
var dropdownCont = document.getElementsByClassName('drop-content')[0];
var modal = document.getElementById('myModal');
var btnUpdate = document.getElementById('myBtn1');
var msgUpdate = document.getElementById('myModal1');
var closeMsg = document.getElementsByClassName('close1')[0];
var closeModal = document.getElementsByClassName('close')[0];
var modal1 = document.getElementsByClassName('modal1')[0];

var deletePost = document.getElementById('deletePost');
var confirmDel = document.getElementById('myModal2');
var closeConfirm = document.getElementsByClassName('close2')[0];
var btnDel = document.getElementById('btnDel');
var modCont = document.getElementById('modcont');
var idCart = document.getElementById('cart');



var dropdownContID = document.getElementById('drop-cont');
var dropdownContID1 = document.getElementById('drop-cont1');
var openMod = document.getElementById('openModal');

openMod.onclick = function(){
  modal.style.display ='block';
}
btnUpdate.onclick = function(){
  msgUpdate.style.display = 'block';
  modal.style.display = 'none';
}
deletePost.onclick = function(){
  confirmDel.style.display = 'block';
}
modal1.onclick = function(){
  confirmDel.style.display ='none';
  idCart.style.display ='none';
}
closeConfirm.onclick = function(){
confirmDel.style.display = 'none';
}
closeModal.onclick = function(){
  modal.style.display ='none';
}
closeMsg.onclick = function(){
  msgUpdate.style.display ='none';
}

// Prevents menu from closing when clicked inside 
document.getElementById("drop-cont").addEventListener('click', function (event) { 
  event.stopPropagation();
}); 

document.getElementById("drop-cont1").addEventListener('click', function (event) { 
  event.stopPropagation();
}); 

document.getElementById("drop-cont2").addEventListener('click', function (event) { 
  event.stopPropagation();
}); 
// add the class show by clicking the image
function DropDown(){
  document.getElementById("drop-cont").classList.add("show");
}
function DropDown1(){
  document.getElementById("drop-cont1").classList.add("show");
}
function DropDown2(){
  document.getElementById("drop-cont2").classList.add("show");
}

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
  if(event.target == modal){
    this.modal.style.display = 'none';
  }
  if(event.target == this.msgUpdate){
    this.msgUpdate.style.display = 'none';
  }
  
}

