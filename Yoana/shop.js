//THIS THE MODAL BOX FOR THE SHOP PAGE PARTICULARY FOR THE NORMAL(unlocked) ELEMENTS
var modalNormal = document.getElementById("ModalNormal");

// Get the button that opens the modal
var button = document.getElementsByClassName("normal");

// Get the <span> element that closes the modal
var spanN = document.getElementsByClassName("closeN")[0];

// When the user clicks on the button, open the modal
for (let bt of button) {
  bt.onclick = function() {
    modalNormal.style.display = "block";
  };
} 


// When the user clicks on <span> (x), close the modal
spanN.onclick = function() {
  modalNormal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalNormal) {
    modalNormal.style.display = "none";
  }
}



//THIS THE MODAL BOX FOR THE SHOP PAGE PARTICULARY FOR THE LOCKED ELEMENTS
var modalLock = document.getElementById("ModalLock");

// Get the button that opens the modal
var buttonLock = document.getElementsByClassName("locking");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
for (let b of buttonLock) {
  b.onclick = function() {
    modalLock.style.display = "block";
  };
} 


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalLock.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLock) {
    modalLock.style.display = "none";
  }
}


