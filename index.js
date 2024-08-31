#!/usr/bin/env node
import inquirer from "inquirer";
import showBanner from "node-banner";
import chalk from "chalk";
(async () => {
    await showBanner(`W e l c o m e   T o   T h e \n    .*.  " D u n g e o n " .*.`, "", "blue");
    // Enemy variables
    let enemies = ["Zombie", "Assassin", "Warrior", "Skeleton"];
    let maxEnemyHealth = 75;
    let enemyAttackDamage = 25; //the damage enemies give to player
    // Player Variables
    let playerHealth = 100;
    let playerAttackDamage = 50; //the damage player gives to enemies
    let numOfHealthPotion = 3; //the game starts with 3 health Potions
    let healthPotionHealAmount = 30; //each potion can increase heal to 30%
    let healthPotionDropChance = 50; //each time we kill an enemy 50% energy waste
    let running = true;
    while (running) {
        console.log(chalk.blue("------------------------------------------------"));
        let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
        let callingRandomEnemy = Math.floor(Math.random() * enemies.length);
        let enemy = enemies[callingRandomEnemy];
        console.log(chalk.red("\t#", enemy, "has appeared  😈 #\n "));
        while (enemyHealth > 0) {
            console.log(chalk.green("\t Your HP:", playerHealth + `%`));
            console.log(chalk.yellow("\t", enemy, "`s HP:", enemyHealth + "%"));
            let input = await inquirer.prompt({
                name: "input",
                message: "What would you like to do?",
                type: "list",
                choices: ["Attack", "Drink Health Potion", "Run"],
            });
            if (input.input === "Attack") {
                let damageDealt = Math.floor(Math.random() * playerAttackDamage + 1);
                let damageTaken = Math.floor(Math.random() * enemyAttackDamage + 1);
                enemyHealth -= damageDealt;
                playerHealth -= damageTaken;
                console.log(chalk.green("\t> You strike🔥 the", enemy, "for", damageDealt, "damage"));
                console.log(chalk.red("\t> You receive 💥", damageTaken, "in retaliation"));
                if (playerHealth < 1) {
                    console.log(chalk.bgRed(`\t> You have taken too much damage, you are too weak to go on 😰`));
                    break;
                }
            }
            else if (input.input === "Drink Health Potion") {
                if (numOfHealthPotion > 0) {
                    playerHealth += healthPotionHealAmount;
                    numOfHealthPotion--;
                    console.log(chalk.green(`\t> You drink a health potion 🧃, healing yourself for ${healthPotionHealAmount}%. 
                                \n \t> Now you have ${playerHealth}% HP.
                                \n \t> You have only ${numOfHealthPotion} 🧃 Health potions left.`));
                }
                else {
                    console.log(chalk.bgRed(`\t>You have no health potions left. Defeat enemies for a chance to get one🙄`));
                }
            }
            else if (input.input === "Run") {
                console.log(chalk.blue(`\t>You run away from ${enemy}!`));
                console.log(chalk.red(`\t \t Game end`));
                break;
            }
            else {
                console.log(chalk.red(`\t> Invalid input!`));
            }
        }
        if (playerHealth < 1) {
            console.log(chalk.red(`You limped out of the Dungeon, weak from battle.💨`));
            break;
        }
        console.log(chalk.blue(`------------------------------------------------`));
        console.log(chalk.green(`\t# ${enemy} was defeated! #`));
        console.log(chalk.yellow(`\t # You have ${playerHealth} HP left. #`));
        let calculation = Math.floor(Math.random() * 100);
        if (calculation < healthPotionDropChance) {
            numOfHealthPotion++;
            console.log(chalk.green(`#The ${enemy} dropped a health potion! 🧃#`));
            console.log(chalk.yellow(`\t# You have only ${numOfHealthPotion} Health potion(s).🧃 #`));
        }
        console.log(chalk.blue("-----------------------------------------------------------"));
        let input2 = await inquirer.prompt({
            name: "input2",
            message: "What would you like to do?",
            type: "list",
            choices: ["Continue Fighting", "Exit Dungeon"],
        });
        if (input2.input2 === "Continue Fighting") {
            console.log(chalk.green(`You continue on your adventure!`));
        }
        else if (input2.input2 === "Exit Dungeon") {
            console.log(chalk.green(`You get out of the Dungeon successfully from your adventures! 🎉✨`));
            break;
        }
        else {
            console.log(chalk.red(`\t> Invalid input!`));
        }
        console.log(chalk.magenta(`########################`));
        console.log(chalk.cyan(`\t> Thanks for playing`));
        console.log(chalk.magenta(`########################`));
    }
})();
