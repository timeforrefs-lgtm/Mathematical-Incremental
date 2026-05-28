let mulUpgrade1Bought = false;
let mulUpgrade2Bought = false;
let mulUpgrade3Bought = false;
let mulUpgrade4Bought = false;

const mu1Cost = new Decimal(1e9);
const mu2Cost = new Decimal(2e10);
const mu3Cost = new Decimal(5e10);
const mu4Cost = new Decimal(1e15);

var mu1costdedu = new Decimal(1);
var mu3boost = new Decimal(1);

document.getElementById("mulupg4").style.display = "none";

function updateMulUpgradeGUI() {

    document.getElementById("mulupg1")
        .classList.toggle(
            "affordable",
            points.gte(mu1Cost) && !mulUpgrade1Bought
        );

    document.getElementById("mulupg2")
        .classList.toggle(
            "affordable",
            points.gte(mu2Cost) && !mulUpgrade2Bought
        );

    document.getElementById("mulupg3")
        .classList.toggle(
            "affordable",
            points.gte(mu3Cost) && !mulUpgrade3Bought
        );

    document.getElementById("mulupg4")
        .classList.toggle(
            "affordable",
            points.gte(mu4Cost) && !mulUpgrade4Bought
        );

    if (mulUpgrade1Bought) {

        document.getElementById("mulupg1")
            .classList.add("bought");

        document.getElementById("costmu1")
            .textContent = "Bought!";

    } else {

        document.getElementById("mulupg1")
            .classList.remove("bought");

        document.getElementById("costmu1")
            .textContent = `Cost: ${formatNumber(mu1Cost)} Points`;
    }

    if (mulUpgrade2Bought) {

        document.getElementById("mulupg2")
            .classList.add("bought");

        document.getElementById("costmu2")
            .textContent = "Bought!";

    } else {

        document.getElementById("mulupg2")
            .classList.remove("bought");

        document.getElementById("costmu2")
            .textContent = `Cost: ${formatNumber(mu2Cost)} Points`;
    }

    if (mulUpgrade3Bought) {

        document.getElementById("mulupg3")
            .classList.add("bought");

        document.getElementById("costmu3")
            .textContent = "Bought!";

    } else {

        document.getElementById("mulupg3")
            .classList.remove("bought");

        document.getElementById("costmu3")
            .textContent = `Cost: ${formatNumber(mu3Cost)} Points`;
    }

    if (mulUpgrade4Bought) {

        document.getElementById("mulupg4")
            .classList.add("bought");

        document.getElementById("costmu4")
            .textContent = "Bought!";

    } else {

        document.getElementById("mulupg4")
            .classList.remove("bought");

        document.getElementById("costmu4")
            .textContent = `Cost: ${formatNumber(mu4Cost)} Points`;
    }
}

// UPGRADE 1

document.getElementById("mulupg1").onclick = function () {

    if (points.gte(mu1Cost) && !mulUpgrade1Bought) {

        points = points.sub(mu1Cost);

        mulUpgrade1Bought = true;

        mu1costdedu = new Decimal(0);

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// UPGRADE 2

document.getElementById("mulupg2").onclick = function () {

    if (points.gte(mu2Cost) && !mulUpgrade2Bought) {

        points = points.sub(mu2Cost);

        mulUpgrade2Bought = true;

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// UPGRADE 3

document.getElementById("mulupg3").onclick = function () {

    if (points.gte(mu3Cost) && !mulUpgrade3Bought) {

        points = points.sub(mu3Cost);

        mulUpgrade3Bought = true;

        mu3boost = new Decimal(20);

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// UPGRADE 4

document.getElementById("mulupg4").onclick = function () {

    if (points.gte(mu4Cost) && !mulUpgrade4Bought) {

        points = points.sub(mu4Cost);

        mulUpgrade4Bought = true;

        updateMulUpgradeGUI();
        updateGUI();
    }
};

// AUTO BUYERS

setInterval(function () {

    if (mulUpgrade2Bought) {

        // SUMMATIONS

        while (points.gte(sumCost)) {

            if (!mulUpgrade1Bought) {
                points = points.sub(sumCost.mul(mu1costdedu));
            }

            cnter++;

            sumCost = sumCost
                .mul(1.15)
                .floor();
        }

        // EVALUATIONS

        while (points.gte(evalCost)) {

            if (!mulUpgrade1Bought) {
                points = points.sub(evalCost.mul(mu1costdedu));
            }

            cnter2++;

            evalCost = evalCost
                .mul(1.15)
                .floor();
        }

        // TALLIES

        while (points.gte(tallyCost)) {

            if (!mulUpgrade1Bought) {
                points = points.sub(tallyCost.mul(mu1costdedu));
            }

            cnter3++;

            tallyCost = tallyCost
                .mul(1.15)
                .floor();
        }
    }

    updateMulUpgradeGUI();
    updateGUI();

}, 100);

// FACTORS

let pointsFactor = new Decimal(1);
let thetaFactor = new Decimal(1);

let factorBoost = new Decimal(1);

// PRIME FACTOR FUNCTION

function factorizeNumber(num) {

    num = Decimal.floor(num);

    if (num.lte(1)) {
        return "1";
    }

    // prevent gigantic lag

    if (num.gte(1e6)) {
        return "Too Large";
    }

    let n = num.toNumber();

    let divisor = 2;

    let factors = [];

    while (n >= 2) {

        if (n % divisor === 0) {

            factors.push(divisor);

            n = n / divisor;

        } else {

            divisor++;
        }
    }

    return factors.join(" × ");
}

// GCD

function gcd(a, b) {

    a = Decimal.floor(a);
    b = Decimal.floor(b);

    while (!b.eq(0)) {

        let temp = b;

        b = a.mod(b);

        a = temp;
    }

    return a;
}

// UPDATE FACTORS GUI

function updateFactors() {

    let currentGCD = gcd(
        Decimal.max(points.floor(), 1),
        Decimal.max(theta.floor(), 1)
    );

    factorBoost = Decimal.pow(
        currentGCD.add(1),
        0.15
    );

    document.getElementById("factorpt").textContent =
        `The Highest Common Factor of Points and Theta is ${formatNumberShort(currentGCD)}`;

    document.getElementById("factorsmult").textContent =
        `Power is being multiplied by a factor of ${formatNumber(factorBoost)}`;

    document.getElementsByClassName("factorspoints")[0]
        .getElementsByTagName("p")[0]
        .textContent =
        `Points factorised: ${factorizeNumber(pointsFactor)}`;

    document.getElementsByClassName("factorspoints")[1]
        .getElementsByTagName("p")[0]
        .textContent =
        `Theta factorised: ${factorizeNumber(thetaFactor)}`;
}

// BUTTONS

document.getElementById("factorbtn1").onclick =
function() {

    pointsFactor = Decimal.max(
        1,
        points.floor()
    );

    updateFactors();
};

document.getElementById("factorbtn2").onclick =
function() {

    thetaFactor = Decimal.max(
        1,
        theta.floor()
    );

    updateFactors();
};

// LOOP

setInterval(function() {

    if (
        currentTab === "mul" &&
        currentmulTab === "factors"
    ) {

        updateFactors();
    }

}, 100);


updateMulUpgradeGUI();