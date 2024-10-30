import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';


const Login = ({setisloggedin,setEmail}) => {


    // const [email, setEmail] = useState('');
    const [localEmail, setlocalEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      // Add login logic here
      setEmail(localEmail)
      setisloggedin(true);
      // toast.success("Logged in");
      
      navigate('/dashboard');
    };
  return (
    

    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-purple-50 to-white py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={localEmail}
                onChange={(e) => setlocalEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login
