import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;



        this.setFloor();
        this.setCircle();

    }
    setCircle() {
        const geometry = new THREE.CircleGeometry(5, 34);
        const material4 = new THREE.MeshStandardMaterial({ color: 0x4B7BE5 });
        const material5 = new THREE.MeshStandardMaterial({ color: 0x87A2FB });
        const material6 = new THREE.MeshStandardMaterial({ color: 0x7BDDB5 });
        this.circlefirst = new THREE.Mesh(geometry, material4);
        this.circlesecond = new THREE.Mesh(geometry, material5);
        this.circlethird = new THREE.Mesh(geometry, material6);
        this.circlefirst.position.y = -0.32
        this.circlefirst.position.x = 0.2
        this.circlesecond.position.y = -0.31
        this.circlesecond.position.x = 1.5
        this.circlethird.position.y = -0.30


        this.circlefirst.scale.set(0, 0, 0,)
        this.circlesecond.scale.set(0, 0, 0,)
        this.circlethird.scale.set(0, 0, 0,)


        this.circlesecond.rotation.x =
            this.circlefirst.rotation.x =
            this.circlethird.rotation.x =
            -Math.PI / 2;

        this.circlesecond.receiveShadow =
            this.circlefirst.receiveShadow =
            this.circlethird.receiveShadow =
            true;

        this.scene.add(this.circlefirst);
        this.scene.add(this.circlesecond);
        this.scene.add(this.circlethird);


    }
    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xeaeaea
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane)
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.13

        this.plane.receiveShadow = true;


    }

    resize() {

    }
    update() {

    }
}