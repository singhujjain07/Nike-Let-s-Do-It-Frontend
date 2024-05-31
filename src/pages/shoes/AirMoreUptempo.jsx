import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas} from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'; // Import useInView hook
import Shoe10 from '../../models/Shoe10'

const AirMoreUptempo = () => {
    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5, // Adjust as needed
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
                <Stage environment="warehouse"  intensity={5000}>
                    <Shoe10 />
                </Stage>
                <OrbitControls enableZoom={false}
                    autoRotate={isInView}
                />
            </Suspense>
        </Canvas>

    )
}

export default AirMoreUptempo