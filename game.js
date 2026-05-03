let points = 0
let cnter = 0
let cnter2 = 0
let cnter3 = 0
let mult = Math.pow(1.15, cnter)
let mult2 = Math.pow(1.15, cnter2)
let mult3 = Math.pow(1.15, cnter3)

function formatNumber(num) {
    if (num === 0) return "0.00";

    if (Math.abs(num) < 1e9) {
        return num.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    let exponent = Math.floor(Math.log10(Math.abs(num)));
    let mantissa = num / Math.pow(10, exponent);

    return mantissa.toFixed(2) + "e" + exponent.toLocaleString("en-US");
}


function updateGUI() {
    document.getElementById("pointsproduced").innerHTML = `You are producing ${(formatNumber(cnter * 1 + cnter2 * 10 + cnter3 * 50))} point(s) per second`;
    document.getElementById("points").innerHTML = "Total = " + formatNumber(points);
    document.getElementById("sum").innerHTML = `You have ${cnter} Summations producing ${formatNumber(cnter)} point(s) per second`;
    document.getElementById("sum-btn").innerHTML = `Buy Summation (Cost: ${formatNumber(Math.floor(10 * mult))} points)`;
    document.getElementById("eval").innerHTML = `You have ${cnter2} Evaluations producing ${formatNumber(cnter2 * 10)} points per second`;
    document.getElementById("eval-btn").innerHTML = `Buy Evaluation (Cost: ${formatNumber(Math.floor(100 * mult2))} points)`;
    document.getElementById("tally").innerHTML = `You have ${cnter3} Tallies producing ${formatNumber(cnter3 * 50)} points per second`;
    document.getElementById("tally-btn").innerHTML = `Buy Tally (Cost: ${formatNumber(Math.floor(500 * mult3))} points)`;

    if (points >= Math.floor(10 * mult)) {
        document.getElementById("sum-btn").classList.add("affordable");
    } else {
        document.getElementById("sum-btn").classList.remove("affordable");
    }
    if (points >= Math.floor(100 * mult2)) {
        document.getElementById("eval-btn").classList.add("affordable");
    } else {
        document.getElementById("eval-btn").classList.remove("affordable");
    }
    if (points >= Math.floor(500 * mult3)) {
        document.getElementById("tally-btn").classList.add("affordable");
    } else {
        document.getElementById("tally-btn").classList.remove("affordable");
    }
}

document.getElementById("clicker").onclick = function() {
    points++
    updateGUI()
}

document.getElementById("sum-btn").onclick = function() {
    if (points >= Math.floor(10 * mult)) {
        points -= Math.floor(10 * mult)
        cnter++
        mult = Math.pow(1.15, cnter)
        updateGUI()
    }
}

document.getElementById("eval-btn").onclick = function() {
    if (points >= Math.floor(100 * mult2)) {
        points -= Math.floor(100 * mult2)
        cnter2++
        mult2 = Math.pow(1.15, cnter2)
        updateGUI()
    }
}

document.getElementById("tally-btn").onclick = function() {
    if (points >= Math.floor(500 * mult3)) {
        points -= Math.floor(500 * mult3)
        cnter3++
        mult3 = Math.pow(1.15, cnter3)
        updateGUI()
    }
}

let lastTime = Date.now();

setInterval(function() {
    let now = Date.now();
    let delta = (now - lastTime) / 1000;
    lastTime = now;

    points += cnter * delta + cnter2 * 10 * delta + cnter3 * 50 * delta;
    updateGUI();
}, 10);
