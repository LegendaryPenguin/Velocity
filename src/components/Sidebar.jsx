import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ collapsed, onToggle }) {
  const loc = useLocation()

  const menu = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/site1', label: 'Doctor', emoji: '🩺' },
    { to: '/site2', label: 'Clearing House', emoji: '🏥' },
    { to: '/site3', label: 'Patient', emoji: '🧑‍🤝‍🧑' },
  ]

  return (
    <aside className={"sidebar" + (collapsed ? ' collapsed' : '')}>
      <div className="sidebar-top">
        <div className="brand">
          <div className="logo-circle">+</div>
          {!collapsed && <div className="brand-text">Velocity Health</div>}
        </div>
        <button aria-label="Toggle menu" className="toggle" onClick={onToggle}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="menu">
        {menu.map((m) => (
          <Link key={m.to} to={m.to} className={loc.pathname.startsWith(m.to) ? 'active' : ''}>
            <span className="menu-emoji">{m.emoji}</span>
            {!collapsed && <span className="menu-label">{m.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <small className="muted">v0.1 • Demo</small>}
      </div>
    </aside>
  )
}
