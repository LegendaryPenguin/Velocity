
import React from 'react'
import { Link } from 'react-router-dom'

export default function Site1() {
  return (
    <div style={{padding:20, maxWidth:900, margin:'0 auto'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 style={{margin:0}}>
            <span style={{marginRight:10}} className="site-emoji">🩺</span>
            Doctor
          </h2>
          <div className="subtitle">Provider dashboard — appointments, notes, and quick actions</div>
        </div>
        <Link to="/" className="secondary">
          <button className="secondary">Back</button>
        </Link>
      </header>

      <main style={{marginTop:20, display:'grid',gridTemplateColumns:'1fr 1fr', gap:18}}>
        <section className="site-card">
          <h3>Today's Schedule</h3>
          <p className="center-note">You have 5 appointments. Tap to view details.</p>
          <button>View schedule</button>
        </section>

        <section className="site-card">
          <h3>Patient Notes</h3>
          <p className="center-note">Create and access patient notes securely.</p>
          <button>Open notes</button>
        </section>
      </main>
    </div>
  )
}
