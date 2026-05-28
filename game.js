var points = new Decimal(0);
var theta = new Decimal(0);

var cnter = 0;
var cnter2 = 0;
var cnter3 = 0;

var sumCost = new Decimal(10);
var evalCost = new Decimal(100);
var tallyCost = new Decimal(500);

var thetaUnlocked = false;
var subupgrade1Purchased = false;
var subupgrade2Purchased = false;
var subupgrade3Purchased = false;
let subupgrade4Purchased = false;
let thetaAuto = false;

var currentTab = "+/-";
let currentmulTab = "pwrgain";
let currentdvsTab = "dvsreset";

document.getElementById("guide-content").style.display = "none";
document.getElementById("subtraction-container").style.display = "none";
document.getElementById("mul-tab-content").style.display = "none";
document.getElementById("mulupgrow2").style.display = "none";
document.getElementById("mulupgrow3").style.display = "none";
document.getElementById("mulupgrow4").style.display = "none";
document.getElementById("mulupgrades").style.display = "none";
document.getElementById("mul-tab").style.display = "none";
document.getElementById("dvs-content").style.display = "none";
document.getElementById("dvs-tab").style.display = "flex";
document.getElementById("factors").style.display = "none";
document.getElementById("percent").style.display = "none";
document.getElementById("milestones").style.display = "none";
document.getElementById("lose").style.display = "none";
document.getElementById("win").style.display = "none";

function getPowerBoost() {
    return new Decimal(1);
}

function formatNumber(num) {

    num = new Decimal(num);

    if (!num.isFinite()) return "Infinity";

    if (num.abs().lt(0.000001)) return "0.00";

    if (num.gte(1e9)) {

        let exponent = num.log10().floor().toNumber();

        let mantissa = num.div(
            Decimal.pow(10, exponent)
        );

        if (mantissa.gte(9.995)) {
            mantissa = mantissa.div(10);
            exponent++;
        }

        return mantissa.toFixed(2) + "e" + exponent;
    }

    if (num.gte(1000)) {
        return num.toNumber().toLocaleString("en-US", {
            maximumFractionDigits: 0
        });
    }

    return num.toFixed(2);
}

function formatNumberShort(num) {

    num = new Decimal(num);

    if (!num.isFinite()) return "Infinity";

    if (num.abs().lt(0.000001)) return "0";

    if (num.gte(1e9)) {

        let exponent = num.log10().floor().toNumber();

        let mantissa = num.div(
            Decimal.pow(10, exponent)
        );

        if (mantissa.gte(9.995)) {
            mantissa = mantissa.div(10);
            exponent++;
        }

        return mantissa.toFixed(2) + "e" + exponent;
    }

    if (num.gte(1000)) {
        return num.toNumber().toLocaleString("en-US", {
            maximumFractionDigits: 0
        });
    }

    return num.toFixed(0);
}

function tab1() {
    currentTab = "+/-";
    document.getElementById("addition-container").style.display = "flex";
    document.getElementById("guide-content").style.display = "none";
    document.getElementById("mul-tab-content").style.display = "none";
    document.getElementById("dvs-content").style.display = "none";
}

function tab2() {
    currentTab = "guide";
    document.getElementById("addition-container").style.display = "none";
    document.getElementById("guide-content").style.display = "block";
    document.getElementById("subtraction-container").style.display = "none";
    document.getElementById("mul-tab-content").style.display = "none";
    document.getElementById("dvs-content").style.display = "none";
}

function tab3() {
    currentTab = "mul";
    document.getElementById("addition-container").style.display = "none";
    document.getElementById("mul-tab-content").style.display = "block";
    document.getElementById("guide-content").style.display = "none";
    document.getElementById("subtraction-container").style.display = "none";
    document.getElementById("dvs-content").style.display = "none";
}

function tab4() {
    currentTab = "dvs";
    document.getElementById("addition-container").style.display = "none";
    document.getElementById("mul-tab-content").style.display = "none";
    document.getElementById("guide-content").style.display = "none";
    document.getElementById("subtraction-container").style.display = "none";
    document.getElementById("dvs-content").style.display = "block";
}

function multab1() {
    currentmulTab = "pwrgain";
    document.getElementById("power-content").style.display = "block";
    document.getElementById("mulupgrades").style.display = "none";
    document.getElementById("factors").style.display = "none";
}

function multab2() {
    currentmulTab = "mulupgs";
    document.getElementById("power-content").style.display = "none";
    document.getElementById("mulupgrades").style.display = "flex";
    document.getElementById("factors").style.display = "none";
}

function multab3() {
    currentmulTab = "factors";
    document.getElementById("power-content").style.display = "none";
    document.getElementById("mulupgrades").style.display = "none";
    document.getElementById("factors").style.display = "flex";
}

function dvstab1() {
    currentdvsTab = "milestones"
    document.getElementById("percent").style.display = "none";
    document.getElementById("milestones").style.display = "flex";
    document.getElementById("dvsreset").style.display = "none";
} 

function dvstab2() { 
    currentdvsTab = "dvsreset" 
    document.getElementById("percent").style.display = "none"; 
    document.getElementById("milestones").style.display = "none"; 
    document.getElementById("dvsreset").style.display = "flex"; 
} 

function dvstab3() { 
    currentdvsTab = "percent" 
    document.getElementById("percent").style.display = "flex"; 
    document.getElementById("milestones").style.display = "none"; 
    document.getElementById("dvsreset").style.display = "none"; 
}

function updateGUI() {

    let powerboost = getPowerBoost();

    if ((points.gte(5000) || theta.gte(1)) && !thetaUnlocked) {
        thetaUnlocked = true;
    }

    if (theta.gte(1)) {

        if (theta.eq(1)) {
            document.getElementById("points").textContent =
                `Total = θ+${formatNumber(points)}`;
        } else {
            document.getElementById("points").textContent =
                `Total = ${formatNumberShort(theta)}θ+${formatNumber(points)}`;
        }

    } else {

        document.getElementById("points").textContent =
            `Total = ${formatNumber(points)}`;
    }


    let su1exp = dividend.gte(2)
        ? Decimal.div(3, 2)
        : Decimal.div(2, 3);

    su1exp = su1exp.mul(
        Decimal.add(
            1,
            percentUpgrade3.mul(0.01)
        )
    );

    let thetaMultiplier = subupgrade1Purchased
        ? Decimal.pow(theta.add(1), su1exp)
        : new Decimal(1);



    let sumProd = new Decimal(cnter)
        .mul(thetaMultiplier);

    let evalProd = new Decimal(cnter2)
        .mul(10)
        .mul(thetaMultiplier);

    let tallyProd = new Decimal(cnter3)
        .mul(50)
        .mul(thetaMultiplier);

    if (subupgrade2Purchased) {
        tallyProd = tallyProd.mul(20);
    }

    let totalProd = sumProd
        .add(evalProd)
        .add(tallyProd);

    document.getElementById("pointsproduced").textContent =
        `You are producing ${formatNumber(totalProd.mul(powerboost))} point(s) per second`;

    document.getElementById("sum").textContent =
        `You have ${cnter} Summations producing ${formatNumber(sumProd)} points per second`;

    document.getElementById("eval").textContent =
        `You have ${cnter2} Evaluations producing ${formatNumber(evalProd)} points per second`;

    document.getElementById("tally").textContent =
        `You have ${cnter3} Tallies producing ${formatNumber(tallyProd)} points per second`;

    document.getElementById("sum-btn").textContent =
        `Buy Summation for ${formatNumber(sumCost.floor())} points (1)`;

    document.getElementById("eval-btn").textContent =
        `Buy Evaluation for ${formatNumber(evalCost.floor())} points (2)`;

    document.getElementById("tally-btn").textContent =
        `Buy Tally for ${formatNumber(tallyCost.floor())} points (3)`;

    let thetaCost = new Decimal(10000)
        .mul(
Decimal.pow(
    getThetaCostScaling(),
    theta.div(numeratorboost.add(1))
)

)
        .div((denominatorboost.add(1)))
        .floor();

    document.getElementById("sub-btn").textContent =
        `Gain Theta for ${formatNumberShort(thetaCost)} points (T)`;

    // AFFORDABLE STATES

    document.getElementById("sum-btn")
        .classList.toggle("affordable", points.gte(sumCost));

    document.getElementById("eval-btn")
        .classList.toggle("affordable", points.gte(evalCost));

    document.getElementById("tally-btn")
        .classList.toggle("affordable", points.gte(tallyCost));

    document.getElementById("subupgrade1")
        .classList.toggle("affordable", theta.gte(1) && !subupgrade1Purchased);

    document.getElementById("subupgrade2")
        .classList.toggle("affordable", theta.gte(5) && !subupgrade2Purchased);

    document.getElementById("subupgrade3")
        .classList.toggle("affordable", theta.gte(30) && !subupgrade3Purchased);

    document.getElementById("subupgrade4")
        .classList.toggle("affordable", theta.gte(250) && !subupgrade4Purchased);

    document.getElementById("subupgrade1")
        .classList.toggle("bought", subupgrade1Purchased);

    document.getElementById("subupgrade2")
        .classList.toggle("bought", subupgrade2Purchased);

    document.getElementById("subupgrade3")
        .classList.toggle("bought", subupgrade3Purchased);
    
    document.getElementById("subupgrade4")
        .classList.toggle("bought", subupgrade4Purchased);

    if (subupgrade3Purchased) {
        document.getElementById("mul-tab").style.display = "flex";
    }

    if (thetaUnlocked && currentTab === "+/-") {
        document.getElementById("subtraction-container").style.display = "flex";
    }
}

function updateThetaAutoGUI() {

    const autoBtn =
        document.getElementById("subauto-btn");

    // HIDE BEFORE UNLOCK

    if (!subupgrade4Purchased) {

        autoBtn.style.display = "none";
        return;
    }

    autoBtn.style.display = "inline-block";

    // TEXT

    autoBtn.textContent =
        thetaAuto ? "Auto: ON" : "Auto: OFF";

    // STYLE

    if (thetaAuto) {

        autoBtn.style.backgroundColor =
            "rgb(0, 138, 30)";

        autoBtn.style.color = "white";

    } else {

        autoBtn.style.backgroundColor =
            "rgb(255, 0, 0)";

        autoBtn.style.color = "white";
    }
}

document.getElementById("clicker").onclick = function() {
    points = points.add(1);
    updateGUI();
};

// BUY SUMMATION

document.getElementById("sum-btn").onclick = function() {

    if (points.gte(sumCost)) {

        points = points.sub(sumCost.mul(mu1costdedu));

        cnter++;

        sumCost = sumCost.mul(1.15).floor();

        updateGUI();
    }
};

// BUY EVALUATION

document.getElementById("eval-btn").onclick = function() {

    if (points.gte(evalCost)) {

        points = points.sub(evalCost.mul(mu1costdedu));

        cnter2++;

        evalCost = evalCost.mul(1.15).floor();

        updateGUI();
    }
};

// BUY TALLY

document.getElementById("tally-btn").onclick = function() {

    if (points.gte(tallyCost)) {

        points = points.sub(tallyCost.mul(mu1costdedu));

        cnter3++;

        tallyCost = tallyCost.mul(1.15).floor();

        updateGUI();
    }
};

// THETA RESET

document.getElementById("sub-btn").onclick = function() {

    var thetaCost = new Decimal(10000)
        .mul(
Decimal.pow(
    getThetaCostScaling(),
    theta.div(numeratorboost.add(1))
)

)
        .div((denominatorboost.add(1)))
        .floor();

    if (points.gte(thetaCost)) {
        points = points.sub(thetaCost);

        theta = theta.add(
            new Decimal(1).add(numeratorboost)
        );

        updateGUI();
    }
};

// UPGRADES

document.getElementById("subupgrade1").onclick = function() {

    if (theta.gte(1) && !subupgrade1Purchased) {

        subupgrade1Purchased = true;

        updateGUI();
    }
};

document.getElementById("subupgrade2").onclick = function() {

    if (theta.gte(5) && !subupgrade2Purchased) {

        subupgrade2Purchased = true;

        updateGUI();
    }
};

document.getElementById("subupgrade3").onclick = function() {

    if (theta.gte(30) && !subupgrade3Purchased) {

        subupgrade3Purchased = true;

        document.getElementById("costsu3").textContent = "Unlocked!";

        updateGUI();
    }
};

document.getElementById("subupgrade4").onclick =
function () {

    if (
        theta.gte(250) &&
        !subupgrade4Purchased
    ) {

        subupgrade4Purchased = true;

        updateThetaAutoGUI();
        updateGUI();
    }
};

document.getElementById("subauto-btn").onclick =
function () {

    if (!subupgrade4Purchased) return;

    thetaAuto = !thetaAuto;

    updateThetaAutoGUI();
};

// GAME LOOP

let lastTime = Date.now();

setInterval(function() {

    let powerboost = getPowerBoost();

    let now = Date.now();

    let delta = (now - lastTime) / 1000;

    lastTime = now;

    let thetaMultiplier = subupgrade1Purchased
        ? Decimal.pow(
            theta.add(1),
            getThetaExponent()
        )
        : new Decimal(1);



    let sum = new Decimal(cnter)
        .mul(thetaMultiplier);

    let evals = new Decimal(cnter2)
        .mul(10)
        .mul(thetaMultiplier);

    let tallies = new Decimal(cnter3)
        .mul(50)
        .mul(thetaMultiplier);

    if (subupgrade2Purchased) {
        tallies = tallies.mul(20);
    }

    let pointsToAdd = sum
        .add(evals)
        .add(tallies)
        .mul(powerboost)
        .mul(getDividendBoost())
        .mul(
            Decimal.add(
                1,
                percentUpgrade1.mul(0.01)
            )
        )
        .mul(delta);

    points = points.add(pointsToAdd);

    if (thetaAuto) {

        thetaCost = new Decimal(10000)
            .mul(
            Decimal.pow(
            getThetaCostScaling(),
            theta.div(numeratorboost.add(1))
            ))

        while (points.gte(thetaCost)) {

            points = points.sub(thetaCost);

            theta = theta.add(1);

            thetaCost = thetaCost.mul(
                getThetaCostScaling()
            );
        }
    }

    updateGUI();
    updateThetaAutoGUI();
}, 50);