import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';



export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.time;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
                this.rectLight2 = child;

            }
        })

        this.circlefirst = this.experience.world.floor.circlefirst;
        this.circlesecond = this.experience.world.floor.circlesecond;
        this.circlethird = this.experience.world.floor.circlethird;
        GSAP.registerPlugin(ScrollTrigger);
        document.querySelector(".page").style.overflow = "visible"
        document.querySelector("body").style.overflow = "visible"

        this.setSmoothScroll();
        this.setScrollTrigger();
    }
    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.19,
            disableRaf: true
        });


        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });


        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });


        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            });

        });
        return asscroll;
    }
    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            //desktop

            "(min-width: 969px)": () => {
                this.room.scale.set(0.26, 0.26, 0.26)
                this.rectLight.width = 0.3
                this.rectLight.height = 0.7
                this.rectLight2.width = 0.3
                this.rectLight2.height = 0.9

                this.firstMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".first-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0015
                    },
                });

                //second sec

                this.secondMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".second-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return -1
                    },
                    z: () => {
                        return this.sizes.height * 0.0032;
                    }
                }, "same"
                );
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same"
                );
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.5 * 1.7,
                    height: 0.5 * 1.7
                }, "same"
                );
                this.secondMoveTimeline.to(this.rectLight2, {
                    width: 0.5 * 1.7,
                    height: 0.5 * 1.7
                }, "same"
                );


                //third section
                this.thirdMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".third-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: -0.7,
                    x: -3.1,
                    z: 4
                });


            },
            //mobile
            "(max-width: 968px)": () => {

                this.room.scale.set(0.19, 0.19, 0.19);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.rectLight2.width = 0.3;
                this.rectLight2.height = 0.4;




                this.firstMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".first-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                })






                this.secondMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".second-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                }, "same"
                )
                    .to(this.rectLight, {
                        width: 0.3 * 3.4,
                        height: 0.4 * 3.4,
                    }, "same"
                    )
                    .to(this.room.position, {
                        x: 1.9
                    }, "same"
                    );
                //third section



                this.thirdMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".third-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.9,
                    y: 0.9,
                    z: 0.9,
                }, "same"
                ).to(this.rectLight, {
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                }, "same"
                )
                    .to(this.room.position, {
                        x: 1.4,

                        z: -3.5,

                    }, "same"
                    );
            },

            all: () => {
                // circle
                this.firstMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".first-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circlefirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })


                //second sec

                this.secondMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".second-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circlesecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })



                //third section
                this.thirdMoveTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".third-move",

                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circlethird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })




                /**mini platform animation */
                this.secondPartTimeline = new GSAP.timeline({

                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",

                    },
                })

                this.room.children.forEach(child => {
                    if (child.name === "minifloor") {
                        this.first = GSAP.to(child.position, {
                            x: -1.67832,
                            z: 4.49766,
                            ease: "back.out(2)",
                            duration: 0.3
                        });
                    }
                    if (child.name === "mailbox") {
                        this.second = GSAP.to(child.scale, {
                            x: 0.325,
                            y: 0.325,
                            z: 0.325,
                            ease: "back.out(2)",

                            duration: 0.3,
                        })
                    }
                    if (child.name === "letters") {
                        this.third = GSAP.to(child.scale, {
                            x: 0.188,
                            y: 0.188,
                            z: 0.188,
                            ease: "back.out(2)",

                            duration: 0.3,
                        })
                    }
                    if (child.name === "cones") {
                        this.fourth = GSAP.to(child.scale, {
                            x: 0.13,
                            y: 0.13,
                            z: 0.13,
                            ease: "back.out(2)",

                            duration: 0.3,
                        })
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth);

            }




        });



    }

    resize() {

    }

    update() {

    }
}







