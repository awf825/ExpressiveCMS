import React, { 
    useEffect, 
    useState, 
    useRef,
    useReducer
} from 'react';
import AdminSelect from '../fields/AdminSelect';
import AdminMultiSelect from '../fields/AdminMultiSelect';
import axios from 'axios'
import { NewAdminFunnelContext  } from '../contexts/NewAdminFunnelContext';
import { 
    NewAdminFunnelReducer,
    setCurrentPane,
    setCurrentOutlet
} from '../reducers/NewAdminFunnelReducer';

const initialFormState = {
    funnelType: "", /* to start, subscription or campaign? */
    profile: {}, /* first and last, email, etc. Since these are required fields in basically everything, will need them hadrcoded*/
    info: {}, /* any logistical questions like PTA or PTO, how many people at your school? broad, high level material */
    customQuestions: {}, /* low level, more specific questions related to camps/subs. For example, this would be a good place for a question specific to property ins policy, 
    whereas above, info, would be better suited for things like how many people at your school? */
    metadata: {
        isPaymentGateway: false,
        profileUpFront: false /* Do we want this to be a "we need your profile first", like in the store, or a simple email capture, where the "profile" is truncated?*/
    }
}

const initialPaneState = {
    id: null,
    name: "",
    type: "",
    cta: "",
    fields: [],
    label: "",
    ordering: ""
}

export default function NewAdminFunnelBuilder() {
    const [form, setForm] = useState(initialFormState)
    const [pane, setPane] = useState({
        id: null,
        name: "",
        type: "",
        cta: "",
        fields: [],
        label: "",
        ordering: ""
    })
    const [outlet, setOutlet] = useState(null)
    const paneRef = useRef(null)
    const selectedValueRef = useRef("")

    const [newAdminFunnelState, dispatch] = useReducer(
        NewAdminFunnelReducer,
        {
          selectedFunnelType: "",
          currentPane: initialPaneState,
          form: initialFormState,
          currentOutlet: null
        }
      )
    
    /*
        In the side effect that hits when the component renders, we want to grab the first admin pane, which will always be the same: sub or campaign?, id 1. 
        We consume the payload and structure it to set the state of the pane. We use ref hooks to store the pane itself, just to have a mutable reference for 
        the query in function ontoNextPane. Since we know the "first order of business", we can automatically set the outlet, or children, to the AdminSelect 
        component, which consumes a couple functions and the incoming pane as props.  
    */

    useEffect(() => {
        let newPane;
        axios.get("http://localhost:3200/admin/funnels/panes/1")
        .then(resp => {
            newPane = {
                name: resp.data.name,
                type: resp.data.type,
                cta: resp.data.cta,
                fields: resp.data.fields,
                label: resp.data.label,
                ordering: resp.data.ordering
            }

            setPane(newPane)
            dispatch(setCurrentPane(newPane))
            dispatch(setCurrentOutlet(
                <AdminSelect 
                    pane={newPane}
                    ontoNextPane={ontoNextPane}
                />
            ))

            paneRef.current = newPane
        })
    }, [])

    /*
        This is similar to the index side effect, but more dynamic. First, we take the ref to the current pane, and add 1 to the order, as to correctly query
        for the next pane. This will not necessarily be on the basis of id, like in the above query; how do we distinguish between sub and campaign panes? As above, 
        the payload is fashioned to set the new pane. The higher level state of the form is updated with the reference to the outgoing pane reference, as to build the 
        form answers with whatever the admin user put in the prior pane. Only the new, incoming pane is used to set the new outlet. When everything is done, the pane ref
        is set to the payload. Rinse and repeat
    */

    const ontoNextPane = (e) => {
        let newPane;
        const stringParam = (paneRef.current.ordering+1).toString()
        axios.get('http://localhost:3200/admin/funnels/paneByOrdering?ordering='+stringParam)
        .then(resp => {
            newPane = {
                // id: resp.data.id,
                name: resp.data.name,
                type: resp.data.type,
                cta: resp.data.cta,
                fields: resp.data.fields,
                label: resp.data.label,
                ordering: resp.data.ordering
            }

            setPane(newPane)
            dispatch(setCurrentPane(newPane))

            switch(newPane.type) {
                case "select":
                    dispatch(setCurrentOutlet(
                        <AdminSelect 
                            pane={newPane}
                            ontoNextPane={ontoNextPane}
                        />
                    ))
                    break;
                case "multiselect":
                    dispatch(setCurrentOutlet(
                        <AdminMultiSelect 
                            pane={newPane}
                            ontoNextPane={ontoNextPane}
                        />
                    ))
                    break;
                default:
                    break;
            }
            paneRef.current = newPane;
            selectedValueRef.current = "";
        })
    }

    return (
        <NewAdminFunnelContext.Provider value={[newAdminFunnelState, dispatch]}> 
            <>  
                {newAdminFunnelState && newAdminFunnelState.currentOutlet}
            </>
        </NewAdminFunnelContext.Provider>
    )
}