'use client'

import { useRef, useEffect } from 'react'
import { buttonVariants } from "@/components/ui/button"
import Lottie from "lottie-react";

import { social } from '@/lib/data';
import logoAnimation from '@/lib/logoAnimation.json'
import NavMenu from './NavMenu';



const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null)

  const handleChangeNavBG = () => {
    if (window.scrollY >= 1) {
      navRef.current?.classList.add("backdrop-blur-lg", "shadow-sm")
    } else {
      navRef.current?.classList.remove("backdrop-blur-lg", "shadow-sm")
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleChangeNavBG);

    return () => {
      window.removeEventListener('scroll', handleChangeNavBG);
    };
  }, [])

  return (
    <nav
      ref={navRef}
      className='h-[70px] sticky top-0 left-0 z-50 py-2 flex items-center justify-center transition-all'
    >
      <div className='w-full px-2 lg:container grid lg:grid-cols-[4fr_2fr_3fr_1.5fr] grid-cols-2 h-full items-center gap-2'>
        {/* Logo */}
        <div className='min-h-[54px] w-full h-full dark:bg-darkgray flex items-center rounded-full px-5'>

          <div className='font-semibold select-none cursor-pointer relative w-fit h-full flex items-center justify-start'>
            <Lottie animationData={logoAnimation} loop={false} className='absolute -top-1/2 -translate-y-[35px] size-44 -left-[75px]' />

            <div className='ms-[40px] hidden md:block'>
              <span>Syuro</span>
              <span className='text-primary'>.dev</span>
            </div>
          </div>

          <div className='flex flex-col w-full justify-end z-10'>
            <span className='uppercase text-secondary-foreground text-xs font-semibold text-end line-clamp-1 opacity-75 pointer-events-none select-none'>fullstack</span>
            <span className='uppercase text-secondary-foreground text-xs font-semibold text-end line-clamp-1 opacity-75 pointer-events-none select-none'>web developer</span>
          </div>
        </div>

        {/* Social */}
        <div className='w-full h-full lg:flex items-center gap-1 hidden'>
          {
            social.map(item => {
              return (
                <a
                  key={item.name}
                  className={`${buttonVariants({ variant: "secondary" })} w-full !h-full !rounded-full`}
                  href={item.url}
                  target='_blank'
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              )
            })
          }
        </div>

        {/* Menu */}
        <div className='relative w-full h-full'>
          <NavMenu />
        </div>

        {/* <ThemeToggle /> */}

        {/* Contract */}
        <div className='hidden w-full h-full rounded-full dark:bg-primary dark:hover:bg-secondary transition-colors lg:flex items-center justify-center p-5 cursor-pointer'>
          <span className='uppercase font-semibold select-none pointer-events-none line-clamp-1'>contact me</span>
        </div>
      </div>
    </nav>
  )
}



export default Navbar