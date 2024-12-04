'use client';

import Link from 'next/link';
import { Home, User, LogIn, Rocket, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <aside className='w-64 bg-tbPastelGreen text-tbGreen h-screen fixed p-6 font-poppins'>
      {/* 상단 이미지 */}
      <div className='flex justify-center mb-6'>
        <Link href='/main'>
          <Image
            src='/img/turbinecrew.svg'
            alt='Turbine Crew Logo'
            width={200}
            height={70}
            className='cursor-pointer rounded-lg'
          />
        </Link>
      </div>

      {/* Separator */}
      <hr className='border-gray-300 mb-6' />

      {/* Navigation */}
      <nav>
        <ul className='space-y-4'>
          {/* Dashboard */}
          <li>
            <Link
              href='/main/dashboard'
              className='flex items-center space-x-4 hover:text-gray-600 group'
            >
              <div className='flex items-center justify-center w-10 h-10 bg-white text-tbGreen rounded-full group-hover:bg-tbGreen group-hover:text-white transition-colors duration-300'>
                <Home className='w-5 h-5' />
              </div>
              <span className='text-lg font-medium'>Dashboard</span>
            </Link>
          </li>

          {/* Trading */}
          <li>
            <Link
              href='/trading'
              className='flex items-center space-x-4 hover:text-gray-600 group'
            >
              <div className='flex items-center justify-center w-10 h-10 bg-white text-tbGreen rounded-full group-hover:bg-tbGreen group-hover:text-white transition-colors duration-300'>
                <TrendingUp className='w-5 h-5' />
              </div>
              <span className='text-lg font-medium'>Trading</span>
            </Link>
          </li>
        </ul>

        {/* Separator */}
        <hr className='border-gray-300 my-6' />

        {/* Account Pages Section */}
        <div>
          <h3 className='text-gray-600 text-sm font-semibold mb-4'>
            ACCOUNT PAGES
          </h3>
          <ul className='space-y-4'>
            {/* Profile */}
            <li>
              <Link
                href='/profile'
                className='flex items-center space-x-4 hover:text-gray-600 group'
              >
                <div className='flex items-center justify-center w-10 h-10 bg-white text-tbGreen rounded-full group-hover:bg-tbGreen group-hover:text-white transition-colors duration-300'>
                  <User className='w-5 h-5' />
                </div>
                <span className='text-lg font-medium'>Profile</span>
              </Link>
            </li>

            {/* Sign In */}
            <li>
              <Link
                href='/signin'
                className='flex items-center space-x-4 hover:text-gray-600 group'
              >
                <div className='flex items-center justify-center w-10 h-10 bg-white text-tbGreen rounded-full group-hover:bg-tbGreen group-hover:text-white transition-colors duration-300'>
                  <LogIn className='w-5 h-5' />
                </div>
                <span className='text-lg font-medium'>Sign In</span>
              </Link>
            </li>

            {/* Sign Up */}
            <li>
              <Link
                href='/signup'
                className='flex items-center space-x-4 hover:text-gray-600 group'
              >
                <div className='flex items-center justify-center w-10 h-10 bg-white text-tbGreen rounded-full group-hover:bg-tbGreen group-hover:text-white transition-colors duration-300'>
                  <Rocket className='w-5 h-5' />
                </div>
                <span className='text-lg font-medium'>Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
