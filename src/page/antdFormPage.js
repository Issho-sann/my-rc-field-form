import React from 'react'
import {Form, Input, Button} from 'antd'

const FormItem = Form.Item

const nameRules = {required: true, message: '请输⼊姓名！'};
const passworRules = {required: true, message: '请输⼊密码！'};

// export default class AntdFormPage extends React.Component {
//     componentDidMount() {
//         console.log(this.formRef)
//         this.formRef.setFieldsValue({name: "default"})
//     }
//     onFinish = val => {
//         console.log('onFinish:', val)
//     }
//     onFinishFailed = val => {
//         console.log('onFinishFailed', val)
//     }
//     onReset = () => {
//         this.formRef.resetFields()
//     }
//     render() {
//         return (
//             <div>
//                 <Form
//                     ref={ref => this.formRef = ref}
//                     onFinish={this.onFinish}
//                     onFinishFailed={this.onFinishFailed}
//                     onReset={this.onReset}
//                 >
//                     <FormItem label="姓名" name="name" rules={[nameRules]}>
//                         <Input placeholder="name input placeholder" />
//                     </FormItem>
//                     <FormItem label="密码" name="password" rules={[passworRules]}>
//                         <Input placeholder="password input placeholder" />
//                     </FormItem>
//                     <FormItem>
//                         <Button type="primary" size="large" htmlType="submit">Submit</Button>
//                     </FormItem>
//                     <FormItem>
//                         <Button type="default" size="large" htmlType="reset">Reset</Button>
//                     </FormItem>
//                 </Form>
//             </div>
//         )
//     }
// }

export default function AntdFormPage () {
    const [form] = Form.useForm()
    // const formRef = React.useRef()
    React.useEffect(() => {
        // console.log(formRef.current)
        // console.log(form);
        form.setFieldsValue({name: "default"})
    }, [form])
    function onFinish(val) {
        console.log('onFinish:', val)
    }
    function onFinishFailed(val) {
        console.log('onFinishFailed:', val);
    }
    function onReset() {
        form.resetFields()
    }
    return (
        <div>
            <Form
                // ref={formRef}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onReset={onReset}
            >
                <FormItem label="姓名" name="name" rules={[nameRules]}>
                    <Input placeholder="name input placeholder" />
                </FormItem>
                <FormItem label="密码" name="password" rules={[passworRules]}>
                    <Input placeholder="password input placeholder" />
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" htmlType="submit">Submit</Button>
                </FormItem>
                <FormItem>
                    <Button type="default" size="large" htmlType="reset">Reset</Button>
                </FormItem>
            </Form>
        </div>
    )
}