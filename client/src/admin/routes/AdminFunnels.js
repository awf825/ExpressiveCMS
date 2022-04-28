import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DraggableBasket } from '../components/dnd/DraggableBasket';

/*
    https://react-dnd.github.io/react-dnd/docs/tutorial#adding-drag-and-drop-interaction
*/

export const AdminFunnels = () => {
    return (
        <DndProvider backend={HTML5Backend}>
           <DraggableBasket />
        </DndProvider>
    )
}