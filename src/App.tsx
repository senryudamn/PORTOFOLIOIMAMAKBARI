import MountainBackground from './components/MountainBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-ash-200 selection:bg-platinum/30">
      {/* Fixed, parallax mountain peaks behind all content */}
      <MountainBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Awards />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}
