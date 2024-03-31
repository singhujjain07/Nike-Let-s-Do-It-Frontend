/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 shoe2.gltf --transform 
Files: shoe2.gltf [86.08MB] > D:\Babadon\WEBD\ThreeJS\Nike-Let's Do It!\shoe2\shoe2-transformed.glb [7.9MB] (91%)
Author: DeezVertz (https://sketchfab.com/DeezVertz)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/nike-air-jordan-1-fbe52211197c4b449f29de5aa4eb0611
Title: Nike Air Jordan 1
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/shoe2-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Shoe_L_MAT_Shoe_L_0.geometry} material={materials.MAT_Shoe_L} position={[-0.052, 0.112, -0.011]} rotation={[Math.PI, -0.132, Math.PI]} scale={0.01} />
      <mesh geometry={nodes.Sole_L_MAT_Sole_L_0.geometry} material={materials.MAT_Sole_L} position={[-0.052, 0.112, -0.011]} rotation={[Math.PI, -0.132, Math.PI]} scale={0.01} />
      <mesh geometry={nodes.Laces_L_MAT_Laces_L_0.geometry} material={materials.MAT_Laces_L} position={[-0.052, 0.112, -0.011]} rotation={[Math.PI, -0.132, Math.PI]} scale={0.01} />
      <mesh geometry={nodes.Laces_R_MAT_Laces_R_0.geometry} material={materials.MAT_Laces_R} position={[0.051, 0.112, 0.002]} rotation={[0, 0.247, 0]} scale={0.01} />
      <mesh geometry={nodes.Shoe_R_MAT_Shoe_R_0.geometry} material={materials.MAT_Shoe_R} position={[0.051, 0.112, 0.002]} rotation={[0, 0.247, 0]} scale={0.01} />
      <mesh geometry={nodes.Sole_R_MAT_Sole_R_0.geometry} material={materials.MAT_Sole_R} position={[0.051, 0.112, 0.002]} rotation={[0, 0.247, 0]} scale={0.01} />
      <mesh geometry={nodes.BoxBottom_BoxBottom_0.geometry} material={materials.BoxBottom} rotation={[0, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.BoxTop_BoxTop_0.geometry} material={materials.BoxTop} rotation={[0, -1.566, 0]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/shoe2-transformed.glb')
