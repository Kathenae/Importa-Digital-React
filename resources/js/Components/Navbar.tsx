import { Link } from '@inertiajs/react';
import Logo from '../../images/logo-bg.png';
import { useState } from 'react';
import { User } from '@/types';

export const Navbar = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className='flex items-center justify-center relative z-50 h-44 bg-secondary-base text-white'>
      <Link href={route('home')}>
        <img src={Logo} width={120} height={120} alt='logo' />
      </Link>
      <button type='button' onClick={toggle} className='absolute top-7 right-4 transition hover:opacity-75 lg:hidden'>
        <i className='i-lucide-menu h-10 w-10' />
      </button>
      <Link as='button' method={user ? 'post' : 'get'} href={user ? route('logout') : route('login')} className='absolute z-50 top-7 right-4 transition hover:opacity-75 hidden lg:flex items-center space-x-2 hover:cursor-pointer'>
        {user != null ?
          <>
            <i className='i-mdi-log-out h-10 w-10' />
            <span className='font-bold uppercase'>Salir</span>
          </>
          :
          <>
            <i className='i-mdi-login h-10 w-10' />
            <span className='font-bold uppercase'>Ingressar</span>
          </>
        }
      </Link>
      <ul className={`flex flex-col text-lg font-bold uppercase transition-all fixed top-0 ${isOpen ? 'left-0' : '-left-[2000px]'} lg:left-0 h-full w-full p-4 gap-y-4 bg-secondary-base lg:bg-transparent items-start  lg:flex-row lg:items-end lg:justify-center lg:pb-4 lg:gap-x-6 lg:h-full lg:w-full lg:absolute`}>
        <button type='button' onClick={toggle} className='absolute top-7 right-4 transition hover:opacity-75 lg:hidden'>
          <i className='i-lucide-x h-10 w-10' />
        </button>
        <li className='flex flex-col lg:items-center gap-y-2 hover:opacity-50 transition'>
          <Link href={route('home')} className='line-clamp-1'>Home</Link>
          <span className='block w-10 h-[4px] rounded-xl from-primary-base bg-gradient-to-br to-primary-accent' />
        </li>
        <li className='flex flex-col lg:items-center gap-y-2 hover:opacity-50 transition'>
          <Link href={route('courses')} className='line-clamp-1'>Nuestros Cursos</Link>
          <span className='block w-10 h-[4px] rounded-xl from-primary-base bg-gradient-to-br to-primary-accent' />
        </li>
        <li className='lg:mx-16'></li>
        <li className='flex flex-col lg:items-center gap-y-2 hover:opacity-50 transition'>
          <Link href={route('courses.lessons')} className='line-clamp-1'>Acceder Classes</Link>
          <span className='block w-10 h-[4px] rounded-xl from-primary-base bg-gradient-to-br to-primary-accent' />
        </li>
        <li className='flex flex-col lg:items-center gap-y-2 hover:opacity-50 transition'>
          <Link href={route('home') + "#contacto"} className='line-clamp-1'>Contacto</Link>
          <span className='block w-10 h-[4px] rounded-xl from-primary-base bg-gradient-to-br to-primary-accent' />
        </li>
        <li className='flex flex-col lg:items-center gap-y-2 hover:opacity-50 transition lg:hidden'>
          <Link as='button' method={user ? 'post' : 'get'} href={user ? route('logout') : route('login')} className='line-clamp-1'>{user ? 'Salir' : 'Ingressar'}</Link>
          <span className='block w-10 h-[4px] rounded-xl from-primary-base bg-gradient-to-br to-primary-accent' />
        </li>
      </ul>
    </nav>
  )
}