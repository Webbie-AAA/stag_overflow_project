import React from 'react'
import { useFavourites } from '../../contexts/FavouritesContext'
import './ListedFaves.css'

export default function ListedFaves() {
    const { favourites, setFavourites } = useFavourites()

    const removeFavourite = (index) => {
        setFavourites((prev) =>
            prev.filter((fave, i) => i !== index)
        )
    }

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {favourites.map((fave, index) => (
                    <li className="todo" key={index}>
                        <p className='todo-tem'>{fave.name || fave.type}</p>

                        <button className='trash-btn' onClick={() => removeFavourite(index)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}