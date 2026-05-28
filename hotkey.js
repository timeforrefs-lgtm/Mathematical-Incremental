document.addEventListener("keydown", function(event) {

    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) return;

    switch(event.key.toLowerCase()) {

        case "1":
            document.getElementById("sum-btn").click();
            break;


        case "2":
            document.getElementById("eval-btn").click();
            break;


        case "3":
            document.getElementById("tally-btn").click();
            break;


        case "t":
            document.getElementById("sub-btn").click();
            break;

        case "4":
            document.getElementById("products-btn").click();
            break;

        case "5":
            document.getElementById("quin-btn").click();
            break;
        
        case "6":
            document.getElementById("ampl-btn").click();
            break;

        case "d":
            document.getElementById("dvsreset-btn").click();
            break;

        case "altKey" && "t":
            document.getElementById("subauto-btn").click();
            break;
    }
});