import React from 'react';
import UseContextPage from './page/useContextPage'
import AntdFormPage from './page/antdFormPage'
import RcFieldFormPage from './page/rcFieldFormPage'
import { ThemeContext } from './context'

function App() {
  const [themeColor, changeThemeColor] = React.useState('green')
  return (
    <div className="App">
      <ThemeContext.Provider value={themeColor}>
        <UseContextPage/>
      </ThemeContext.Provider>
      <button onClick={() => changeThemeColor('yellow')}>修改主题色</button>
      <hr/><br/>
      <AntdFormPage/>
      <RcFieldFormPage/>
    </div>
  );
}

export default App;
