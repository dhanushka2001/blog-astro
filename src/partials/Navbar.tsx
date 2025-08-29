import { Logo, Section } from 'astro-boilerplate-components';

import MobileNav from '@/partials/MobileNav';
import SearchButton from '@/partials/SearchButton';
import ThemeSwitch from '@/partials/ThemeSwitch';
import { AppConfig } from '@/utils/AppConfig';

const navLinks = [
  { href: '/posts', label: 'Blog' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
];

const Navbar = () => (
  <div className="sticky top-0 z-50 bg-white py-0 dark:bg-slate-900">
    <Section>
      <div className="flex w-full items-center justify-between">
        {/* Left side - Logo */}
        <a href="/" className="flex items-center space-x-2">
          <Logo
            icon={
              <svg
                className="mr-1 size-10 stroke-cyan-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none"></path>
                <rect x="3" y="12" width="6" height="8" rx="1"></rect>
                <rect x="9" y="8" width="6" height="12" rx="1"></rect>
                <rect x="15" y="4" width="6" height="16" rx="1"></rect>
                <path d="M4 20h14"></path>
              </svg>
            }
            name={AppConfig.site_name}
          />
        </a>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4 sm:rounded-[40px] sm:border sm:border-gray-200 sm:px-4 sm:py-2 dark:sm:border-gray-700">
          {/* Desktop links (hidden on mobile) */}
          <div className="hidden items-center space-x-6 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons (always visible) */}
          <div className="flex items-center space-x-3">
            <SearchButton />
            <ThemeSwitch />
            {/* Only show hamburger on mobile */}
            <div className="sm:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

export { Navbar };
