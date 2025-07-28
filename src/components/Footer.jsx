import React from 'react'

const Footer = () => {
  return (
  <footer className="w-full bg-gradient-to-b from-[#1B004D] to-[#2E0A6F] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    Restaurant Rating System
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                   Rate your favorite restaurants and discover new culinary experiences with our comprehensive restaurant rating system. Join our community of food enthusiasts and share your dining experiences today!   
                </p>
            </div>
            <div className="border-t border-[#3B1A7A]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                     ©2025. All rights reserved.
                </div>
            </div>
        </footer>
  )
}

export default Footer