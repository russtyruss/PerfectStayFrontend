import Recommendation from './DashboardUtil/Recommendation';
import RoomSearch from './DashboardUtil/RoomSearch';

export default function CustomerDashboard() {
  

  const HeroSection = () => (
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
            Forget Busy Work, <br />
            Start Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Vacation</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            We give you everything you need to enjoy your holiday with family.  
            It's time to create another memorable moment.
          </p>

          <button className="px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-xl hover:opacity-90 transition-all">
            Explore Rooms
          </button>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Vacation room"
            className="rounded-3xl shadow-2xl border border-gray-200"
          />
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <HeroSection />

      {/* SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <RoomSearch />
      </div>

      {/* RECOMMENDATIONS */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Recommendation/>
      </div>
    </div>
  );
}
