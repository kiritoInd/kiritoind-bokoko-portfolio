import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLight } from "three";
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.actualRoom.position.x = 0
        this.actualRoom.position.z = 0
        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }
        this.setModel();
        this.onMouseMove();
    }
    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }
            // console.log(child);

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen
                });
            }
            if (child.name === "minifloor") {
                child.position.x = -0.253664;
                child.position.z = 3.12049;
            }
            // if (child.name === "mailbox" || child.name === "letters" || child.name === "cones") {
            //     child.scale.set(0, 0, 0)
            // }
            child.scale.set(0, 0, 0);
            if (child.name === "Cube") {
                // child.scale.set(1, 1, 1);
                child.position.set(0, 0.1, 0)
                child.rotation.y = Math.PI / 4
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });
        const width = 0.2;
        const height = 0.7;
        const intensity = 0.5;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(4.49474, 0.8987, 0.056918);
        rectLight.rotation.x = -Math.PI / 2

        // this.actualRoom.add(rectLight)


        const width1 = 0.3;
        const height1 = 0.9;
        const intensity1 = 1;

        const rectLight2 = new THREE.RectAreaLight(0xffffff, intensity1, width1, height1);
        rectLight2.position.set(-0.92, 3.46806, -4.59353);
        rectLight2.rotation.y = -(Math.PI / 3 + 1.37)

        // const rectLightHelper = new RectAreaLightHelper(rectLight2);
        // rectLight.add(rectLightHelper);


        this.actualRoom.add(rectLight2)

        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.26, 0.26, 0.26)


        // this.actualRoom.position.y = 0.1

        this.roomChildren['rectLight'] = rectLight;
        this.roomChildren['rectLight2'] = rectLight2;


    }
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {

            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }
    resize() {

    }
    update() {

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }
}