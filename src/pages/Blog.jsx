import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'How Technology is Revolutionizing Agriculture in Ghana',
      excerpt: 'Discover how modern agricultural technologies are helping Ghanaian farmers increase yields and improve sustainability.',
      author: 'Samuel Nkrumah',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400'
    },
    {
      title: 'Investment Success Story: Tomato Farming in Kumasi',
      excerpt: 'Learn how a ₵10,000 investment in tomato farming generated 23% returns in just 5 months.',
      author: 'Ama Osei',
      date: '2024-03-10',
      readTime: '7 min read',
      category: 'Investment',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400'
    },
    {
      title: 'Supporting Women Farmers: Building Inclusive Agriculture',
      excerpt: 'How Agrigain is empowering women farmers across Ghana with training, resources, and market access.',
      author: 'Kwame Asante',
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400'
    },
    {
      title: 'Sustainable Farming Practices for Climate Resilience',
      excerpt: 'Exploring eco-friendly farming methods that protect the environment while maintaining productivity.',
      author: 'Samuel Nkrumah',
      date: '2024-02-28',
      readTime: '8 min read',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400'
    },
    {
      title: 'Market Insights: Crop Prices and Seasonal Trends',
      excerpt: 'Understanding market dynamics to make informed decisions about crop selection and timing.',
      author: 'Ama Osei',
      date: '2024-02-20',
      readTime: '4 min read',
      category: 'Market Analysis',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400'
    },
    {
      title: 'Community Development: Our 10% Impact Promise',
      excerpt: 'See how 10% of Agrigain profits are making a real difference in rural communities across Ghana.',
      author: 'Kwame Asante',
      date: '2024-02-15',
      readTime: '5 min read',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400'
    }
  ];

  const categories = ['All', 'Technology', 'Investment', 'Community', 'Sustainability', 'Market Analysis'];

  return (
    <>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agrigain Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest insights in agricultural investment, farming innovations, 
              and community impact stories from across Ghana.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-green-600 font-medium">Featured Story</span>
            </div>
            <div className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="bg-green-100 text-primary-700 px-3 py-1 rounded-full">
                      {blogPosts[0].category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">{blogPosts[0].author}</span>
                    </div>
                    <button>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button key={category} variant="outline" size="sm">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <div key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span className="bg-primary-100 text-green-700 px-2 py-1 rounded text-xs">
                        {post.category}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="text-lg leading-tight">
                      {post.title}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button variant="outline" className="w-full mt-4">
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with Agrigain
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Get the latest insights on agricultural investment, farming innovations, 
              and impact stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button size="lg" variant="secondary">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
