import React from 'react';

export default function AdminSelect({ pane, onSelect, ontoNextPane }) {
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