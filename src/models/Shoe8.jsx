/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 shoe8.gltf --transform 
Files: shoe8.gltf [23.08MB] > D:\Babadon\WEBD\ThreeJS\Nike-Let's Do It!\shoes\shoe8\shoe8-transformed.glb [366.12KB] (98%)
Author: matousekfoto (https://sketchfab.com/matousekfoto)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/air-force-348c77822bff4de3b6df59839b2fd201
Title: Air Force
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/shoe8-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Model_material0_0.geometry} material={materials.material0} position={[-0.006, -0.029, 0.002]} rotation={[-1.808, 0.29, 0.063]} scale={0.04} />
    </group>
  )
}

useGLTF.preload('/shoe8-transformed.glb')