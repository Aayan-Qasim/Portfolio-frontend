import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, Mail, User, ShieldCheck, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  
  // Form fields state
  const [form, setForm] = useState({
    email: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [cardType, setCardType] = useState("generic");
  const [processing, setProcessing] = useState(false);
  const [processStage, setProcessStage] = useState("");
  const [success, setSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + parseFloat(curr.price.replace("$", "")), 0);
  const platformFee = cartItems.length > 0 ? 2.50 : 0.00;
  const total = subtotal + platformFee;

  // Handle Card Type detection as user types
  useEffect(() => {
    const clean = form.cardNumber.replace(/\s+/g, "");
    if (clean.startsWith("4")) {
      setCardType("visa");
    } else if (clean.startsWith("5")) {
      setCardType("mastercard");
    } else if (clean.startsWith("3")) {
      setCardType("amex");
    } else {
      setCardType("generic");
    }
  }, [form.cardNumber]);

  // Card Number formatter (add space every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(" ") : "";
    setForm({ ...form, cardNumber: formatted });
  };

  // Expiry formatter (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setForm({ ...form, expiry: value });
  };

  // CVC formatter (3-4 digits max)
  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setForm({ ...form, cvc: value });
  };

  // Checkout submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Stripe mock processing flow
    setProcessing(true);
    setProcessStage("Connecting to Stripe Payment Gateway...");

    setTimeout(() => {
      setProcessStage("Authorizing Card Details (Test Mode)...");
      
      setTimeout(() => {
        setProcessStage(`Debiting total amount of $${total.toFixed(2)}...`);
        
        setTimeout(() => {
          setReceiptNumber(`ch_aayan_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
          setProcessing(false);
          setSuccess(true);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // Complete checkout & clear state
  const handleSuccessClose = () => {
    clearCart();
    navigate("/#shop");
  };

  if (cartItems.length === 0 && !success) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6 pt-20">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CreditCard size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Your Cart is Empty</h1>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Please add template assets from the shop before proceeding to payout.
            </p>
          </div>
          <Link
            to="/#shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        <Link
          to="/#shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Cancel and Return
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Secure Payout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Stripe Card Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-card/40 border border-border/40 rounded-2xl p-6 md:p-8 glass"
          >
            <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3ecf8e] animate-pulse" />
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  Stripe Test-Mode Integration
                </h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">SECURE SSL</span>
            </div>

            {/* Test Helper Info Panel */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-primary">💡 Test Checkout Instructions:</strong> Enter standard user details below. 
                Use card number <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold">4242 4242 4242 4242</code> with 
                any future date (e.g. <code className="bg-primary/10 text-primary px-1 py-0.5 rounded font-mono">12/29</code>) and CVV to successfully process the mock checkout.
              </p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Cardholder Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="M. Aayan Qasim"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
              </div>

              {/* Card Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full pl-10 pr-14 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono tracking-wider"
                  />
                  {/* Dynamic Brand Logo overlay */}
                  <span className="absolute right-4 top-3 text-[10px] font-extrabold uppercase font-mono px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 shrink-0 select-none">
                    {cardType}
                  </span>
                </div>
              </div>

              {/* Expiry and CVC Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleExpiryChange}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    CVC Code
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="123"
                    value={form.cvc}
                    onChange={handleCvcChange}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing Payout...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay ${total.toFixed(2)} Secured by Stripe</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
              <ShieldCheck size={16} className="text-[#3ecf8e]" />
              <span>AES 256-bit secure transaction. Verified developer license.</span>
            </div>
          </motion.div>

          {/* Right Column: Order Summary & Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-card/30 border border-border/30 rounded-2xl p-6 glass flex flex-col justify-between h-fit">
              <div>
                <h3 className="font-bold text-foreground border-b border-border/30 pb-4 mb-4">
                  Order Summary
                </h3>

                {/* Items List */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-border/50 bg-secondary/50">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                        <span className="text-xs text-primary font-mono block mt-0.5">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="border-t border-border/30 pt-6 mt-6 space-y-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Items subtotal</span>
                  <span className="font-mono text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Stripe processing & platform fee</span>
                  <span className="font-mono text-foreground">${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Taxes</span>
                  <span className="font-mono text-foreground">$0.00</span>
                </div>

                <div className="border-t border-dashed border-border/40 pt-4 flex items-center justify-between font-bold text-base mt-2">
                  <span>Grand Total</span>
                  <span className="font-mono text-primary text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Processing Overlay Screen */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-125 animate-pulse" />
              <Loader2 className="animate-spin text-primary relative" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Processing Secure Payout</h2>
            <p className="text-sm text-primary font-mono mt-3 max-w-sm transition-all duration-300">
              {processStage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Payment Success Dialog Screen */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-lg flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 20 }}
              className="glass rounded-3xl border border-border/40 p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl"
            >
              {/* background sparkle shapes */}
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-pulse" />

              <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md scale-110 animate-ping" style={{ animationDuration: "3s" }} />
                <CheckCircle2 size={40} className="relative" />
              </div>

              <h2 className="text-3xl font-extrabold text-foreground mb-2">Payment Successful!</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Thank you for your purchase. Your payment has been securely authorized and verified.
              </p>

              {/* Receipt details */}
              <div className="bg-secondary/40 border border-border/30 rounded-xl p-4 my-6 text-left space-y-2.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt ID</span>
                  <span className="text-foreground font-semibold truncate max-w-[200px]">{receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Charged</span>
                  <span className="text-primary font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-400 font-bold">PAID</span>
                </div>
                <div className="border-t border-border/30 pt-2.5 mt-2">
                  <span className="text-muted-foreground block mb-1">Purchased Code Items:</span>
                  <div className="space-y-1 text-foreground font-sans">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span>• {item.title}</span>
                        <span className="font-mono text-muted-foreground text-[10px]">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSuccessClose}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>Return to Home & Shop</span>
                </button>
                <p className="text-[10px] text-muted-foreground">
                  Need setup guidance? Check your email or message Aayan on WhatsApp with Receipt ID!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Checkout;
