import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from 'gsap'
import convert from "./utils/convertDivsToSpans.js"
export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.time;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.device = this.sizes.device;
        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })
        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }
    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".char-main-title"))
        convert(document.querySelector(".char-main-description"))
        convert(document.querySelector(".char-two-subheading"))
        convert(document.querySelector(".char-two-description"))
        this.room = this.experience.world.room.actualRoom;
        this.light = this.experience.world.room.rectLight;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.plane = this.experience.world.floor.plane

        console.log(this.plane)
        console.log(this.roomChildren)
    }
    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden")
                }

            })
            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    ease: "back.out(2.5)",
                    duration: 0.7,

                }).to(this.room.position, {
                    x: -0.8,
                    ease: 'power1.out',
                    duration: 0.7,

                });
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    ease: "back.out(2.5)",
                    duration: 0.7,

                }).to(this.room.position, {
                    z: -0.5,
                    ease: 'power1.out',
                    duration: 0.7,

                });
            } this.timeline.to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.05,
                ease: "back.out(1.7)",
                onComplete: resolve,
            })
                .to(".arrowSVGwrapper", {
                    opacity: 1,
                }, "same")
                .to(".toggle-bar", {
                    opacity: 1,
                    onComplete: resolve,

                }, "same")
        })

    }
    secondIntro() {
        return new Promise((resolve) => {
            this.secondtimeline = new GSAP.timeline();

            this.secondtimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }, "fadeout")
                .to(".arrowSVGwrapper", {
                    opacity: 0,
                }, "fadeout")
                .to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',

                }, "same").to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 4
                }, "same").to(this.roomChildren.cube.scale, {
                    x: 3.9,
                    y: 3.9,
                    z: 3.9,

                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 3,
                }, "same").to(this.roomChildren.cube.position, {
                    x: 0.200463,
                    y: 3.80679,
                    z: -0.215931,
                }, "same")
                .set(this.roomChildren.body.scale, {
                    x: 1.667,
                    y: 1.087,
                    z: 1.089,

                }).to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.5,
                }, "font1").to(".char-main-title .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                }, "font1").to(".char-main-description .animatedis", {
                    yPercent: -100,
                    stagger: 0.02,
                    ease: "back.out(1.7)",

                }, "font1").to(".char-two-subheading .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                }, "font1").to(".char-two-description .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.7)",

                }, "font1").to(this.roomChildren.sofa.scale, {
                    x: 1,
                    y: 1,
                    z: 1,

                    duration: 0.5,
                }, "sofa").to(this.roomChildren.selves.scale, {
                    x: 1,
                    y: 1,
                    z: 1,

                    duration: 0.5,
                }, "sofa").to(this.roomChildren.clock.scale, {
                    x: 1,
                    y: 1,
                    z: 1,

                    duration: 0.5,
                }, "sofa")
                .to(this.roomChildren.desks.scale, {
                    x: 1,
                    y: 1,
                    z: 1,

                    duration: 0.5,
                }, "desk")
                .to(this.roomChildren.tabletops.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "desk")
                .to(this.roomChildren.flooritems.scale, {
                    x: 1,
                    y: 1,
                    z: 1,

                    duration: 0.5,
                }, ">-0.1")
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.3,
                }, ">-0.1")
                .to(this.roomChildren.minifloor.scale, {
                    x: 1.265,
                    z: 0.930,
                    y: 0.092,
                    duration: 0.1,
                })
                .to(this.roomChildren.chair.scale, {
                    x: 1,
                    z: 1,
                    y: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, "chair").to(this.roomChildren.chair.rotation, {
                    y: 4 * Math.PI + Math.PI / 4,
                    ease: "power2.out",
                    duration: 0.5,
                    onComplete: resolve,
                }, "chair").to(".arrowSVGwrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });


        });
    }
    onScroll(e) {
        if (e.deltaY > 0) {

            this.removeEventListener();

            this.playSecondIntro();

        }
    }
    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let differnce = this.initialY - currentY;
        if (differnce > 0) {
            console.log("swipped up");
            this.removeEventListener();
            this.playSecondIntro();
        }
        this.initialY = null;
    }
    removeEventListener() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        
        await this.secondIntro();
        this.scaleFlag = false;
        this.mobile();
        this.emit("enablecontrols")
        

    }
    mobile(){
        if(this.device === "mobile"){
        this.emit("enablecontrols")
        console.log("mobile")
        }
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-0.8, 0, 0);
            
        } else {
            this.room.position.set(0, 0, -0.5);
        }
    }
    scale() {
        if (this.device === "desktop") {
            this.room.scale.set(0.26, 0.26, 0.26);
        } else {
            this.room.scale.set(0.19, 0.19, 0.19);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }
        if (this.scaleflag) {
            this.scale();
        }

    }
}
