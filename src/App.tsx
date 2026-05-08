import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { TestimonialStack } from './components/TestimonialStack';
import { ClosingSection } from './components/ClosingSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <TestimonialStack />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
