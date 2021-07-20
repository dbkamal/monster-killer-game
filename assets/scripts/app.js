const PLAYER_NORMAL_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 13;
const MONSTER_ATTACK_VALUE = 11;
const PLAYER_HEAL_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let playerBonusLife = 0;
let numberOfStrongAttackAllowed = 2;
let numberMonsterWin = 0;
let numberPlayerWin = 0;
let numberOfDraws = 0;
let numberOfMatch = 0;

adjustHealthBars(chosenMaxLife);
healBtn.disabled = true;

function attackMonster(attack_value) {
    const monsterDamage = dealMonsterDamage(attack_value);
    currentMonsterHealth -= monsterDamage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    // update the health meter
    document.getElementById("monster-health-progress").textContent = Math.round(currentMonsterHealth) + "%";
    document.getElementById("player-health-progress").textContent = Math.round(currentPlayerHealth) + "%";

    // check who is winning
    // if the match is draw or user wins increase the bonus
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
        playerBonusLife++;
        updateBonusLife(playerBonusLife);

        if (playerBonusLife > 0) {
            healBtn.disabled = false;
            console.log("heal is turned off");
        }

        numberPlayerWin++;
        document.getElementById("no-player-win").textContent = numberPlayerWin;
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
        numberMonsterWin++;
        document.getElementById("no-monster-win").textContent = numberMonsterWin;
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("Draw!");
        playerBonusLife++;
        updateBonusLife(playerBonusLife);

        if (playerBonusLife > 0) {
            healBtn.disabled = false;
            console.log("heal is turned off");
        }

        healBtn.disabled = false;
        numberOfDraws++;
        document.getElementById("no-draws").textContent = numberOfDraws;
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        resetGame(chosenMaxLife);
        currentMonsterHealth = chosenMaxLife;
        currentPlayerHealth = chosenMaxLife;
        numberOfStrongAttackAllowed = 2;
        strongAttackBtn.disabled = false;
        
        document.getElementById("monster-health-progress").textContent = Math.round(100) + "%";
        document.getElementById("player-health-progress").textContent = Math.round(100) + "%";
        document.getElementById("match-num").textContent = ++numberOfMatch;
    }
}

function attackHandler() {
    attackMonster(PLAYER_NORMAL_ATTACK_VALUE);
}

function attackStrongHandler() {
    if (numberOfStrongAttackAllowed > 0) {
        numberOfStrongAttackAllowed--;
        attackMonster(PLAYER_STRONG_ATTACK_VALUE);
    }

    if (numberOfStrongAttackAllowed == 0) {
        strongAttackBtn.disabled = true;
    }
}

function playerHealHandler() {
    if (playerBonusLife <= 0) {
        alert("No bonus life left! \nNo healing");
        return;
    }
    
    increasePlayerHealth(Math.min(PLAYER_HEAL_VALUE, chosenMaxLife - currentPlayerHealth));
    currentPlayerHealth += Math.min(PLAYER_HEAL_VALUE, chosenMaxLife - currentPlayerHealth);
    attackMonster(PLAYER_NORMAL_ATTACK_VALUE);
    
    playerBonusLife--;
    updateBonusLife(playerBonusLife);

    if (playerBonusLife <= 0) {
        healBtn.disabled = true;
    }
}

function restartGameHandler() {
    chosenMaxLife = 100;
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    playerBonusLife = 0;
    numberOfStrongAttackAllowed = 2;
    numberMonsterWin = 0;
    numberPlayerWin = 0;
    numberOfDraws = 0;
    numberOfMatch = 0;

    document.getElementById("match-num").textContent = 0;
    document.getElementById("no-monster-win").textContent = 0;
    document.getElementById("no-player-win").textContent = 0;
    document.getElementById("no-draws").textContent = 0;
    document.getElementById("monster-health-progress").textContent = Math.round(100) + "%";
    document.getElementById("player-health-progress").textContent = Math.round(100) + "%";
    updateBonusLife(playerBonusLife);

}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', attackStrongHandler);
healBtn.addEventListener('click', playerHealHandler);
restartGameBtn.addEventListener('click', restartGameHandler);