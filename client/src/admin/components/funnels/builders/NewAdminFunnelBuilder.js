import React, { useEffect, useState } from 'react';

/*
    INITIAL STATE: will essentially be a clean slate, a nice juicy object that will be filled, or not filled, 
    with admin answers to questions i.e is this a campaign or a subscription? Is this form collecting a profile? 
*/

const initialFormState = {
    funnelType: "", /* to start, subscription or campaign? */
    fields: {
        profile: {
            firstName: "",
            lastName: "",
            email: ""
        }, /* first and last, email, etc. Since these are required fields in basically everything, will need them hadrcoded*/
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
    
    const onSelect = (e) => {
        setSelectedValue(e.target.value)
    }

    const [currentField, setCurrentField] = useState({
        html:
        <div id="funnelType">
            <label for="funnelType">Is this a subscription or a campaign?</label> 
            <select onChange={onSelect}>
                <option value=""></option>
                <option value="sub">Subscription</option>
                <option value="cam">Campaign</option>
            </select>
        </div>,
        type: "select"            
    })
    /* html element of the current panel: select, input, or full form. kind of a shim for now */
    // const [currentFieldFlavor, setCurrentFieldFlavor] = useState("select")
    const [currentPanel, setCurrentPanel] = useState(null)

    /* html element specific listeners, and their respective hooks */
    const [selectedValue, setSelectedValue] = useState("");

    /* for SINGLE inputs */
    // const [inputtedValue, setInputtedValue] = useState("")

    const ontoNextPanel = (e) => {
        //debugger
        /*
            at this point will need to 
            1) save the field to the current state. 
            2) set the current Field to what ever comes next in the flow, tbd...
        */
       // using form loosely here, html id attached to div holding form fields to use as label for what field we're updating
       const formId = currentField.html.props.id

       switch(currentField.type) {
           case "select":
               setForm({
                   ...form,
                   [formId]: selectedValue
               })
               default:
                    break;
       }

       /* AT SOME POINT HERE, WILL HAVE TO BUILD WHAT IS COMING NEXT FROM THE CURRENT PANEL, PROBABLY THROUGH A COLUMN OR TWO IN THE DB */

        setCurrentField({
            html:
            <div>
                <label for="test">NEW FORM FIELD</label>
                <input type="text" name="test"/>
            </div>,
            type: "select"            
        })
    }

    useEffect(() => {
        let newPanel;
        if (currentField.html) {
            newPanel = currentField.html;
            setCurrentPanel(newPanel)
        } else {
            return undefined
        }
    }, [currentField])

    return (
        <> 
            {currentPanel}
            <button type="submit" onClick={(e) => {ontoNextPanel(e)}}>NEXT</button>
            {/* <form onSubmit={(e) => ontoNextPanel(e)}>
            </form> */}
        </>
    )
}