import * as THREE from "three"

export const generateUVForBothCovers = (mesh: THREE.Mesh) => {
  const geometry = mesh.geometry

  // Create UV coordinates if they don't exist
  if (!geometry.attributes.uv) {
    const uvs = new Float32Array([
      // Front cover (left half of texture)
      0, 0,
      0.5, 0,
      0.5, 1,
      0, 1,
      // Back cover (right half of texture)
      0.5, 0,
      1, 0,
      1, 1,
      0.5, 1
    ])
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  }
}

export const debugUVMapping = (mesh: THREE.Mesh) => {
  const uvAttr = mesh.geometry.attributes.uv
  if (!uvAttr) {
    console.log("No UV coordinates found")
    return
  }
  console.log("UV coordinates present:", uvAttr.count, "vertices")
}

export const debugAllObjectsUV = (scene: THREE.Object3D) => {
  console.log("=== UV Analysis for Book Objects ===")

  const sketchfabModel = scene.getObjectByName("Sketchfab_model")
  if (sketchfabModel) {
    console.log("✅ Found Sketchfab_model")

    const geode = sketchfabModel.getObjectByName("Geode")
    if (geode) {
      console.log("✅ Found Geode")

      const object2 = geode.getObjectByName("Object_2")
      if (object2) {
        console.log("✅ Found Object_2 (book cover)")
      }
    }
  } else {
    // Fallback for simpler models
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log(`Found mesh: ${child.name}`)
      }
    })
  }
}