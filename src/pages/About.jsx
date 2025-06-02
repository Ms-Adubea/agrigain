import { Leaf, Target, Heart, Users } from "lucide-react";
import man1 from "../assets/images/man1.jpg";
import man2 from "../assets/images/man2.jpg";
import woman from "../assets/images/woman.jpg";


const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Building agricultural systems that protect our environment for future generations.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "Creating measurable positive change in farmer livelihoods and food security.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Supporting rural communities with 10% of profits going to development projects.",
    },
    {
      icon: Users,
      title: "Inclusion",
      description:
        "Focusing on youth and women farmers to create diverse agricultural leadership.",
    },
  ];

  const team = [
  {
    name: "Martin Kwaku Adjei",
    role: "Team Lead",
    description:
      "Martin is a business advisor who has helped numerous start-ups get off the ground and thrive.",
    image: man2,
  },
  {
    name: "Albert Kwashie Amudzi (AKA Farms)",
    role: "Technical Advisor/Farms Manager",
    description:
      "Albert is a crop farmer with over 3 decades of experience and provides technical support across Ghana and beyond.",
    image: man1,
  },
  {
    name: "Jacqueline Osei Bonsu",
    role: "Markets Liaison Officer",
    description:
      "Jacqueline is a marketer experienced in sourcing buyers from various markets.",
    image: woman,
  },
  {
    name: "Jermaine Sidney Parkins",
    role: "Markets Liaison Officer",
    description:
      "Jermaine is a business communication expert working with start-ups in Ghana.",
    image: man2,
  },
];


  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Agrigain
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing Ghana's agricultural sector by connecting
              farmers, investors, vendors, and buyers in a sustainable ecosystem
              that benefits everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To improve farmer livelihoods, build sustainable food systems,
                and provide attractive returns to investors by connecting all
                stakeholders in the agricultural value chain. We focus
                particularly on supporting youth and women farmers while
                ensuring 10% of our profits contribute to community development.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To become West Africa's leading agricultural investment
                platform, creating a future where farming is profitable,
                sustainable, and accessible to all. We envision thriving rural
                communities with food security, economic prosperity, and
                environmental stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How Agrigain Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Investors Fund
              </h3>
              <p className="text-gray-600 text-sm">
                Investors provide capital for agricultural projects with
                guaranteed returns and insurance coverage.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Farmers Grow</h3>
              <p className="text-gray-600 text-sm">
                Farmers receive inputs, training, and support to grow
                high-quality produce to specification.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Buyers Purchase
              </h3>
              <p className="text-gray-600 text-sm">
                Buyers get certified, high-quality commodities directly from our
                network of farmers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Everyone Wins
              </h3>
              <p className="text-gray-600 text-sm">
                Profits are shared with investors, farmers prosper, and 10% goes
                to community development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <div>
                  <value.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center text-white p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm italic text-green-200">{member.role}</p>
                  <p className="text-sm mt-2">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
