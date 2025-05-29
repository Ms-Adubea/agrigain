import { Link } from 'react-router-dom';
import { TrendingUp, Leaf, Users, ShoppingCart } from 'lucide-react';

const UserRoles = () => {
  const roles = [
    {
      title: 'Investors',
      icon: TrendingUp,
      description: 'Fund agricultural projects and earn up to 25% ROI in 6 months with full insurance coverage.',
      benefits: ['Guaranteed returns', 'Insured investments', 'Impact investing', 'Quarterly payouts'],
      cta: 'Start Investing',
      color: 'text-blue-600'
    },
    {
      title: 'Growers',
      icon: Leaf,
      description: 'Access premium inputs, expert support, and guaranteed markets for your agricultural produce.',
      benefits: ['Free inputs', 'Expert guidance', 'Guaranteed buyers', 'Premium prices'],
      cta: 'Join as Farmer',
      color: 'text-green-600'
    },
    {
      title: 'Buyers',
      icon: ShoppingCart,
      description: 'Source certified, high-quality commodities grown to your exact specifications.',
      benefits: ['Quality assurance', 'Custom specifications', 'Reliable supply', 'Direct from farm'],
      cta: 'Buy Produce',
      color: 'text-purple-600'
    },
    {
      title: 'Vendors',
      icon: Users,
      description: 'Supply tools, fertilizers, and services to our network of productive farmers.',
      benefits: ['Growing market', 'Reliable payments', 'Bulk orders', 'Long-term contracts'],
      cta: 'Supply Inputs',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Agricultural Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're looking to invest, grow, buy, or supply - Agrigain connects all stakeholders 
            in Ghana's agricultural value chain for mutual prosperity.
          </p>
        </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {roles.map((role) => (
    <div
      key={role.title}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
    >
      <role.icon className={`h-10 w-10 mx-auto mb-4 ${role.color}`} />
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{role.title}</h3>
      <p className="text-gray-600 mb-6">{role.description}</p>
      <ul className="text-sm text-gray-700 mb-6 space-y-2 text-left">
        {role.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        to="/signup"
        className="inline-block w-full text-white text-sm font-semibold py-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors duration-300"
      >
        {role.cta}
      </Link>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default UserRoles;