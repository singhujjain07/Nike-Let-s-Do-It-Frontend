/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 shoe5.gltf --transform 
Files: shoe5.gltf [3MB] > D:\Babadon\WEBD\ThreeJS\Nike-Let's Do It!\shoe5\shoe5-transformed.glb [1.26MB] (58%)
Author: Qlone (https://sketchfab.com/Qlone)
License: CC-BY-ND-4.0 (http://creativecommons.org/licenses/by-nd/4.0/)
Source: https://sketchfab.com/3d-models/nike-pegasus-33-6ae8945bf1004c70801effbc31ce3bc0
Title: Nike Pegasus 33
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/shoe5-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.material0} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/shoe5-transformed.glb')