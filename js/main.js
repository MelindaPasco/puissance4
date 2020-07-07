$(document).ready(function() {

    // Display custom box
    $("#openForm").click(function() {
        $("#openForm").remove();
        $("#custom").toggle();
    });

    // Launch
    $("#mySets").click(function() {
        let myY = $("#rows").val();
        let myX = $("#cols").val();
        let myJ1 = $("#j1").val();
        let myP1 = $("#p1").val();
        let myJ2 = $("#j2").val();
        let myP2 = $("#p2").val();
        $("#starter").remove();
        $("#board").empty();
        $("#theGame").toggle();
        $("#buttons").toggle();
        $("#history").toggle();
        $("#turnTrack").css("border-color", myP1);
        $("#turnTrack").html(`<strong>${myJ1}</strong>`);

        $("#board").startP4({
            rows: myY,
            cols: myX,
            //Player one
            j1: myJ1 ,
            p1: myP1,
            // Player two
            j2: myJ2,
            p2: myP2,    
        });
    });

    

    
    
    //console.log("the script is working ok");
});