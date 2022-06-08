import React, { 
    useState,
    useRef,
    useEffect
} from 'react';

export default function AdminMultiSelect({ pane, ontoNextPane }) {
    const [stage, setStage] = useState([])
    const [selectedValue, setSelectedValue] = useState()

    const multiSelectRef = useRef([])

    useEffect(() => {
        if (multiSelectRef.current.length === 0) {
            pane.fields.forEach(field => {
                multiSelectRef.current.push(field)
            })
        }
    }, [])

    const addToStage = (e) => {
        if (selectedValue !== '' && !stage.includes(selectedValue)) {
            console.log('addToStage, selectedValue: ', selectedValue); 
            setStage([
                ...stage,
                selectedValue
            ])
            setSelectedValue("")
            //setStage()
        }
    }

    const onSelect = (e) => {
        const idx = e.target.options.selectedIndex-1
        setSelectedValue(multiSelectRef.current[idx])
    } 

    const clearAndMoveOn = () => {
        setStage([])
        multiSelectRef.current = []
        ontoNextPane();
    }

    return (
        <>
            <div id={pane.name}>
                <label htmlFor={pane.name}>{pane.label}</label> 
                <select  onChange={onSelect}>
                    <option value="">--Please Select--</option>
                    {
                        pane.fields.map((field, i) => {
                            return <option key={i} value={field.value}>{field.text}</option>
                        })
                    }
                </select>
                <button type="submit" onClick={addToStage}>Add</button>
                <button type="submit" onClick={clearAndMoveOn}>{pane.cta}</button>
            </div>
            <div>
                    {
                        stage.map((item, i) => {
                            return <p key={i}>{item.text} / / / {item.value}</p>
                        })
                    }
            </div>
        </>
    )
}