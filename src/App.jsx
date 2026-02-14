import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Site1 from './sites/site1/Page'
import Site2 from './sites/site2/Page'
import Site3 from './sites/site3/Page'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <h1>Main Page</h1>
      <div className="buttons">
        <Link to="/site1">
          <button>Open Site 1</button>
        </Link>
        <Link to="/site2">
          <button>Open Site 2</button>
        </Link>
        <Link to="/site3">
          <button>Open Site 3</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<div>Select a site above</div>} />
        <Route path="/site1/*" element={<Site1 />} />
        <Route path="/site2/*" element={<Site2 />} />
        <Route path="/site3/*" element={<Site3 />} />
      </Routes>
    </div>
  )
}
