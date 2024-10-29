import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";

const Home = () => {

    const [email, setEmail] = useState('');

    const templates = [
        { name: "Business Pro", category: "Business",image:"https://colorlib.com/wp/wp-content/uploads/sites/2/blo-business-website-template.jpg" },
        { name: "Creative Portfolio", category: "Portfolio",image:"https://colorlib.com/wp/wp-content/uploads/sites/2/8_best-portfolio-websites.jpg" },
        { name: "E-commerce Deluxe", category: "Online Store",image:"https://uicookies.com/wp-content/uploads/2018/03/coloshop-free-bootstrap-ecommerce-website-templates.jpg" },
        { name: "Blog Master", category: "Blog",image:"https://colorlib.com/wp/wp-content/uploads/sites/2/darrenhardy-personal-development-blog-with-wordpress.jpg" },
      ]


  return (
    <div className="flex flex-col min-h-screen ">
      <header className=" shadow-md sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to='/' className="text-2xl font-bold text-purple-600">
              Web<span className="text-blue-600">Craft</span>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/features" className="text-grey-600 hover:text-purple-600">Features</Link></li>
                <li><Link href="/templates" className="textgrey-600 hover:text-purple-600">Templates</Link></li>
                <li><Link href="/pricing" className="text-grey-600 hover:text-purple-600">Pricing</Link></li>
                <li><Link href="/resources" className="text-grey-600 hover:text-purple-600">Resources</Link></li>
              </ul>
            </nav>
            <div>
              <Link to='/login'>
              <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded mr-2 hover:bg-purple-600 hover:text-white transition-colors">Log In</button>
              </Link>
              <Link to='/signup'>
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </header>


      <main className="flex-grow">
      <section className="py-20 text-center bg-gradient-to-b from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Create Stunning Websites with WebCraft
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              No coding required. Build professional websites in minutes with our intuitive drag-and-drop builder.
            </p>
            <Link to='/signup'>
            <button className="px-8 py-4 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-700 transition-colors">
              Start Creating for Free
            </button>
            </Link>
          </div>
        </section>


        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose WebCraft?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Beautiful Templates", description: "Choose from hundreds of designer-made templates and customize to fit your brand." },
                { title: "Drag-and-Drop Editor", description: "Easy-to-use interface lets you create and customize your website with no coding knowledge." },
                { title: "Lightning Fast", description: "Optimized for speed and performance, ensuring your website loads quickly for visitors." },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-purple-100 to-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Powerful Design Tools</h3>
                <p className="text-gray-600 mb-4">
                  Create stunning layouts with our advanced design tools. Customize every aspect of your website to match your vision.
                </p>
                <ul className="space-y-2">
                  {["Drag-and-drop interface", "Responsive design", "Custom fonts and colors", "Image editing tools"].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Stunning Templates for Every Need</h2>
            <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Jump-start your website with our professionally designed templates. Customize them to fit your brand and vision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {templates.map((template, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="h-48">
                    <img src={template.image}/>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                View All Templates
              </button>
            </div>
          </div>
        </section>
 

         <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Create Your Dream Website?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of satisfied users who have built amazing websites with WebCraft.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded flex-grow max-w-sm"
                />
                <button className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                  Get Started for Free
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section> 
        </main>

        <footer className="bg-gray-100">
        <div className="container mx-[170px] px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px] ">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Templates</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Integrations</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">About Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Help Center</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Community</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Tutorials</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">Cookie Policy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-purple-600">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 -ml-40">
            <p className="text-center text-gray-500 -ml-15">
              © 2024 WebCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
        


    </div>
  )
}

export default Home
