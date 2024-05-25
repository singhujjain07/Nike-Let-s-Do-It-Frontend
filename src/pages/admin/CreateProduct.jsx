import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { toast } from 'react-toastify'

function ColorSection({gender, onAddImage, updateQuantities, colorIndex }) {
    const [showImageSection, setShowImageSection] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [sizeQuantities, setSizeQuantities] = useState({});
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleImageUpload = () => {
        if (imageUrl.trim() !== '') {
            onAddImage(colorIndex, imageUrl, sizeQuantities);
            setImageUrl('');
            setShowImageSection(false);
        }
    };

    const handleAddSize = () => {
        if (selectedSize && !sizeQuantities[selectedSize]) {
            setSizeQuantities(prevState => ({ ...prevState, [selectedSize]: 0 }));
            setSelectedSizes(prevState => [...prevState, selectedSize]);
        }
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };
    const handleQuantityChange = (size, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        const newQuantity = isNaN(parsedQuantity) ? 0 : parsedQuantity;
        setSizeQuantities(prevState => {
            const updatedState = { ...prevState, [size]: newQuantity };
            return updatedState; // Return the updated state
        });
    };
    useEffect(() => {
        updateQuantities(colorIndex, sizeQuantities); // Call updateQuantities with the updated state
    }, [sizeQuantities])
    const availableSizesWomen = ['UK 2.5', 'UK 3', 'UK 3.5', 'UK 4', 'UK 4.5', 'UK 5', 'UK 5.5', 'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5'].filter(size => !selectedSizes.includes(size));
    const availableSizesMen = ['UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 11.5', 'UK 12'].filter(size => !selectedSizes.includes(size));

    return (
        <div className="mb-4">
            <div className="mb-4">
                <label htmlFor="sizeSelect" className="block text-sm font-medium text-gray-700">Select Size</label>
                <select id="sizeSelect" value={selectedSize} onChange={handleSizeChange} className="mt-1 block  pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm max-sm:w-full text-center">
                    <option value="">-- Select Size --</option>
                    {(gender=="female" ? availableSizesWomen : availableSizesMen).map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                    ))}
                </select>
                <button type="button" onClick={handleAddSize} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 max-sm:w-full text-center">
                    Add Size
                </button>
            </div>
            <button type="button" onClick={() => setShowImageSection(!showImageSection)} className="bg-coral-red hover:bg-[#de5246] text-white font-bold py-2 px-4 rounded mb-2 max-sm:w-full text-center">
                Add Image
            </button>
            {showImageSection && (
                <div className="mb-4 ">
                    <input onKeyDown={(e) => { if (e.key === 'Enter') { handleImageUpload(); } }} type="text" placeholder="Enter Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mb-2 px-4 mr-4 py-2 border border-gray-300 rounded max-sm:w-full" />
                    <button type="button" onClick={handleImageUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 h-10 px-4 rounded max-sm:w-full">
                        Upload Image
                    </button>
                </div>
            )}
            <div className="grid xl:grid-cols-12  md:grid-cols-8 sm:grid-cols-6 grid-cols-4  gap-4">
                {Object.keys(sizeQuantities).map((size, index) => (
                    <div key={index} className="sm:col-span-2 max-[500px]:col-span-2 col-span-2 items-center mb-2">
                        <span className="xl:mr-2 mr-1">{size}:</span>
                        <input type="number" min={0} value={sizeQuantities[size]} onChange={(e) => handleQuantityChange(size, e.target.value)} className="border border-gray-300 rounded-md w-20 px-2 py-1" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ColorForm({ onAddColor }) {
    const [colorName, setColorName] = useState('');
    const handleSubmit = () => {
        if (colorName.trim() !== '') {
            onAddColor(colorName);
            setColorName('');
        }
    };

    return (
        // <form id="color_form" onSubmit={handleSubmit} className="mb-4 flex max-sm:flex-col gap-x-4">
        <div className="mb-4 flex max-sm:flex-col gap-x-4">
            <input onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit(); } }} type="text" placeholder="Enter Color Name" value={colorName} onChange={(e) => setColorName(e.target.value)} className="mb-2 px-4 py-2 border border-gray-300 rounded" />
            <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-10 px-4 rounded  leading-6">
                Add Color
            </button>
        </div>
        // </form>
    );
}

function ImageSection({ images, onDeleteImage }) {
    const handleDeleteImage = (index) => {
        onDeleteImage(index);
    };

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">Images</h3>
            <div className="flex flex-wrap">
                {images.map((imageUrl, index) => (
                    <div key={index} className="sm:w-1/4 w-1/2 p-2 relative">
                        <img src={imageUrl} alt={`Image ${index}`} className="w-full h-auto rounded" />
                        {/* <button onClick={() => handleDeleteImage(index)} className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded-full">X</button> */}
                        <img src='../logo/remove.png' onClick={() => handleDeleteImage(index)} className="absolute top-0 right-0 w-5 cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
}
const CreateProduct = () => {
    const [colors, setColors] = useState([]);
    const [model, setModel] = useState("");
    const [gender, setGender] = useState("male");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("USD")

    const handleAddColorSection = (colorName) => {
        setColors([...colors, { name: colorName, images: [] }]);
    };
    const handleAddImage = (colorIndex, imageUrl, sizeQuantities) => {
        const updatedColors = [...colors];
        updatedColors[colorIndex].images.push(imageUrl);
        updatedColors[colorIndex].sizes = sizeQuantities;
        setColors(updatedColors);
    };
    const updateQuantities = (colorIndex, sizeQuantities) => {
        const updatedColors = [...colors];
        updatedColors[colorIndex].sizes = sizeQuantities;
        setColors(updatedColors);
    }
    const handleDeleteImage = (colorIndex, imageIndex) => {
        const updatedColors = [...colors];
        updatedColors[colorIndex].images.splice(imageIndex, 1);
        setColors(updatedColors);
    };
    // reset form
    const handleReset = () => {
        setModel('');
        setDescription('');
        setPrice(0);
        setCurrency("USD");
        setColors([]);
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (!price) {
                toast.error('Please fill price field!')
                return;
            }
            const { data } = await axios.post('/api/v1/products/create-product', { model, gender, description, price, colors });
            console.log(data)
            if (data?.success) {
                toast.success('Product Created Successfully')
                handleReset();
                // navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong');
        }
    }
    return (
        <div className="flex h-screen">
            <Sidebar selectedMenu={2} />
            <div className="flex-1 p-7 overflow-y-auto">
                <h1 className="text-2xl font-semibold ">
                    Create Product
                </h1>
                <form id="outer_form"  >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Model Information
                            </h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                                <div className="col-span-2">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Model name
                                    </label>
                                    <div className="mt-2">
                                        <input value={model} onChange={(e) => setModel(e.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Gender
                                    </label>
                                    <div className="mt-2">
                                        <select value={gender} onChange={(e) => setGender(e.target.value)} id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="unisex">Unisex</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        Write a few sentences about the product.
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <div className="lg:w-80">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">{currency == "USD" ? "$" : currency == "EUR" ? "€" : "₹"}</span>
                                            </div>
                                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={0.00} />
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                                <label htmlFor="currency" className="sr-only">Currency</label>
                                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                                    <option value="USD">USD</option>
                                                    <option value="INR">INR</option>
                                                    <option value="EUR">EUR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 py-8 px-4">
                        <div className="max-w-3xl mx-auto">
                            <div>
                                <ColorForm onAddColor={handleAddColorSection} />
                            </div>
                            <div>
                                {colors.map((color, index) => (
                                    <div key={index}>
                                        <h2 className="text-lg font-semibold leading-7 text-gray-900">{index + 1 + ")."} {color.name}</h2>
                                        <ColorSection gender={gender} onAddImage={handleAddImage} updateQuantities={updateQuantities} colorIndex={index} />
                                        <ImageSection images={color.images} onDeleteImage={(imageIndex) => handleDeleteImage(index, imageIndex)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="button" onClick={handleCreate} className="rounded-md bg-coral-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#de5246] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </form>
                {/* <div className="bg-gray-100 py-8 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div>
                            <ColorForm onAddColor={handleAddColorSection} />
                        </div>
                        <div>
                            {colors.map((color, index) => (
                                <div key={index}>
                                    <h2 className="text-lg font-semibold leading-7 text-gray-900">{index + 1 + ")."} {color.name}</h2>
                                    <ColorSection onAddImage={handleAddImage} updateQuantities={updateQuantities} colorIndex={index} />
                                    <ImageSection images={color.images} onDeleteImage={(imageIndex) => handleDeleteImage(index, imageIndex)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
export default CreateProduct;