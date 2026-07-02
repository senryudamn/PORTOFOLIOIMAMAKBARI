import LoadingScreen from './components/LoadingScreen';
import FloatingAnomalies from './components/FloatingAnomalies';
import Navbar from './components/Navbar';
import Journal1 from './components/Journal1';
import Journal2 from './components/Journal2';
import Journal3 from './components/Journal3';
import WeirdnessGauge from './components/WeirdnessGauge';
import SecretEasterEgg from './components/SecretEasterEgg';

export default function App() {
  return (
    <div className="relative min-h-screen bg-neutral-900">
      {/* Initial loading screen */}
      <LoadingScreen />

      {/* Floating anomalies background */}
      <FloatingAnomalies />

      {/* Main desk/journal area */}
      <div className="relative mx-auto lg:mr-20 xl:mr-24">
        {/* Navigation */}
        <Navbar />

        {/* Journal sections styled as a desk */}
        <main className="relative">
          {/* Journal #1 - Hero & About (Crimson theme) */}
          <Journal1 />

          {/* Journal #2 - Projects (Blue theme with blacklight effect) */}
          <Journal2 />

          {/* Journal #3 - Gallery & Timeline (Purple theme - most chaotic) */}
          <Journal3 />
        </main>

        {/* Footer */}
        <footer className="relative bg-neutral-900 py-8 text-center">
          <p className="font-typewriter text-sm text-parchment-400/50">
            "Remember: Reality is an illusion, the universe is a hologram, buy gold, bye!"
          </p>
          <p className="mt-4 font-mono text-xs text-parchment-400/30">
            © {new Date().getFullYear()} Mystery Shack Archives
          </p>
        </footer>
      </div>

      {/* Fixed sidebar - Weirdness Gauge */}
      <WeirdnessGauge />

      {/* Hidden Easter Egg - Bill Cipher */}
      <SecretEasterEgg />
    </div>
  );
}
