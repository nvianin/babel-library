var wyrdSisters;
var loaded = false;
fetch("./wyrdSisters.txt")
    .then(r => r.text())
    .then(function (t) {
        wyrdSisters = t;
        loaded = true
    })