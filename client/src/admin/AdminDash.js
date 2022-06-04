import React from 'react';
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import { AdminLayouts } from "./routes/AdminLayouts"
import { AdminFunnels } from "./routes/AdminFunnels"
import { AdminContent } from "./routes/AdminContent"
import NewAdminFunnel from './components/funnels/NewAdminFunnel';
import IndexAdminFunnel from './components/funnels/IndexAdminFunnel';
import NewAdminFunnelField from './components/funnels/NewAdminFunnelField';
import IndexAdminFunnelFields from './components/funnels/IndexAdminFunnelFields';

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
                <Route path="content" element={<AdminContent />} />
                <Route path="/funnels" element={<AdminFunnels />}>
                    <Route path="new" element={<NewAdminFunnel />}/>
                    <Route path="index" element={<IndexAdminFunnel />}/>
                    <Route path="new-field" element={<NewAdminFunnelField />}/>
                    <Route path="index-fields" element={<IndexAdminFunnelFields />}/>
                </Route>
            </Routes>
        </div>
    )
}

export default AdminDash;