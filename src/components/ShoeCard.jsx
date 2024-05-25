import { useEffect, useState } from 'react';
import ShoeSection from '../pages/sections/ShoeSection'
import { useInView } from 'react-intersection-observer'; // Import useInView hook

const ShoeCard = ({ imgURL, bigShoeImg, changeBigShoeImage }) => {
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
    const handleClick = () => {
        if (bigShoeImg != imgURL) {
            changeBigShoeImage(imgURL)
        }
    }
    return (
        <div 
            className={`border-2 rounded-xl 
            ${bigShoeImg === imgURL ? 'border-coral-red' : 'border-transparent'}
            cursor-pointer max-sm:flex-1`
            }
            onClick={handleClick}
        >
            <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 w-40 h-40 rounded-xl max-sm:p-4">
                <ShoeSection ele={imgURL} />
            </div>
        </div>

    )
}

export default ShoeCard