import Experience from "./Experience.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;


        this.creatperspectiveCamera();
        this.creatOrthographicCamera();
        this.setOrbitControl();

    }
    creatperspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, this.sizes.aspect,
            0.1,
            1000
        )
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x = 29
        this.perspectiveCamera.position.y = 16
        this.perspectiveCamera.position.z = 15
    }

    creatOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        )
        this.orthographicCamera.position.y = 2.3;
        this.orthographicCamera.position.z = 4;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera)
        // this.orthographicCamera.lookAt(new THREE.Vector3(0, 0, 0));


        // this.helper = new THREE.CameraHelper(this.orthographicCamera)
        // this.scene.add(this.helper)
        // const size = 20;
        // const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);

    }
    setOrbitControl() {
        this.control = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.control.enableDamping = true;
        this.control.enableZoom = false;
    }

    resize() {
        //update perspective camera resize
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix();

        //UPDATE orthographic camera on resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();

    }

    update() {
        this.control.update();

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();

        // this.helper.position.copy(this.orthographicCamera.position)
        // this.helper.rotation.copy(this.orthographicCamera.rotation)

    }
}


