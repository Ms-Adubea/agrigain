import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const ContactPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-xl text-gray-600">
        Get in touch with our team. We're here to help you grow.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>General Inquiry</option>
              <option>Partnership</option>
              <option>Technical Support</option>
              <option>Investment Opportunity</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tell us how we can help you..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-medium transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">123 Agricultural Hub, Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+233 24 123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">hello@agrigain.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Website</p>
                <p className="text-gray-600">www.agrigain.com</p>
              </div>
            </div>
          </div>
        </div>

       {/* Social Media */}
<div className="bg-white rounded-lg shadow-lg p-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    <a
      href="https://facebook.com/agrigain" // Replace with your actual page
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-600 transition-colors"
    >
      <FaFacebookF className="h-5 w-5" />
    </a>
    <a
      href="https://twitter.com/agrigain"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-400 transition-colors"
    >
      <FaTwitter className="h-5 w-5" />
    </a>
    <a
      href="https://instagram.com/agrigain"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-pink-600 transition-colors"
    >
      <FaInstagram className="h-5 w-5" />
    </a>
    <a
      href="https://linkedin.com/company/agrigain"
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-blue-700 transition-colors"
    >
      <FaLinkedinIn className="h-5 w-5" />
    </a>
  </div>
</div>

      </div>
    </div>
  </div>
);

export default ContactPage