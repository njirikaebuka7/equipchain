import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImg from "@assets/Gemini_Generated_Image_mnnghgmnnghgmnng_1779629281298.png";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors duration-200 ${
      active ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

  const dropdownTriggerClass = (active: boolean) =>
    `flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
      active ? "text-primary" : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      {/* Sticky white navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center" data-testid="logo-link">
              <img
                src={logoImg}
                alt="EquipChain Global Ltd"
                className="h-11 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className={navLinkClass(location === "/")}>Home</Link>
              <Link href="/about" className={navLinkClass(location === "/about")}>About Us</Link>
              <Link href="/products" className={navLinkClass(location === "/products")}>Products</Link>

              <div className="relative group">
                <button className={dropdownTriggerClass(location.startsWith("/services") || location.startsWith("/industries") || location.startsWith("/capabilities"))}>
                  Services <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-52">
                  <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col p-2">
                    <Link href="/services" className="px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary rounded-lg transition-colors">Services Overview</Link>
                    <Link href="/industries" className="px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary rounded-lg transition-colors">Industries</Link>
                    <Link href="/capabilities" className="px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary rounded-lg transition-colors">Capabilities</Link>
                  </div>
                </div>
              </div>

              <Link href="/hse" className={navLinkClass(location === "/hse")}>HSE</Link>
              <Link href="/insights" className={navLinkClass(location.startsWith("/insights"))}>Insights</Link>
              <Link href="/contact" className={navLinkClass(location === "/contact")}>Contact Us</Link>
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none bg-[#f97316] text-white shadow-sm hover:bg-[#ea6500] h-10 px-6"
                data-testid="btn-request-quote"
              >
                Request a Quote
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none transition-colors"
              data-testid="btn-mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link onClick={closeMenu} href="/" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Home</Link>
              <Link onClick={closeMenu} href="/about" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">About Us</Link>
              <Link onClick={closeMenu} href="/products" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Products</Link>
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</p>
                <div className="space-y-1 pl-3 border-l-2 border-primary/20">
                  <Link onClick={closeMenu} href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Services Overview</Link>
                  <Link onClick={closeMenu} href="/industries" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Industries</Link>
                  <Link onClick={closeMenu} href="/capabilities" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Capabilities</Link>
                </div>
              </div>
              <Link onClick={closeMenu} href="/hse" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">HSE</Link>
              <Link onClick={closeMenu} href="/insights" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Insights</Link>
              <Link onClick={closeMenu} href="/contact" className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary">Contact Us</Link>
              <div className="pt-4 pb-2 px-3">
                <Link onClick={closeMenu} href="/request-quote" className="w-full flex items-center justify-center rounded-full text-base font-semibold bg-[#f97316] text-white hover:bg-[#ea6500] h-12 px-6">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#060731] text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

            <div className="lg:col-span-2">
              <div className="mb-6">
                <img src={logoImg} alt="EquipChain Global Ltd" className="h-12 w-auto brightness-0 invert" />
              </div>
              <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
                The trusted industrial partner keeping critical Nigerian operations moving. Dependable, professional, and rooted in real industry experience.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f97316] transition-colors text-sm font-bold"><span className="sr-only">LinkedIn</span>in</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f97316] transition-colors text-sm font-bold"><span className="sr-only">Twitter</span>tw</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f97316] transition-colors text-sm font-bold"><span className="sr-only">Facebook</span>fb</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Quick Links
              </h3>
              <ul className="space-y-3">
                {[["Home", "/"], ["About Us", "/about"], ["Products", "/products"], ["Services", "/services"], ["Industries", "/industries"], ["Capabilities", "/capabilities"], ["HSE", "/hse"]].map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-white/65 hover:text-[#f97316] transition-colors text-sm">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Our Services
              </h3>
              <ul className="space-y-3">
                {["Procurement & Supply", "Supply Chain & Logistics", "Oil & Gas Support", "Project Support", "Industrial Services"].map((s) => (
                  <li key={s}><Link href="/services" className="text-white/65 hover:text-[#f97316] transition-colors text-sm">{s}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f97316]"></span> Contact Info
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="text-white/65">
                  <strong className="text-white block mb-1">Address:</strong>
                  Aziom Plaza, Agege, Lagos State, Nigeria
                </li>
                <li className="text-white/65">
                  <strong className="text-white block mb-1">Email:</strong>
                  <a href="mailto:yolatoye@equipchainglobal.com" className="hover:text-[#f97316] transition-colors">yolatoye@equipchainglobal.com</a>
                </li>
                <li className="text-white/65">
                  <strong className="text-white block mb-1">Phone:</strong>
                  <a href="tel:+2348072072332" className="hover:text-[#f97316] transition-colors">+234 807 207 2332</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} EquipChain Global Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-white/40 hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
