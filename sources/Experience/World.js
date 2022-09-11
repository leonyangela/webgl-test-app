import * as THREE from 'three'
import Experience from './Experience.js'
import Text from './Text.js'

export default class World {
    constructor(_options) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (_group) => {
            if (_group.name === 'base') {
                this.setWorld()
            }
        })

        this.texts = new Text('Hi, I\'m Leoni Angela')

    }

    setWorld() {
        this.resources.items.lennaTexture.encoding = THREE.sRGBEncoding
        
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
        )
        // this.scene.add(cube)        
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}