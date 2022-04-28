import React from 'react';
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import { AdminLayouts } from "./routes/AdminLayouts"
import { AdminFunnels } from "./routes/AdminFunnels"
import { AdminContent } from "./routes/AdminContent"

function AdminDash() {
    return (
        <div>
            ADMIN
            <nav>
            <Link to="layouts">Layouts</Link>
            <Link to="funnels">Funnels</Link>
            <Link to="content">Content</Link>
            </nav>
    
            <Routes>
            {/* <Route path=":id" element={<UserProfile />} /> */}
            <Route path="layouts" element={<AdminLayouts />} />
            <Route path="funnels" element={<AdminFunnels />} />
            <Route path="content" element={<AdminContent />} />
            </Routes>
        </div>
    )
}

export default AdminDash;