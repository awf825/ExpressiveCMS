import React, { useContext } from 'react';
import { NewAdminFunnelContext } from '../contexts/NewAdminFunnelContext';
import {
    setFunnelType
} from '../reducers/NewAdminFunnelReducer.js'


export default function AdminSelect({ pane, ontoNextPane }) {
    const [newAdminFunnelState, dispatch] = useContext(NewAdminFunnelContext);
    const onSelect = (e) => {
        // dispatch(selectFunnelType(e.target.value))
        dispatch(setFunnelType(e.target.value))
    }
    return (
        <div id={pane.name}>
             <label htmlFor={pane.name}>{pane.label}</label> 
             <select onChange={onSelect}>
                 <option value="">--Please Select--</option>
                 {
                     pane.fields.map((field, i) => {
                         return <option key={i} value={field.value}>{field.text}</option>
                     })
                 }
             </select>
             <button type="submit" onClick={ontoNextPane}>{pane.cta}</button>
        </div>
    )
}