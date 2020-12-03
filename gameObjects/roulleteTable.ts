import screenfull = require('screenfull');
import app from '../index';
import { clearInterval } from 'timers';
import config from "./config";
export default class RouletteTable extends PIXI.Sprite {
    private bet_text: any;
    private loaders: any;
    private config: any;

    private bet_level_1: PIXI.Sprite;
    private bet_level_10: PIXI.Sprite;
    private bet_level_50: PIXI.Sprite;
    private bet_level_100: PIXI.Sprite;
    private bet_level_500: PIXI.Sprite;

    private undo: PIXI.Sprite;
    private clear: PIXI.Sprite;
    private hover: PIXI.Sprite;

    private textures_table: any;
    private textures_field: any;
    private field: PIXI.Sprite;

    private tickerTimer: any;
    private win: any;
    private _win: any;
    private i: any;
    private lastCredit: any;
    private bool: any;
    private endRolling: any;
    private bg: any;

    public history: any;
    public game_balance: any;
    public game_buttons: any;
    public indicationMap: any;
    public indicators: any;
    private rect: PIXI.Sprite;

    public startBtn: any;
    public _startBtn:any;
    public __startBtn: any;
    public refillBtn: any;
    public __refillBtn: any;
    public rebetBtn: any;
    public __rebetBtn
    public startBtnText: any;
    public refillBtnText: any;
    public rebetBtnText: any;

    public __win: any;
    public __win_volume: any;

    private drum: any;
    private ball: any;
    private bowl: any;
    private toWin: any;
    private toLoose: any;
    
    private dropBall: boolean;
    private drumPi2: number;
    private math: number;
    private stopStep: number;
    private stop: number;
    private lastPosition
    private bowlPosition: any
    private gameStarted
    private curBet
    private ex_info: any;
    private info_coin: any;
    private allawedPing: any;

    private __scale: any;
    constructor() {
        super(app.loader.resources[app.assets_url+'tablev.json'].textures['table_vertical.png']);

        this.loaders = {
            field: app.loader.resources[app.assets_url+'tableh.json'].textures['field_horizontal.png'],
            drum: app.loader.resources[app.assets_url+'roulette.json'].textures['drum.png'],
            ball: app.loader.resources[app.assets_url+'roulette.json'].textures['ball.png'],
            bowl: app.loader.resources[app.assets_url+'roulette.json'].textures['bowl_highlight_win.png'],
            undo: app.loader.resources[app.assets_url+'tableelements.json'].textures['bet_undo.png'],
            clear: app.loader.resources[app.assets_url+'tableelements.json'].textures['bets_clear.png'],
            hover: app.loader.resources[app.assets_url+'tableelements.json'].textures['bets_clear_undo_hover.png'],
            cheapHover: app.loader.resources[app.assets_url+'tableelements.json'].textures['bet_level_hover.png'],

        }

        this.allawedPing = true

        this.history = new app.gameObjects.History();
        this.game_balance = new app.gameObjects.GameBalance();
        // this.game_buttons = new app.gameObjects.GameButtons();
        this.game_buttons = app.scene.game_buttons
        this.game_buttons.visible = false

        this.__startBtn = this.game_buttons.getStartBtn()
        this.__rebetBtn = this.game_buttons.getRebetBtn()
        this.__refillBtn = this.game_buttons.getRefillBtn()
        this.__win = this.game_buttons.getWin()
        this.__win_volume = this.game_buttons.getWinVolume()


        this.anchor.set(0, .5);
        this.position.set(0, 35);

        this.textures_table = {
            landscape: PIXI.Texture.fromFrame('table_horizontal.png'),
            portrait: PIXI.Texture.fromFrame('table_vertical.png')
        }

        this.textures_field = {
            landscape: PIXI.Texture.fromFrame('field_horizontal.png'),
            portrait: PIXI.Texture.fromFrame('field_vertical.png')
        }

        this.drum = new PIXI.Sprite(this.loaders.drum);
        this.drum.anchor.set(.5, .5);
        this.drum.scale.set(.96, .96)
        this.addChild(this.drum);

        this.field = new PIXI.Sprite(this.loaders.field);
        this.indicationMap = new app.gameObjects.IndicationMap(this.field, this);
        this.addChild(this.indicationMap)
        this.addChild(this.field);

        this.ball = new PIXI.Sprite(this.loaders.ball);
        this.ball.anchor.set(.5, 3.2);
        this.ball.rotation = Math.PI
        this.drum.addChild(this.ball)

        this.bowl = new PIXI.Sprite(this.loaders.bowl);
        this.bowl.anchor.set(.5, 8.9);
        this.bowl.position.set(this.drum.x, this.drum.y)
        this.bowl.rotation = Math.PI
        this.drum.addChild(this.bowl)  
        this.bowl.alpha = 0;      

        this.hover = new PIXI.Sprite(this.loaders.hover)
        this.hover.anchor.set(.5)

        this.undo = new PIXI.Sprite(this.loaders.undo)
        this.undo.interactive = true;
        this.addChild(this.undo);
        this.undo.on("pointerover", onButtonOver.bind(this, this.undo, this.loaders.hover, false))
        this.undo.on("pointerout", onButtonOut.bind(this, this.undo, false))
        this.undo.on("pointerdown", onButtonOut.bind(this, this.undo, false, (event) => {
            this.field.removeChildren()
            this.indicationMap.createUndo()
        }))
        this.undo.on("pointerup", onButtonOver.bind(this, this.undo, this.loaders.hover, false))
        this.undo.on("tap", onButtonTap.bind(this, this.undo, this.loaders.hover, false, false))

        this.clear = new PIXI.Sprite(this.loaders.clear)
        this.clear.interactive = true;
        this.addChild(this.clear);
        this.clear.on("pointerover", onButtonOver.bind(this, this.clear, this.loaders.hover, false))
        this.clear.on("pointerout", onButtonOut.bind(this, this.clear, false))
        this.clear.on("pointerup", onButtonOver.bind(this, this.clear, this.loaders.hover, false))
        this.clear.on("pointerdown", onButtonOut.bind(this, this.clear, false, () => {
            if (config.service.history.undoList.length > 0) {
                if (config.service.history.undoList[config.service.history.undoList.length - 1].length != 0) {
                    config.service.history.undoList.push([])
                }
                this.field.removeChildren()
                if (config.service.headers.length > 0) {
                    config.service.history.headers = config.service.headers
                }
                config.service.bets = {}
                config.service.headers = []
            }
        }))
        this.clear.on("tap", onButtonTap.bind(this, this.clear, this.loaders.hover, false, false))

        this.bet_level_1 = createBetCheap(this, 'tableelements.json', 'bet_level_1.png', '10', 20, true);
        this.bet_level_10 = createBetCheap(this, 'tableelements.json', 'bet_level_2.png', '50', 20, false);
        this.bet_level_50 = createBetCheap(this, 'tableelements.json', 'bet_level_3.png', '100', 16, false);
        this.bet_level_100 = createBetCheap(this, 'tableelements.json', 'bet_level_4.png', '500', 16, false);
        this.bet_level_500 = createBetCheap(this, 'tableelements.json', 'bet_level_5.png', '2500', 16, false);

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
            startRolling.bind(this),
            this.startBtnText
        );

        this.game_buttons.getStartBtn().on("pointerup", startRolling.bind(this))

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

        this.lastPosition = 12
        let lastMath = this.ball.rotation

        this.rebetBtn = new app.components.Button(
            app.loader.resources[app.assets_url+'mainarea.json'].textures,
            'rebet',
            50,
            50,
            ()=>{
                this.indicationMap.resize(1)
                this.indicationMap.createRebet(config.service.history.rebetList)
            },
            this.rebetBtnText
        );
        this.rebetBtn.buttonState("off")

        this.game_buttons.getRebetBtn().on("pointerup", () => {
            this.indicationMap.resize(1)
            this.indicationMap.createRebet(config.service.history.rebetList)
        })

        function startRolling() {
            let countMore = 0;
            let countLess = 0;
            let countRed = 0;
            let countBlack = 0;
            let countEven = 0;
            let countOdd = 0;
            config.service.headers.length != 0 ? config.service.headers.forEach((item, index, list) => {
                if ("more" == config.service.bets[item]["type"]) {
                    countMore += config.service.bets[item]["bet"]
                } else if ("less" == config.service.bets[item]["type"]) {
                    countLess += config.service.bets[item]["bet"]
                } else if ("red" == config.service.bets[item]["type"]) {
                    countRed += config.service.bets[item]["bet"]
                } else if ("black" == config.service.bets[item]["type"]) {
                    countBlack += config.service.bets[item]["bet"]
                } else if ("even" == config.service.bets[item]["type"]) {
                    countEven += config.service.bets[item]["bet"]
                } else if ("odd" == config.service.bets[item]["type"]) {
                    countOdd += config.service.bets[item]["bet"]
                }

                index + 1 === list.length && callback.call(this)
            }) : callback.call(this)

            function callback () {
                if (config.service.headers.length != 0) {
                    if ((countMore == 0 || countMore >= 100) && (countLess == 0 || countLess >= 100) &&
                        (countRed == 0 || countRed >= 100) && (countBlack == 0 || countBlack >= 100) && 
                        (countEven == 0 || countEven >= 100) && (countOdd == 0 || countOdd >= 100)) {
                        config.service.history.betList = []
                        config.service.history.undoList = []
                        config.service.headers.forEach((item) => {
                            config.service.history.betList.push(config.service.bets[item])
                        })
                        app.scene.balance_panel.changeBalance(config.service.lastResponse);
                        // app.stage.interactiveChildren = false
                        config.service.history.rebetList = Object.assign([], config.service.history.betList)
                        this.game_buttons.getStartBtn().buttonState("off")
                        this.game_buttons.getRebetBtn().buttonState("off")
                        this.startBtn.buttonState("off")
                        this.rebetBtn.buttonState("off")
                        this.bool = true
                        this.gameStarted = false
                        this.allawedPing = false
                        config.service.isAllowedToSwitchOff = false
                        this.endRolling = false
                        let bets = []
                        let _this = this;
                        this.game_balance.coin.children[5].text = ""
                        this.game_balance.coin.children[4].text = '\nNO MORE BETS'
                        this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                        this.game_balance.coin.children[4].style.fontSize = 40
                        this.__win_volume.text = ""
                        this.__win.text = 'NO MORE BETS'
                        this.__win.anchor.set(.5, .5)
                        this.__win.style.fill = '#FDDAAC'
                        // this.__win.style.fontSize = 40
                        for (let i = 0; config.service.headers.length > i; i++) {
                            let item = Object.assign({}, config.service.bets[config.service.headers[i]])
                            item["item"] = []
                            bets.push(item)
                        }
        
                        let meaning = {
                            "12": "1",
                            "2": "2",
                            "8": "3",
                            "7": "4",
                            "3": "5",
                            "11": "6",
                            "1": "7",
                            "9": "8",
                            "5": "9",
                            "4": "10",
                            "10": "11",
                            "6": "12",
                        }
        
                        let promice = new Promise((res, rej) => {
                            app.request({action: "play", stakes: bets}, () => {
                                _this.win = Math.floor(config.service.response["total_win"])
                                _this._win = config.service.response["total_win"]
                                _this.lastCredit = config.service.response["coin_balance"]
                                config.service.history.win_bets.length >= 6 && config.service.history.win_bets.pop()
                                config.service.history.win_bets.unshift(config.service.response)
                                res()
                            })
                        }).then(() => {
                            _this.ball.rotation = lastMath
                            _this.bowl.rotation = lastMath
                            const PI = parseFloat(Math.PI.toFixed(7))
                            _this.drumPi2 = PI * 2 / 12
                            let randomRotCount = Math.floor(Math.random() * 3) + 2
                            let randomInt = config.service.response["number"]
                            config.service.win = randomInt
                            _this.bowlPosition = meaning[randomInt]
                            config.service.response == {}
                            let randomLuft
                            if (Math.floor(Math.random() * 2)) {
                                randomLuft = (Math.floor(Math.random() * 10)) / 100
                            } else {
                                randomLuft = (Math.floor(Math.random() * 10)) / 100 * -1
                            }
                            _this.dropBall = true;
                            _this.tickerTimer = .2;
                            let target = parseInt(meaning[randomInt])
                            _this.math = PI * 2 * randomRotCount + (_this.drumPi2 * target) - _this.drumPi2 + randomLuft
                            _this.stop = (_this.tickerTimer / 10) / _this.math
                        })
                    } else {
                        this.indicationMap.alert("MIN BET FOR THIS IS [100]")
                    }
                    
                }
            }
        }

        function createBetCheap (self: any, json: string, png: string, volume: string, fontSize: number, selectedBool?) {
            let cheap: any;
            let text: any;
            let selected: any;

            text = new PIXI.Text(volume, {
                fontFamily: "bluntreg",
                fontSize: fontSize,
                fill: "#FDDAAC",
            });
            text.anchor.set(.5, .65)

            selected = new PIXI.Sprite(app.loader.resources[app.assets_url+json].textures["bet_level_selected.png"])
            selected.anchor.set(.5)
            selected.scale.set(1.1)

            cheap = new PIXI.Sprite(app.loader.resources[app.assets_url+json].textures[png]);
            cheap.interactive = true;
            cheap.addChild(text, selected)
            cheap.on("pointerover", onButtonOver.bind(self, cheap, self.loaders.cheapHover, true))
            cheap.on("pointerout", onButtonOut.bind(self, cheap, text, false, selected))
            cheap.on("pointerdown", onButtonClick.bind(self, cheap, text, volume, (event) => {
                self.bet_level_1.children[1].visible = false
                self.bet_level_10.children[1].visible = false
                self.bet_level_50.children[1].visible = false
                self.bet_level_100.children[1].visible = false
                self.bet_level_500.children[1].visible = false
                cheap.children[1].visible = true
                self.curBet = parseInt(volume)
                config.service.volume = parseInt(volume)
            }, selected))
            cheap.on("pointerup", onButtonOver.bind(self, cheap, self.loaders.cheapHover, true))
            cheap.on("tap", onButtonTap.bind(self, cheap, self.loaders.cheapHover, true, text, volume, (event) => {
                self.bet_level_1.children[1].visible = false
                self.bet_level_10.children[1].visible = false
                self.bet_level_50.children[1].visible = false
                self.bet_level_100.children[1].visible = false
                self.bet_level_500.children[1].visible = false
                cheap.children[1].visible = true
                self.curBet = parseInt(volume)
                config.service.volume = parseInt(volume)
            }, selected))
            cheap.children[1].visible = selectedBool
            cheap.anchor.set(.5, .5);
            return cheap
        }

        this.addChild(
            this.bet_level_1,
            this.bet_level_10,
            this.bet_level_50,
            this.bet_level_100,
            this.bet_level_500,
            this.undo,
            this.clear,
            this.history,
            this.game_balance,
            this.startBtn,
            this.rebetBtn,
        );

        this.tickerTimer = -0.20;
        this.win = 0;
        this._win = 0;
        this.i = 0
        
        app.interval(() => {
            animate.call(this, this.drum, this.ball);
            changeBets.call(this)
        }, 13)

        app.interval(() => {
            if (this.allawedPing) {
                app.scene.balance_panel.changeBalance(config.service.lastResponse);
            }
        }, 1000)

        function animate (drum: any, ball: any) {
            drum.rotation -= 0.015;
            if (config.service.isAllowedPlayTheGame) {
                if (this.tickerTimer > 0 && this.dropBall == true) {
                    ball.rotation += this.tickerTimer
                    this.tickerTimer -= this.stop
                } else if (this.tickerTimer < 0 && this.dropBall == true) {
                    ball.rotation -= this.stop * this.lastPosition * 2
                    this.tickerTimer = 0;
                    this.bowl.rotation += Math.PI * 2 / 12 * (this.bowlPosition - 1)
                    config.service.credits = config.service.response["coin_balance"]
                    config.service.headers.forEach((item, index) => {
                        config.service.credits -= config.service.bets[item]["bet"]
                    })

                    app.timeout(() => {
                        config.service.action = true
                    }, 500)
                    
                    this.bowl.alpha = 1
                    this.history.updateHistory()
                    this.game_balance.coin.children[3].text = Math.floor(config.service.credits).toLocaleString('ru');
                    this.history.switchWin()
                    this.indicationMap.switchWin(() => {
                        config.service.wins = config.service.response["wins"]
                        config.service.history.bets = config.service.bets
                        config.service.history.headers = Object.assign([], config.service.headers)
                        config.service.bets = {}
                        config.service.headers = []
                            let timeout = 0
                            app.timeout(() => {
                                this.indicationMap.collectCheaps(() => {
                                    this.game_balance.winScale(() => {
                                        app.timeout(() => {
                                            if (this.win > 0) {
                                                this.dropBall = false
                                            } else {
                                                this.dropBall = true
                                            }
                                        }, 200)
                                    }, () => {
                                        if (this.win > 0) {
                                            this.game_balance.coin.children[5].text = Math.floor(this.win).toLocaleString('ru');
                                            this.__win_volume.text = Math.floor(this.win).toLocaleString('ru');
                                            this.__win_volume.anchor.set(.5, 0)
                                            this.rebetBtn.buttonState("on")
                                            this.game_buttons.getRebetBtn().buttonState("on")
                                        } else {
                                            this.allawedPing = true
                                            this.rebetBtn.buttonState("on")
                                            this.game_buttons.getRebetBtn().buttonState("on")
                                            this.game_balance.coin.children[5].text = "";
                                            this.game_balance.coin.children[4].text = '\nPLACE YOUR\n       BETS'
                                            this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                                            this.__win_volume.text = ""
                                            this.__win.anchor.set(.5, .5)
                                            this.__win.text = 'PLACE YOUR\n       BETS'
                                            this.__win.style.fill = '#FDDAAC'
                                            // this.__win.style.fontSize = 40
                                            // this.game_balance.coin.children[4].style.fontSize = 30
                                        }
                                    })
                                }, () => {
                                    this.game_balance.coin.children[5].text = "0";
                                    this.__win_volume.text = "0"
                                    this.__win_volume.scale.set(1.2)
                                    this.__win_volume.anchor.set(.5, 0)
                                })
                            }, 0)
                    })
                    this.indicationMap.setInteractive(false)
                    app.stage.interactiveChildren = true
                    this.game_balance.coin.children[4].text = 'WIN'
                    this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                    this.game_balance.coin.children[4].style.fontSize = 40
                    this.__win.text = 'WIN'
                    this.__win.anchor.set(.5, 1)
                    this.__win.style.fill = '#FDDAAC'
                    // this.__win.style.fontSize = 40
                    app.timeout(() => {
                        this.endRolling = false
                    }, 2500)
                } else if (this.dropBall == false && this.win > 0) {
                    if (this.endRolling == false) {
                        if (this.i == 1) {
                            if (this.field.children.length == 0) {
                                if (0 < this.win && this.win <= 100) {
                                    this.win -= 1
                                }
                                if (100 < this.win && this.win <= 1000) {
                                    this.win -= 10
                                }
                                if (1000 < this.win && this.win <= 10000) {
                                    this.win -= 100
                                }
                                if (10000 < this.win && this.win <= 100000) {
                                    this.win -= 1000
                                }
                                if (100000 < this.win) {
                                    this.win -= 10000
                                }
                            } else {
                                this.win = 0
                            }
                            this.game_balance.coin.children[5].text = Math.floor(this.win).toLocaleString('ru');
                            this.__win_volume.text = Math.floor(this.win).toLocaleString('ru');
                            this.__win_volume.anchor.set(.5, 0)
                            this.game_balance.coin.children[3].text = Math.floor((this.lastCredit + (this._win - this.win)) < 0 ? 0 : 
                                                                                 (this.lastCredit + (this._win - this.win))).toLocaleString('ru');
                            this.i = 0;
                            this.game_buttons.getStartBtn().buttonState("off")
                            this.startBtn.buttonState("off")
                        }
                        if (this.win == 0) {
                            this.allawedPing = true
                            this._win = 0
                            app.timeout(() => {
                                this.game_balance.coin.children[5].text = ""
                                this.game_balance.coin.children[4].text = '\nPLACE YOUR\n       BETS'
                                this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                                // this.game_balance.coin.children[4].style.fontSize = 40
                                this.__win_volume.text = ""
                                this.__win.text = 'PLACE YOUR\n       BETS'
                                this.__win.anchor.set(.5, .5)
                                this.__win.style.fill = '#FDDAAC'
                                // this.__win.style.fontSize = 40
                                this.gameStarted = true;
                                config.service.lastResponse["coin_balance"] >= 10 && this.startBtn.buttonState("off")
                                config.service.lastResponse["coin_balance"] >= 10 && this.rebetBtn.buttonState("on")
                                config.service.lastResponse["coin_balance"] >= 10 && this.game_buttons.getStartBtn().buttonState("off")
                                config.service.lastResponse["coin_balance"] >= 10 && this.game_buttons.getRebetBtn().buttonState("on")
                                app.scene.balance_panel.changeBalance(config.service.response);
                            }, 0)
                        }
                        this.i++
                    }
                } else if (this.dropBall == false && this.win == 0 && this.endRolling == true) {
                    
                    if (this.bool) {
                        app.timeout(() => {
                            this.game_balance.coin.children[5].text = ""
                            this.game_balance.coin.children[4].text = '\nPLACE YOUR\n       BETS'
                            this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                            // this.game_balance.coin.children[4].style.fontSize = 40
                            this.__win_volume.text = ""
                            this.__win.text = 'PLACE YOUR\n       BETS'
                            this.__win.anchor.set(.5, .5)
                            this.__win.style.fill = '#FDDAAC'
                            // this.__win.style.fontSize = 40
                            this.gameStarted = true;
                            config.service.lastResponse["coin_balance"] >= 10 && this.game_buttons.getStartBtn().buttonState("off")
                            config.service.lastResponse["coin_balance"] >= 10 && this.game_buttons.getRebetBtn().buttonState("on")
                            config.service.lastResponse["coin_balance"] >= 10 && this.startBtn.buttonState("off")
                            config.service.lastResponse["coin_balance"] >= 10 && this.rebetBtn.buttonState("on")
                            config.service.collected = false
                            app.scene.balance_panel.changeBalance(config.service.response);
                        }, 2500)
                        this.endRolling == false
                        this.bool = false
                    }
                }
                if (this.dropBall == false && !this.gameStarted && this.win == 0 && this._win == 0) {
                } else {
                    if (config.service.action) {
                        if (config.service.isAllowedToSwitchOff) {
                            this.bowl.alpha -= .03
                            if (this.bowl.alpha <= 0) {
                                app.scene.balance_panel.changeBalance(config.service.response);
                                this.indicationMap.setInteractive(true)
                                config.service.action = false
                            }
                        }
                    }
                    if (config.service.headers.length == 0) {
                        this.startBtn.buttonState("off")
                        this.game_buttons.getStartBtn().buttonState("off")
                    } else {
                        if (!["pressed", "hover", "on"].includes(this.startBtn.state)) {
                            if (app.stage.interactiveChildren) {
                                config.service.lastResponse["coin_balance"] >= 10 && this.startBtn.buttonState("on")
                                config.service.lastResponse["coin_balance"] >= 10 && this.game_buttons.getStartBtn().buttonState("on")
                            }
                        }
                    }
                    if (config.service.lastResponse["coin_balance"] < 10 && this.field.children.length === 0) {
                            config.service.resize = true
                            config.service.isAllowedPlayTheGame = false
                            config.service.isPlayFalled = false
                    }
                }
            }
            if (config.service.resize) {
                if (!config.service.isAllowedPlayTheGame) {
                    if (!config.service.isPlayFalled) {
                        config.service.isAllowedPlayTheGame = false
                        config.service.resize = false
                        this.startBtn.buttonState("on")
                        this.removeChild(this.startBtn)
                        this.startBtn = this.refillBtn;
                        this.addChild(this.startBtn)
                        this.rebetBtn.buttonState("off")
                        app.resizeController.resize()
                        this.startBtn.buttonState("on")
                        config.service.isPlayFalled = true
                        this.indicationMap.staticAlert("OUT OF CREDITS. REFILL ACCAUNT")
                        app.scene.balance_panel.changeBalance(config.service.lastResponse);
                    } else {
                        if (config.service.lastResponse["coin_balance"] < 10) {
                            config.service.isAllowedPlayTheGame = false
                        } else {
                            config.service.isAllowedPlayTheGame = true
                        }
                        config.service.isPlayFalled = true
                    }
                } else {
                    config.service.isPlayFalled = false
                    config.service.isAllowedPlayTheGame = true
                    config.service.resize = false
                    this.removeChild(this.startBtn)
                    this.startBtn = this._startBtn;
                    this.startBtn.buttonState("off")
                    this.addChild(this.startBtn)
                    app.resizeController.resize()
                }
            } else {
                // if (!config.service.isPlayFalled) {
                //     config.service.isAllowedPlayTheGame = true
                //     config.service.isPlayFalled = true
                // }
            }
            if (app.portrait) {
                if (config.service.isOrientationChanged) {
                    this.startBtn.visible = false
                    this.rebetBtn.visible = false
                    this.refillBtn.visible = false
                    this.game_balance.coin.children[4].visible = false
                    this.game_balance.coin.children[5].visible = false
                    this.game_buttons.visible = true
                }
                config.service.isOrientationChanged = false
            } else if (app.landscape) {
                if (!config.service.isOrientationChanged) {
                    this.startBtn.visible = true
                    this.rebetBtn.visible = true
                    this.refillBtn.visible = true
                    this.game_balance.coin.children[4].visible = true
                    this.game_balance.coin.children[5].visible = true
                    this.game_buttons.visible = false
                }
                config.service.isOrientationChanged = true
            }
            
           
        }
        let bet = 0;
        let credits;
        let i;
        function changeBets () {
            if (config.service.response != {} && this.win == 0) {
                if (config.service.headers.length != 0 && config.service.betMade) {
                    config.service.betMade = false;
                    config.service.bet = 0;
                    config.service.credits = config.service.response["coin_balance"]
                    config.service.headers.forEach((item, index) => {
                        config.service.bet += config.service.bets[item]["bet"]
                        config.service.credits -= config.service.bets[item]["bet"]
                    })
                    this.game_balance.coin.children[1].text = Math.floor(config.service.bet).toLocaleString('ru');
                    if (config.service.credits >= 0) {
                        this.game_balance.coin.children[3].text = Math.floor(config.service.credits).toLocaleString('ru');
                    } else {
                        this.game_balance.coin.children[3].text = "0";
                    }
                    this.game_balance.coin.children[1].style.fontSize = 60
                    app.scene.balance_panel.changeBalance(config.service.response);
                } else if (config.service.headers.length != 0 && config.service.betMade == false) {
                    
                } else {
                    config.service.credits = config.service.response["coin_balance"]
                    this.game_balance.coin.children[3].text = Math.floor(config.service.credits).toLocaleString('ru'); // Math.floor()
                    this.game_balance.coin.children[1].text = '0'
                    this.game_balance.coin.children[1].style.fontSize = 60
                }
            }
        }

        function onButtonOver(event, sprite, cheap?) {
            this.hover = new PIXI.Sprite(sprite)
            this.hover.anchor.set(.5)
            if (cheap) {
                this.hover.y = -3
            }
            event.addChild(this.hover)
        }

        function onButtonTap(event, sprite, cheap?, text?, volume?, func?, selected?) {
            this.hover = new PIXI.Sprite(sprite)
            this.hover.anchor.set(.5)
            if (cheap) {
                this.hover.y = -3
            }
            event.addChild(this.hover)
            setTimeout(() => {
                event.removeChildren()
                text && event.addChild(text, selected)
                if (typeof(func) == "function") {
                    func()
                }
                config.service.test = this.curBet
            }, 200)
        }

        function onButtonOut(event, text?, react?, selected?) {
            event.removeChildren()
            text && event.addChild(text, selected)
            typeof(react) == 'function' && react();
        }
        function onButtonClick(event, text?, volume?, func?, selected?) {
            event.removeChildren()
            text && event.addChild(text, selected)
            if (typeof(func) == "function") {
                func()
            }
            config.service.test = this.curBet
        }
    }

    
    setState (state) {
        this.rebetBtn.buttonState(state)
        this.startBtn.buttonState(state)
    }

    resize (scale?: any) {
        const width = app.screen.width;
        const height = app.screen.height;
        app.global.children[0].x = app.screen.width / 2 
        app.global.children[0].y = app.screen.height / 2

        if (app.portrait) {
            this.scale.set(scale * 1.1 > 1.1 ? 1.1 : scale * 1.1)
            this.anchor.set(0, 0.5)
            this.texture = this.textures_table["portrait"]
            this.field.texture = this.textures_field["portrait"]
            this.config = config.portrait;
            this.scale.set(scale * 1.1 > 1.1 ? 1.1 : scale * 1.1)
            app.global.children[0].scale.set(scale * 1.25)
        } else if (app.landscape) {
            
            if (PIXI.utils.isMobile.any) {
                if (width - height != 256 && width - height != 342) {
                    this.scale.set(
                        (scale * Math.max(width, height) / Math.min(width, height) / 2))
                } else {
                    this.scale.set(
                        (scale * Math.max(width, height) / Math.min(width, height) / 1.2))
                }
            } else {
                this.scale.set(
                    (scale * Math.max(width, height) / Math.min(width, height) / 1.2))
            }
            this.anchor.set(.6, .5)
            this.texture = this.textures_table["landscape"]
            this.field.texture = this.textures_field["landscape"]
            this.config = config.landscape;
            // this.scale.set(scale * 1.1 > 1.1 ? 1.1 : scale * 1.1)
            app.global.children[0].scale.set(scale * 1.8)
        }
        
        this.x = width / this.config.table_x;
        this.y = height / this.config.table_y;
        this.field.x = this.config.field_x;
        this.field.y = this.config.field_y;

        this.bet_level_1.x = this.config.bet_level_1_x;
        this.bet_level_1.y = this.config.bet_level_1_y;

        this.bet_level_10.x = this.config.bet_level_10_x;
        this.bet_level_10.y = this.config.bet_level_10_y;

        this.bet_level_50.x = this.config.bet_level_50_x;
        this.bet_level_50.y = this.config.bet_level_50_y;

        this.bet_level_100.x = this.config.bet_level_100_x;
        this.bet_level_100.y = this.config.bet_level_100_y;

        this.bet_level_500.x = this.config.bet_level_500_x;
        this.bet_level_500.y = this.config.bet_level_500_y;

        this.drum.x = this.config.drum_x;
        this.drum.y = this.config.drum_y;

        this.ball.x = this.config.ball_x;
        this.ball.y = this.config.ball_y;

        this.undo.x = this.config.undo_x;
        this.undo.y = this.config.undo_y;

        this.clear.x = this.config.clear_x;
        this.clear.y = this.config.clear_y;

        this.startBtn.x = this.config.start_x;
        this.startBtn.y = this.config.start_y;

        this.rebetBtn.x = this.config.rebet_x;
        this.rebetBtn.y = this.config.rebet_y;

        this.__scale = 1;
        if(app.orientation == 'portrait' || app.platform == 'desktop') {
            this.__scale = Math.min(2.15*app.screen.width/1920, 1.5*app.screen.height/1920);
        } else {
            this.__scale = Math.min(1.275*app.screen.width/1920, 1.275*app.screen.height/969);
        }

        if (this.bowl.alpha > 0) {
            app.timeout(() => {
                let interval = app.interval(() => {
                    this.bowl.alpha -= .03
                    if (this.bowl.alpha <= 0) {
                        this.indicationMap.setInteractive(true)
                        this.bowl.alpha = 0
                        this.game_balance.coin.children[5].text = ""
                        this.game_balance.coin.children[4].text = '\nPLACE YOUR\n       BETS'
                        this.game_balance.coin.children[4].style.fill = '#FDDAAC'
                        // this.game_balance.coin.children[4].style.fontSize = 40
                        this.__win_volume.text = ""
                        this.__win.text = 'PLACE YOUR\n       BETS'
                        this.__win.anchor.set(.5, .5)
                        this.__win.style.fill = '#FDDAAC'
                        // this.__win.style.fontSize = 40
                        this.gameStarted = true;
                        config.service.lastResponse["coin_balance"] >= 10 &&this.game_buttons.getStartBtn().buttonState("off")
                        config.service.lastResponse["coin_balance"] >= 10 &&this.game_buttons.getRebetBtn().buttonState("on")
                        config.service.lastResponse["coin_balance"] >= 10 &&this.startBtn.buttonState("off")
                        config.service.lastResponse["coin_balance"] >= 10 &&this.rebetBtn.buttonState("on")
                        config.service.collected = false
                        this.endRolling == false
                        this.bool = false
                        app.clearTimer(interval)
                    }
                }, 17)
            }, 500)
        }

        this.history.resize(1)
        this.game_balance.resize(1)
        this.indicationMap.resize(1)
    }
}