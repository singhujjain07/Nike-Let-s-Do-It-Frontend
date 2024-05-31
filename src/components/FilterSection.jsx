import React from 'react'

const colors = ["Red", "Green","Blue","Black","Brown","Pink"];
const categories = ["Men", "Women","Unisex"]
const sizes = ["UK 2.5","UK 3","UK 3.5","UK 4","UK 4.5","UK 5"];
const sortingOrder = ["Newest", "Price Low - High","Price High-Low"]


const filterOprions = [
    {
        id: "sort",
        title: "Sorting Order",
        options: sortingOrder,
        type: "radio"
    },
    {
        id: "categories",
        title: "SCategories",
        options: categories,
        type: "checkbox"
    },
    {
        id: "colors",
        title: "Colors",
        options: colors,
        type: "checkbox"
    },
    {
        id: "sizes",
        title: "Sizes",
        options: sizes,
        type: "checkbox"
    },
]

function checkValidQuery({queries}){
    return queries.filter((query)=> query!=="").length >0;
}
function convertValidStringQueries(queries){
    let q ="";
    for(let [key,value] of Object.entries(queries)){
        q=q+`${q===""?"": "&"}${key}=${value}`
    } 
}
export function convertStringToQueriesObject(searchParams){
    let selectedQueries= {};
    searchParams.forEach((values,key)=>{
        const queries = values.split(",");
        if(selectedQueries[key]){
            selectedQueries[key].push([...queries]);
        }else{
            selectedQueries[key]=queries;
        }
    })
    return selectedQueries;
}

const FilterSection = () => {
  return (
    // const router = use
    <div className='col-span-2 space-y-6 sticky top-12 h-fit'>
        <div className='border-b pb-4' key="">
            <p className='font-medium mb-4'>title</p>
            <div className='space-y-2'>
                
            </div>
        </div>
    </div>
  )
}

export default FilterSection