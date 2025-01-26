class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    create() {
        // green UI background
        this.starfield = this.add.tileSprite(0, 0, 1280, 720, 'starfield').setOrigin(0, 0)

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        // speedy ships
        this.ship04 = new Speeeeed(this, game.config.width + borderUISize*7, borderUISize * 3 + borderPadding*2, 'speed', 0, 100).setOrigin(1,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0

        this.timeText = this.add.text(16, 16, `Time Left: ${Math.ceil(game.settings.gameTimer / 1000)}`, scoreConfig).setOrigin(0);

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

    }
    update() {
          // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        // this.p1Rocket.update()
        this.starfield.tilePositionX -= 4

        this.p1Rocket.update()

        this.ship01.update()               // update spaceships (x3)
        this.ship02.update()
        this.ship03.update()
        this.ship04.update()

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship04)
      }
        if(!this.gameOver) {        
            const remainingTime = Math.max(0, Math.ceil((this.clock.getRemaining() / 1000))); // Get remaining time in seconds
            this.timeText.setText(`Time Left: ${remainingTime}`); // Update the text     

            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        } 
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
      }
      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')           // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
          ship.reset()                       // reset ship position
          ship.alpha = 1                     // make ship visible again
          boom.destroy()                     // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')       
      }
}




///////////////////
class Play2 extends Phaser.Scene {
  constructor() {
      super("playScene2");
  }
  create() {
      // green UI background
      this.bg = this.add.tileSprite(0, 0, 1280, 720, 'bg').setOrigin(0, 0)
      this.purple_star = this.add.tileSprite(0, 0, 1280, 720, 'purple_star').setOrigin(0, 0)
      this.blue_star = this.add.tileSprite(0, 0, 1280, 720, 'blue_star').setOrigin(0, 0)

      this.green_bar = this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0)
      // add rocket (p1)
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
      // add spaceships (x3)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
      // speedy ships
      this.ship04 = new Speeeeed(this, game.config.width + borderUISize*7, borderUISize * 3 + borderPadding*2, 'speed', 0, 100).setOrigin(1,0)

      // define keys
      keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
      keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      // initialize score
      this.p1Score = 0

      // display score
      let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

      // GAME OVER flag
      this.gameOver = false

      // 60-second play clock
      scoreConfig.fixedWidth = 0

      this.timeText = this.add.text(16, 16, `Time Left: ${Math.ceil(game.settings.gameTimer / 1000)}`, scoreConfig).setOrigin(0);

      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
          this.gameOver = true
      }, null, this)
      
      // adding or removing time pain 
      this.changed_time = (sometime) => {
        const current_time = this.clock.getRemaining(); 
        const newTime = Math.max(0, current_time + sometime); 

        this.clock.reset({ delay: newTime, callback: this.clock.callback, callbackScope: this.clock.callbackScope }); 
      };
  }
  update() {
        // check key input for restart
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
          this.scene.restart()
      }
      // this.p1Rocket.update()
      this.bg.tilePositionX -= 2
      this.purple_star.tilePositionX -= 1.1
      this.blue_star.tilePositionX -= 3

      this.p1Rocket.update()

      this.ship01.update()               // update spaceships (x3)
      this.ship02.update()
      this.ship03.update()
      this.ship04.update()

      // check collisions
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship03)   
          this.changed_time(2000)
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship02)
          this.changed_time(2000)
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship01)
          this.changed_time(2000)
      }
      if (this.checkCollision(this.p1Rocket, this.ship04)) {
        this.p1Rocket.reset()
        this.shipExplode(this.ship04)
        this.changed_time(2000)
    }
      if (this.p1Rocket.y <= borderUISize * 3 + borderPadding + 5) { // Rocket reached the top without hitting a ship
        this.changed_time(-10000); // Subtract 1 second
        this.p1Rocket.reset();    // Reset rocket after miss
    }
      if(!this.gameOver) {          
          const remainingTime = Math.max(0, Math.ceil((this.clock.getRemaining() / 1000))); // Get remaining time in seconds
          this.timeText.setText(`Time Left: ${remainingTime}`); // Update the text       
          this.p1Rocket.update()         // update rocket sprite
          this.ship01.update()           // update spaceships (x3)
          this.ship02.update()
          this.ship03.update()
          this.ship04.update()
      } 
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene")
        }
      console.log(borderUISize * 3 + borderPadding + 5)
  }
  checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
        return true
      } else {
        return false
      }
    }
    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0                         
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
      boom.anims.play('explode')           // play explode animation
      boom.on('animationcomplete', () => { // callback after ani completes
        ship.reset()                       // reset ship position
        ship.alpha = 1                     // make ship visible again
        boom.destroy()                     // remove explosion sprite
      })
      // score add and text update
      this.p1Score += ship.points
      this.scoreLeft.text = this.p1Score
      this.sound.play('sfx-explosion')       
    }
}
