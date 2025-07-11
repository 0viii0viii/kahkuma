import ThreeDModels from './_components/3DModels';
import HomeMotion from './_components/Home';

export default function HomePage() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="min-h-screen">
        <HomeMotion />
      </section>

      <section className="min-h-screen">
        <ThreeDModels />
      </section>
    </div>
  );
}
