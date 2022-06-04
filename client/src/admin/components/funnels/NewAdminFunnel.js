import React, { useState } from 'react';
import NewAdminFunnelBuilder from './builders/NewAdminFunnelBuilder.js'

export default function NewAdminFunnel() {
    const [isBuilding, setIsBuilding] = useState(false)
    const toggleIsBuilding = () => {
        setIsBuilding(true)
    }
    return (
        <>
            {
                isBuilding
                ?
                <NewAdminFunnelBuilder />
                :
                <>
                    <button type="submit" onClick={toggleIsBuilding}>START BUILDING</button>
                    <p>Should have some instructional text here</p>            
                </>
            }
        </>
    )
}