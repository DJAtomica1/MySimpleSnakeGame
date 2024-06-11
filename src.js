
movetype = 2;
gamestarted = false;
window.onload = function () {
    bober = document.getElementsByClassName("gridplace")[0];
    for (var i = 0; i < 140; i++) {
        bober.innerHTML = bober.innerHTML + "<div class='" + i + "'data-value='" + 0 + "' style='background-color: gray;' apple='0'></div>";
    }


}
document.addEventListener("DOMContentLoaded", function () {

    function placeApple() {
        numb = 0;
        while (numb = Math.floor(Math.random() * (140))) {
            bober = document.getElementsByClassName(numb)[0];
            if(bober.getAttribute('data-value') <= 0) break;
        };
        console.log(numb);
        bober = document.getElementsByClassName(numb)[0];
        bober.setAttribute('apple', '1');
        bober.setAttribute('style', "background-color: red;");    
    }
    function firstApple(){
        numb = 0;
        while ((numb = Math.floor(Math.random() * (140))) != 113) {};
        bober = document.getElementsByClassName(numb)[0];
        bober.setAttribute('apple', '1');
        bober.setAttribute('style', "background-color: red;");  
    }

    var startButton = document.getElementById("start");
    removetail = function (numb) {

        bober = document.getElementsByClassName(numb)[0];
        val = bober.getAttribute("data-value") - 1;
        bober.setAttribute("data-value", val);

        if (val == 0) {
            bober.setAttribute("style", "background-color: gray;");
            bober.setAttribute("data-value", "0");
            return true;
        };
        if(val < 0){
            return true;
        }
        return false;
    }
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                if (movetype != 1)
                    movetype = 2;
                break;
            case "ArrowDown":
                if (movetype != 2)
                    movetype = 1;
                break;
            case "ArrowLeft":
                if (movetype != 3)
                    movetype = 4;
                break;
            case "ArrowRight":
                if (movetype != 4)
                    movetype = 3;
                break;
        }
    });


    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function play() {
        var player = 113;

        directions = function (type) {
            if (type == 1) return 20;
            else if (type == 2) return -20;
            else if (type == 3) return 1;
            else return -1;
        };

        var score = 5;
        var speed = 750 / score;

        tail = [];
        while (true) {
            if (player >= 140 && (movetype == 1)) { player = player - 140; }
            else if (player < 0 && movetype == 2) { player = player + 140; }
            else if (player % 20 == 0 && movetype == 3) {
                player = player - 20;
            }
            else if ((player + 1) % 20 == 0 && movetype == 4) {
                player = player + 20;
            }
            if(player >= 140) {
                player = 139;
                movetype = 4;
            }
            if(player < 0){
                player = 0;
                movetype = 3;
            }
            bober = document.getElementsByClassName(player)[0];
            tail.push(player);
            bober.setAttribute("data-value", score);
            bober.setAttribute("style", 'background-color: white;');
            app = bober.getAttribute('apple');
            if(app == '1'){
                bober.setAttribute('apple', '0');
                score++;
                sc = document.getElementById('thescore');
                sc.innerHTML = "score: " + (score - 6);
                placeApple();
            }
            else
                tail = tail.filter(numb => !removetail(numb));
            
            
            player = player + directions(movetype);
            await sleep(speed);
        }
    }

    startButton.addEventListener("click", function () {
        if (!gamestarted) {
            gamestarted = true;
            firstApple();
            play();
        }

    });
});

