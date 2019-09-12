window.onscroll = function () {
    scrollFunction();
}

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("header2").style.height = "50px";
    } else {
        document.getElementById("header2").style.height = "50%";
    }
}