function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="logo">
          <span className="brand-bold">stock</span>
          <span className="brand-regular">sprout</span>
        </h1>
        <nav className="nav-links">
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">Portfolio</a>
          <a href="#" className="nav-link">Markets</a>
          <a href="#" className="nav-link">Settings</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="user-profile">U</div>
      </div>
    </header>
  )
}

export default DashboardHeader

