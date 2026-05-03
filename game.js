points = 0
function updateGUI() {
    document.getElementById("points").innerHTML = "Total = " + points;
}

document.getElementById("clicker").onclick = function() {
    points++
    updateGUI()
}