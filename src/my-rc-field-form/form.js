import React from 'react'
import userForm from './useForm'
import FieldContext from './FieldContext'

export default function Form({ form, children, onFinish, onFinishFailed }, ref) {
    const [formInstance] = userForm(form)

    React.useImperativeHandle(ref, () => formInstance)
    
    formInstance.setCallback({
        onFinish,
        onFinishFailed
    })

    return (
        <form
            onSubmit={
                event => {
                    event.preventDefault()
                    event.stopPropagation()
                    formInstance.submit()
                }
            }
            onReset={
                () => {
                    formInstance.resetFields()
                }
            }
        >
            <FieldContext.Provider value={formInstance}>
                { children }
            </FieldContext.Provider>
        </form>
    )
}