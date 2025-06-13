import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Make sure to install sweetalert2

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#008236'
      });
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/movwaykk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully. We will get back to you soon.',
          confirmButtonColor: '#008236'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send message. Please try again later.',
          confirmButtonColor: '#008236'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'An error occurred. Please check your internet connection and try again.',
        confirmButtonColor: '#008236'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-100 to-white text-gray-800" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side: Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-green-700">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            We’d love to hear from you! Whether you’re a farmer, investor, or just curious,
            feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="text-green-600" />
              <a href="tel:+233242225739" className="hover:underline text-gray-700">
                +233 242 225 739
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-green-600" />
              <a href="mailto:martinsmcwhytes@gmail.com" className="hover:underline text-gray-700">
                martinsmcwhytes@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-green-600" />
              <span>Accra, Ghana</span>
            </div>
          </div>

           <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: Globe, name: 'Facebook', color: 'text-blue-600' },
              { icon: Globe, name: 'Twitter', color: 'text-blue-400' },
              { icon: Globe, name: 'Instagram', color: 'text-pink-600' },
              { icon: Globe, name: 'LinkedIn', color: 'text-blue-700' }
            ].map((social) => (
              <button
                key={social.name}
                className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${social.color}`}
              >
                <social.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Right side: Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-green-100">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={4}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
