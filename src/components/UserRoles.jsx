import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      color: 'text-primary-600'
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
    <section className="py-20 bg-gray-50">
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
            <Card key={role.title} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <role.icon className={`h-12 w-12 mx-auto mb-4 ${role.color}`} />
                <CardTitle className="text-xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{role.description}</p>
                <ul className="space-y-2 mb-6">
                  {role.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link to="/signup">{role.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoles;