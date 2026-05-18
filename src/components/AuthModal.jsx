import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, signup } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await signup(form.name, form.email, form.password);
      } else {
        result = await login(form.email, form.password);
      }

      if (result.success) {
        // Reset form & close modal
        setForm({ name: "", email: "", password: "" });
        onClose();
      } else {
        setError(result.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-card/90 border border-border/40 rounded-3xl p-6 md:p-8 shadow-2xl glass z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header Icon & Title */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                {isSignUp ? <UserPlus size={24} /> : <LogIn size={24} />}
              </div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {isSignUp
                  ? "Sign up to track purchases & template licenses"
                  : "Sign in to access your templates and custom setup support"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition text-sm"
                  />
                </div>
              </div>

              {/* Error Box */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium p-3 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/10 hover:opacity-95 hover:shadow-primary/25 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
                    <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                  </>
                )}
              </button>
            </form>

            {/* Toggle Footer link */}
            <div className="text-center mt-6 pt-4 border-t border-border/20 text-xs">
              <span className="text-muted-foreground">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
              </span>
              <button
                onClick={toggleMode}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
