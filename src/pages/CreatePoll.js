import React, { useState } from 'react';

export default function CreatePoll(){
  const [title, setTitle] = useState('')
  const [restaurants, setRestaurants] = useState([''])

  const addAnswer = () => {
      setRestaurants([
          ...restaurants,
          ''
      ])
  }

  const removeRestaurant = (index) => {
    const newRestaurants = restaurants.filter((restaurant, restaurantIndex) => {
        return restaurantIndex !== index
    })

    setRestaurants(newRestaurants)
}

const onRestaurantChange = (index, value) => {
    const newRestaurants = restaurants.map((restaurant, restaurantIndex) => {
        if (restaurantIndex === index) {
            return value
        }

        return restaurant
    })

    setRestaurants(newRestaurants)
}

  return (
    <div className="container mx-auto my-16 md:my-32 px-6 ">
    <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
        <header className="border-b border-gray-400 px-8 py-5 text-gray-800">
          Create poll
        </header>

        <div className="py-5 px-8">
            <div className="mb-6">
                <label htmlFor="title" className="text-sm mb-2 inline-block">Insira a data da votação</label>
                <input onChange={(event) => setTitle(event.target.value)} value={title}  name='title' id='title' type="text" className='w-full py-2 border border-gray-400 rounded px-4' />
            </div>

            <div className="mb-3">
              <label className="text-sm mb-2 inline-block">Insira os restaurantes</label>
              {restaurants.map((restaurant, index) => (
                  <div className="w-full flex items-center mb-2">
                  <input onChange={(event) => onRestaurantChange(index, event.target.value)} key={index} type="text" value={restaurant} className='w-full py-2 border border-gray-400 rounded px-4' />
                  <button onClick={() => removeRestaurant(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>Remove</button>
              </div>
              ))}
            </div>

            <button onClick={addAnswer} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Inserir Restaurante</button>

            <div className="mt-12 mb-6 text-center">
              <button className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Criar Votação</button>
            </div>
        </div>
    </div>
 </div>
  )
}