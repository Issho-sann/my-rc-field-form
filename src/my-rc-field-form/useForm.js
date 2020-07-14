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
    setCallback = callback => {
        this.callbacks = {
            ...this.callbacks,
            ...callback
        }
    }
    getFieldValue = name => {
        return this.store[name]
    }
    getFiledsValue = () => {
        return this.store
    }
    setFieldsValue = newStore => {
        this.store = {
            ...this.store,
            ...newStore
        }
        this.fieldEntities.forEach(entity => {
            const { name } = entity.props
            Object.keys(newStore).forEach(key => {
                if (key === name) {
                    entity.onStoreChange()
                }
            })
        })
    }
    resetFields = () => {
        this.store = {}
        this.fieldEntities.forEach(entity => {
            entity.onStoreChange()
        })
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
        console.log('fieldEntities:', this.fieldEntities);
        let err = this.validate()
        const { onFinish, onFinishFailed } = this.callbacks
        if (err.length === 0) {
            onFinish(this.getFiledsValue())
        } else {
            onFinishFailed(err)
        }
    }


    getForm = () => {
        return {
            registerField: this.registerField,
            setCallback: this.setCallback,
            submit: this.submit,
            getFieldValue: this.getFieldValue,
            getFiledsValue: this.getFiledsValue,
            setFieldsValue: this.setFieldsValue,
            resetFields: this.resetFields
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