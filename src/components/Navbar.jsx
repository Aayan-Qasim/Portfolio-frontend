import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Trash2, ArrowRight, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "@/assets/profile.jpeg";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AuthModal from "./AuthModal.jsx";
import { toast } from "sonner";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#" className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.img
                  key="profile"
                  src={profileImg}
                  alt="AQ"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="w-9 h-9 rounded-full object-cover border-2 border-primary/40"
                />
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-bold text-gradient"
                >
                  AQ
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            
            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="p-2 rounded-full border border-border/40 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all flex items-center justify-center w-9 h-9"
                    title={user.name}
                  >
                    <User size={18} />
                  </button>
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-card border border-border/40 rounded-xl p-3.5 shadow-2xl glass flex flex-col gap-2.5 z-50"
                      >
                        <div className="text-left border-b border-border/20 pb-2 mb-1.5">
                          <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-all text-left"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 rounded-full border border-border/40 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all flex items-center justify-center w-9 h-9"
                  title="Sign In"
                >
                  <User size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Cart Icon (Mobile) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Profile Action (Mobile) */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-2 rounded-full border border-border/40 text-muted-foreground hover:text-primary transition-all flex items-center justify-center w-9 h-9"
                  title={user.name}
                >
                  <User size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 rounded-full border border-border/40 text-muted-foreground hover:text-primary transition-all flex items-center justify-center w-9 h-9"
                  title="Sign In"
                >
                  <User size={18} />
                </button>
              )}

              {/* Mobile Profile Dropdown Overlay */}
              <AnimatePresence>
                {isAuthenticated && profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-44 bg-card border border-border/40 rounded-xl p-3 shadow-2xl glass flex flex-col gap-2 z-50"
                  >
                    <div className="text-left border-b border-border/20 pb-1.5 mb-1">
                      <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-[11px] font-semibold text-destructive hover:bg-destructive/10 transition-all text-left"
                    >
                      <LogOut size={13} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile toggle */}
            <button
              className="text-foreground p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border/30 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      const el = document.querySelector(l.href);
                      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border/40 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30 bg-secondary/20">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-primary" size={22} />
                  <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-medium">
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body / Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-80">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <ShoppingCart size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground mt-1">Explore our projects shop to add premium assets!</p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        const el = document.querySelector("#shop");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-5 py-2.5 bg-primary/10 text-primary text-sm font-semibold rounded-xl hover:bg-primary/20 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass rounded-xl p-4 flex gap-4 border border-border/30 hover:border-primary/20 transition-colors group relative"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-border/50 bg-secondary/50">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-xs text-muted-foreground font-mono mt-0.5 block">
                            {item.price}
                          </span>
                        </div>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          {item.techs.slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] bg-primary/5 text-primary px-1.5 py-0.5 rounded-full font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all opacity-80 hover:opacity-100"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-border/30 bg-secondary/10 space-y-4">
                  {/* Totals */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-mono font-bold text-lg text-primary">
                      ${cartItems.reduce((acc, curr) => acc + parseFloat(curr.price.replace("$", "")), 0).toFixed(2)}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all"
                    >
                      <span>Proceed to Payout</span>
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full py-2.5 text-xs text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1.5 transition-colors border border-dashed border-border/40 rounded-xl hover:bg-muted/40"
                    >
                      <Trash2 size={13} />
                      <span>Clear All Items</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
