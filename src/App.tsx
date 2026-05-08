import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { TestimonialStack } from './components/TestimonialStack';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <TestimonialStack />
        <section className="px-6 sm:px-10 lg:px-14 py-32 text-center text-ivory/60">
          <p className="font-display italic text-2xl">[ Closing — coming up ]</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
