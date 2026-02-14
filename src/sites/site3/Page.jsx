
import React from 'react'
import { Link } from 'react-router-dom'

export default function Site3() {
  return (
    <div style={{padding:20, maxWidth:900, margin:'0 auto'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 style={{margin:0}}>
            <span style={{marginRight:10}} className="site-emoji">🧑‍🤝‍🧑</span>
            Patient
          </h2>
          <div className="subtitle">Personal portal — appointments, records, and messages</div>
        </div>
        <Link to="/">
          <button className="secondary">Back</button>
        </Link>
      </header>

      <main style={{marginTop:20, display:'grid',gridTemplateColumns:'1fr 1fr', gap:18}}>
        <section className="site-card">
          <h3>My Appointments</h3>
          <p className="center-note">Next appointment: Tomorrow at 10:00 AM</p>
          <button>View details</button>
        </section>

        <section className="site-card">
          <h3>Medical Records</h3>
          <p className="center-note">Secure access to your documents and lab results.</p>
          <button>Open records</button>
        </section>
      </main>
    </div>
  )
}
