import React, { useState, useCallback } from 'react'
import { ListItem } from './ListItem'


export default function List({ names }) {
    
    const PETS = [
        { id: 1, name: names[0] },
        { id: 2, name: names[1] },
        { id: 3, name: names[2] },
        { id: 4, name: names[3] },
    ]

    const [pets, setPets] = useState(PETS)

    const movePetListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = pets[dragIndex]
            const hoverItem = pets[hoverIndex]
            // Swap places of dragItem and hoverItem in the pets array
            setPets(pets => {
                const updatedPets = [...pets]
                updatedPets[dragIndex] = hoverItem
                updatedPets[hoverIndex] = dragItem
                return updatedPets
            })
        },
        [pets],
    )

    const addListItem = useCallback(
        (dragIndex, hoverItem) => {
            debugger
            setPets(pets => {
                const updatedPets = [...pets]
                updatedPets[updatedPets.length+1] = updatedPets[dragIndex]
                updatedPets[dragIndex] = hoverItem
            })
        },
        [pets],
    )

    return (
        <div>{pets.map((pet, index) => (
            <ListItem
                key={pet.id}
                index={index}
                text={pet.name}
                pets={pets}
                moveListItem={movePetListItem}
                addListItem={addListItem}
            />
        ))}
        </div>
    )
}