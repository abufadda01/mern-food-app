import React, { useState } from 'react'
import "./add-item.css"
import { assets } from '../../assets/assets'
import { axiosObj } from '../../utils/axios'
import {toast } from 'react-toastify';


const AddItem = () => {

  const [image , setImage] = useState("")

  const [data , setData] = useState({
    name : "" ,
    description : "" ,
    price : "" ,
    category : "Salad"
  })



  const handleChange = (e) => {
    setData({...data , [e.target.name] : e.target.value})
  }



  const handleSubmit = async (e) => {

    e.preventDefault()
    
    if(!image || !data.price || data.price < 0 || !data.category || !data.name || !data.description){
      return
    }

    try {

      const formData = new FormData()
      formData.append("name" , data.name)
      formData.append("category" , data.category)
      formData.append("description" , data.description)
      formData.append("price" , Number(data.price))
      formData.append("image" , image)

      const response = await axiosObj.post("/food" , formData)

      setData({description : "" , name : "" , price : "" , category : "Salad"})
      setImage("")

      toast.success("new product add successfully")

    } catch (error) {
      // still new error handling from backend
      toast.success(error.response.data.msg)
    }
  }




  return (

    <div className='addItem'>

      <form onSubmit={handleSubmit} className='flex-col'>
      
        <div className='add-img-upload flex-col'>

          <p>Upload product image</p>
          
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>

          <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id='image' required />

        </div>

        <div className='add-product-name flex-col'>

          <p>product name</p>

          <input value={data.name} onChange={handleChange} type="text"  id='name' name='name' placeholder='enter product name' />

        </div>

        <div className='add-product-description flex-col'>

          <p>product description</p>

          <textarea value={data.description} onChange={handleChange} name='description' rows={6} placeholder='enter product description'></textarea>

        </div>

        <div className='add-category-price'>

          <div className='add-category flex-col'>

              <p>product category</p>

              <select value={data.category} onChange={handleChange} name="category" id="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Veg">Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>

          </div>

          <div className='add-price flex-col'>

            <p>product price</p>
            <input min={0} max={1000} value={data.price} onChange={handleChange} type="Number" name='price' placeholder='pirce in $USD' />
          
          </div>

        </div>

        <button type='submit' className='add-btn'>Add Product</button>

      </form>

    </div>

  )
}


export default AddItem