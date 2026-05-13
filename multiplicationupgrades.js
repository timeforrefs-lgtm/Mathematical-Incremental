let mulUpgrade1Bought = false;
let mulUpgrade2Bought = false;
let mulUpgrade3Bought = false;
let mulUpgrade4Bought = false;

// Costs
const mu1Cost = 1e9;
const mu2Cost = 2e10;
const mu3Cost = 5e10;
const mu4Cost = 1e11;

var mu1costdedu = 1
var mu3boost = 1

// Update multiplication upgrade GUI
function updateMulUpgradeGUI() {

    // Affordable states
    if (points >= mu1Cost && !mulUpgrade1Bought) {
        document.getElementById("mulupg1").classList.add("affordable");
    } else {
        document.getElementById("mulupg1").classList.remove("affordable");
    }

    if (points >= mu2Cost && !mulUpgrade2Bought) {
        document.getElementById("mulupg2").classList.add("affordable");
    } else {
        document.getElementById("mulupg2").classList.remove("affordable");
    }

    if (points >= mu3Cost && !mulUpgrade3Bought) {
        document.getElementById("mulupg3").classList.add("affordable");
    } else {
        document.getElementById("mulupg3").classList.remove("affordable");
    }

    if (points >= mu4Cost && !mulUpgrade4Bought) {
        document.getElementById("mulupg4").classList.add("affordable");
    } else {
        document.getElementById("mulupg4").classList.remove("affordable");
    }

    // Bought states
    if (mulUpgrade1Bought) {
        document.getElementById("mulupg1").classList.add("bought");
        document.getElementById("costmu1").innerHTML = "Bought!";
    }

    if (mulUpgrade2Bought) {
        document.getElementById("mulupg2").classList.add("bought");
        document.getElementById("costmu2").innerHTML = "Bought!";
    }

    if (mulUpgrade3Bought) {
        document.getElementById("mulupg3").classList.add("bought");
        document.getElementById("costmu3").innerHTML = "Bought!";
    }

    if (mulUpgrade4Bought) {
        document.getElementById("mulupg4").classList.add("bought");
        document.getElementById("costmu4").innerHTML = "Bought!";
    }
}

// Upgrade 1
document.getElementById("mulupg1").onclick = function () {

    if (points >= mu1Cost && !mulUpgrade1Bought) {

        points -= mu1Cost;
        mulUpgrade1Bought = true;
        mu1costdedu = 0

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// Upgrade 2 - Addition Autobuyers
document.getElementById("mulupg2").onclick = function () {

    if (points >= mu2Cost && !mulUpgrade2Bought) {

        points -= mu2Cost;
        mulUpgrade2Bought = true;

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// Upgrade 3 - Theta Autobuyer
document.getElementById("mulupg3").onclick = function () {

    if (points >= mu3Cost && !mulUpgrade3Bought) {

        points -= mu3Cost;
        mulUpgrade3Bought = true;
        mu3boost = 20

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// Upgrade 4 - Win
document.getElementById("mulupg4").onclick = function () {

    if (points >= mu4Cost && !mulUpgrade4Bought) {

        points -= mu4Cost;
        mulUpgrade4Bought = true;

        document.getElementById("everything").style.display = "none";
        document.getElementById("win").style.display = "flex";

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// BULK AUTOBUYERS
setInterval(function () {

    // Addition autobuyers
    if (mulUpgrade2Bought) {

        // Summations
        while (points >= Math.floor(10 * mult)) {

            if (!mulUpgrade1Bought) {
                points -= Math.floor(10 * mult) * mu1costdedu;
            }

            cnter++;
            mult = Math.pow(1.15, cnter);
        }

        // Evaluations
        while (points >= Math.floor(100 * mult2)) {

            if (!mulUpgrade1Bought) {
                points -= Math.floor(100 * mult2) * mu1costdedu;
            }

            cnter2++;
            mult2 = Math.pow(1.15, cnter2);
        }

        // Tallies
        while (points >= Math.floor(500 * mult3)) {

            if (!mulUpgrade1Bought) {
                points -= Math.floor(500 * mult3) * mu1costdedu;
            }

            cnter3++;
            mult3 = Math.pow(1.15, cnter3);
        }
    }

    updateMulUpgradeGUI();
    updateGUI();

}, 100);

// Initial GUI update
updateMulUpgradeGUI();