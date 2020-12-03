import app from '../index';
import config from "./config";
import { types } from 'util';
export default class History extends PIXI.Sprite {
    private loaders: any;
    private config: any;
    private rect: PIXI.Sprite;
    private blue: any;
    private red: any;
    private rect_y: any;

    constructor() {
        super(app.loader.resources[app.assets_url+'history.json'].textures['history_frame.png']);

        this.loaders = {
            rect: app.loader.resources[app.assets_url+'history.json'].textures['history_highlight_win.png'],
            blue: app.loader.resources[app.assets_url+'history.json'].textures['history_black.png'],
            red: app.loader.resources[app.assets_url+'history.json'].textures['history_red.png']
        }

        this.scale.set(1.3)
        this.generateRandomConciquency()
        this.updateHistory()

    }

    resize (scale: any) {
        const width = app.screen.width;
        const height = app.screen.height;

        if (app.portrait) {
            this.config = config.portrait;
        } else if (app.landscape) {
            this.config = config.landscape;
        }

        if (typeof(this.rect) != "undefined") {
            app.timeout(() => {
                let interval = app.interval(() => {
                    this.rect.alpha -= .03
                    if (this.rect.alpha <= 0) {
                        this.rect.alpha = 0
                        app.clearTimer(interval)
                    }
                }, 17)
            }, 500)
        }

        this.x = this.config.history_x;
        this.y = this.config.history_y;
    }

    switchWin () {
        this.rect.alpha = 1
        setTimeout(() => {
            let interval = setInterval(() => {
                if (config.service.isAllowedToSwitchOff) {
                    this.rect.alpha -= .03
                    if (this.rect.alpha <= 0) {
                        clearInterval(interval)
                    }
                }
            }, 17)
        }, 500)
    }

    updateHistory () {
        this.removeChildren()
        this.rect = new PIXI.Sprite(this.loaders.rect)
        this.rect.anchor.set(.5, .5)
        this.rect.scale.set(.95, 1)
        this.rect.y = this.rect.y - this.height / 4.5
        this.rect.alpha = 0
        this.addChild(this.rect)
        this.rect_y = 0
        config.service.history.win_bets.forEach(element => {
            let type;
            if ([2, 4, 6, 7, 9, 11].includes(element["number"])) {
                type = this.loaders.blue
            } else if ([1, 3, 5, 8, 10, 12].includes(element["number"])) {
                type = this.loaders.red
            }
            let text = new PIXI.Text(element["number"], {
                fontFamily: "bluntreg",
                fontSize: 20,
                fill: "#FDDAAC",
            });
            text.anchor.set(.5, .5)

            let sprite = new PIXI.Sprite(type)
            sprite.y = this.rect.y + this.rect_y
            sprite.addChild(text)
            this.addChild(sprite)
            this.rect_y += this.rect.height
        });
    }

    generateRandomConciquency () {
        for (let i = 0; i < 6; i++) {
            let randomInt = Math.floor(Math.random() * 12) + 1
            let obj = {}
            obj["number"] = randomInt
            config.service.history.win_bets.push(obj)
        }
    }
}