import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Airforce from '../../models/Airforce'

import React, { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'; // Import useInView hook


const AirForce1 = ({ ele }) => {
    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    useEffect(() => {
        if (inView) {
            setIsInView(true);
        } else {
            setIsInView(false);
        }
    }, [inView]);
    return (

        <Canvas ref={ref} resize={{ scroll: false }} frameloop="demand"
        style={{ backgroundColor:"#FF6452"}}
        >
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.3}>
                    <Airforce />
                </Stage>
                <OrbitControls enableZoom={false}
                    autoRotate={isInView}
                />
            </Suspense>
        </Canvas>

    )
}

export default AirForce1