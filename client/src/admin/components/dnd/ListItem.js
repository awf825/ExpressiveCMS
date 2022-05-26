import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const ListItem = ({ text, index, moveListItem, addListItem, pets }) => {

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { 
            index,
            name: text,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
        accept: 'item',
        /*
            The hover function triggers every time a draggable hovers above this drop area. We use it in this example to move
            items up and down as the draggable hovers around the list items, always making some space to be dropped at. The implementation
            may seem complex at first glance, but all it does is move the item up or down when the mouse exceeds the middle Y-axis of 
            the item.
        */
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            console.log('item @ hover:', item)
            console.log('index @ hover:', index)
            console.log('pets @ hover:', pets)
            const petNames = pets.map(p => {
                return p.name
            })
            if (!petNames.includes(item.name)) {
                addListItem(dragIndex, hoverIndex)
            }
            //addListItem(dragIndex)

            item.index = hoverIndex
        }
    })

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    // const opacity = isDragging ? 0 : 1
    return (
        <div ref={dragDropRef} >
            {text}
        </div>
    )
}