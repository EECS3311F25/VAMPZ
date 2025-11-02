import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navbar />
      <TickerBar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
      <ChatButton />
    </div>
  );
}

export default App;
