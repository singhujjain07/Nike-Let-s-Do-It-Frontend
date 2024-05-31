import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas} from '@react-three/fiber'
import { Frustum } from 'three'
import AirJordan1 from '../../models/AirJordan1' //hero1
import Akatsuki from '../../models/Akatsuki' //hero1
import Shoe2 from '../../models/Shoe2'  //hero2
import Shoe3 from '../../models/Shoe3'  //avg
import Shoe5 from '../../models/Shoe5'  //worst
import Shoe6 from '../../models/Shoe6'  //worst
import Shoe7 from '../../models/Shoe7'  //avg

import React, { Suspense, useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'; // Import useInView hook


const AirJordan = ({ ele }) => {
    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5, // Adjust as needed
    });
    // useEffect(()=>{
    //     console.log(isInView)
    // },[isInView])
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
                <Stage environment="city" intensity={5}>
                    <AirJordan1 />
                </Stage>
                <OrbitControls enableZoom={false}
                    autoRotate={isInView}
                />
            </Suspense>
        </Canvas>

    )
}

export default AirJordan