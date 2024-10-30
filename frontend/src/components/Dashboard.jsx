import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = ({email}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('John Doe');
    const [userRole, setUserRole] = useState('Web Developer');
    const [userEmail, setUserEmail] = useState('john.doe@webcraft.com');
    const [userSkills, setUserSkills] = useState(['HTML', 'CSS', 'JavaScript', 'React']);
    const [currentProject, setCurrentProject] = useState('E-commerce Platform Redesign');
    const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li><a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Dashboard</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Projects</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Settings</a></li>
            <li>
            <Link to='/builder'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                New Project
              </button>
            </Link>
              <button className="bg-white text-blue-500 mx-5 font-bold py-2 px-4 rounded border"
              onClick={()=>
                navigate('/')
              }>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">15</p>
            <p className="text-sm text-gray-500">+2 from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Avg. Completion</h3>
            <p className="text-3xl font-bold text-purple-600">92%</p>
            <p className="text-sm text-gray-500">+5% from last quarter</p>
          </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Start from Scratch</h3>
              <p className="text-gray-600 mb-4">Create a custom project tailored to your needs.</p>
              <Link to='/builder'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                Create Custom Project
              </button>'
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Use a Template</h3>
              <p className="text-gray-600 mb-4">Get started quickly with pre-built templates.</p>
              <select className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 mb-4">
                <option>E-commerce Site</option>
                <option>Portfolio</option>
                <option>Blog</option>
                <option>Landing Page</option>
              </select>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                Use Selected Template
              </button>
            </div>
          </div>
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Information</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                    {isEditing ? 'Save' : 'Edit Info'}
            </button>
          </div>
          <div className="flex items-center space-x-4">
        <img src="/placeholder.svg?height=100&width=100" alt="User Avatar" className="w-20 h-20 rounded-full" />
        <div>
        {isEditing ? (
            <>
            <input 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-xl font-semibold mb-1 border rounded px-2 py-1"
            />
            <input 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="text-gray-600 mb-1 border rounded px-2 py-1"
            />
            <input 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-sm text-gray-500 border rounded px-2 py-1"
            />
            </>
        ) : (
            <>
            <h3 className="text-xl font-semibold">{userName}</h3>
            <p className="text-gray-600">{userRole}</p>
            <p className="text-sm text-gray-500">{email}</p>
            </>
        )}
        </div>
        </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                <h4 className="font-semibold">Current Project</h4>
                <p className="text-sm text-gray-600 mt-2">E-commerce Platform Redesign</p>
                </div>
            </div>
            </div>
      </main>


      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Webcraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
