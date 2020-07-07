(function( $ ) {

    $.fn.startP4 = function (options) {

        let settings = $.extend ({
            rows: 6,
            cols: 7,
            j1: "joueur1",
            p1: "red",
            j2: "joueur2",
            p2: "yellow",
        }, options );

        // In case you change your mind on your settings
        $("h2").click(function() {
            location.reload();
        });

        // What ever shall I dooo ?

        $("#togRules").click(function() {
            $("#rules").toggle();
            console.log("clicked");
        });

        // Play again

        $("#rejouer").click(function() {
            $("h2").html("Puissance 4");
            $(".joueur1").addClass("VIDE");
            $(".joueur2").addClass("VIDE");
            $("div").removeClass("joueur1");
            $("div").removeClass("joueur2");
            $(".col").css("background-color", "white");
            $("#theGame").css("visibility", "visible");
            $("#redo").css("visibility", "hidden");
        });

        class Puissance4 {
            constructor (selector) {
                this.rows = settings.rows; // Y
                this.cols = settings.cols; // X
                this.j1 = settings.j1;
                this.p1 = settings.p1;
                this.j2 = settings.j2;
                this.p2 = settings.p2;
                this.player = "joueur1";
                this.selector = selector;
                this.buildBoard();
                this.addEventListener();
            }
            
            
            // Game board

            buildBoard() {
                const $board = $(this.selector);
                for (let i = 0; i < this.rows; i++) {
                    const row = $("<div>").addClass("row");
                    for (let j = 0; j < this.cols; j++) {
                        let id = "";
                        let cellId = id.concat (i+1, "-", j+1);
                        const col = $("<div>").addClass("col VIDE")
                            .attr("yPos", i+1)
                            .attr("xPos", j+1)
                            .attr("id", cellId);
                        row.append(col);
                    }
                $board.append(row);
                }  
            }
        
            // Finding the bottom empty cell in the hovered column

            addEventListener() {
                const $board = $(this.selector);
                const that = this;
                let winCount = 0;

                function findLastEmptyCell(x) {
                    const cells = $(`.col[xPos="${x}"]`);
                    for (let i = cells.length - 1; i >= 0; i--) {
                        const $cell = $(cells[i]);
                        if ($cell.hasClass("VIDE")) {
                            return $cell;
                        }
                    }
                    return null;
                }
        
                $board.on("mouseenter", ".col.VIDE", function () {
                    const x = $(this).attr("xPos");
                    const lastEmptyCell = findLastEmptyCell(x);
                    lastEmptyCell.addClass("playerMove");
                });

                $board.on("mouseleave", ".col", function() {
                    $(".col").removeClass("playerMove");
                });

                // Do over

                $("#redo").click(function() {
                    $(".lastMove").css("background-color", "white");
                    $(".lastMove").addClass("VIDE");
                    $(".lastMove").removeClass("joueur1");
                    $(".lastMove").removeClass("joueur2");

                    // Revert play turn
                    if (that.player === "joueur1") {
                        that.player = "joueur2";
                        $("#turnTrack").css("border-color", that.p2);
                        $("#turnTrack").html(`<strong>${that.j2}</strong>`);
                    } else if (that.player === "joueur2") {
                        that.player = "joueur1";
                        $("#turnTrack").css("border-color", that.p1);
                        $("#turnTrack").html(`<strong>${that.j1}</strong>`);
                    }

                    $("#redo").css("visibility", "hidden");
                });

                // Place pawn based on player

                $board.on("click", ".col.VIDE", function () {
                    const x = $(this).attr("xPos");
                    const y = $(this).attr("yPos");
                    const lastEmptyCell = findLastEmptyCell(x);
                    $("div").removeClass("lastMove");
                    $("#redo").css("visibility", "visible");
                    console.log($("#redo"));
                    lastEmptyCell.removeClass("VIDE");
                    lastEmptyCell.removeClass(`new-${that.player}`);
                    lastEmptyCell.addClass(that.player);
                    lastEmptyCell.addClass("lastMove");

                    // Preventing last cell before win to default in color
                    if (that.player ==="joueur1") {
                        lastEmptyCell.css("background-color", settings.p1);
                    } else {
                        lastEmptyCell.css("background-color", settings.p2);
                    }
                    
                    
                    // WIN CONDITIONS !

                    function checkwin1 () {
                        // Horizontal (check r by r, bottom up)
                        function fourInRow () {
                            if (lastEmptyCell.hasClass("joueur1")){
                                for (let i = 1; i <= that.rows; i++) {
                                    let winCount1 = 0;
                                    for (let j = 1; j <= that.cols; j++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${i}"]`);
                                        if (cell.hasClass("joueur1")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("R1 is" + winCount1); 
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j1} ] a gagné !`);
                                    
                                            // Winner
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j1}] !`);

                                            // Log
                                            let gameLog = `<p>[ ${that.j1} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                    }
                                }
                            } else if (lastEmptyCell.hasClass("joueur2")){
                                for (let i = 1; i <= that.rows; i++) {
                                    let winCount2 = 0;
                                    for (let j = 1; j <= that.cols; j++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${i}"]`);
                                        if (cell.hasClass("joueur2")){
                                            winCount2 = winCount2 +1 ;
                                            //console.log("R2 is" + winCount2);
                                        } else {
                                            winCount2 = 0;
                                        }
                                        if (winCount2 === 4) {
                                            alert (`[ ${that.j2} ] a gagné !`);
                                            
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j2}] !`);

                                            let gameLog = `<p>[ ${that.j2} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                    }
                                }
                            }
                        }

                        // Vertical (check c by c, left to right) => can be simplified
                        function fourInLine () {
                            if (lastEmptyCell.hasClass("joueur1")){
                                for (let j = 1; j <= that.cols; j++) {
                                    let winCount1 = 0;
                                    for (let i = 1; i <= that.rows; i++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${i}"]`);
                                        if (cell.hasClass("joueur1")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("L1 is" + winCount1);
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j1} ] a gagné !`);
                                            winCount1 = 0;
                                            
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j1}] !`);

                                            let gameLog = `<p>[ ${that.j1} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                    }
                                }
                            } else if (lastEmptyCell.hasClass("joueur2")){
                                for (let j = 1; j <= that.cols; j++) {
                                    let winCount2 = 0;
                                    for (let i = 1; i <= that.rows; i++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${i}"]`);
                                        if (cell.hasClass("joueur2")){
                                            winCount2 = winCount2 +1 ;
                                            //console.log("L2 is" + winCount2);
                                        } else {
                                            winCount2 = 0;
                                        }
                                        if (winCount2 === 4) {
                                            alert (`[ ${that.j2} ] a gagné !`);
                                            winCount2 = 0;
                                            
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j2}] !`);

                                            let gameLog = `<p>[ ${that.j2} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                    }
                                }
                            }
                        }

                        // Diagonal (start 1-1, ascending)
                        function fourDiagUp () {
                            if (lastEmptyCell.hasClass("joueur1")){
                                for (let i = 0; i < 2*that.rows; i++) {
                                    let winCount1 = 0;
                                    let dU = i + 1;
                                    for (let j = 1; j <= that.cols; j++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${dU}"]`);
                                        //console.log($(`.col[xPos="${j}"][yPos="${dU}"]`));
                                        if (cell.hasClass("joueur1")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("DU1 is" + winCount1); 
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j1} ] a gagné !`);
                                            
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j1}] !`);

                                            let gameLog = `<p>[ ${that.j1} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                        dU--;
                                    }
                                }
                            } else if (lastEmptyCell.hasClass("joueur2")){
                                for (let i = 0; i < 2*that.rows; i++) {
                                    let winCount1 = 0;
                                    let dU = i + 1;
                                    for (let j = 1; j <= that.cols; j++) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${dU}"]`);
                                        if (cell.hasClass("joueur2")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("DU2 is" + winCount1); 
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j2} ] a gagné !`);

                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j2}] !`);

                                            let gameLog = `<p>[ ${that.j2} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                        dU--;
                                    }
                                }
                            }
                        }

                        // Diagonal (start 1-Max, ascending backward)
                        function fourDiagDown () {
                            if (lastEmptyCell.hasClass("joueur1")){
                                for (let i = 0; i < 2*that.rows; i++) {
                                    let winCount1 = 0;
                                    let dD = i + 1;
                                    for (let j = that.rows; j > 0; j--) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${dD}"]`);
                                        //console.log($(`.col[xPos="${j}"][yPos="${dD}"]`));
                                        if (cell.hasClass("joueur1")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("DD1 is" + winCount1); 
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j1} ] a gagné !`);
                                            
                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j1}] !`);

                                            let gameLog = `<p>[ ${that.j1} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                        dD--;
                                    }
                                }
                            }
                            if (lastEmptyCell.hasClass("joueur2")){
                                for (let i = 0; i < 2*that.rows; i++) {
                                    let winCount1 = 0;
                                    let dD = i + 1;
                                    for (let j = that.rows; j > 0; j--) {
                                        let cell = $(`.col[xPos="${j}"][yPos="${dD}"]`);
                                        //console.log($(`.col[xPos="${j}"][yPos="${dD}"]`));
                                        if (cell.hasClass("joueur2")){
                                            winCount1 = winCount1 +1 ;
                                            //console.log("DD1 is" + winCount1); 
                                        } else {
                                            winCount1 = 0;
                                        }
                                        if (winCount1 === 4) {
                                            alert (`[ ${that.j2} ] a gagné !`);

                                            $("#theGame").css("visibility", "hidden");
                                            $("h2").html(`Félicitation [${that.j2}] !`);

                                            let gameLog = `<p>[ ${that.j2} ] a gagné</p>`;
                                            $("#history").append(gameLog);
                                            $("#redo").css("visibility", "hidden");
                                        }
                                        dD--;
                                    }
                                }
                            }

                        }

                        fourInRow(); 
                        fourInLine();
                        fourDiagUp();
                        fourDiagDown();  
                    }

                    checkwin1();

                    // Il n'y a plus de case - Match nul

                    if ($(".VIDE").length === 0) {
                        alert ("Match nul !"); 
                    }

                    // Refresh next move indicator 

                    that.player = (that.player ==="joueur1") ? "joueur2" : "joueur1";
                    $(this).trigger("mouseenter");
                    if (that.player ==="joueur1") {
                        lastEmptyCell.css("background-color", settings.p2);
                        $("#turnTrack").css("border-color", settings.p1);
                        $("#turnTrack").html(`<strong>${that.j1}</strong>`);
                    } else {
                        lastEmptyCell.css("background-color", settings.p1);
                        $("#turnTrack").css("border-color", settings.p2);
                        $("#turnTrack").html(`<strong>${that.j2}</strong>`);
                    }
                })
            }

        }
        
        // create the thingy
        const connect4 = new Puissance4("#board");
        
        console.log("the plugin is not broken yet");
    }
}( jQuery ));