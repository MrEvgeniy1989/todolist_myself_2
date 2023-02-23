import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const titleCurrentTargetHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
        } else {
            setError('Название обязательно!')
        }
        setTitle('')
    }
    const onKeyDownHandlerTitleCurrentTarget = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={titleCurrentTargetHandler}
                onKeyDown={onKeyDownHandlerTitleCurrentTarget}
            />
            <button
                onClick={addItemHandler}
            >+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}