let points = 0
let cnter = 0
let cnter2 = 0
let cnter3 = 0
let cnter4 = 0
let mult = Math.pow(1.15, cnter)
let mult2 = Math.pow(1.15, cnter2)
let mult3 = Math.pow(1.15, cnter3)
let mult4 = Math.pow(1.4, cnter4)
let theta = 0
var thetaUnlocked = false
let subupgrade1Purchased = false
let subupgrade2Purchased = false
let subupgrade3Purchased = false
let currentTab = "+/-";
document.getElementById("guide-content").style.display = "none";
document.getElementById("subtraction-container").style.display = "none";
document.getElementById("win").style.display = "none";

function formatNumber(num) {
    if (num === 0) return "0.00";

    if (Math.abs(num) >= 1e9) {
        let exponent = Math.floor(Math.log10(Math.abs(num)));
        let mantissa = num / Math.pow(10, exponent);
        return mantissa.toFixed(2) + "e" + exponent.toLocaleString("en-US");
    }

    if (Math.abs(num) >= 1000) {
        return num.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatNumberShort(num2) {
    if (num2 === 0) return "0.00";

    if (Math.abs(num2) >= 1e9) {
        let exponent = Math.floor(Math.log10(Math.abs(num2)));
        let mantissa = num2 / Math.pow(10, exponent);
        return mantissa.toFixed(2) + "e" + exponent.toLocaleString("en-US");
    }

    if (Math.abs(num2) >= 1000) {
        return num2.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    return num2.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function tab1() {
    currentTab = "+/-";
    document.getElementById("addition-container").style.display = "flex";
    document.getElementById("guide-content").style.display = "none";
}

function tab2() {
    currentTab = "Guide";
    document.getElementById("addition-container").style.display = "none";
    document.getElementById("guide-content").style.display = "block";
    document.getElementById("subtraction-container").style.display = "none";
}

function updateGUI() {
    if ((points >= 5000 || theta >= 1) && !thetaUnlocked) {
        thetaUnlocked = true;
    }
    if (theta >= 1) {
        if (theta === 1) {
            document.getElementById("points").innerHTML = `Total = θ+${formatNumber(points)}`;
        } else if (thetaUnlocked === true) {
            document.getElementById("points").innerHTML =
                `Total = ${formatNumberShort(theta)}θ+${formatNumber(points)}`;
        }
    } else {
        document.getElementById("points").innerHTML =
            `Total = ${formatNumber(points)}`;
    }

    let thetaMultiplier = subupgrade1Purchased
        ? Math.pow(theta + 1, 2/3)
        : 1;

    let sumProd = cnter * 1 * thetaMultiplier;
    let evalProd = cnter2 * 10 * thetaMultiplier;
    let tallyProd = cnter3 * 50 * thetaMultiplier;

    if (subupgrade2Purchased) {
        tallyProd *= 20;
    }

    let totalProd = sumProd + evalProd + tallyProd;

    document.getElementById("pointsproduced").innerHTML =
        `You are producing ${formatNumber(totalProd)} point(s) per second`;

    document.getElementById("sum").innerHTML =
        `You have ${cnter} Summations producing ${formatNumber(sumProd)} points per second`;

    document.getElementById("eval").innerHTML =
        `You have ${cnter2} Evaluations producing ${formatNumber(evalProd)} points per second`;

    document.getElementById("tally").innerHTML =
        `You have ${cnter3} Tallies producing ${formatNumber(tallyProd)} points per second`;

    document.getElementById("costsu1").innerHTML =
        subupgrade1Purchased ? `Bought!` : `Cost: 2 Theta`;

    document.getElementById("costsu2").innerHTML =
        subupgrade2Purchased ? `Bought!` : `Cost: 5 Theta`;

    document.getElementById("sum-btn").innerHTML =
        `Buy Summation (Cost: ${formatNumber(Math.floor(10 * mult))} points)`;

    document.getElementById("eval-btn").innerHTML =
        `Buy Evaluation (Cost: ${formatNumber(Math.floor(100 * mult2))} points)`;

    document.getElementById("tally-btn").innerHTML =
        `Buy Tally (Cost: ${formatNumber(Math.floor(500 * mult3))} points)`;

    document.getElementById("sub-btn").innerHTML =
        `Gain Theta (Cost: ${formatNumber(Math.floor(10000 * mult4))} points)`;

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

    if (subupgrade1Purchased) {
        document.getElementById("subupgrade1").classList.add("bought");
    }

    if (subupgrade2Purchased) {
        document.getElementById("subupgrade2").classList.add("bought");
    }

    if (subupgrade3Purchased) {
        document.getElementById("subupgrade3").classList.add("bought");
    }

    if (thetaUnlocked && currentTab === "+/-") {
        document.getElementById("subtraction-container").style.display = "flex";
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

document.getElementById("sub-btn").onclick = function() {
    if (points >= Math.floor(10000 * mult4)) {
        points -= Math.floor(10000 * mult4)
        cnter4++
        theta++
        mult4 = Math.pow(1.4, cnter4)
        updateGUI()
    }
}

document.getElementById("subupgrade1").onclick = function() {
    if (theta >= 2 && !subupgrade1Purchased) {
        subupgrade1Purchased = true;
        document.getElementById("subupgrade1").classList.add("bought");
        updateGUI();
    }
}

document.getElementById("subupgrade2").onclick = function() {
    if (theta >= 5 && !subupgrade2Purchased) {
        subupgrade2Purchased = true;
        document.getElementById("subupgrade2").classList.add("bought");
        updateGUI();
    }
}

document.getElementById("subupgrade3").onclick = function() {
    if (theta >= 15 && !subupgrade3Purchased) {
        subupgrade3Purchased = true;
        document.getElementById("everything").style.display = "none";
        document.getElementById("win").style.display = "flex";
    }
}

let lastTime = Date.now();

setInterval(function() {
    let now = Date.now();
    let delta = (now - lastTime) / 1000;
    lastTime = now;

    let sum = cnter * 1;
    let evals = cnter2 * 10;
    let tallies = cnter3 * 50;

    if (subupgrade1Purchased) {
        let thetaMultiplier = Math.pow(theta + 1, 2/3);

        sum *= thetaMultiplier;
        evals *= thetaMultiplier;
        tallies *= thetaMultiplier;
    }

    if (subupgrade2Purchased) {
        tallies *= 20;
    }

    let pointsToAdd = (sum + evals + tallies) * delta;

    points += pointsToAdd;


    updateGUI();
}, 50);
