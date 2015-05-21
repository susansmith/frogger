
// Return random number between 1 and 10 for offset of enemies

var games_won = 0;
var games_played = 1;
var current_streak = 0;
var level = 1;
var score = 0;

var enemyLocation = function(){
    return Math.floor(((Math.random() * 10) %5) +1);
}

// Enemies our player must avoid
var Enemy = function(loc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = loc[0];
    this.y = loc[1];
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Updates the Enemy location (you need to implement)
    var distance = this.speed * dt;

            if (this.x < 500) {
                this.x+=distance;
                if (this.x > player.x -99 && this.x < player.x +99 && this.y == player.y){
                    player.reset('lose');
                };
            }
            else {
                this.x= enemyLocation() * -100;
                this.speed = level * 10 * enemyLocation();
            };

    //Handles collision with the Player (you need to implement)
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(loc) {
    Enemy.call(this,loc,1);
    this.sprite = 'images/char-princess-girl.png';
};


//Player.prototype delegates to Object.prototype so players don't move.
//Delegate Player.prototype to Enemy.prototype

Player.prototype = Object.create(Enemy.prototype);

//Restore lookups to Player.prototype
Player.prototype.constructor = Player;

//Now can add to Player.prototype.

Player.prototype.update = function(){

    for (var i=0; i < enemiesLength; i++) {
//        console.log('allEnemies', i, allEnemies[i].x);
        if (allEnemies[i].x > this.x - 99 && allEnemies[i] < this.x + 99 && allEnemies[i].y == this.y){
            this.reset('lose');
            allEnemies.reset();
        };
    };
//    for each enemy
//    this.render();
};

Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(reason){
    if (reason=='win'){
        games_won+=1;
        current_streak+=1;
        level+=1;
        score+=50;
        if (level==2){
            for (var i=0; i < enemiesLength; i++) {
                allEnemies[i +3] = new Enemy([enemyLocation() * -100, (i+1) * 80], level * 10 * enemyLocation());
    }


        }
    }
    else {
        current_streak=0;
    };
    games_played+=1;
    ctx.font="20px Georgia";
    ctx.clearRect(675,0,805,500);
    ctx.fillText(score,675,85);
    ctx.fillText(current_streak,675,140);
    ctx.fillText(level,675,185);
    ctx.fillText(games_played,675,235);
    this.x=300;
    this.y=400;
    for (var i=0; i < enemiesLength; i++) {
//    allEnemies[i] = new Enemy([0,0], level);
        allEnemies[i].x =enemyLocation() * -100;
        allEnemies[i].y = (i+1) * 80;
        allEnemies.speed = level * 10 * enemyLocation();
    }
};

Player.prototype.handleInput = function(key_pressed){

    switch(key_pressed) {
        case 'left':
            console.log('left');
            if (this.x - 100 >= 0) {
                this.x = this.x - 100;
                this.update();
            }
            break;
        case 'right':
            if (this.x + 100 <= 400) {
                this.x = this.x + 100;
                this.update();
            }
            break;
        case 'up':
            if (this.y - 80 >= 79) {
                this.y = this.y - 80;
                this.update();
            }
            else {
                this.reset('win');
            }
            break;
        case 'down':
            if (this.y + 80 <= 420) {
                this.y = this.y + 80;
                this.update();
            }
            break;
        default:
            console.log('bad key');
    }
};

var allEnemies = [];
var player = new Player([300,400]);
var enemiesLength = 3;
for (var i=0; i < enemiesLength; i++) {
//    allEnemies[i] = new Enemy([0,0], level);
    allEnemies[i] = new Enemy([enemyLocation() * 100, (i+1) * 80], level * 10 * enemyLocation());
    console.log(allEnemies[i].x);
    console.log(allEnemies[i].y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    console.log('listening');
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
