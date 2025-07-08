import React from 'react'

const CustomerImage = ({image}) => {
 //sellers image
 let imageSrc = "https://cdn3.vectorstock.com/i/1000x1000/98/42/customer-getting-measure-by-tailor-symbol-vector-4799842.jpg";

  return (
    <div>
        <div>
        <img
            className="w-6 h-6 rounded-full object-cover"
            src={image ? image : imageSrc}
            alt="customer_image"
        />

        </div>
        

    </div>
  )
}

export default CustomerImage