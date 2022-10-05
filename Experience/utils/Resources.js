import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import * as THREE from "three";
import Experience from "../Experience";


//this setup makes our life easier as now we onlyy have two assets but
//this wayy it makes it easier to add more assets without causing any problems 
export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        this.assets = assets;


        this.items = {}; //object that will hold itmes
        this.queue = this.assets.length // how many itmen in queue to be loaded
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }
    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/")
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file)
                })
            } else if (asset.type === "vedioTexture") {
                this.video = {}
                this.videoTexture = {}

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].PlaysInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play()

                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]

                );

                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter
                this.videoTexture[asset.name].generateMipmaps = false
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name])
            }


        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;


        if (this.loaded === this.queue) {

            this.emit("ready");

        }
    }
}