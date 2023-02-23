import React, {ChangeEvent, useState} from 'react';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const editModeActivated = () => {
        setNewTitle(props.title)
        setEditMode(true)
    }
    const editModeDeactivated = () => {
        props.callback(newTitle)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={editModeDeactivated}
                autoFocus
            />
            : <span onDoubleClick={editModeActivated}>{props.title}</span>
    )
}