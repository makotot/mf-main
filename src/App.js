import React from 'react'
import { Header } from 'mf_header/Header'
import { Button } from 'mf_shared_ui/Button'

function App() {
  return (
    <div className="App">
      <Header />
      <div>main app</div>
      <div>
        <Button>btn from shared ui</Button>
      </div>
    </div>
  )
}

export default App
