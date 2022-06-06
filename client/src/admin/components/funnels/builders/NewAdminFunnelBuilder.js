import React, { useEffect, useState } from 'react';
import AdminSelect from '../fields/AdminSelect';
import axios from 'axios'

/*
    INITIAL STATE: will essentially be a clean slate, a nice juicy object that will be filled, or not filled, 
    with admin answers to questions i.e is this a campaign or a subscription? Is this form collecting a profile? 
*/

const initialFormState = {
    funnelType: "", /* to start, subscription or campaign? */
    fields: {
        profile: {}, /* first and last, email, etc. Since these are required fields in basically everything, will need them hadrcoded*/
        info: {}, /* any logistical questions like PTA or PTO, how many people at your school? broad, high level material */
        customQuestions: {} /* low level, more specific questions related to camps/subs. For example, this would be a good place for a question specific to property ins policy, 
        whereas above, info, would be better suited for things like how many people at your school? */
    },
    metadata: {
        isPaymentGateway: false,
        profileUpFront: false /* Do we want this to be a "we need your profile first", like in the store, or a simple email capture, where the "profile" is truncated?*/
    }
}

export default function NewAdminFunnelBuilder() {
    const [form, setForm] = useState(initialFormState)
    const [pane, setPane] = useState({
        id: null,
        name: "",
        cta: "",
        fields: []
    })
    
    const onSelect = (e) => {
        setSelectedValue(e.target.value)
    }

    useEffect(() => {
        axios.get("http://localhost:3200/admin/funnels/panes/1")
        .then(resp => {
            console.log('resp @ first effect: ', resp)
            setPane(
                // ...panel,
                {
                    // id: resp.data.id,
                    name: resp.data.name,
                    type: resp.data.type,
                    cta: resp.data.cta,
                    fields: resp.data.fields,
                    label: resp.data.label,
                    ordering: resp.data.ordering
                }
            )
        })
    }, [])

    /* html element specific listeners, and their respective hooks */
    const [selectedValue, setSelectedValue] = useState("");

    const ontoNextPane = (e) => {
        const stringParam = (pane.ordering+1).toString()
        console.log("pane.ordering:", pane.ordering)
        axios.get('http://localhost:3200/admin/funnels/paneByOrdering?ordering='+stringParam)
        .then(resp => {
            console.log('resp @ ontoNextPane ', resp)
            setPane(
                // ...panel,
                {
                    // id: resp.data.id,
                    name: resp.data.name,
                    type: resp.data.type,
                    cta: resp.data.cta,
                    fields: resp.data.fields,
                    label: resp.data.label
                }
            )
        })

        /*
            at this point will need to 
            1) save the field to the current state. 
            2) set the current Field to what ever comes next in the flow, tbd...
        */
       switch(pane.type) {
           case "select":
               setForm({
                   ...form,
                   [pane.name]: selectedValue
               })
               break;
            default:
                break;
       }
    }

    return (
        <>  
            <AdminSelect 
                pane={pane}
                onSelect={onSelect}
                ontoNextPane={ontoNextPane}
            />
        </>
    )
}