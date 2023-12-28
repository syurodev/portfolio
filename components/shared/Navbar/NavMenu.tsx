import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ThemeToggle } from '../ThemeToggle'
import { menuLinks, social } from '@/lib/data';
import style from './navbar.module.css'

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => (
    {
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.65,
        // opacity: { duration: 1 },
        delay: 0.2 + (i * 0.1),
        ease: [0.76, 0, 0.24, 1]
      }
    }
  ),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const slideIn = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: (i: number) => (
    {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        // opacity: { duration: 1 },
        delay: 0.6 + (i * 0.1),
        ease: [0.76, 0, 0.24, 1]
      }
    }
  ),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const NavMenu = () => {
  const menuBtnRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const variants = {
    open: {
      width: menuBtnRef.current?.getBoundingClientRect() && menuBtnRef.current?.getBoundingClientRect()?.width >= 300 ? menuBtnRef.current?.getBoundingClientRect()?.width + 10 : 400,
      height: 600,
      top: "-5px",
      right: "-5px",
      borderRadius: "32px",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      borderRadius: "32px",
      transition: { duration: 0.5, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    }
  }

  return (
    <>
      <div
        className="w-full h-full rounded-full transition-colors relative cursor-pointer overflow-hidden z-30"
        ref={menuBtnRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <motion.div
          className='w-full h-full relative'
          animate={{ top: isMenuOpen ? "-100%" : 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={`bg-mediumgray w-full h-full p-5 ${style.el}`}>
            <PerspectiveText label="Menu" className="text-primary-foreground" />
            {/* <div className='absolute size-2 top-5 right-20 bg-background rounded-full transition-all'></div>
            <div className='absolute size-4 top-6 right-14 bg-background rounded-full transition-all'></div>
            <div className='absolute size-2 top-5 right-10 bg-background rounded-full transition-all'></div>
            <div className='absolute size-4 top-6 right-4 bg-background rounded-full transition-all'></div> */}
          </div>

          <div className={`bg-background absolute top-full w-full h-full p-5 ${style.el}`}>
            <PerspectiveText label="Close" className="text-white" />
            {/* <div className='absolute size-2 top-7 right-20 bg-lightgray rounded-full transition-all'></div>
            <div className='absolute size-4 top-4 right-14 bg-lightgray rounded-full transition-all'></div>
            <div className='absolute size-2 top-7 right-10 bg-lightgray rounded-full transition-all'></div>
            <div className='absolute size-4 top-4 right-4 bg-lightgray rounded-full transition-all'></div> */}
          </div>
        </motion.div>
      </div>

      <motion.div
        className='max-w-[500px] h-[600px] bg-primary absolute z-20 overflow-hidden'
        variants={variants}
        animate={isMenuOpen ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {
            isMenuOpen && (
              <div className='h-full w-full p-[100px_40px_50px_40px] box-border flex flex-col justify-between'>
                <div className='flex flex-col gap-4'>
                  {
                    menuLinks.map((item, index) => {
                      return (
                        <div
                          key={item.name}
                          className={`${style.linkContainer}`}
                        >
                          <motion.div
                            variants={perspective}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={index}
                          >
                            {
                              item.type === "link" ? (
                                <a
                                  href={item.url}
                                  target='_blank'
                                  rel="noopener noreferrer"
                                  className='text-4xl font-semibold'
                                >
                                  {item.name}
                                </a>
                              ) : (
                                item.url
                              )
                            }
                          </motion.div>
                        </div>
                      )
                    })
                  }
                </div>

                {/* footer */}
                <div className='flex justify-between w-full'>
                  {
                    social.map((item, index) => {
                      return (
                        <div
                          key={item.name}
                          className={`${style.linkContainer} w-1/2`}
                        >
                          <motion.div
                            variants={slideIn}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={index}
                          >
                            <a
                              href={item.url}
                              target='_blank'
                              rel="noopener noreferrer"
                            >
                              {item.name}
                            </a>
                          </motion.div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default NavMenu

function PerspectiveText({ label, className = "" }: { label: string, className: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center flex-col ${style.perspectiveText}`}>
      <p className={`font-semibold ${className}`}>{label}</p>
      <p className={`font-semibold absolute ${className}`}>{label}</p>
    </div>
  )
}