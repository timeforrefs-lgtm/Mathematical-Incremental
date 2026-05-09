var power = 0;
let products = 0;
let quintuplers = 0;
let amplifiers = 0;

let productCost = 10;
let quintuplerCost = 100;
let amplifierCost = 500;

function updateMultiplicationGUI() {
    let productProduction = products * 1;
    let quintuplerProduction = quintuplers * 10;
    let amplifierProduction = amplifiers * 50;

    let totalPowerProduction =
        productProduction +
        quintuplerProduction +
        amplifierProduction;

    power += totalPowerProduction / 20;

    let pointBoost = Math.pow(power + 1, 0.5) - 1;

    document.getElementById("mul-points").innerHTML =
        `Power = ${formatNumber(power)}`;

    document.getElementById("mul-pointsproduced").innerHTML =
        `You are producing ${formatNumber(totalPowerProduction)} power per second boosting your overall point production by ${formatNumber(pointBoost * 100)}%`;

    document.getElementById("products").innerHTML =
        `You have ${products} Products producing ${formatNumber(productProduction)} power per second`;

    document.getElementById("quin").innerHTML =
        `You have ${quintuplers} Quintuplers producing ${formatNumber(quintuplerProduction)} power per second`;

    document.getElementById("ampl").innerHTML =
        `You have ${amplifiers} Amplifiers producing ${formatNumber(amplifierProduction)} power per second`;

    document.getElementById("products-btn").innerHTML =
        `Buy Product (Cost: ${formatNumber(Math.floor(productCost))} Theta)`;

    document.getElementById("quin-btn").innerHTML =
        `Buy Quintupler (Cost: ${formatNumber(Math.floor(quintuplerCost))} Power)`;

    document.getElementById("ampl-btn").innerHTML =
        `Buy Amplifier (Cost: ${formatNumber(Math.floor(amplifierCost))} Power)`;
}

function getPowerBoost() {
    return Math.pow(power + 1, 0.5);
}

setInterval(function() {
    updateMultiplicationGUI();
}, 50);

document.getElementById("products-btn").onclick = function() {
    if (theta >= Math.floor(productCost)) {
        theta -= Math.floor(productCost);
        products++;
        productCost *= 1.15;
        updateMultiplicationGUI();
        updateGUI();
    }
}

document.getElementById("quin-btn").onclick = function() {
    if (power >= Math.floor(quintuplerCost)) {
        power -= Math.floor(quintuplerCost);
        quintuplers++;
        quintuplerCost *= 1.15;
        updateMultiplicationGUI();
        updateGUI();
    }
}

document.getElementById("ampl-btn").onclick = function() {
    if (power >= Math.floor(amplifierCost)) {
        power -= Math.floor(amplifierCost);
        amplifiers++;
        amplifierCost *= 1.15;
        updateMultiplicationGUI();
        updateGUI();
    }
}
