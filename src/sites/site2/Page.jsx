
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
          <div className="subtitle">Claims & routing center — manage incoming forms and transfers</div>
        </div>
        <Link to="/">
          <button className="secondary">Back</button>
        </Link>
      </header>

      <main style={{marginTop:20, display:'grid',gridTemplateColumns:'1fr 1fr', gap:18}}>
        <section className="site-card">
          <h3>Pending Claims</h3>
          <p className="center-note">3 pending — review and route to appropriate departments.</p>
          <button>Review claims</button>
        </section>

        <section className="site-card">
          <h3>Inbox</h3>
          <p className="center-note">New messages and forms needing attention.</p>
          <button>Open inbox</button>
        </section>
      </main>
    </div>
  )
}
