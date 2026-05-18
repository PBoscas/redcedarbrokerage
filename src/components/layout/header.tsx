'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { primaryNav } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isHomepage = pathname === '/';
  const showLight = isHomepage && !isScrolled;

  const handleMouseEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : isHomepage
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md'
        )}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between h-20" aria-label="Primary navigation">
            <Logo light={showLight} />

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {primaryNav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={item.children ? handleMouseLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm tracking-wide transition-colors duration-200 hover:opacity-100 inline-flex items-center gap-1',
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? showLight
                          ? 'text-white font-medium'
                          : 'text-cedar font-medium'
                        : showLight
                        ? 'text-white/80 hover:text-white'
                        : 'text-charcoal-light hover:text-charcoal'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={cn(
                        'h-3 w-3 transition-transform',
                        openDropdown === item.label && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2"
                          onMouseEnter={() => handleMouseEnter(item.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[220px]">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'block px-4 py-2.5 text-sm transition-colors',
                                  pathname === child.href
                                    ? 'text-cedar bg-cedar/5 font-medium'
                                    : 'text-charcoal hover:bg-sand-light hover:text-cedar'
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-all duration-200',
                  showLight
                    ? 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    : 'bg-cedar text-white hover:bg-cedar-dark'
                )}
              >
                Start the Conversation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className={cn('h-6 w-6', showLight ? 'text-white' : 'text-charcoal')} />
              ) : (
                <Menu className={cn('h-6 w-6', showLight ? 'text-white' : 'text-charcoal')} />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="pt-24 px-6 pb-8 h-full overflow-y-auto">
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                            className={cn(
                              'flex items-center justify-between w-full py-4 text-lg border-b border-border transition-colors',
                              pathname.startsWith(item.href)
                                ? 'text-cedar font-medium'
                                : 'text-charcoal hover:text-cedar'
                            )}
                          >
                            {item.label}
                            <ChevronDown className={cn(
                              'h-4 w-4 text-muted-foreground transition-transform',
                              mobileExpanded === item.label && 'rotate-180'
                            )} />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === item.label && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        'flex items-center justify-between py-3 pl-4 text-base border-b border-border/50 transition-colors',
                                        pathname === child.href
                                          ? 'text-cedar font-medium'
                                          : 'text-charcoal-light hover:text-cedar'
                                      )}
                                    >
                                      {child.label}
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between py-4 text-lg border-b border-border transition-colors',
                            pathname === item.href
                              ? 'text-cedar font-medium'
                              : 'text-charcoal hover:text-cedar'
                          )}
                        >
                          {item.label}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full py-4 bg-cedar text-white font-medium tracking-wide rounded"
                  >
                    Start the Conversation
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
