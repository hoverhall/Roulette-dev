import app from '../index'
import config from './config'

export default class GameButtons extends PIXI.Container {
    public win: any;
    public win_volume: any;

    public startBtn: any;
    public _startBtn:any;
    public refillBtn: any;
    public rebetBtn: any;
    public startBtnText: any;
    public refillBtnText: any;
    public rebetBtnText: any;

    constructor() {
        super()

        this.win = new PIXI.Text("PLACE YOUR\n       BETS", {
            fontFamily: "bluntreg",
            fill: "#FDDAAC",
            fontSize: 30,
        });
        this.win.anchor.set(.5, .5)

            this.win_volume = new PIXI.Text("", {
                fontFamily: "bluntreg",
                fill: "#FABF32",
            });
            this.win_volume.anchor.set(.5, .5)

        this.addChild(this.win, this.win_volume)

        this.startBtnText = new PIXI.Text("START", {
            fontFamily: "bluntreg",
            fontSize: 45,
            fill: "#FDDAAC",
        });
        this.startBtnText.anchor.set(.5)

        this.refillBtnText = new PIXI.Text("REFILL", {
            fontFamily: "bluntreg",
            fontSize: 45,
            fill: "#FDDAAC",
        });
        this.refillBtnText.anchor.set(.5)

        this.rebetBtnText = new PIXI.Text("REBET", {
            fontFamily: "bluntreg",
            fontSize: 45,
            fill: "#FDDAAC",
        });
        this.rebetBtnText.anchor.set(.5)

        this._startBtn = new app.components.Button(
            app.loader.resources[app.assets_url+'mainarea.json'].textures,
            'start',
            0,
            0,
            () => {},
            this.startBtnText
        );

        this.refillBtn = new app.components.Button(
            app.loader.resources[app.assets_url+'mainarea.json'].textures,
            'start',
            0,
            0,
            ()=>{
            },
            this.refillBtnText
        );

        this.startBtn = this._startBtn;

        this.rebetBtn = new app.components.Button(
            app.loader.resources[app.assets_url+'mainarea.json'].textures,
            'rebet',
            0,
            0,
            () => {},
            this.rebetBtnText
        );
        this.rebetBtn.buttonState("off")

        this.addChild(this.rebetBtn, this.startBtn)
    }

    changeWinText (text) {
        this.win.text = text
    }

    changeWinVolumeText (text) {
        this.win_volume.text = text
    }

    setWinScale (scale) {
        this.win.scale.set(scale)
    }

    setWinVolumeScale (scale) {
        this.win_volume.scale.set(scale)
    }

    getWin () {
        return this.win
    }

    getWinVolume () {
        return this.win_volume
    }

    getStartBtn () {
        return this.startBtn
    }

    getRebetBtn () {
        return this.rebetBtn
    }

    getRefillBtn () {
        return this.refillBtn
    }

    resize (scale) {
        let width = app.screen.width
        let height = app.screen.height

        this.startBtn.scale.set(scale * 1.1)
        this.rebetBtn.scale.set(scale * 1.1)
        this.win.scale.set(scale * 1.1)
        this.win_volume.scale.set(scale * 1.1)

        this.y = height - this.startBtn.height
        this.startBtn.x = width - this.startBtn.width / 2 - 15
        this.rebetBtn.x = this.rebetBtn.width / 2 + 15

        this.win.x = width / 2
        this.win_volume.x = width / 2
    }
}