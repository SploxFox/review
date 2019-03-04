window.onload = function() {
  const reg = document.getElementById("reg");
  const enc = document.getElementById("enc");
  window.addEventListener("keyup",function(){
    var inactiveElement;
    if (document.activeElement == reg) {
      inactiveElement = enc;
    } else if (document.activeElement == enc) {
      inactiveElement = reg;
    }
    inactiveElement.value = document.activeElement.value;
  });
}
