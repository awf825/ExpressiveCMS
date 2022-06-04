import React, { useState } from 'react';
import { 
    Link,
    Routes,
    Route,
    Outlet
} from 'react-router-dom';

export const AdminFunnels = () => {
    return (
        <div>
            <nav>
                <Link to="/admin/funnels/new">New Form</Link>
                <br/>
                <Link to="/admin/funnels/index">All Forms</Link>
                <br/>
                <Link to="/admin/funnels/new-field">New Field</Link>
                <br/>
                <Link to="/admin/funnels/index-fields">All Fields</Link>
            </nav>
            <Outlet />
        </div>
    )
}