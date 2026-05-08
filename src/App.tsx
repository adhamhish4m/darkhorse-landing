import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        {/* Hero — built in Task 11 */}
        <section className="px-6 sm:px-10 lg:px-14 py-32 text-center text-ivory/60">
          <p className="font-display italic text-2xl">[ Hero — coming up ]</p>
        </section>

        {/* Testimonials — built in Task 14 */}
        <section className="px-6 sm:px-10 lg:px-14 py-32 text-center text-ivory/60">
          <p className="font-display italic text-2xl">[ Testimonials — coming up ]</p>
        </section>

        {/* Closing — built in Task 16 */}
        <section className="px-6 sm:px-10 lg:px-14 py-32 text-center text-ivory/60">
          <p className="font-display italic text-2xl">[ Closing — coming up ]</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
