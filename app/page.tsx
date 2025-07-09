import HomeMotion from './_components/Home';
import ModelsMotion from './models/_components/Models';

export default function HomePage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="min-h-screen">
        <HomeMotion />
      </section>

      {/* Models Gallery Section */}
      <section className="min-h-screen">
        <ModelsMotion />
      </section>
    </div>
  );
}
