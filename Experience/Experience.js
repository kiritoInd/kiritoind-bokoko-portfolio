import * as THREE from "three";
import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js"
import Resources from "./utils/Resources.js";
import assets from "./utils/assets.js";
import Camera from "./Camera.js"
import Theme from "./Theme"
import Renderer from "./Renderer.js"
import Preloader from "./Preloader.js"

import World from "./World/World.js";
import controls from "./World/Controls";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer()

        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();
        this.preloader.on("enablecontrols", () => {
            console.log("constols")
            // this.Controls = new controls();

        }

        )
        this.sizes.on("resize", () => {

            this.resize();
        })
        this.time.on("update", () => {

            this.update();
        })

    }

    resize() {
        this.camera.resize()
        this.renderer.resize();
        this.world.resize();


    }
    update() {
        this.preloader.update();
        this.camera.update();

        this.renderer.update();
        this.world.update();

    }

}
