import React, { useEffect, useState } from 'react'

import Button from '../components/Button'

export default function ViewPoll({ match }) {
  const [poll, setPoll] = useState(null)
  const [voted, setVoted] = useState(false)

  const fetchPoll = async () => {
    const response = await fetch(`http://localhost:5000/polls/${match.params.poll}`)

    const data = await response.json()

    setPoll(data)
  }

  useEffect(() => {
    fetchPoll()
  }, [voted])

  const vote = async (title, restaurants, restaurant) => {
    await fetch(`http://localhost:5000/polls/${match.params.poll}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        restaurants,
        restaurant
      })
    })

    setVoted(true)
  }

  const getTotalVotes = () => {
    let totalVotes = 0

    poll.restaurants.forEach(restaurant => {
        totalVotes += restaurant.count
    })

    return totalVotes
}

  const getRestaurantPercentage = (selectedRestaurant) => {
    const totalVotes = getTotalVotes()

    if (totalVotes === 0) {
        return 0
    }

    return Math.round((selectedRestaurant.count / totalVotes) * 100)
  }

  return (
    <div className="container mx-auto mt-16 px-5">
      <h1 className="my-5 text-3xl text-center">
        Vote no seu restaurante favorito
      </h1>

      {poll ? (
        <div className="w-full max-w-3xl mx-auto bg-white shadow">
          <header className='px-5 py-4 flex justify-between items-center'>
            {poll.title}

            {voted && <span>{getTotalVotes()} votos</span>}

            <Button onClick={() => setVoted(true)}>Ver Resultados</Button>
          </header>

          {poll.restaurants.map(restaurant => {
            return (
              <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={restaurant._id}>
                {restaurant.name}

                {voted ? (
                  <span className='text-blue-500'> {getRestaurantPercentage(restaurant)}% </span>
                ) :  <Button onClick={() => vote(poll.title, poll.restaurants.map(({name}) => name) , restaurant._id)}>Votar</Button>}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}