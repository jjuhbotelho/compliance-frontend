import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react'


export default function CreatePoll(){
  const [title, setTitle] = useState('')
  const [restaurants, setRestaurants] = useState([''])
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState({})

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

  const updatePollsToLocalStorage = (successData) => {
    const existingPolls = JSON.parse(localStorage.getItem('polls')) || []

    const updatedPolls = [
        ...existingPolls,
        {
            title,
            id: successData.pollId
        }
    ]

    localStorage.setItem('polls', 
    JSON.stringify(updatedPolls))
  }

  const createPoll = async () => {
    const response = await fetch('http://localhost:5000/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        restaurants
      })
    })

  const data = await response.json()
    if (! response.ok) {
      setErrors(data)

      return
    }

    setSuccess(data)
    updatePollsToLocalStorage(data)
  }

  return (
    <div className="container mx-auto my-16 md:my-32 px-6 ">
      <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
          <header className="border-b border-gray-400 px-8 py-5 text-gray-800">
            Criar Votação
          </header>

          {success.pollId ? (
            <div className="py-5 px-8">
                <div className="w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2">
                  Votação criada com sucesso <Link to={`/polls/${success.pollId}`}>
                        {process.env.REACT_APP_APP_URL}/polls/{success.pollId}
                    </Link>
                </div>
            </div>
          ) : null}

          {!success.pollId ? (
              <div className="py-5 px-8">
              {errors.length > 0 ? (
                  <Fragment>
                      {errors.map((error, index) => (
                          <p key={index} className='w-full mb-2 bg-red-500 text-white py-3 px-2 rounded'>{error.message}</p>
                      ))}
                  </Fragment>
              ): null}
              <div className="mb-6">
                  <label htmlFor="title" className="text-sm mb-2 inline-block">Enter the title of the poll</label>
                  <input onChange={(event) => setTitle(event.target.value)} value={title}  name='title' id='title' type="text" className='w-full py-2 border border-gray-400 rounded px-4' />
              </div>

              <div className="mb-3">
                <label className="text-sm mb-2 inline-block">Enter all the possible answers for this poll</label>
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="w-full flex items-center mb-2">
                        <input onChange={(event) => onRestaurantChange(index, event.target.value)} key={index} type="text" value={restaurant} className='w-full py-2 border border-gray-400 rounded px-4' />
                        <button onClick={() => removeRestaurant(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>Remover</button>
                    </div>
                ))}
              </div>

              <button onClick={addAnswer} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Adicionar restaurante</button>

              <div className="mt-12 mb-6 text-center">
                <button onClick={createPoll} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Criar Votação</button>
              </div>
          </div>
          ) : null}
      </div>
   </div>
  )
}