import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react';

const Investors = () => {
  const investmentProcess = [
    {
      step: '1',
      title: 'Sign Up & Verify',
      description: 'Create your investor account and complete our simple verification process.'
    },
    {
      step: '2',
      title: 'Choose Projects',
      description: 'Browse available agricultural projects and select those that match your investment goals.'
    },
    {
      step: '3',
      title: 'Fund & Track',
      description: 'Invest your desired amount and track project progress through our transparent dashboard.'
    },
    {
      step: '4',
      title: 'Earn Returns',
      description: 'Receive your returns plus principal after the harvest cycle, typically within 6 months.'
    }
  ];

  const faqs = [
    {
      question: 'How is my investment protected?',
      answer: 'All investments are fully insured through our partnership with leading agricultural insurance providers. Additionally, we conduct thorough due diligence on all farmers and projects.'
    },
    {
      question: 'What crops can I invest in?',
      answer: 'We focus on high-demand crops including tomatoes, maize, rice, soybeans, and vegetables. Each project specifies the crop type, growing season, and expected yields.'
    },
    {
      question: 'When do I receive my returns?',
      answer: 'Returns are typically paid out within 30 days of harvest completion, usually 4-6 months after investment. Some projects offer quarterly interim payments.'
    },
    {
      question: 'What is the minimum investment?',
      answer: 'The minimum investment varies by project but typically starts at ₵1,000. This allows for portfolio diversification across multiple projects.'
    }
  ];

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Invest in Ghana's Agricultural Future
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Earn attractive returns up to 25% in 6 months while supporting sustainable agriculture 
                  and community development. Your investment directly improves farmer livelihoods and food security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button asChild size="lg">
                    <Link to="/signup">
                      Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </button>
                  <button asChild variant="outline" size="lg">
                    <Link to="/about">Learn More</Link>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">Up to 25%</div>
                  <div className="text-gray-600">Annual Returns</div>
                </div>
                <div className="p-6 text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-600">Insured</div>
                </div>
                <div className="p-6 text-center">
                  <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">4-6</div>
                  <div className="text-gray-600">Months Cycle</div>
                </div>
                <div className="p-6 text-center">
                  <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">₵1,000</div>
                  <div className="text-gray-600">Min. Investment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              How Investment Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {investmentProcess.map((step, index) => (
                <div key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div>
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-xl">{step.step}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Invest with Agrigain?
                </h2>
                <div className="space-y-4">
                  {[
                    'Guaranteed returns with full insurance coverage',
                    'Direct impact on farmer livelihoods and food security',
                    'Transparent project tracking and regular updates',
                    'Diversified portfolio across multiple crops and farmers',
                    'Professional farm management and quality assurance',
                    'Contributing to sustainable agricultural development'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                <div>
                  <div className="text-2xl text-center">Investment Example</div>
                </div>
                <div className="text-center">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="text-sm text-gray-600">Initial Investment</div>
                      <div className="text-2xl font-bold text-gray-900">₵10,000</div>
                    </div>
                    <div className="border-b pb-4">
                      <div className="text-sm text-gray-600">Expected Return (20%)</div>
                      <div className="text-2xl font-bold text-green-600">₵2,000</div>
                    </div>
                    <div className="border-b pb-4">
                      <div className="text-sm text-gray-600">Investment Period</div>
                      <div className="text-2xl font-bold text-gray-900">6 Months</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Return</div>
                      <div className="text-3xl font-bold text-green-600">₵12,000</div>
                    </div>
                  </div>
                  <button asChild className="w-full mt-6">
                    <Link to="/signup">Start This Investment</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of investors who are already earning attractive returns while 
              supporting Ghana's agricultural transformation.
            </p>
            <button asChild size="lg" variant="secondary">
              <Link to="/signup">
                Create Investor Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Investors;
