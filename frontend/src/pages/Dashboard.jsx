import DashboardHeader from '../components/dashboard/DashboardHeader'
import WelcomeSection from '../components/dashboard/WelcomeSection'
import StatsCards from '../components/dashboard/StatsCards'
import PortfolioPerformance from '../components/dashboard/PortfolioPerformance'
import PopularStocks from '../components/dashboard/PopularStocks'
import HelpButton from '../components/dashboard/HelpButton'

function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <main className="dashboard-main">
        <WelcomeSection />
        <StatsCards />
        <PortfolioPerformance />
        <PopularStocks />
      </main>
      <HelpButton />
    </div>
  )
}

export default Dashboard
