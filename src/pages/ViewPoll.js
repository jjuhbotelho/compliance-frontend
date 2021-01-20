import React, { useEffect, useState } from 'react'

import Button from '../components/Button'

export default function ViewPoll({ match }) {
    const [poll, setPoll] = useState(null)

    const fetchPoll = async () => {
        const response = await fetch(`http://localhost:5000/polls/${match.params.poll}`)

        const data = await response.json()

        setPoll(data)
    }

    useEffect(() => {
        fetchPoll()
    }, [])

    return (
        <div className="container mx-auto mt-16 px-5">
            <h1 className="my-5 text-3xl text-center">
                Vote no seu restaurante favorito
            </h1>

            {poll ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className='px-5 py-4 flex justify-between items-center'>
                        {poll.title}
                    </header>

                    {poll.restaurants.map(restaurant => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={restaurant._id}>
                                {restaurant.name}

                                <Button>Votar</Button>
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}