import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRegister } from '../services/auth';
import Swal from 'sweetalert2';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const userTypeDescriptions = {
    investor: 'Fund agricultural projects and earn up to 25% ROI.',
    grower: 'Access inputs, training, and guaranteed markets.',
    buyer: 'Source certified commodities grown to specification.',
    vendor: 'Supply tools and services to growing farms.'
  };

   const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check (optional client-side validation)
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The passwords you entered do not match.',
      });
      return;
    }

    if (!formData.agreeToTerms) {
      Swal.fire({
        icon: 'error',
        title: 'Terms Not Accepted',
        text: 'You must agree to the terms and conditions to proceed.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData to handle file upload
      const formDataObj = new FormData();
      formDataObj.append('firstName', formData.firstName);
      formDataObj.append('lastName', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('role', formData.role);
      
      // Append avatar if selected
      if (fileInputRef.current.files[0]) {
        formDataObj.append('avatar', fileInputRef.current.files[0]);
      }

      const response = await apiRegister(formDataObj);

      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        confirmButtonText: 'Continue to Login'
      });
      
      navigate("/login");

    } catch (err) {
      console.error("Error:", err);
      
      let errorMessage = "An error occurred during registration.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
            <h1 className="text-3xl font-bold text-green-700">Agrigain</h1>
          </div>
          <p className="text-gray-600">Create your account and start your agricultural journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div 
              className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden cursor-pointer relative"
              onClick={triggerFileInput}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={triggerFileInput}
              className="text-sm text-green-600 hover:text-green-800"
            >
              {avatarPreview ? 'Change Avatar' : 'Add Avatar (Optional)'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Rest of your form fields remain the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>
                  <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="+233 XX XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">I want to join as a...</label>
            <select
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Select your role</option>
              <option value="investor">Investor</option>
              <option value="grower">Grower (Farmer)</option>
              <option value="buyer">Buyer</option>
              <option value="vendor">Vendor (Supplier)</option>
            </select>
            {formData.role && (
              <p className="mt-2 text-sm text-gray-600 italic">{userTypeDescriptions[formData.role]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              required
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="/terms" className="text-green-600 underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-green-600 underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
              formData.agreeToTerms && !isLoading 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!formData.agreeToTerms || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;