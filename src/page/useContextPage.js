import React from 'react'
import { ThemeContext, UserContext, ClassCotext } from '../context'

function createClassComp(Comp) {
    return props => {
        const context = React.useContext(ClassCotext)
        return <Comp {...props} className={context.className}/>
    }
}
// const comp = props => <h2 {...props}>class</h2>
// const ClassComp = createClassComp(comp)

@createClassComp
class ClassComp extends React.Component {
    render() {
        return <h2 {...this.props}>class</h2>
    }
}

export default class UseContextPage extends React.Component {
    static contextType = UserContext
    render(h) {
        return (
            <div>
                { this.context.name }
                <ThemeContext.Consumer>
                    {
                        color => <h1>{ color }</h1>
                    }
                </ThemeContext.Consumer>
                <ClassComp id="classComp"/>
            </div>
        )
    }
}