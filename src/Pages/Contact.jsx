import React from 'react'

const Contact = () => {
 return (
        <div className="flex items-center justify-center h-screen">
          <form className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Need Help? Contact Us</h2>
            <label htmlFor="email">Email</label>
            <input id="email" className="w-full border mt-1 border-gray-500/30 outline-none rounded p-2" type="email" placeholder="Enter your email" required />
            <textarea rows="4" id="msg" className="w-full border mt-3 resize-none border-gray-500/30 outline-none rounded p-2" placeholder="Your Message..." required></textarea>
            <button type="submit" className="w-full my-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded text-white">Send Message</button>
        </form>
        </div>
    );
}

export default Contact