import * as THREE from 'three'
import Experience from "./Experience";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


export default class Text {
    constructor(customText) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.fontLoader = new FontLoader()

        // axes helper
        this.axesHelper = new THREE.AxesHelper()

        this.setText(customText)

        if (this.config.debug) {
            const folder = this.debug.addFolder('text')
            folder.open()
            folder.add(this.camera.modes.debug.instance.position, 'x').min(-10).max(10).step(1)
            folder.add(this.camera.modes.debug.instance.position, 'y').min(-10).max(10).step(1)
            folder.add(this.camera.modes.debug.instance.position, 'z').min(2).max(20).step(1)
            console.log(this.camera);
        }
    }

    setText(customText) {
        this.fontLoader.load(
            '/assets/fonts/helvetiker_regular.typeface.json',
            (font) => {
                const textGeometry = new TextGeometry(
                    customText,
                    {
                        font: font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 5
                    }
                )
                const textMaterial = new THREE.MeshBasicMaterial({wireframe: true})
                // const textMaterial = new THREE.MeshNormalMaterial()
                const text = new THREE.Mesh(textGeometry, textMaterial)

                // textGeometry.computeBoundingBox()
                // textGeometry.translate(
                //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
                //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
                //     - (textGeometry.boundingBox.max.z - 0.3) * 0.5,
                // )

                textGeometry.center()

                this.camera.instance.lookAt(text.position)
                this.scene.add(text)


            }
        )

        this.scene.add(this.axesHelper)

    }
}