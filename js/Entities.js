//This file contains all entities in the game

const yImageRenderOffset = 70; //Amount of space to ajdust images vertically

//General abstraction for an entity
class Entity {
    constructor(x, y) {
        this.x = x * blockWidth;
        this.y = y * blockHeight;
    }
}

//Goal for the player to reach
//This also renders instructions at the beginning
class Goal extends Entity {
    constructor(x, y) {
        super(x, y);
    }

    render() {
        ctx.drawImage(Resources.get(sprites.goal),
        this.x, this.y - yImageRenderOffset - 20);

        ctx.font = blockWidth / 3.4 + 'px Comic Sans MS';
        ctx.fillStyle = 'white';
        ctx.fillText('Use mouse arrows or swipe to move',
        5, areaHeight - blockHeight - 25);
        ctx.fillText('Avoid bugs and water',
        blockWidth + 3, areaHeight - 25);
    }
}

//Entity that blocks the player's movement
class Rock extends Entity {
    constructor(x, y) {
        super(x, y);
    }

    render() {
        //Draws Collider
        //ctx.fillRect(this.x, this.y, blockWidth, blockHeight);
        ctx.drawImage(Resources.get(sprites.rock),
        this.x, this.y - yImageRenderOffset);
    }
}

//Entity to be collected by the player
class Gem extends Entity {
    constructor(x, y) {
        super(x, y);
    }

    render() {
        ctx.drawImage(Resources.get(sprites.gem), this.x + 22, this.y - 22, 101/1.75, 171/1.75);
    }
}

//Represents an enemy Entity and checks collisions with the player
class Enemy extends Entity {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > areaWidth) this.x = -blockWidth;

        this.checkCollision();
    };

    //Restart the player position and count a loss if collides with the player
    checkCollision() {
        if (this.x < player.Collider.x + player.Collider.width &&
        this.x + blockWidth > player.Collider.x &&
        this.y < player.y + blockHeight &&
        this.y + blockHeight > player.y) {
            player.moveToStart();
        }
    }

    render() {
        //Draws collider
        //ctx.fillRect(this.x, this.y, blockWidth, blockHeight);
        ctx.drawImage(Resources.get(sprites.enemy),
        this.x, this.y - yImageRenderOffset);
    }
}

//Represents the player to be moved
class Player extends Entity {
    constructor() {
        super(0, 0);
        this.moveToStart();
        this.clearDirection();
        this.setCollider();
    }

    //Sets the collider property
    //A player collider only differs in the x axis
    setCollider() {
        this.Collider = {
            x: this.x + 25,
            width: blockWidth - 48
        };
    }

    //Checks the direction this player is moving and moves if appropriate
    //Ignores move if it is out of game area
    //Performs collisions on entities if touched them
    //Wins a game if the player reaches the goal
    update() {
        if (this.direction.x != 0 || this.direction.y != 0) {
            const newPosition = {
                x: this.x + this.direction.x * blockWidth,
                y: this.y + this.direction.y * blockHeight
            }

            Player.hitsGem(newPosition);

            if (Player.reachesGoal(newPosition)) {
                this.moveToStart();
            } else if (Player.hitsWater(newPosition.y)) {
                this.moveToStart();
            }
            else if (!Player.hitsRock(newPosition) && Player.withinGameArea(newPosition)) {
                this.move(newPosition.x, newPosition.y);
            } else {
                this.clearDirection();
            }
        }
    }
    
    //Moves the player to the starting position
    moveToStart() {
        this.move(2 * blockWidth, (numRows - numStartBlocks + 1) * blockHeight);
    }

    //Moves the player to the provided position and sets the collider
    move(x, y) {
        this.x = x;
        this.y = y;
        this.setCollider();
        this.clearDirection();
    }

    //Removes direction instructions
    clearDirection() {
        this.direction = {x: 0, y: 0};
    }

    render() {
        //Draws collider
        //ctx.fillRect(this.Collider.x, this.y, this.Collider.width, blockHeight);
        ctx.drawImage(Resources.get(sprites.player),
        this.x, this.y - yImageRenderOffset);        
    }

    //Sets the player direction if an allowed key is pressed
    handleInput(key) {
        switch (key) {
            case 'left':    this.direction.x = -1;   break;
            case 'right':   this.direction.x = 1;    break;
            case 'up':      this.direction.y = -1;   break;
            case 'down':    this.direction.y = 1;    break;
        }
    }
}

//Sets entities sprites
const sprites = {
    player: 'images/char-horn-girl.png',
    enemy: 'images/enemy-bug.png',
    rock: 'images/Rock.png',
    gem: 'images/Gem Orange.png',
    goal: 'images/Selector.png'
}

//Initial vertical position of the player from the start
Player.initialPosition = 4;

//@returns true if the provided position matches the goal's
Player.reachesGoal = function({x, y}) {
    return x == goal.x && y == goal.y;
}

//@returns true if the provided position is less than water blocks height
Player.hitsWater = function(y) {
    return y < numEndBlocks * blockHeight;
}

//@returns true if the provided position is inside the game area
Player.withinGameArea = function({x, y}) {
    return x >= 0 && x < areaWidth && y < areaHeight
}

//@returns true if the position provided overlaps with a rock object's position
Player.hitsRock = function ({x, y}) {
    for (rock of allRocks) {
        if (x == rock.x && y == rock.y) return true;
    }
    
    return false;
}

//@returns true if the provided position overlaps a gem's position
Player.hitsGem = function ({x, y}) {
    for (let indx = 0; indx < allGems.length; indx++) {
        if (x == allGems[indx].x && y == allGems[indx].y) {
            allGems.splice(indx, 1);
        }
    }
}