
import Hero from '../components/Hero';
import UserRoles from '../components/UserRoles';


const Home = () => {
  return (
    <>
      <Hero />
      <UserRoles />
      
      {/* Impact Section */}
      <section className="py-20 bg-gray-50 text-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Creating Sustainable Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10%</div>
              <p className="text-green-500">of profits go to community development</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-green-500">farmers supported with youth & women focus</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-green-500">commitment to sustainable food systems</p>
            </div>
          </div>
        </div>
      </section>
      </>
  );
};

export default Home;