let divisor = new Decimal(0);
let totaldivisors = new Decimal(0);
let dividend = new Decimal(0);

let basedivisor = new Decimal(0.5);
let logdivisor = new Decimal(10);
let divisorboost = new Decimal(1);

let numerator = new Decimal(0);
let denominator = new Decimal(0);

var numeratorboost = new Decimal(0);
var denominatorboost = new Decimal(0);

const divisorText = document.getElementById("divisor");
const dividendText = document.getElementById("dividend");
const resetBtn = document.getElementById("dvsreset-btn");

const num1 = document.getElementById("numerator1");
const nummax = document.getElementById("numeratormax");
const den1 = document.getElementById("denominator1");
const denmax = document.getElementById("denominatormax");

let div20unlock = new Decimal(0);

document.getElementById("dvs-tab").style.display = "none";
resetBtn.style.display = "none";
document.getElementById("subupgrade4").style.display = "none";
document.getElementById("dvstab3").style.display = "none";
document.getElementById("factor").style.display = "none";

function updateDivisionGUI() {

    if (currentTab !== "+/-") {
        document.getElementById("subtraction-container").style.display = "none";
    }

    divisorText.textContent =
        formatNumberShort(totaldivisors);

    dividendText.textContent =
        formatNumberShort(dividend);

    divisor = Decimal.max(
        0,

        Decimal.pow(

            theta.add(
                points.add(1).log(logdivisor)
            ),

            basedivisor

        ).sub(8)
    );

    if (divisor.gte(1)) {

        resetBtn.style.display = "flex";

        resetBtn.textContent =
            divisor.round().eq(1)
                ? "Reset for 1 Divisor (D)"
                : `Reset for ${formatNumberShort(divisor)} Divisors (D)`;

    } else {
        resetBtn.style.display = "none";
    }

    document.getElementById("numerator").textContent =
        `Numerator: ${formatNumberShort(numerator)} (+${formatNumberShort(numeratorboost)} Theta onclick)`;

    document.getElementById("denominator").textContent =
        `Denominator: ${formatNumberShort(denominator)} (Dividing Theta cost by ${formatNumberShort(denominatorboost.add(1))})`;
}

function divisionReset() {

    points = new Decimal(0);
    theta = new Decimal(0);
    power = new Decimal(0);

    cnter = 0;
    cnter2 = 0;
    cnter3 = 0;

    sumCost = new Decimal(10);
    evalCost = new Decimal(100);
    tallyCost = new Decimal(500);

    subupgrade1Purchased = false;
    subupgrade2Purchased = false;
    subupgrade3Purchased = false;

    mulUpgrade1Bought = false;
    mulUpgrade2Bought = false;
    mulUpgrade3Bought = false;
    mulUpgrade4Bought = false;

    products = 0;
    quintuplers = 0;
    amplifiers = 0;

    productCost = new Decimal(30);
    quintuplerCost = new Decimal(100);
    amplifierCost = new Decimal(500);

    mu1costdedu = new Decimal(1);
    mu3boost = new Decimal(1);

    thetaUnlocked = true;
}

resetBtn.onclick = function() {

    if (divisor.lte(0)) return;

    document.getElementById("dvs-tab").style.display = "flex";

    document.getElementById("subtraction-container").style.display = "none";

    totaldivisors = totaldivisors.add(divisor);

    dividend = dividend.add(divisorboost);

    divisor = new Decimal(0);

    divisionReset();
};

// FRACTIONS

num1.onclick = function() {

    if (totaldivisors.lte(0)) return;

        numerator = numerator.add(1);

        totaldivisors = Decimal.max(
            0,
            totaldivisors.sub(1)
        );

        numeratorboost = numerator;

        updateDivisionGUI();
};

nummax.onclick = function() {

    if (totaldivisors.lte(0)) return;

    let amount = totaldivisors.round();

    numerator = numerator.add(amount);

    numeratorboost = numerator;

    totaldivisors = new Decimal(0);

    updateDivisionGUI();
};

den1.onclick = function() {

    if (totaldivisors.lte(0)) return;

        denominator = denominator.add(1);

        totaldivisors = Decimal.max(
            0,
            totaldivisors.sub(1)
        );

        denominatorboost = denominator;

        updateDivisionGUI();
};

denmax.onclick = function() {

    if (totaldivisors.lte(0)) return;

    let amount2 = totaldivisors.round();

    denominator = denominator.add(amount2);

    denominatorboost = denominator;

    totaldivisors = new Decimal(0);

    updateDivisionGUI();
};

// MILESTONES

function updateMilestones() {

    let dividends = dividend.floor();

    for (let i = 1; i <= 11; i++) {

        let mile = document.getElementById(`mile${i}`);

        if (!mile) continue;

        mile.classList.remove("obtained");
    }

    if (dividends.gte(1)) {
        document.getElementById("mile1").classList.add("obtained");
    }

    if (dividends.gte(2)) {
        document.getElementById("mile2").classList.add("obtained");
    }

    if (dividends.gte(3)) {
        document.getElementById("mile3").classList.add("obtained");
    }

    if (dividends.gte(4)) {
        document.getElementById("mile4").classList.add("obtained");

        document.getElementById("subupgrade4").style.display = "block";
        let subupg3 = document.getElementById("subupgrade3")
        subupg3.classList.remove("triangle");
        subupg3.classList.add("square")
    }

    if (dividends.gte(5)) {
        document.getElementById("mile5").classList.add("obtained");
    }

    if (dividends.gte(8)) {
        document.getElementById("mile6").classList.add("obtained");
    }

    if (dividends.gte(10)) {
        document.getElementById("mile7").classList.add("obtained");
    }

    if (dividends.gte(15)) {
        document.getElementById("mile8").classList.add("obtained");
    }

    if (dividends.gte(20)) {

        document.getElementById("mile9").classList.add("obtained");

        document.getElementById("dvstab3").style.display = "flex";
        div20unlock = new Decimal(1);
    }

    if (dividends.gte(30)) {
        document.getElementById("mile10").classList.add("obtained");
    }

    if (dividends.gte(10000)) {

        document.getElementById("mile11").classList.add("obtained");

        document.getElementById("everything").style.display = "none";
        document.getElementById("win").style.display = "flex";
    }
}


function getThetaExponent() {

    let exp = dividend.gte(2)
        ? new Decimal(1.5)
        : Decimal.div(2, 3);

    if (typeof percentUpgrade3 !== "undefined") {

        exp = exp.mul(
            Decimal.add(
                1,
                percentUpgrade3.mul(0.01)
            )
        );
    }

    return exp;
}

function getDividendBoost() {

    if (dividend.lt(4)) {
        return new Decimal(1);
    }

    return Decimal.pow(
        dividend.add(1),
        0.5
    );
}

function getThetaCostScaling() {

    return dividend.gte(10)
        ? new Decimal(1.01)
        : new Decimal(1.21);
}

// PERCENTAGES

let percentages = new Decimal(0);

let percentUpgrade1 = new Decimal(0);
let percentUpgrade2 = new Decimal(0);
let percentUpgrade3 = new Decimal(0);

// START AT 1%

let percentUpgrade4 = new Decimal(1);

// COST FORMULA

function getPercentCost(level) {

    return Decimal.floor(

        Decimal.pow(
            2,
            level
        ).mul(10)

    );
}

function updatePercentGUI() {

    // percentage gain

    let percentGain = theta.mul(
        percentUpgrade4.mul(0.01).mul(div20unlock)
    );

    percentages = percentages.add(
        percentGain.div(20)
    );

    document.getElementById("percenttxt").textContent =
        `You have ${formatNumber(percentages)} Percentages (+${formatNumber(percentGain)} Percentage per second)`;

    document.getElementById("percentboosttxt").textContent =
        `You are getting +${formatNumber(percentUpgrade1)}% more point gain from PU1`;

    document.getElementById("percentboosttxt2").textContent =
        `You are getting +${formatNumber(percentUpgrade2)}% more power gain from PU2`;

    document.getElementById("percentboosttxt3").textContent =
        `SU1 is +${formatNumber(percentUpgrade3)}% more effective`;

    document.getElementById("percentboosttxt4").textContent =
        `You are gaining Percentage from ${formatNumber(percentUpgrade4)}% of Theta`;

    // BUTTON TEXT

    document.getElementById("percent1").innerHTML =
        `<span class="percenttitle">You are in the (poi)nth Percentile</span>
        Addition Generator produce +1% more point gain for ${formatNumber(getPercentCost(percentUpgrade1))} Percentages`;

    document.getElementById("percent2").innerHTML =
        `<span class="percenttitle">More Power</span>
        Multiplication Generators produce +1% more Power for ${formatNumber(getPercentCost(percentUpgrade2))} Percentages`;

    document.getElementById("percent3").innerHTML =
        `<span class="percenttitle">Like an Angle</span>
        SU1 is +1% more effective for ${formatNumber(getPercentCost(percentUpgrade3))} Percentages`;

    document.getElementById("percent4").innerHTML =
        `<span class="percenttitle">Nobody cares about Compound Interest II</span>
        Earn +1% of Theta for ${formatNumber(getPercentCost(percentUpgrade4.sub(1)))} Percentages`;

    // AFFORDABLE STATES

    percent1.classList.toggle(
        "affordable",
        percentages.gte(getPercentCost(percentUpgrade1))
    );

    percent2.classList.toggle(
        "affordable",
        percentages.gte(getPercentCost(percentUpgrade2))
    );

    percent3.classList.toggle(
        "affordable",
        percentages.gte(getPercentCost(percentUpgrade3))
    );

    percent4.classList.toggle(
        "affordable",
        percentages.gte(
            getPercentCost(percentUpgrade4.sub(1))
        )
    );
}


// PERCENT UPGRADE 1

percent1.onclick = function() {

    let cost = getPercentCost(percentUpgrade1);

    if (percentages.gte(cost)) {

        percentages = percentages.sub(cost);

        percentUpgrade1 =
            percentUpgrade1.add(1);

        updatePercentGUI();
    }
};

// PERCENT UPGRADE 2

percent2.onclick = function() {

    let cost = getPercentCost(percentUpgrade2);

    if (percentages.gte(cost)) {

        percentages = percentages.sub(cost);

        percentUpgrade2 =
            percentUpgrade2.add(1);

        updatePercentGUI();
    }
};

// PERCENT UPGRADE 3

percent3.onclick = function() {

    let cost = getPercentCost(percentUpgrade3);

    if (percentages.gte(cost)) {

        percentages = percentages.sub(cost);

        percentUpgrade3 =
            percentUpgrade3.add(1);

        updatePercentGUI();
    }
};

// PERCENT UPGRADE 4


percent4.onclick = function() {

    let cost = getPercentCost(
        percentUpgrade4.sub(1)
    );

    if (percentages.gte(cost)) {

        percentages = percentages.sub(cost);

        percentUpgrade4 =
            percentUpgrade4.add(1);

        updatePercentGUI();
    }
};



// DIVISION REWORKS / RESETS

function divisionReset() {

    // MILESTONE 8
    // no reset after 15 dividends

    if (dividend.gte(15)) {
        return;
    }

    points = dividend.gte(3)
        ? new Decimal(500)
        : new Decimal(0);

    theta = dividend.gte(8)
        ? new Decimal(30)
        : new Decimal(0);

    power = new Decimal(0);

    cnter = 0;
    cnter2 = 0;
    cnter3 = 0;

    sumCost = new Decimal(10);
    evalCost = new Decimal(100);
    tallyCost = new Decimal(500);

    // KEEP UPGRADES

    if (!dividend.gte(1)) {

        subupgrade2Purchased = false;
        subupgrade3Purchased = false;
    }

    subupgrade1Purchased = false;

    // KEEP MULTIPLICATION GENERATORS

    if (!dividend.gte(5)) {

        products = 0;
        quintuplers = 0;
        amplifiers = 0;
    }

    mulUpgrade1Bought = false;
    mulUpgrade2Bought = false;
    mulUpgrade3Bought = false;
    mulUpgrade4Bought = false;

    productCost = new Decimal(30);
    quintuplerCost = new Decimal(100);
    amplifierCost = new Decimal(500);

    mu1costdedu = new Decimal(1);
    mu3boost = new Decimal(1);

    thetaUnlocked = false;

    document.getElementById("subtraction-container").style.display = "none";

    if (!subupgrade3Purchased) {
        document.getElementById("mul-tab").style.display = "none";
    }
}

// DIVIDEND BOOSTS

function getDividendBoost() {

    if (dividend.lt(4)) {
        return new Decimal(1);
    }

    return Decimal.pow(
        dividend.add(1),
        0.5
    );
}

// DIVISOR BOOST

function updateDivisorBoost() {

    if (dividend.gte(30)) {

        divisorboost = Decimal.pow(
            totaldivisors.add(1),
            0.25
        );

    } else {

        divisorboost = new Decimal(1);
    }
}

// LOOP

setInterval(function() {

    updateMilestones();

    updatePercentGUI();

    updateDivisorBoost();

}, 50);


setInterval(function() {

    updateDivisionGUI();

    let shownDivisors = Decimal.max(0, totaldivisors);

    document.getElementsByClassName("dividend-txt")[0].textContent =
        dividend.round().eq(1)
            ? "You have 1 Dividend"
            : `You have ${formatNumberShort(dividend)} Dividends`;

    document.getElementsByClassName("dvs-txt")[0].textContent =
        shownDivisors.round().eq(1)
            ? "You have 1 Divisor"
            : `You have ${formatNumberShort(shownDivisors)} Divisors`;

    updateMilestones();

}, 50);