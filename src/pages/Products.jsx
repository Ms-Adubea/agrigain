import { Link } from 'react-router-dom';
import { TrendingUp, Leaf, Users, ShoppingCart, ArrowRight } from 'lucide-react';

const Products = () => {
  const products = [
    {
      title: 'For Buyers',
      icon: ShoppingCart,
      subtitle: 'Source Premium Commodities',
      description: 'Access certified, high-quality agricultural commodities grown to your exact specifications by our network of professional farmers.',
      features: [
        'Quality Assurance & Certification',
        'Custom Specification Growing',
        'Reliable Supply Chain',
        'Direct Farm-to-Market',
        'Competitive Pricing',
        'Seasonal Planning Support'
      ],
      benefits: 'Guaranteed quality, consistent supply, and direct relationships with producers.',
      cta: 'Start Buying'
    },
    {
      title: 'For Growers',
      icon: Leaf,
      subtitle: 'Access Global Markets',
      description: 'Join our network of successful farmers and gain access to premium inputs, expert guidance, and guaranteed markets for your produce.',
      features: [
        'Free Premium Inputs',
        'Expert Agricultural Training',
        'Guaranteed Buyer Network',
        'Premium Price Guarantees',
        'Technical Support',
        'Insurance Coverage'
      ],
      benefits: 'Increased yields, higher profits, and reduced farming risks with full support.',
      cta: 'Join as Farmer'
    },
    {
      title: 'For Vendors',
      icon: Users,
      subtitle: 'Supply Growing Network',
      description: 'Supply tools, fertilizers, seeds, and services to our rapidly expanding network of productive and profitable farmers.',
      features: [
        'Growing Customer Base',
        'Guaranteed Payment Terms',
        'Bulk Order Opportunities',
        'Long-term Contracts',
        'Market Intelligence',
        'Partnership Support'
      ],
      benefits: 'Stable revenue streams and growing market reach with reliable farmers.',
      cta: 'Supply Inputs'
    },
    {
      title: 'For Investors',
      icon: TrendingUp,
      subtitle: 'Earn While Making Impact',
      description: 'Fund agricultural projects and earn attractive returns up to 25% in 6 months while supporting sustainable agriculture and community development.',
      features: [
        'Up to 25% ROI in 6 Months',
        'Full Insurance Coverage',
        'Transparent Project Tracking',
        'Quarterly Payout Options',
        'Impact Reporting',
        'Portfolio Diversification'
      ],
      benefits: 'Guaranteed returns with measurable social and environmental impact.',
      cta: 'Start Investing'
    }
  ];

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Products & Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for every stakeholder in the agricultural value chain. 
              Join thousands who are already benefiting from our integrated platform.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {products.map((product, index) => (
                <div key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <product.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-2xl">{product.title}</div>
                        <p className="text-primary-600 font-medium">{product.subtitle}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <div className="h-2 w-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-primary-800">
                        <strong>Why Choose This:</strong> {product.benefits}
                      </p>
                    </div>

                    <button asChild className="w-full">
                      <Link to="/signup">
                        {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div>
                  <p className="text-gray-600 mb-4 italic">
                    "Through Agrigain, I've increased my farm's productivity by 200% and now have guaranteed buyers for all my produce."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <Leaf className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Akosua Mensah</p>
                      <p className="text-sm text-gray-600">Tomato Farmer, Ashanti</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div>
                  <p className="text-gray-600 mb-4 italic">
                    "My investment in Agrigain returned 23% in just 5 months while supporting local farmers. It's impact investing at its best."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold">David Osei</p>
                      <p className="text-sm text-gray-600">Angel Investor, Accra</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div>
                  <p className="text-gray-600 mb-4 italic">
                    "Agrigain provides the consistent, quality supply we need for our processing facility. The direct farm connection is invaluable."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <ShoppingCart className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Grace Nkrumah</p>
                      <p className="text-sm text-gray-600">Food Processor, Tema</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
