
import React from 'react'
import { Link } from 'react-router-dom'

export default function Site2() {
  return (
    <div style={{padding:20, maxWidth:900, margin:'0 auto'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 style={{margin:0}}>
            <span style={{marginRight:10}} className="site-emoji">🏥</span>
            Clearing House
          </h2>
        </div>
        <Link to="/">
          <button className="secondary">Back</button>
        </Link>
      </header>

      <main style={{marginTop:20}}>
        <p>This is the Clearing House mini-site. Generic placeholder content for now.</p>
      </main>
    </div>
  )
}
