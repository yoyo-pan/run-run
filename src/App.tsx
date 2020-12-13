import { Provider } from 'react-redux'

import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <main style={{ width: '100vw', height: '100vh', background: '#FAF9F8' }}>1234</main>
    </Provider>
  )
}

export default App
