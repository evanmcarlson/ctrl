// This is a component file. You can use this file to define a custom component for your project.
// This component will appear as a custom component in the editor.

import * as ecs from '@8thwall/ecs'  // This is how you access the ecs library.

ecs.registerComponent({
  name: 'video',
  // schema: {
  // },
  // schemaDefaults: {
  // },
  // data: {
  // },
  add: (world, component) => {
    const object3D = world.three.entityToObject.get(component.eid)

    const video = document.getElementById( 'videoEl' );
    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = THREE.SRGBColorSpace
    video.load()

    const found = (event) => {
      // console.log('Image found: ', event.data.name)
      video.muted = true
      video.play()
      
      object3D.material.map = texture
      object3D.material.needsUpdate = true
    }

    const lost = (event) => {
      video.pause()
      video.currentTime = 0
    }

    world.events.addListener(world.events.globalId, ecs.events.REALITY_IMAGE_FOUND, found)
    world.events.addListener(world.events.globalId, ecs.events.REALITY_IMAGE_LOST, lost)
  },
  // tick: (world, component) => {
  // },
  // remove: (world, component) => {
  // },
  // stateMachine: ({world, eid, schemaAttribute, dataAttribute}) => {
  //   ecs.defineState('default').initial()
  // },
})
