import React from 'react'
import FieldContext from './FieldContext'

export default class Field extends React.Component {

    static contextType = FieldContext

    componentDidMount() {
        const { registerField } = this.context
        console.log(this.context);
        this.cancelRegisterField = registerField(this)
    }
    componentWillUnmount() {
        if (this.cancelRegisterField) {
            this.cancelRegisterField()
        }
    }

    onStoreChange = () => {
        this.forceUpdate()
    }

    getControlled = () => {
        const { name } = this.props
        const { getFieldValue, setFieldsValue } = this.context
        return {
            value: getFieldValue(name),
            onChange: event => {
                const newValue = event.target.value
                setFieldsValue({[name]: newValue})
            }
        }
    }

    render() {
        const { children } = this.props
        const returnChildNode = React.cloneElement(children, this.getControlled())
        return returnChildNode
    }
}