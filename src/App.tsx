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
    <div className="relative min-h-screen" style={{ background: '#1a100a' }}>
      {/* Initial loading screen */}
      <LoadingScreen />

      {/* Secret Easter Egg - Bill Cipher triangle at top level to avoid clipping */}
      <SecretEasterEgg />

      {/* Floating anomalies background */}
      <FloatingAnomalies />

      {/* Main journal container - centered on dark desk */}
      <div className="relative mx-auto max-w-6xl pb-8">
        {/* Journal book with parchment background and shadow */}
        <div
          className="relative journal-page shadow-2xl"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 100px rgba(0,0,0,0.4)',
          }}
        >
          {/* Navigation */}
          <Navbar />

          {/* Journal sections */}
          <main className="relative">
            {/* Journal #1 - Hero & About (Crimson theme) */}
            <Journal1 />

            {/* Journal #2 - Projects (Blue theme with blacklight effect) */}
            <Journal2 />

            {/* Journal #3 - Gallery & Timeline (Purple theme - most chaotic) */}
            <Journal3 />
          </main>

          {/* Footer */}
          <footer className="relative bg-parchment-300 py-8 text-center border-t border-parchment-400/50">
            <p className="font-typewriter text-sm text-parchment-600/80">
              "Remember: Reality is an illusion, the universe is a hologram, buy gold, bye!"
            </p>
            <p className="mt-4 font-mono text-xs text-parchment-500/50">
              © {new Date().getFullYear()} Mystery Shack Archives
            </p>
          </footer>
        </div>
      </div>

      {/* Fixed sidebar - Weirdness Gauge */}
      <WeirdnessGauge />
    </div>
  );
}
