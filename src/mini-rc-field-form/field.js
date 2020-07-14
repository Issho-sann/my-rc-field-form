import React from 'react'
import { FieldContext } from './fieldContext'

export default class Field extends React.Component {
    static contextType = FieldContext

    componentDidMount() {
        const { registerField } = this.context
        this.cancelRegisterField = registerField(this)
    }
    componentWillUnmount() {
        if (this.cancelRegisterField) {
            this.cancelRegisterField()
        }
    }
    getControl = () => {
        const { getFieldValue, setFieldsValue } = this.context
        const { name } = this.props
        return {
            value: getFieldValue(this.props.name),
            onChange: event => setFieldsValue({[name]: event.target.value})
        }
    }

    render() {
        const { children } = this.props
        const controlChildren = React.cloneElement(children, this.getControl())
        return controlChildren
    }
}