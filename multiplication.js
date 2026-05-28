var power = new Decimal(0);

var products = 0;
var quintuplers = 0;
var amplifiers = 0;

let productCost = new Decimal(30);
let quintuplerCost = new Decimal(100);
let amplifierCost = new Decimal(500);

function updateMultiplicationGUI() {

    let productProduction = new Decimal(products);

    let quintuplerProduction = new Decimal(quintuplers)
        .mul(10);

    let amplifierProduction = new Decimal(amplifiers)
        .mul(50)
        .mul(mu3boost);

    let totalPowerProduction = productProduction
        .add(quintuplerProduction)
        .add(amplifierProduction);

    power = power.add(
        totalPowerProduction.div(20)
    );

    let pointBoost = Decimal
        .pow(power.add(1), 0.5)
        .sub(1);

    document.getElementById("mul-points").textContent =
        `Power = ${formatNumber(power)}`;

    document.getElementById("mul-pointsproduced").textContent =
        `You are producing ${formatNumber(totalPowerProduction)} power per second boosting your overall point production by ${formatNumber(pointBoost.mul(100))}%`;

    document.getElementById("products").textContent =
        `You have ${products} Products producing ${formatNumber(productProduction)} power per second`;

    document.getElementById("quin").textContent =
        `You have ${quintuplers} Quintuplers producing ${formatNumber(quintuplerProduction)} power per second`;

    document.getElementById("ampl").textContent =
        `You have ${amplifiers} Amplifiers producing ${formatNumber(amplifierProduction)} power per second`;

    document.getElementById("products-btn").textContent =
        `Buy Product for ${formatNumber(productCost.floor())} Theta (4)`;

    document.getElementById("quin-btn").textContent =
        `Buy Quintupler for ${formatNumber(quintuplerCost.floor())} Power (5)`;

    document.getElementById("ampl-btn").textContent =
        `Buy Amplifier for ${formatNumber(amplifierCost.floor())} Power (6)`;

    document.getElementById("products-btn")
        .classList.toggle(
            "affordable",
            theta.gte(productCost) && currentTab === "mul"
        );

    document.getElementById("quin-btn")
        .classList.toggle(
            "affordable",
            power.gte(quintuplerCost) && currentTab === "mul"
        );

    document.getElementById("ampl-btn")
        .classList.toggle(
            "affordable",
            power.gte(amplifierCost) && currentTab === "mul"
        );
}

function getPowerBoost() {

    return Decimal
        .pow(power.add(1), 0.5)
        .mul(
            Decimal.add(
                1,
                percentUpgrade2.mul(0.01)
            )
        );
}

let lastTime2 = Date.now();

setInterval(function() {

    let now2 = Date.now();

    let delta2 = (now2 - lastTime2) / 1000;

    lastTime2 = now2;

    updateMultiplicationGUI();

}, 50);

// BUY PRODUCT

document.getElementById("products-btn").onclick = function() {

    if (theta.gte(productCost)) {

        theta = theta.sub(productCost);

        products++;

        productCost = productCost
            .mul(1.15)
            .floor();
            
        updateMultiplicationGUI();
        updateGUI();
    }
};

// BUY QUINTUPLER

document.getElementById("quin-btn").onclick = function() {

    if (power.gte(quintuplerCost)) {

        power = power.sub(quintuplerCost);

        quintuplers++;

        quintuplerCost = quintuplerCost
            .mul(1.15)
            .floor();

        updateMultiplicationGUI();
        updateGUI();
    }
};

// BUY AMPLIFIER

document.getElementById("ampl-btn").onclick = function() {

    if (power.gte(amplifierCost)) {

        power = power.sub(amplifierCost);

        amplifiers++;

        amplifierCost = amplifierCost
            .mul(1.15)
            .floor();

        updateMultiplicationGUI();
        updateGUI();
    }
};