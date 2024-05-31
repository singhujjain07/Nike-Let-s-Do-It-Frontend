import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas} from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'; // Import useInView hook
import Shoe3 from '../../models/Shoe3'

const Vomero17 = () => {
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
                <Stage environment="sunset" intensity={3} >
                    <Shoe3 />
                </Stage>
                <OrbitControls enableZoom={false}
                    autoRotate={isInView}
                />
            </Suspense>
        </Canvas>

    )
}

export default Vomero17