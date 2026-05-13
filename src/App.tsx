import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CredentialStrip } from './components/CredentialStrip';
import { ClosingSection } from './components/ClosingSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <CredentialStrip />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
