import app from '../index';
import config from './config';
import { ticker } from 'pixi.js';
import { resolve } from 'dns';

export default class IndicationMap extends PIXI.Container {
    private loaders: any;
    private blueRect: any
    private yellowRect: any;
    private field: any;
    private roulette: any;
    private ball: any;

    private currentNum: any;

    public rect: any;
    public hoverRect: any;

    public rectanglesInitializer: any;
    public doResize: boolean;

    constructor (field?, roulette?) {
        super ();
        this.field = field
        this.roulette = roulette

        this.loaders = {
            blueRect: app.loader.resources[app.assets_url+'tableelements.json'].textures['fields_highlight_bet.png'],
            yellowRect: app.loader.resources[app.assets_url+'tableelements.json'].textures['field_highlight_win.png'],
        }

        this.rectanglesInitializer = {
            portrait: [
                [{name: "l", sprite: this.rect, numbers: []}, {name: "s1", sprite: this.rect, numbers: [1]}, {name: "s2", sprite: this.rect, numbers: [2]}],
                [{name: "e", sprite: this.rect, numbers: []}, {name: "s3", sprite: this.rect, numbers: [3]}, {name: "s4", sprite: this.rect, numbers: [4]}],
                [{name: "b", sprite: this.rect, numbers: []}, {name: "s5", sprite: this.rect, numbers: [5]}, {name: "s6", sprite: this.rect, numbers: [6]}],
                [{name: "r", sprite: this.rect, numbers: []}, {name: "s7", sprite: this.rect, numbers: [7]}, {name: "s8", sprite: this.rect, numbers: [8]}],
                [{name: "o", sprite: this.rect, numbers: []}, {name: "s9", sprite: this.rect, numbers: [9]}, {name: "s10", sprite: this.rect, numbers: [10]}],
                [{name: "m", sprite: this.rect, numbers: []}, {name: "s11", sprite: this.rect, numbers: [11]}, {name: "s12", sprite: this.rect, numbers: [12]}],
            ],
            landscape: [
                [
                    {name: "s2", sprite: this.rect, numbers: [2]}, {name: "s4", sprite: this.rect, numbers: [4]}, {name: "s6", sprite: this.rect, numbers: [6]},
                    {name: "s8", sprite: this.rect, numbers: [8]}, {name: "s10", sprite: this.rect, numbers: [10]}, {name: "s12", sprite: this.rect, numbers: [12]}
                ],
                [
                    {name: "s1", sprite: this.rect, numbers: [1]}, {name: "s3", sprite: this.rect, numbers: [3]}, {name: "s5", sprite: this.rect, numbers: [5]},
                    {name: "s7", sprite: this.rect, numbers: [7]}, {name: "s9", sprite: this.rect, numbers: [9]}, {name: "s11", sprite: this.rect, numbers: [11]}
                ],
                [
                    {name: "l", sprite: this.rect, numbers: []}, {name: "e", sprite: this.rect, numbers: []}, {name: "r", sprite: this.rect, numbers: []},
                    {name: "b", sprite: this.rect, numbers: []}, {name: "o", sprite: this.rect, numbers: []}, {name: "m", sprite: this.rect, numbers: []}
                ]
            ],
            portraitHover: [
                [
                    {name: "p1.3", sprite: this.hoverRect, numbers: [1,3]}, {name: "p3.5", sprite: this.hoverRect, numbers: [3,5]}, 
                    {name: "p5.7", sprite: this.hoverRect, numbers: [5,7]}, {name: "p7.9", sprite: this.hoverRect, numbers: [7,9]},
                    {name: "p9.11", sprite: this.hoverRect, numbers: [9,11]},
                ],
                [
                    {name: "p2.4", sprite: this.hoverRect, numbers: [2,4]},{name: "p4.6", sprite: this.hoverRect, numbers: [4,6]},
                    {name: "p6.8", sprite: this.hoverRect, numbers: [6,8]}, {name: "p8.10", sprite: this.hoverRect, numbers: [8,10]},
                    {name: "p10.12", sprite: this.hoverRect, numbers: [10,12]},
                ],
                [
                    {name: "p1.2", sprite: this.hoverRect, numbers: [1,2]}, {name: "p3.4", sprite: this.hoverRect, numbers: [3,4]},
                    {name: "p5.6", sprite: this.hoverRect, numbers: [5,6]}, {name: "p7.8", sprite: this.hoverRect, numbers: [7,8]},
                    {name: "p9.10", sprite: this.hoverRect, numbers: [9,10]}, {name: "p11.12", sprite: this.hoverRect, numbers: [11,12]}
                ],
                [
                    {name: "q1.2.3.4", sprite: this.hoverRect, numbers: [1,2,3,4]}, {name: "q3.4.5.6", sprite: this.hoverRect, numbers: [3,4,5,6]},
                    {name: "q5.6.7.8", sprite: this.hoverRect, numbers: [5,6,7,8]}, {name: "q7.8.9.10", sprite: this.hoverRect, numbers: [7,8,9,10]},
                    {name: "q9.10.11.12", sprite: this.hoverRect, numbers: [9,10,11,12]}
                ],
            ],
            landscapeHover: [
                [
                    {name: "p1.3", sprite: this.hoverRect, numbers: [1,3]}, {name: "p3.5", sprite: this.hoverRect, numbers: [3,5]}, 
                    {name: "p5.7", sprite: this.hoverRect, numbers: [5,7]}, {name: "p7.9", sprite: this.hoverRect, numbers: [7,9]},
                    {name: "p9.11", sprite: this.hoverRect, numbers: [9,11]},
                ],
                [
                    {name: "p2.4", sprite: this.hoverRect, numbers: [2,4]},{name: "p4.6", sprite: this.hoverRect, numbers: [4,6]},
                    {name: "p6.8", sprite: this.hoverRect, numbers: [6,8]}, {name: "p8.10", sprite: this.hoverRect, numbers: [8,10]},
                    {name: "p10.12", sprite: this.hoverRect, numbers: [10,12]},
                ],
                [
                    {name: "p1.2", sprite: this.hoverRect, numbers: [1,2]}, {name: "p3.4", sprite: this.hoverRect, numbers: [3,4]},
                    {name: "p5.6", sprite: this.hoverRect, numbers: [5,6]}, {name: "p7.8", sprite: this.hoverRect, numbers: [7,8]},
                    {name: "p9.10", sprite: this.hoverRect, numbers: [9,10]}, {name: "p11.12", sprite: this.hoverRect, numbers: [11,12]}
                ],
                [
                    {name: "q1.2.3.4", sprite: this.hoverRect, numbers: [1,2,3,4]}, {name: "q3.4.5.6", sprite: this.hoverRect, numbers: [3,4,5,6]},
                    {name: "q5.6.7.8", sprite: this.hoverRect, numbers: [5,6,7,8]}, {name: "q7.8.9.10", sprite: this.hoverRect, numbers: [7,8,9,10]},
                    {name: "q9.10.11.12", sprite: this.hoverRect, numbers: [9,10,11,12]}
                ],
            ]
        }

        this.rectanglesInitializer.portrait.forEach(list => {
            list.forEach((element, index) => {
                list[index].sprite = new PIXI.Sprite(this.loaders.blueRect)
                list[index].sprite.alpha = 0;
                list[index].sprite.interactive = true
                this.createBet(list[index])
                list[index].sprite.on("pointerover", () => {
                    var forEachItem = this.rectanglesInitializer.portrait
                    list[index].sprite.alpha = 1;
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 2)
                    
                })
                list[index].sprite.on("pointerout", () => {
                    var forEachItem = this.rectanglesInitializer.portrait
                    list[index].sprite.alpha = 0;
                    setTimeout(() => {
                           this.hoverElements(list[index], 0)
                    }, 0)
                })
                list[index].sprite.on("tap", () => {
                    list[index].sprite.alpha = 1;
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 2)
                    setTimeout(() => {
                        list[index].sprite.alpha = 0;
                        this.hoverElements(list[index], 0)
                    }, 180)
                })
                list[index].sprite.on("pointerdown", () => {
                })
            });
        });

        this.rectanglesInitializer.landscape.forEach(list => {
            list.forEach((element, index) => {
                list[index].sprite = new PIXI.Sprite(this.loaders.blueRect)
                list[index].sprite.alpha = 0;
                list[index].sprite.interactive = true
                this.createBet(list[index])
                list[index].sprite.on("pointerover", () => {
                    var forEachItem = this.rectanglesInitializer.landscape
                    list[index].sprite.alpha = 1;
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 3)
                    
                })
                list[index].sprite.on("pointerout", () => {
                    var forEachItem = this.rectanglesInitializer.landscape
                    list[index].sprite.alpha = 0;
                    setTimeout(() => {
                           this.hoverElements(list[index], 0)
                    }, 0)
                    
                })
                list[index].sprite.on("tap", () => {
                    list[index].sprite.alpha = 1;
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 3)
                    setTimeout(() => {
                        list[index].sprite.alpha = 0;
                        this.hoverElements(list[index], 0)
                    }, 180)
                })
                list[index].sprite.on("pointerdown", () => {
                })
            });
        });

        this.rectanglesInitializer.portraitHover.forEach(list => {
            list.forEach((element, index) => {
                list[index].sprite = new PIXI.Sprite(this.loaders.blueRect)
                list[index].sprite.interactive = true
                this.createBet(list[index])
                list[index].sprite.on("pointerover", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 2)
                })
                list[index].sprite.on("pointerout", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 0)
                    }, 0)
                })
                list[index].sprite.on("tap", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 2)
                        // clearInterval(interval)
                    setTimeout(() => {
                        this.hoverElements(list[index], 0)
                    }, 180)
                })
                list[index].sprite.on("pointerdown", () => {
                })
            });
        });

        this.rectanglesInitializer.landscapeHover.forEach(list => {
            list.forEach((element, index) => {
                list[index].sprite = new PIXI.Sprite(this.loaders.blueRect)
                list[index].sprite.interactive = true
                this.createBet(list[index])
                list[index].sprite.on("pointerover", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 3)
                })
                list[index].sprite.on("pointerout", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 0)
                    }, 0)
                })
                list[index].sprite.on("tap", () => {
                    setTimeout(() => {
                        this.hoverElements(list[index], 1)
                    }, 3)
                    setTimeout(() => {
                        this.hoverElements(list[index], 0)
                    }, 180)
                })
                list[index].sprite.on("pointerdown", () => {
                })
            });
        });

        this.blueRect = new PIXI.Sprite(this.loaders.blueRect)
        this.yellowRect = new PIXI.Sprite(this.loaders.yellowRect)
        this.yellowRect.x = 0;
        this.yellowRect.y = 0;
        this.currentNum = this.rectanglesInitializer.landscape[0][1]
        this.yellowRect.alpha = 0
        this.addChild(this.yellowRect)
    }

    resize (scale: any) {
        this.removeChildren()
        try {
            this.field.removeChildren()
            this.doResize = true
        } catch (e) {
            this.doResize = false
        }
        if (app.portrait) {
            this.addChild(this.yellowRect)
            this.yellowRect.rotation = Math.PI
            this.yellowRect.scale.set(1, 1)
            let __buffer: number;
            let lastRectPosition_x = 0;
            let lastRectPosition_y = 0;
            
            this.rectanglesInitializer.portrait.forEach(list => {
                list.forEach((element, index) => {
                    list[index].sprite.rotation = Math.PI;
                    list[index].sprite.scale.set(1,1)
                    if (index != 0) list[index].sprite.x = lastRectPosition_x;
                    list[index].sprite.y = lastRectPosition_y;
                    lastRectPosition_x += list[index].sprite.width
                    __buffer = list[index].sprite.height
                    this.addChild(list[index].sprite)
                    if (config.service.headers.includes(list[index].name) && this.doResize) {
                        this.addCheap(
                            list[index],
                            config.service.bets[list[index].name]["bet"]
                        )
                    }
                });
                lastRectPosition_x = 0;
                lastRectPosition_y += __buffer
            });
            let landscapeDonor = this.rectanglesInitializer.portrait[0][0].sprite
            this.rectanglesInitializer.portraitHover.forEach((list, listIndex) => {
                list.forEach((item, index) => {
                    list[index].sprite.x = 0 - list[index].sprite.width / 2;
                    list[index].sprite.y = 0 - list[index].sprite.height / 2;
                    switch (listIndex) {
                        case 0:
                            list[index].sprite.height = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.width
                            list[index].sprite.y = landscapeDonor.height * index + 20
                            break;
                        case 1:
                            list[index].sprite.height = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.width * 2
                            list[index].sprite.y = landscapeDonor.height * index + 20
                            break;
                        case 2:
                            list[index].sprite.width = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.width * 1.5
                            list[index].sprite.y = landscapeDonor.height * (index - 1) + 35
                            break;
                        case 3:
                            list[index].sprite.height = 30;
                            list[index].sprite.width = 30;
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.width * 1.5
                            list[index].sprite.y = landscapeDonor.height * index + 35
                            break;
                    }
                    list[index].sprite.interactive = true
                    this.addChild(list[index].sprite)
                    if (config.service.headers.includes(list[index].name) && this.doResize) {
                        this.addCheap(
                            list[index],
                            config.service.bets[list[index].name]["bet"]
                        )
                    }
                })
            })
        } else if (app.landscape) {
            this.addChild(this.yellowRect)
            this.yellowRect.rotation = Math.PI / 2
            this.yellowRect.scale.set(1.06, 1.06)
            let __buffer: number;
            let lastRectPosition_x = 0;
            let lastRectPosition_y = 0;

            this.rectanglesInitializer.landscape.forEach((list, listIndex) => {
                list.forEach((element, index) => {
                    list[index].sprite.rotation = Math.PI / 2
                    list[index].sprite.scale.set(1.06, 1.06)
                    list[index].sprite.y = lastRectPosition_x
                    list[index].sprite.x = lastRectPosition_y
                    lastRectPosition_y += list[index].sprite.height
                    __buffer = list[index].sprite.width
                    if (config.service.headers.includes(list[index].name) && this.doResize) {
                        this.addCheap(
                            list[index],
                            config.service.bets[list[index].name]["bet"]
                        )
                    }
                    this.addChild(list[index].sprite)
                });
                lastRectPosition_y = 0;
                lastRectPosition_x += __buffer
            });
            let landscapeDonor = this.rectanglesInitializer.portrait[0][0].sprite
            landscapeDonor.scale.set(1.06, 1.06)
            this.rectanglesInitializer.landscapeHover.forEach((list, listIndex) => {
                list.forEach((item, index) => {
                    list[index].sprite.x = list[index].sprite.height;
                    list[index].sprite.y = list[index].sprite.height;
                    list[index].sprite.rotation = Math.PI / 2
                    list[index].sprite.scale.set(1.06, 1.06)
                    switch (listIndex) {
                        case 0:
                            list[index].sprite.height = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.height * (index - 1) + 125
                            list[index].sprite.y = landscapeDonor.width
                            break;
                        case 1:
                            list[index].sprite.height = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.height * (index - 1) + 125
                            list[index].sprite.y = landscapeDonor.width - 95
                            break;
                        case 2:
                            list[index].sprite.width = 30;
                            list[index].sprite.anchor.set(.5, 0)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.height * (index - 1) + 110
                            list[index].sprite.y = landscapeDonor.width - 47
                            break;
                        case 3:
                            list[index].sprite.height = 30;
                            list[index].sprite.width = 30;
                            list[index].sprite.anchor.set(.5, .5)
                            list[index].sprite.alpha = 0
                            list[index].sprite.x = landscapeDonor.height * (index - 1) + 110
                            list[index].sprite.y = landscapeDonor.width - 47
                            break;
                    }
                    list[index].sprite.interactive = true
                    this.addChild(list[index].sprite)
                    if (config.service.headers.includes(list[index].name) && this.doResize) {
                        this.addCheap(
                            list[index],
                            config.service.bets[list[index].name]["bet"]
                        )
                    }
                })
            })
        }

        if (app.portrait) {
            this.blueRect.scale.set(1, 1)
            this.blueRect.rotation = Math.PI
            this.x = config.portrait.field_x - 90
            this.y = config.portrait.field_y - 175
        } else if (app.landscape) {
            this.blueRect.rotation = Math.PI / 2
            this.blueRect.scale.set(1.1, 1.04)
            this.x = config.portrait.field_x - 305
            this.y = config.portrait.field_y - 256
        }
        // this.ball = new PIXI.Sprite(app.loader.resources[app.assets_url+'roulette.json'].textures['ball.png'])
        // this.ball.x = config.portrait.cheaps_win_x
        // this.ball.y = config.portrait.cheaps_win_y
        // this.field.addChild(this.ball)
        if (app.portrait) {
            this.rectanglesInitializer.portrait.forEach((list, listIndex) => {
                list.forEach((item) => {
                    if (item.name == this.currentNum.name) {
                        this.yellowRect.position.set(
                            item.sprite.x, item.sprite.y
                        )
                    }
                })
            })
        } else if (app.landscape) {
            this.rectanglesInitializer.landscape.forEach((list, listIndex) => {
                list.forEach((item) => {
                    if (item.name == this.currentNum.name) {
                        this.yellowRect.position.set(
                            item.sprite.x, item.sprite.y
                        )
                    }
                })
            })
        }

        if (this.yellowRect.alpha != 0) {
            app.timeout(() => {
                let interval = app.interval(() => {
                this.yellowRect.alpha -= .03
                if (this.yellowRect.alpha <= 0) {
                        this.yellowRect.alpha = 0
                        // clearInterval(interval)
                        app.clearTimer(interval)
                    }
                }, 17)
            }, 500)
        }
    }

    alert (text) {
        if (config.service.alertStopped) {
            let alert = new PIXI.Text(text, {
                fontFamily: "bluntreg",
                fill: "#bdfb42",
                fontSize: 20,
            });
            
            alert.anchor.set(.5)
            alert.alpha = 0
    
            if (app.portrait) {
                alert.y = this.field.height / 2 + 20
            }
            if (app.landscape) {
                alert.y = this.field.height / 2 * -1 - 17
            }
    
            this.field.addChild(alert)
    
            let step = .03;
            let alpha = 0;
            let timer = 0;
            let interval = setInterval(() => {
                alpha += step
                alert.alpha = alpha
    
                if (alpha > 1) {
                    step *= -1
                }
                if (alpha < 0) {
                    step *= -1
                    timer++;
                }
                if (timer >= 5) {
                    this.field.removeChild(alert)
                    config.service.alertStopped = true;
                    clearInterval(interval)
                }
            }, 17)
        }
    }

    staticAlert(text) {
        if (config.service.alertStopped) {
            let alert = new PIXI.Text(text, {
                fontFamily: "bluntreg",
                fill: "#bdfb42",
                fontSize: 20,
            });
            
            alert.anchor.set(.5)
            alert.alpha = 0
    
            if (app.portrait) {
                alert.y = this.field.height / 2 + 20
            }
            if (app.landscape) {
                alert.y = this.field.height / 2 * -1 - 17
            }
    
            this.field.addChild(alert)
    
            let step = .03;
            let alpha = 0;
            let timer = 0;
            let interval = setInterval(() => {
                alpha += step
                alert.alpha = alpha
                if (timer < 5) {
                    if (alpha > 1 && timer <= 4) {
                        step *= -1
                        timer++;
                    }
                    if (alpha < 0 && timer <= 4) {
                        step *= -1
                    }
                } else {
                    timer++
                }
                if (timer >= 5) {
                    console.log("done")
                    config.service.alertStopped = true;
                    clearInterval(interval)
                }
            }, 17)
        }
    }

    createBet(item) {
        if (PIXI.utils.isMobile.any) {
            item.sprite.on("tap", oncreate.bind(this, 100, event, "mobile"))
        } else {
            item.sprite.on("pointerdown", oncreate.bind(this, 0, event, "desktop"))
        }
        function oncreate (timeout, event, target) {
            let count = 0;
            let countMore = 0;
            let countLess = 0;
            let countRed = 0;
            let countBlack = 0;
            let countEven = 0;
            let countOdd = 0;

            config.service.headers.length != 0 ? config.service.headers.forEach((item, index, list) => { // 
                count += config.service.bets[item]["bet"]
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
                let historyList = []
                if ((countMore == 0 && config.service.volume >= 100 || countMore >= 100) && (countLess == 0 && config.service.volume >= 100 || countLess >= 100) &&
                    (countRed == 0 && config.service.volume >= 100 || countRed >= 100) && (countBlack == 0 && config.service.volume >= 100 || countBlack >= 100) && 
                    (countEven == 0 && config.service.volume >= 100 || countEven >= 100) && (countOdd == 0 && config.service.volume >= 100 || countOdd >= 100) ||
                    config.service.volume >= 10 && !["l", "e", "r", "b", "o", "m"].includes(item.name)) {
                    if (isNaN(config.service.test)) {
                        config.service.test = config.service.volume
                    }
                    let bool;
                    try {
                        bool = event["type"] != "fullscreenchange"
                    } catch (e) {
                        bool = typeof(event) != "undefined"
                    }
                    if (count + config.service.test <= 5000) {
                        setTimeout(() => {
                            let volume = config.service.test
                            let lastBet = {
                                "id": "",
                                "numbers": "",
                                "bet": 0,
                                "type": "",
                                item: null
                            }
                            let bet = {
                                "id": "",
                                "numbers": "",
                                "bet": 0,
                                "type": "",
                            }
                            if (volume && config.service.credits >= 0 && config.service.credits >= volume) {
                                config.service.betMade = true
                                if (!config.service.headers.includes(item.name)) {
                                    bet["bet"] = 0;
                                    lastBet["bet"] = 0;
                                } else {
                                    bet["bet"] = config.service.bets[item.name]["bet"];
                                    lastBet["bet"] = config.service.bets[item.name]["bet"];
                                }
                                if (config.service.headers.includes(item.name)) {
                                    bet = config.service.bets[item.name]
                                    bet["bet"] += volume
                                    lastBet["id"] = bet["id"]
                                    bet["item"] = item
                                    lastBet["bet"] = volume
                                    lastBet["numbers"] = bet["numbers"]
                                    lastBet["type"] = bet["type"]
                                    lastBet.item = item
                                    historyList.unshift(Object.assign({}, lastBet))
                                    config.service.bets[item.name] = bet
                                    this.addCheap(item, bet["bet"])
                                    config.service.history.betList.push(lastBet)
                                } else {
                                    if (config.service.headers == []) {
                                        config.service.history.betList = []
                                        config.service.history.headers = []
                                    }
                                    lastBet["id"] = item.name;
                                    bet["id"] = item.name;
                                    bet["item"] = item
                                    setType(item.name, bet)
                                    setType(item.name, lastBet)
                                    lastBet["numbers"] = item.numbers
                                    bet["numbers"] = item.numbers
                                    lastBet["bet"] = volume
                                    lastBet.item = item
                                    bet["bet"] = volume
                                    config.service.bets[item.name] = bet
                                    config.service.history.betList.push(lastBet)
                                    historyList.unshift(Object.assign({}, lastBet))
                                    config.service.headers.push(bet["id"])
                                    this.addCheap(item, bet["bet"])
                                }
                                config.service.history.undoList.push(historyList)
                            } else {
                                this.alert("NOT ENOUGH CREDITS")
                            }
                        }, timeout)    
                    } else {
                        if (config.service.alertStopped) {
                            this.alert("MAX BET [5000] REACHED")
                            config.service.alertStopped = false;
                        }
                    }
                } else {
                    if (config.service.alertStopped) {
                        this.alert("MIN BET FOR THIS IS [100]")
                        config.service.alertStopped = false;
                    }
                }
            }
            
        }

        function setType(name: any, variable: any) {
            switch (name[0]) {
                case "s":
                    variable["type"] = "single";
                    break;
                case "p":
                    variable["type"] = "pair";
                    break;
                case "q":
                    variable["type"] = "quartet";
                    break;
                case "r":config.service.test
                    variable["type"] = "red";
                    break;
                case "b":
                    variable["type"] = "black";
                    break;
                case "e":
                    variable["type"] = "even";
                    break
                case "o":
                    variable["type"] = "odd";
                    break
                case "m":
                    variable["type"] = "more";
                    break
                case "l":
                    variable["type"] = "less";
                    break
            }
        }
    }

    createRebet(betList?) {
        let historyList = []

        if (isNaN(config.service.test)) {
            config.service.test = config.service.volume
        }
        if (event.type != "fullscreenchange") {
            if (config.service.history.headers.length != 0) {
                const setType = function (name: any, variable: any) {
                    switch (name[0]) {
                        case "s":
                            variable["type"] = "single";
                            break;
                        case "p":
                            variable["type"] = "pair";
                            break;
                        case "q":
                            variable["type"] = "quartet";
                            break;
                        case "r":
                            variable["type"] = "red";
                            break;
                        case "b":
                            variable["type"] = "black";
                            break;
                        case "e":
                            variable["type"] = "even";
                            break
                        case "o":
                            variable["type"] = "odd";
                            break
                        case "m":
                            variable["type"] = "more";
                            break
                        case "l":
                            variable["type"] = "less";
                            break
                    }
                }

                let onRebet = function (item) {
                    let count = 0;
                    config.service.history.headers.length != 0 ? config.service.history.headers.forEach((item, index, mainlist) => {
                        count += config.service.history.bets[item]["bet"] 

                        index + 1 === mainlist.length && callback.call(this)
                    }) : callback.call(this)

                    function callback () {
                            setTimeout(() => {
                            let volume = item["bet"]
                            let lastBet = {
                                "id": "",
                                "numbers": "",
                                "bet": 0,
                                "type": "",
                                item: null
                            }
                            let bet = {
                                "id": "",
                                "numbers": "",
                                "bet": 0,
                                "type": "",
                            }
                            if (volume && config.service.credits > 0 && config.service.credits > volume && count <= config.service.lastResponse["coin_balance"]) {
                                config.service.betMade = true
                                if (!config.service.headers.includes(item["id"])) {
                                    bet["bet"] = 0;
                                    lastBet["bet"] = 0;
                                } else {
                                    bet["bet"] = config.service.bets[item["id"]]["bet"];
                                    lastBet["bet"] = config.service.bets[item["id"]]["bet"];
                                }
                                if (config.service.headers.includes(item["id"])) {
                                    bet = config.service.bets[item["id"]]
                                    bet["bet"] += volume
                                    bet["item"] = item.item
                                    lastBet["id"] = bet["id"]
                                    lastBet["bet"] = volume
                                    lastBet["numbers"] = bet["numbers"]
                                    lastBet["type"] = bet["type"]
                                    lastBet.item = item.item
                                    config.service.bets[item["id"]] = bet
                                    historyList.push(Object.assign({}, lastBet))
                                    this.addCheap(item.item, bet["bet"])
                                } else {
                                    if (config.service.headers == []) {
                                        config.service.history.betList = []
                                        config.service.history.headers = []
                                    }
                                    lastBet["id"] = item["id"];
                                    bet["id"] = item["id"];
                                    bet["item"] = item.item
                                    setType(item["id"], bet)
                                    setType(item["id"], lastBet)
                                    lastBet["numbers"] = item["numbers"]
                                    bet["numbers"] = item.numbers
                                    lastBet["bet"] = volume
                                    lastBet.item = item.item
                                    historyList.push(Object.assign({}, lastBet))
                                    bet["bet"] = volume
                                    config.service.bets[item["id"]] = bet
                                    config.service.headers.push(bet["id"])
                                    this.addCheap(item.item, bet["bet"])
                                }
                            }
                            this.resize(1)
                        }, 0)
                    }
                }
                new Promise((resolve, reject) => {
                    config.service.history.rebetList.forEach((item, index) => {
                        let count = 0;
                        config.service.headers.forEach((item, index, list) => {
                            count += config.service.bets[item]["bet"] 
                        })
                        count + item["bet"] <= 5000 ? regularEnd.call(this, item) : emergencyEnd.call(this)
                        index + 1 == config.service.history.rebetList.length && generalEnd()
                    })
                    function emergencyEnd() {
                        this.alert("MAX BET [5000] REACHED")
                        resolve()
                    }
                    function regularEnd(item) {
                        onRebet.call(this, item)
                    }
                    function generalEnd() {
                        resolve()
                    }
                }).then(() => {
                    config.service.history.undoList.push(historyList)

                })
            }
            
        }
    }

    createUndo (event?) {
        console.log(config.service.history.undoList)
        let continueCycle = true
        if (isNaN(config.service.test)) {
            config.service.test = config.service.volume
        }
        const setType = function (name: any, variable: any) {
            switch (name[0]) {
                case "s":
                    variable["type"] = "single";
                    break;
                case "p":
                    variable["type"] = "pair";
                    break;
                case "q":
                    variable["type"] = "quartet";
                    break;
                case "r":
                    variable["type"] = "red";
                    break;
                case "b":
                    variable["type"] = "black";
                    break;
                case "e":
                    variable["type"] = "even";
                    break
                case "o":
                    variable["type"] = "odd";
                    break
                case "m":
                    variable["type"] = "more";
                    break
                case "l":
                    variable["type"] = "less";
                    break
            }
        }

        let onRebet = function (item) {
            let count = 0;
            config.service.headers.length != 0 ? config.service.headers.forEach((item, index, list) => {
                count += config.service.bets[item]["bet"] 

                index + 1 === list.length && callback.call(this)
            }) : callback.call(this)

            function callback () {
                setTimeout(() => {
                    let volume = item["bet"]
                    let lastBet = {
                        "id": "",
                        "numbers": "",
                        "bet": 0,
                        "type": "",
                        item: null
                    }
                    let bet = {
                        "id": "",
                        "numbers": "",
                        "bet": 0,
                        "type": "",
                    }
                    console.log(
                        volume && config.service.credits >= 0 && config.service.credits >= volume,
                        volume, config.service.credits
                    )
                    if (volume && config.service.credits >= 0) {
                        console.log("hello")
                        config.service.betMade = true
                        if (!config.service.headers.includes(item["id"])) {
                            bet["bet"] = 0;
                            lastBet["bet"] = 0;
                        } else {
                            bet["bet"] = config.service.bets[item["id"]]["bet"];
                            lastBet["bet"] = config.service.bets[item["id"]]["bet"];
                        }
                        if (config.service.headers.includes(item["id"])) {
                            bet = config.service.bets[item["id"]]
                            bet["bet"] += volume
                            bet["item"] = item.item
                            lastBet["id"] = bet["id"]
                            lastBet["bet"] = volume
                            lastBet["numbers"] = bet["numbers"]
                            lastBet["type"] = bet["type"]
                            lastBet.item = item.item
                            config.service.bets[item["id"]] = bet
                            this.addCheap(item.item, bet["bet"])
                        } else {
                            if (config.service.headers == []) {
                                config.service.history.betList = []
                                config.service.history.headers = []
                            }
                            lastBet["id"] = item["id"];
                            bet["id"] = item["id"];
                            bet["item"] = item.item
                            setType(item["id"], bet)
                            setType(item["id"], lastBet)
                            lastBet["numbers"] = item["numbers"]
                            bet["numbers"] = item.numbers
                            lastBet["bet"] = volume
                            lastBet.item = item.item
                            bet["bet"] = volume
                            config.service.bets[item["id"]] = bet
                            config.service.headers.push(bet["id"])
                            this.addCheap(item.item, bet["bet"])
                        }
                    }
                    this.resize(1)
                }, 0)
                    }

            
            
        }
        config.service.bets = {}
        config.service.headers = []
        config.service.history.betList = []
        config.service.history.undoList.pop()
        config.service.history.betList.pop()
        for (let i = config.service.history.undoList.length -1; 0 <= i; i--) {
            let element = config.service.history.undoList[i]
            if (element.length == 0) {
                continueCycle = false
            }

            if (continueCycle) {
                element.forEach((item) => {
                    regularEnd.call(this, item)

                })
            } else {
                console.log("none")
            }
        }
        function regularEnd(item) {
            onRebet.call(this, item)
        }
    }

    addCheap(target?, volume?, func?, timeout?) {
        volume = Math.floor(volume)
        let sheet;
        let fontSize;
        let incase = []
        this.rectanglesInitializer.landscapeHover.forEach((array, index) => {
            if (index == 2) {
                array.forEach((item, i) => {
                    incase.push(array[i].name)
                })
            }
        })
        if (volume > 0) {
            if (10 <= volume && volume < 50) {
                sheet = 1
                fontSize = 20
            } else if (50 <= volume && volume < 100) {
                sheet = 2
                fontSize = 20
            } else if (100 <= volume && volume < 500) {
                sheet = 3
                fontSize = 20
            } else if (500 <= volume && volume < 2500) {
                sheet = 4
                fontSize = 16
            } else if (2500 <= volume) {
                sheet = 5
                fontSize = 16
            }

            let bet = new PIXI.Sprite(app.loader.resources[app.assets_url+'tableelements.json']
                    .textures[`bet_level_${sheet.toString()}.png`])
            bet.scale.set(.8)
            let text = new PIXI.Text(volume, {
                fontFamily: "bluntreg",
                fontSize: fontSize,
                fill: "white",
            });
            text.anchor.set(.5, .65)
            bet.addChild(text)
            bet["id"] = target.name
            bet["bet"] = volume
            this.field.addChild(bet);
            if (app.portrait) {
                switch (target.name[0]) {
                    case "p":
                        if (incase.includes(target.name)) {
                            bet.x = target.sprite.x - this.field.width / 2 + 45
                            bet.y = target.sprite.y - this.field.height / 2 + 70
                        } else {
                            bet.x = target.sprite.x - this.field.width / 2 + 45
                            bet.y = target.sprite.y - this.field.height / 2 + 50
                        }
                        
                        break;
                    case "q":
                        bet.x = target.sprite.x - this.field.width / 2 + 45
                        bet.y = target.sprite.y - this.field.height / 2 + 35
                        break;
                    default:
                        bet.x = target.sprite.x - this.field.width / 2 + 45
                        bet.y = target.sprite.y - this.field.height / 2 + 35
                }
            } else if (app.landscape) {
                switch (target.name[0]) {
                    case "p":
                        if (incase.includes(target.name)) {
                            bet.x = target.sprite.x - this.field.width / 2
                            bet.y = target.sprite.y - this.field.height / 2 + 45
                        } else {
                            bet.x = target.sprite.x - this.field.width / 2 + 25
                            bet.y = target.sprite.y - this.field.height / 2 + 50
                        }
                        
                        break;
                    case "q":
                        bet.x = target.sprite.x - this.field.width / 2 + 40
                        bet.y = target.sprite.y - this.field.height / 2 + 45
                        break;
                    default:
                        bet.x = target.sprite.x - this.field.width / 2 + 38
                        bet.y = target.sprite.y - this.field.height / 2 + 50
                }
            }
            typeof(func) === "function" && setTimeout(func(), timeout)
        }
    }

    hoverElements(field, state) {
        if (app.portrait) {
            var forEachItem = this.rectanglesInitializer.portrait
        } else if (app.landscape) {
            var forEachItem = this.rectanglesInitializer.landscape
        }
            for (let i = 0; forEachItem.length > i; i++) {
                for (let n = 0; forEachItem[i].length > n; n++) {
                    if (config.map[field.name].includes(forEachItem[i][n].name)) {
                        forEachItem[i][n].sprite.alpha = state
                    }
                }
            }
    }

    increeseWinPosition (func1?, func2?) {
        let wins = []
        let index = 0;
        for (let i = 0; config.service.response["wins"].length > i; i++) {
            wins.push(config.service.response["wins"][i]["id"])
        }
        const promice = new Promise((resolve, reject) => {
            func1(() => {
                resolve()
            })
        }).then(() => {
            const promise = new Promise((res, rej) => {
                config.service.response["wins"].length != 0 ? this.field.children.forEach((element) => {
                    config.service.response["wins"].forEach((item) => {
                        wins.forEach((innerItem) => {
                            if (element["id"] == innerItem && item["id"] == innerItem) {
                                let step = 5;

                                let bet = element["bet"]
                                let win = item["win"]
                                if (win >= 0 && win < 100) {
                                    step = 5
                                } else if (win >= 100 && win < 500) {
                                    step = 5
                                } else if (win >= 500 && win < 100) {
                                    step = 10
                                } else if (win >= 1000 && win < 500) {
                                    step = 25
                                } else if (win >= 5000) {
                                    step = 50
                                } else if (win >= 10000) {
                                    step = 100
                                }
                                let count = bet;
                                // element.scale.set(1.2)
                                console.log((3 / win) * 1000)
                                let interval = app.interval(() => {
                                    element.children[0].text = Math.floor(count);
                                    count += step
                                    if (count > win) {
                                        // element.scale.set(1)
                                        index++;
                                        if (index == config.service.response["wins"].length) {
                                            res()
                                        }
                                        // clearInterval(interval)
                                        app.clearTimer(interval)
                                    }
                                }, (2.5 / win) * 1000)
                            }
                        })
                    })
                }) : func2()
            }).then(() => {
                typeof(func2) === "function" && func2()
            })
        })
    }
    
    switchWin (func) {
        this.resize(1)
        if (app.portrait) {
            var forEachItem = this.rectanglesInitializer.portrait
        } else if (app.landscape) {
            var forEachItem = this.rectanglesInitializer.landscape
        }
        forEachItem.forEach((list, listIndex) => {
            list.forEach((element, index) => {
                if (list[index].name == "s"+config.service.win) {

                    this.yellowRect.x = list[index].sprite.x
                    this.yellowRect.y = list[index].sprite.y

                    this.currentNum = list[index]

                    config.service.winPosition.x = list[index].sprite.x + list[index].sprite.width / 2 - 5
                    config.service.winPosition.y = list[index].sprite.y + list[index].sprite.height / 2 + 12
                    config.service.winArea = list[index]
                    func()
                    
                    this.yellowRect.alpha = 1
                    app.timeout(() => {
                        let interval = app.interval(() => {
                            if (config.service.isAllowedToSwitchOff) {
                                this.yellowRect.alpha -= .03
                                if (this.yellowRect.alpha <= 0) {
                                    // clearInterval(interval)
                                    app.clearTimer(interval)
                                }
                            }
                        }, 17)
                    }, 500)
                }
            });
        });
    }

    setInteractive (bool) {
        if (app.portrait) {
            var forEachItem = this.rectanglesInitializer.portrait
            var forEachItemHover = this.rectanglesInitializer.portraitHover
        } else if (app.landscape) {
            var forEachItem = this.rectanglesInitializer.landscape
            var forEachItemHover = this.rectanglesInitializer.landscapeHover
        }
        forEachItem.forEach((list, listIndex) => {
            list.forEach((element, index) => {
                element.sprite.interactive = bool
            })
        })
        forEachItemHover.forEach((list, listIndex) => {
            list.forEach((element, index) => {
                element.sprite.interactive = bool
            })
        })
    }

    collectCheaps (callback, changeWin) {
        changeWin()
        let wins = []

        for (let i = 0; config.service.response["wins"].length > i; i++) {
            wins.push(config.service.response["wins"][i]["id"])
        }

        let promice = new Promise((res, rej) => {
            this.increeseWinPosition((func) => {
                let promice = new Promise((response) => {
                    let index = 0;
                    let winVolume = 0;
                    let looseVolume = 0;
                    this.field.children.forEach((element) => {
                        if (!wins.includes(element["id"])) {
                            looseVolume += element["bet"]
                            element.children[0].text = looseVolume
                            if (app.portrait) {
                                let x = (this.field.width / 2 * -1 - element.x + 5) / 120
                                let y = (this.field.height / 2 * -1 - element.y - 35) / 120
            
                                let ticker = 0;
                                let route = app.interval(() => {
                                    element.x += x;
                                    element.y += y
                                    if (ticker >= 120) {
                                        index++;
                                        runFunc.call(this)
                                        // clearInterval(route)
                                        app.clearTimer(route)
                                    }
                                    ticker++;
                                }, 1)
                            } else if (app.landscape) {
                                let x = (this.field.width / 2 * -1 - element.x - 30) / 120
                                let y = (this.field.height / 2 - element.y - 10) / 120
        
                                let ticker = 0;
                                let route = app.interval(() => {
                                    element.x += x;
                                    element.y += y
                                    if (ticker >= 120) {
                                        index++;
                                        runFunc.call(this)
                                        // clearInterval(route)
                                        app.clearTimer(route)
                                    }
                                    ticker++;
                                }, 1)
                            }
                        } else {
                            index++;
                            runFunc.call(this)
                        }
                    })
                    function runFunc() {
                        app.timeout(() => {
                            index == this.field.children.length && response()
                        }, 100)
                    }
                }).then(()=> {
                    let index = 0;
                    this.field.children.forEach((element) => {
                        if (!wins.includes(element["id"])) {
                            setTimeout(() => {
                                if (app.portrait) {
                                    let x = (config.portrait.cheaps_loose_x - element.x) / 70
                                    let y = (config.portrait.cheaps_loose_y - element.y) / 70
                
                                    let ticker = 0;
                                    let route = app.interval(() => {
                                        element.x += x;
                                        element.y += y
                                        element.alpha -= .01
                                        if (ticker >= 70) {
                                            index++
                                            element.visible = false
                                            resolve.call(this, index)
                                            // clearInterval(route)
                                            app.clearTimer(route)
                                        }
                                        ticker++;
                                    }, 1)
                                } else if (app.landscape) {
                                    let x = (config.landscape.cheaps_loose_x - element.x) / 70
                                    let y = (config.landscape.cheaps_loose_y - element.y) / 70
                
                                    let ticker = 0;
                                    let route = app.interval(() => {
                                        element.x += x;
                                        element.y += y;
                                        element.alpha -= .01
                                        if (ticker >= 70) {
                                            index++
                                            element.visible = false
                                            resolve.call(this, index)
                                            app.clearTimer(route)
                                        }
                                        ticker++;
                                    }, 1)
                                }
                            }, 0)
                        } else {
                            index++
                            resolve.call(this, index)
                        }
                    })
        
                    function resolve(index) {
                        index == this.field.children.length && func()
                    }
                })
            }, () => {
                let index = 0;
                let winVolume = 0;
                let looseVolume = 0;
                this.field.children.forEach((element, indexOf) => {
                    if (wins.includes(element["id"])) {
                            let id = element["id"]
                            this.addCheap(config.service.winArea, config.service.response["total_win"], () => {
                                this.field.children[this.field.children.length-1].visible = false
                                element.anchor.set(.5, .5)
                                if (app.portrait) {

                                    let x = (config.service.winPosition.x + 5 - this.field.width / 2 - element.x) / 120
                                    let y = (config.service.winPosition.y - 12 - this.field.height / 2 - element.y) / 120
                
                                    let ticker = 0;
                                    let route = app.interval(() => {
                                        element.x += x;
                                        element.y += y;
                                        if (ticker >= 120) {
                                            index++;
                                            element = this.field.children[this.field.children.length-1]
                                            element["id"] = id
                                            this.field.children[indexOf] = this.field.children[this.field.children.length-1]
                                            this.field.children[this.field.children.length-1].visible = true
                                            this.field.children.pop()
                                            initThen.call(this)
                                            // clearInterval(route)
                                            app.clearTimer(route)
                                        }
                                        ticker++;
                                    }, 1)
                                } else if (app.landscape) {
                                    let x = (config.service.winPosition.x - 5 - this.field.width / 2 - element.x)/ 120
                                    let y = (config.service.winPosition.y + 1 - this.field.height / 2 - element.y) / 120
        
                                    let ticker = 0;
                                    let route =app.interval(() => {
                                        element.x += x;
                                        element.y += y
                                        if (ticker >= 120) {
                                            index++;
                                            element = this.field.children[this.field.children.length-1]
                                            element["id"] = id
                                            this.field.children[indexOf] = this.field.children[this.field.children.length-1]
                                            this.field.children[this.field.children.length-1].visible = true
                                            this.field.children.pop()
                                            initThen.call(this)
                                            // clearInterval(route)
                                            app.clearTimer(route)
                                        }
                                        ticker++;
                                    }, 1)
                                }
                            }, 0)
                    } else {
                        index++
                        this.field.children.length == index && app.timeout(res, 100)
                    }

                    function initThen() {
                        if (this.field.children.length == index) {
                            app.timeout(() => {
                                res("it has win position")
                            }, 100)
                        }
                    }
                })
            })
        }).then((data) => {
            let index = 0;
            this.field.children.forEach((element) => {
                if (wins.includes(element["id"])) {
                    app.timeout(() => {
                        if (app.portrait) {
                            let x = (config.portrait.cheaps_win_x - element.x) / 70
                            let y = (config.portrait.cheaps_win_y - element.y) / 70
        
                            let ticker = 0;
                            let route = app.interval(() => {
                                element.x += x;
                                element.y += y;
                                element.alpha -= .01
                                if (ticker >= 70) {
                                    config.service.isAllowedToSwitchOff = true
                                    this.field.removeChild(element)
                                    index++
                                    resolve.call(this, index)
                                    // clearInterval(route)
                                    app.clearTimer(route)
                                }
                                ticker++;
                            }, 1)
                        } else if (app.landscape) {
                            let x = (config.landscape.cheaps_win_x - element.x) / 50
                            let y = (config.landscape.cheaps_win_y - element.y) / 50
        
                            let ticker = 0;
                            let route = app.interval(() => {
                                element.x += x;
                                element.y += y
                                element.alpha -= .01
                                if (ticker >= 50) {
                                    config.service.isAllowedToSwitchOff = true
                                    this.field.removeChild(element)
                                    index++
                                    resolve.call(this, index)
                                    // clearInterval(route)
                                    app.clearTimer(route)
                                }
                                ticker++;
                            }, 1)
                        }
                    }, 500)   
                } else {
                    setTimeout(() => {
                        if (app.portrait) {
                            let x = (config.portrait.cheaps_loose_x - element.x) / 70
                            let y = (config.portrait.cheaps_loose_y - element.y) / 70
        
                            let ticker = 0;
                            let route = app.interval(() => {
                                element.x += x;
                                element.y += y
                                element.alpha -= .01
                                if (ticker >= 70) {
                                    config.service.isAllowedToSwitchOff = true
                                    index++
                                    this.field.removeChild(element)
                                    resolve.call(this, index)
                                    // clearInterval(route)
                                    app.clearTimer(route)
                                }
                                ticker++;
                            }, 1)
                        } else if (app.landscape) {
                            let x = (config.landscape.cheaps_loose_x - element.x) / 70
                            let y = (config.landscape.cheaps_loose_y - element.y) / 70
        
                            let ticker = 0;
                            let route = app.interval(() => {
                                element.x += x;
                                element.y += y;
                                element.alpha -= .01
                                if (ticker >= 70) {
                                    config.service.isAllowedToSwitchOff = true
                                    index++
                                    this.field.removeChild(element)
                                    resolve.call(this, index)
                                    // clearInterval(route)
                                    app.clearTimer(route)
                                }
                                ticker++;
                            }, 1)
                        }
                    }, 0)
                }
            })

            function resolve(index) {
                if (this.field.children.length == 0) {
                    // this.field.removeChildren()
                    callback()
                }
            }
        })
    }
}