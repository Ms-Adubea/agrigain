import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import Swal from "sweetalert2";
import { apiLogin } from "../services/auth";
import { setAuthToken } from "../services/config"; // Import the token helper

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiLogin(formData);
      console.log("API Response:", response); // Debug log
      
      // Handle different response structures
      const token = response.token || response.accessToken;
      const role = response.user?.role || response.role;
      const userName = response.user?.firstName || response.firstName;

      // Store the authentication token
      if (token) {
        setAuthToken(token);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: userName ? `Welcome back, ${userName}!` : "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate based on role after a short delay to allow the success message to show
      setTimeout(() => {
        if (role && ["admin", "investor", "farmer", "buyer", "vendor"].includes(role)) {
          navigate(`/dashboard/${role}`);
        } else {
          // If no valid role, navigate to generic dashboard
          navigate("/dashboard");
        }
      }, 1600); // Slightly longer than the Swal timer

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || "Invalid credentials. Try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <h2 className="text-2xl font-bold text-green-700">Agrigain</h2>
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-800">
          Welcome Back
        </h3>
        <p className="text-sm text-center text-gray-500">
          Login to your Agrigain account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md transition flex items-center justify-center space-x-2 ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;