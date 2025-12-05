(function () {
    "use strict";
    console.log("reading js");
    //all console logs in the file below were used to help me track turns and debug. i left them in so that user can see whats happening under the hood too! its cool in the inspector :)

    const p1Img = document.getElementById("p1-img");
    const p2Img = document.getElementById("p2-img");
    const p1Size = document.getElementById("p1-size");
    const p2Size = document.getElementById("p2-size");

    const waterBtn = document.querySelector(".water");
    const fertBtn = document.querySelector(".fertilize");
    const sabBtn = document.querySelector(".sabotage");

    const p1Header = document.getElementById("p1-header");
    const p2Header = document.getElementById("p2-header");

    const p1Feedback = document.getElementById("p1-feedback");
    const p2Feedback = document.getElementById("p2-feedback");

    const dayCounter = document.getElementById("day-number");

    const pestsOverlay = document.getElementById("pests-overlay");
    const startScreen = document.getElementById("start-screen");
    const endScreen = document.getElementById("end-screen");

    const winnerName = document.getElementById("winner-name");

    const waterSound = new Audio("audio/water.mp3");
    const fertSound = new Audio("audio/fertlize.ogg");
    const growthSound = new Audio("audio/growth.wav");
    const wiltSound = new Audio("audio/wilt.wav");
    const pestsSound = new Audio("audio/pests.mp3");

//STARTING VALUES
    let isP1Turn = true;
    let gameStarted = false;
    let day = 1;

    let p1 = {
        size: 0,
        waterCount: 0,
        fertCount: 0
    };

    let p2 = {
        size: 0,
        waterCount: 0,
        fertCount: 0
    };

    let timer;

    function updateImages() {
        updatePlayerImage(p1, p1Img);
        updatePlayerImage(p2, p2Img);
    }

   function updateScores() {
        if (p1.size < 0) p1.size = 0;
        if (p2.size < 0) p2.size = 0;

        p1Size.textContent = p1.size;
        p2Size.textContent = p2.size;
    }

    function updatePlayerImage(player, imgEl) {
        let size = player.size;

        if (size < 3) {
            imgEl.src = "images/box.png";
            imgEl.style.transform = "scale(1)";
        } else if (size < 8) {
            imgEl.src = "images/sprout.png";
            imgEl.style.transform = "scale(1)";
        } else if (size < 10) {
            imgEl.src = "images/vine.png";
            imgEl.style.transform = "scale(1)";
        } else {
            imgEl.src = "images/growing.png";
            let scale = 1 + (size - 10) * 0.1;

            //chat helped with math fucntion explainations
            scale = Math.max(1, Math.min(scale, 2.2));  

            imgEl.style.transformOrigin = "center center";
            imgEl.style.transform = `scale(${scale})`;

            addParticles(imgEl);
            growthSound.play();
        }
    }

    function addParticles(imgEl) {
        let container = imgEl.parentElement;
        let particle = document.createElement("div");
        particle.className = "particle";
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 900);
    }

    function highlightTurn() {
        p1Header.style.color = isP1Turn ? "#ffb347" : "#4a2b16";
        p2Header.style.color = !isP1Turn ? "#ffb347" : "#4a2b16";
    }

    function showFeedback(el, msg) {
        el.textContent = msg;
        el.classList.add("show");

        setTimeout(() => {
            el.classList.remove("show");
        }, 1200);
    }

    function startDayTimer() {
        if (gameStarted) return;

        gameStarted = true;

        timer = setInterval(() => {
            day++;
            dayCounter.textContent = day;

            if (day >= 14) {
                endGame();
            }
        }, 8000); 
    }

    function getPestChance(fertCount) {
        if (fertCount < 8) return 10;   
        if (fertCount < 20) return 8;  
        return 6;                     
    }

    function getWiltChance(waterCount) {
        if (waterCount < 8) return 8;  
        return 6;                      
    }

    function triggerPests(player, feedbackEl) {
        pestsOverlay.classList.add("show");
        pestsSound.play();
        console.log("PEST ATTACK!");

        player.size -= 3;
        showFeedback(feedbackEl, "-3 (Pests!)");

        setTimeout(() => {
            pestsOverlay.classList.remove("show");
            updateScores();
            updateImages();
            switchTurn();
        }, 1500);
    }

    function triggerWilt(player, feedbackEl, imgEl) {
        wiltSound.play();
        imgEl.classList.add("shake");

        player.size -= 2;
        console.log("WILT!");

        showFeedback(feedbackEl, "-2 (Wilt!)");

        setTimeout(() => {
            imgEl.classList.remove("shake");
            updateScores();
            updateImages();
            switchTurn();
        }, 1000);
    }

    //TURN CHANGE
    function switchTurn() {
        isP1Turn = !isP1Turn;
        highlightTurn();
        console.log("TURN →", isP1Turn ? "Player 1" : "Player 2");

        if (!isP1Turn) {
            setTimeout(player2AI, 900);
        }
    }

    //PLAYER 1 
    function water(player, feedbackEl, imgEl) {
        startDayTimer();

        player.waterCount++;
        player.size++;
        updateScores();

        waterSound.play();
        showFeedback(feedbackEl, "+1 Water");

        console.log("WATER used");

        // Wilt check / chat helped with math
        if (Math.random() < 1 / getWiltChance(player.waterCount)) {
            triggerWilt(player, feedbackEl, imgEl);
            return;
        }

        updateImages();
        if (!isP1Turn) {
            setTimeout(player2AI, 900);
        }
    }

    function fertilize(player, feedbackEl, imgEl) {
        startDayTimer();

        player.fertCount++;
        player.size += 3;
        updateScores();

        fertSound.play();
        showFeedback(feedbackEl, "+3 Fertilizer");

        console.log("FERTILIZE used");

        // Pests check
        if (Math.random() < 1 / getPestChance(player.fertCount)) {
            triggerPests(player, feedbackEl);
            return;
        }

        updateImages();
        if (!isP1Turn) {
            setTimeout(player2AI, 900);
        }
    }

    function sabotage(player, opponent, feedbackEl) {
        startDayTimer();

        opponent.size -= 4;
        updateScores();

        showFeedback(feedbackEl, "-4 Sabotage!");
        console.log("SABOTAGE!");

        updateImages();
        switchTurn();
    }

    //PLAYER 2
    function player2AI() {
        console.log("Player 2 acting…");

        let choice = Math.floor(Math.random() * 3) + 1;

        if (choice === 1) {
            water(p2, p2Feedback, p2Img);
        } else if (choice === 2) {
            fertilize(p2, p2Feedback, p2Img);
        } else {
            sabotage(p2, p1, p2Feedback);
        }
    }

    //WIN SCREEN
    function endGame() {
        clearInterval(timer);

        const p1Final = p1.size;
        const p2Final = p2.size;

        if (p1Final > p2Final) {
            winnerName.textContent = "Player One!";
        } else if (p2Final > p1Final) {
            winnerName.textContent = "Player Two!";
        } else {
            winnerName.textContent = "It's a tie!";
        }

        endScreen.classList.add("show");
    }

    //ACTIONS
    waterBtn.addEventListener("click", () => {
        if (!isP1Turn) return;
        water(p1, p1Feedback, p1Img);
    });

    fertBtn.addEventListener("click", () => {
        if (!isP1Turn) return;
        fertilize(p1, p1Feedback, p1Img);
    });

    sabBtn.addEventListener("click", () => {
        if (!isP1Turn) return;
        sabotage(p1, p2, p1Feedback);
    });

    document.getElementById("start-button").addEventListener("click", () => {
        startScreen.classList.remove("show");
        highlightTurn();
    });

    document.getElementById("play-again").addEventListener("click", () => {
        location.reload();
    });

})();
