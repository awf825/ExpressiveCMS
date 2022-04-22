import React from 'react';
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import {
    AdminLayouts
} from "./routes/AdminLayouts"

function AdminDash() {
    return (
        <div>
            ADMIN
            <nav>
            <Link to="layouts">Layouts</Link>
            </nav>
    
            <Routes>
            {/* <Route path=":id" element={<UserProfile />} /> */}
            <Route path="layouts" element={<AdminLayouts />} />
            </Routes>
        </div>
    )
}

export default AdminDash;