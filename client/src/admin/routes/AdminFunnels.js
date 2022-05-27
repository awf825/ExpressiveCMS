import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DraggableBasket } from '../components/dnd/DraggableBasket';
import List from '../components/dnd/List';
// import OuterList from '../components/dnd/OuterList';

/*
    https://react-dnd.github.io/react-dnd/docs/tutorial#adding-drag-and-drop-interaction
*/


export const AdminFunnels = () => {
    const listOneNames = ['cat', 'fish', 'dog', 'hamster']
    const listTwoNames = ['lizard', 'pig', 'bird', 'tiger']
    const [showForm, setShowForm] = useState(false)


    const newForm = () => {
        console.log('newForm')    
        setShowForm(true)
    }

    return (
        // <DndProvider backend={HTML5Backend}>
        //     <div style={{ display: 'flex', flexDirection: 'row', margin: '4rem 4rem', padding: '4rem 4rem' }}>
        //         <div>
        //          <List names={listOneNames}/>
        //         </div>
        //         <div>
        //          <List names={listTwoNames}/>
        //         </div>
        //         {/* <OuterList /> */}
        //     </div>
        //    {/* <DraggableBasket /> */}
        // </DndProvider>
        <div>
            <div style={{ display: showForm  ? 'none' : 'block'}}>
                <button onClick={newForm} type="submit">NEW FORM</button>
                <p>SHOW ALL CREATED FORMS HERE, WITH WHETHER OR NOT THEY'RE SUBS OR CAMPAIGNS, OTHER METADATA INCLUDING DELETE AND EDIT BUTTONS</p>
            </div>

            <div style={{ display: showForm ? 'block' : 'none'}}>
                <p>NEWFORM</p>
                {/* <button onClick={setupWizard} type="submit">FORM SETUP WIZARD</button> */}
            </div>
        </div>
    )
}