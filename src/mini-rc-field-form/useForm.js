import React from 'react'

class FormStore {
    constructor() {
        this.store = {}
        this.fieldEntities = []
        this.callbacks = {}
    }
    registerField = entity => {
        this.fieldEntities.push(entity)
        return () => {
            this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
            delete this.store[entity.props.name]
        }
    }
    getFieldValue = name => {
        return this.store[name]
    }
    getFiledsValue = () => {
        return this.store
    }
    resetFields = () => {
        this.store = {}
        this.fieldEntities.forEach(entity => {
            entity.forceUpdate()
        })
    }
    setFieldsValue = newStore => {
        this.store = {
            ...this.store,
            ...newStore
        }
        this.fieldEntities.forEach(entity => {
            Object.keys(newStore).forEach(name => {
                if (entity.props.name === name) {
                    entity.forceUpdate()
                }
            })
        })
    }
    setCallback = cb => {
        this.callbacks = {
            ...this.callbacks,
            ...cb
        }
    }
    validate = () => {
        let err = []
        this.fieldEntities.forEach(entity => {
            const { rules, name } = entity.props
            let value = this.getFieldValue(name)
            let rule = rules && rules[0]
            if (rule && rule.required && !value) {
                err.push({
                    name,
                    err: rule.message
                })
            }
        })
        return err
    }
    submit = () => {
        let err = this.validate()
        const { onFinish, onFinishFailed } = this.callbacks
        if (err.length === 0) {
            onFinish(this.store)
        } else {
            onFinishFailed(err)
        }
    }
    getForm = () => {
        return {
            registerField: this.registerField,
            getFieldValue: this.getFieldValue,
            getFiledsValue: this.getFiledsValue,
            resetFields: this.resetFields,
            setFieldsValue: this.setFieldsValue,
            setCallback: this.setCallback,
            submit: this.submit
        }
    }
}


export default function useForm(form) {
    const formRef = React.useRef()
    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }
    return [formRef.current]
}