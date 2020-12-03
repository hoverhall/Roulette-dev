import app from '../index';
import config from './config';
export default class GameBalance extends PIXI.Container {
    private bet: any;
    private bet_volume: any;
    private credits: any;
    private credits_volume: any
    private win: any;
    private win_volume: any;
    private config: any;
    private coin: any;
    private info_coin: any;
    private ex_info: any;

    private game_buttons: any;
    private _win: any
    private _win_volume: any
    
    constructor() {
        super()

        this.game_buttons = app.scene.game_buttons
        this._win = this.game_buttons.getWin()
        this._win_volume = this.game_buttons.getWinVolume()

        this.bet = new PIXI.Text("BET", {
            fontFamily: "bluntreg",
            fill: "#FDDAAC",
        });

        this.bet.anchor.set(.5, .5)

            this.bet_volume = new PIXI.Text("0", {
                fontFamily: "bluntreg",
                fill: "#6F8EDC",
            });
            this.bet_volume.anchor.set(.5, .5)

        this.credits = new PIXI.Text("CREDITS", {
            fontFamily: "bluntreg",
            fill: "#FDDAAC",
        });
        this.bet.anchor.set(.5, .5)

            this.credits_volume = new PIXI.Text("0", {
                fontFamily: "bluntreg",
                fill: "#6F8EDC",
            });
            this.credits_volume.anchor.set(.5, 0)

        this.win = new PIXI.Text("\nPLACE YOUR\n       BETS", {
            fontFamily: "bluntreg",
            fill: "#FDDAAC",
            fontSize: 30,
        });
        this.win.anchor.set(.5, 0)

            this.win_volume = new PIXI.Text("", {
                fontFamily: "bluntreg",
                fill: "#FABF32",
            });
            this.win_volume.anchor.set(.5, 0)

        this.ex_info = new PIXI.Text("1 = 1 RUB", {
            fontFamily: "bluntreg",
            fill: "#6F8EDC",
            fontSize: 40,
        });
        this.ex_info.anchor.set(0, .5)
        this.ex_info.x = 40;

        this.info_coin = new PIXI.Sprite(app.loader.resources[app.assets_url+'ui.json'].textures['coin_icon.png']);
        this.info_coin.anchor.set(.5);
        this.info_coin.x = 10;
        this.info_coin.addChild(this.ex_info)
        this.info_coin.x = -180;
        this.info_coin.y = -75;

        this.coin = new PIXI.Sprite(app.loader.resources[app.assets_url+'ui.json'].textures['coin_icon.png']);
        this.coin.anchor.set(.5);
        this.coin.x = 10;
        this.coin.addChild(
            this.bet,
            this.bet_volume,
            this.credits,
            this.credits_volume,
            this.win,
            this.win_volume,
            this.info_coin
        )

        this.addChild(this.coin)
    }

    winScale (callback, changeWin) {
        changeWin()
        callback()

        let steps = 0;
        let step = 1;
        let scaleStep = 0.05;
        let scale = 1;
        let interval = setInterval(() => {
            steps += step
            scale += 0.03
            this.win_volume.scale.set(scale)
            this._win_volume.scale.set(scale)
            if (steps >= 10) {
                step = -1
            }
            if (step <= 0) {
                let steps = 0;
                let step = 1;
                let innerInterval = setInterval(() => {
                    steps += step
                    scale -= 0.03
                    this.win_volume.scale.set(scale)
                    this._win_volume.scale.set(scale)
                    if (steps >= 10) {
                        step = -1
                    }
                    if (step <= 0) {
                        clearInterval(innerInterval)
                    }
                }, 1)
                clearInterval(interval)
            }
        }, 1)
    }

    resize (scale: any) {
        this.coin.scale.set(0.6)
        const width = app.screen.width;
        const height = app.screen.height;

        if (app.portrait) {
            this.config = config.portrait;
        } else if (app.landscape) {
            this.config = config.landscape;
        }

        this.bet_volume.x = this.config.bet_volume_x;
        this.bet_volume.y = this.config.bet_volume_y;
        this.bet.x = this.config.bet_x;
        this.bet_volume.style.fontSize = this.config.bet_volume_fs
        this.bet.style.fontSize = this.config.bet_fs

        this.credits_volume.x = this.config.credits_volume_x;
        this.credits_volume.y = this.config.credits_volume_y;
        this.credits.x = this.config.credits_x;
        this.credits.y = this.config.credits_y;
        this.credits_volume.style.fontSize = this.config.credits_volume_fs
        this.credits.style.fontSize = this.config.credits_fs

        this.win_volume.x = this.config.win_volume_x;
        this.win_volume.y = this.config.win_volume_y;
        this.win.x = this.config.win_x;
        this.win.y = this.config.win_y;
        this.win_volume.style.fontSize = this.config.win_volume_fs
        this.win.style.fontSize = this.config.win_fs

        this.coin.x = this.config.coin_gb_x;
        this.coin.y = this.config.coin_gb_y;

        this.info_coin.x = this.config.info_coin_x
        this.info_coin.y = this.config.info_coin_y
    }
}