import app from '../index';
import config from './config';
export default class InterfaceButtons extends PIXI.Container {
    private closeContainer: any;
    private soundContainer: any;
    private infoContainer: any;
    private music: any;
    private sound: any;
    private close: any;
    private info: any;
    private helpPanel: any;
    private hover: any;
    private stripe: any;
    private logo: any;
    private art: any;
    private table: any;

    private soundState: boolean;

    private loaders: any;

    constructor(helpPanel?) {
        super()
        this.soundState = true;
        this.loaders = {
            // art: app.loader.resources[app.assets_url+'artboard.json'].textures['Artboard4.png'],
            // stripes: app.loader.resources[app.assets_url+'mainarea.json'].textures['bg_stripes.png'],
            // logo: app.loader.resources[app.assets_url+'mainarea.json'].textures['logo_binom.png'],
            soundOn: app.loader.resources[app.assets_url+'mainarea.json'].textures['sound_fx_on.png'],
            soundOff: app.loader.resources[app.assets_url+'mainarea.json'].textures['sound_fx_off.png'],
            hover: app.loader.resources[app.assets_url+'mainarea.json'].textures['close_hover.png'],
            soundOnHover: app.loader.resources[app.assets_url+'mainarea.json'].textures['sound_fx_on_hover.png'],
            soundOffHover: app.loader.resources[app.assets_url+'mainarea.json'].textures['sound_fx_off_hover.png'],
            infoHover: app.loader.resources[app.assets_url+'info.json'].textures['help_hover.png'],
        }

        this.hover = new PIXI.Sprite(this.loaders.hover)
        this.table = app.scene.table

        this.soundContainer = new PIXI.Container()
        this.closeContainer = new PIXI.Container()
        this.infoContainer = new PIXI.Container()

        // this.helpPanel = new app.gameObjects.HelpPanel()

        this.sound = new PIXI.Sprite(this.loaders.soundOn)
        this.sound.interactive = true;
        this.sound.on("pointerover", (event) => {
            if (this.soundState) {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOnHover))
            } else {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOffHover))
            }
        })
        this.sound.on("pointerout", (event) => {
            this.sound.removeChildren()
            if (this.soundState) {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOn))
            } else {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOff))
            }
        })
        this.sound.on("pointerup", (event) => {
            this.soundState = !this.soundState
            if (this.soundState) {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOnHover))
            } else {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOffHover))
            }
        })
        this.sound.on("tap", (event) => {
            if (this.soundState) {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOnHover))
            } else {
                this.sound.addChild(new PIXI.Sprite(this.loaders.soundOffHover))
            }
            setTimeout(() => {
                this.sound.removeChildren()
                if (this.soundState) {
                    this.sound.addChild(new PIXI.Sprite(this.loaders.soundOn))
                } else {
                    this.sound.addChild(new PIXI.Sprite(this.loaders.soundOff))
                }
            }, 200)
        })
        this.soundContainer.addChild(this.sound)

        this.close = new PIXI.Sprite(app.loader.resources[app.assets_url+'mainarea.json'].textures['close.png'])
        this.close.interactive = true;
        this.close.on("pointerover", onButtonOver.bind(this, this.close, this.loaders.hover))
        this.close.on("pointerout", onButtonOut.bind(this, this.close))
        this.close.on("pointerup", onButtonOver.bind(this, this.close, this.loaders.hover))
        this.close.on("pointerdown", onButtonOut.bind(this, this.close, () => {
            app.request({action: "logout"})
        }))
        this.close.on("tap", onButtonTap.bind(this, this.close, () => {
            app.request({action: "logout"})
        }))
        this.closeContainer.addChild(this.close)

        this.info = new PIXI.Sprite(app.loader.resources[app.assets_url+'info.json'].textures['help.png'])
        this.info.interactive = true;
        this.info.on("pointerover", onButtonOver.bind(this, this.info, this.loaders.infoHover))
        this.info.on("pointerout", onButtonOut.bind(this, this.info))
        this.info.on("pointerup", onButtonOver.bind(this, this.info, this.loaders.infoHover))
        this.info.on("pointerdown", onButtonOut.bind(this, this.info, () => {
            // this.addChild(this.helpPanel)
            helpPanel.visible = true
        }))
        this.info.on("tap", onButtonTap.bind(this, this.info, () => {
            // this.addChild(this.helpPanel)
            this.helpPanel.visible = true
        }))

        this.infoContainer.addChild(this.info)

        function onButtonOver(event, sprite) {
            event.addChild(new PIXI.Sprite(sprite))
        }

        function onButtonTap(event, func?) {
            setTimeout(() => {
                event.removeChildren()
            }, 200)
            if (typeof(func) == "function") {
                func()
            }
        }

        function onButtonOut(event, func?) {
            event.removeChildren()
            if (typeof(func) == "function") {
                func()
            }
        }
        function onButtonClick(event) {
            event.removeChildren()
        }

        this.addChild(this.soundContainer, this.closeContainer, this.infoContainer)
        
        app.interval(() => {
            config.service.isAllawedToInteractive = !helpPanel.visible
            this.setInteractive(!helpPanel.visible)
        })
    }

    public setInteractive(bool) {
        // this.sound.interactive = bool
        this.info.interactive = bool
        this.close.interactive = bool
    }

    public resize (scale: any) {
        if (app.portrait) {
            this.y = app.scene.balance_panel.height * 1.15
            this.sound.scale.set(scale * 1.15)
            this.close.scale.set(scale * 1.15)
            this.info.scale.set(scale * 1.15)
        }
        if (app.landscape) {
            this.y = app.scene.balance_panel.height * 1.15
            this.sound.scale.set(scale * 1.15)
            this.close.scale.set(scale * 1.15)
            this.info.scale.set(scale * 1.15)
        }

        this.sound.x = this.sound.width / 1.5
        this.close.x = app.screen.width - this.close.width * 0.75
        this.info.x = app.screen.width - this.info.width * 2.5

        // this.helpPanel.resize(scale)
    }
}