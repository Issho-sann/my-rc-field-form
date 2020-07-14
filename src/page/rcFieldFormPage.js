import React from 'react'
import {Input, Button} from 'antd'
// import Form, { Field } from 'rc-field-form'
import Form, { Field } from '../my-rc-field-form'

const nameRules = {required: true, message: '请输⼊姓名！'};
const passworRules = {required: true, message: '请输⼊密码！'};

export default class AntdFormPage extends React.Component {
    componentDidMount() {
        this.formRef.setFieldsValue({name: "default"})
    }
    onFinish = val => {
        console.log('onFinish:', val)
    }
    onFinishFailed = val => {
        console.log('onFinishFailed', val)
    }
    onReset = () => {
        console.log(this.formRef)
        this.formRef.resetFields()
    }
    render() {
        return (
            <div>
                <Form
                    ref={ref => this.formRef = ref}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    onReset={this.onReset}
                >
                    <Field name="name" rules={[nameRules]}>
                        <Input placeholder="name input placeholder" />
                    </Field>
                    <Field name="password" rules={[passworRules]}>
                        <Input placeholder="password input placeholder" />
                    </Field>
                    <Field>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Field>
                    <Field>
                        <Button type="default" size="large" htmlType="reset">Reset</Button>
                    </Field>
                </Form>
            </div>
        )
    }
}

// export default function RcFieldFormPage () {
//     const [form] = Form.useForm()
//     // const formRef = React.useRef()
//     React.useEffect(() => {
//         // console.log(formRef.current)
//         console.log(form);
//         form.setFieldsValue({name: "default"})
//     }, [form])
//     function onFinish(val) {
//         console.log('onFinish:', val)
//     }
//     function onFinishFailed(val) {
//         console.log('onFinishFailed:', val);
//     }
//     function onReset() {
//         form.resetFields()
//     }
//     return (
//         <div>
//             <Form
//                 // ref={formRef}
//                 form={form}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 onReset={onReset}
//             >
//                 <Field name="name" rules={[nameRules]}>
//                     <Input placeholder="name input placeholder" />
//                 </Field>
//                 <Field name="password" rules={[passworRules]}>
//                     <Input placeholder="password input placeholder" />
//                 </Field>
//                 <Field>
//                     <Button type="primary" size="large" htmlType="submit">Submit</Button>
//                 </Field>
//                 <Field>
//                     <Button type="default" size="large" htmlType="reset">Reset</Button>
//                 </Field>
//             </Form>
//         </div>
//     )
// }