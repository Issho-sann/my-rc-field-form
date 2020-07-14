import React from 'react'
import useForm from './useForm'
import { FieldContext } from './fieldContext'

export default function Form({children, form, onFinish, onFinishFailed}, ref) {
    const [formInstance] = useForm(form)
    
    React.useImperativeHandle(ref, () => formInstance)

    console.log(formInstance)

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