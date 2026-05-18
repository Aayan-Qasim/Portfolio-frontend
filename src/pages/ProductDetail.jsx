import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Trash2, ShieldCheck, Zap, Globe, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, isItemInCart } = useCart();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const p = products.find((item) => item.id === id);

  if (!p) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6 pt-20">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <Trash2 size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Product Not Found</h1>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              The project template you are looking for does not exist or has been removed.
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

  const inCart = isItemInCart(p.id);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        {/* Back Link */}
        <Link
          to="/#shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="glass rounded-2xl overflow-hidden border border-border/40 shadow-2xl relative">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-auto aspect-video md:aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Guarantee / trust info */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="glass rounded-xl p-3 text-center border border-border/20 flex flex-col items-center">
                <ShieldCheck size={20} className="text-primary mb-1.5" />
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider block">Clean Code</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">100% bugs-free</span>
              </div>
              <div className="glass rounded-xl p-3 text-center border border-border/20 flex flex-col items-center">
                <Zap size={20} className="text-primary mb-1.5" />
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider block">Fast Load</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">Optimized UI</span>
              </div>
              <div className="glass rounded-xl p-3 text-center border border-border/20 flex flex-col items-center">
                <Globe size={20} className="text-primary mb-1.5" />
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider block">Responsive</span>
                <span className="text-[9px] text-muted-foreground mt-0.5">Mobile friendly</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* Category tag & price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                  Premium Code Asset
                </span>
                <span className="text-3xl font-mono font-extrabold text-primary tracking-tight">
                  {p.price}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {p.title}
              </h1>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.techs.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Long Description */}
              <div className="prose prose-invert max-w-none text-muted-foreground mb-8">
                <p className="leading-relaxed text-base">{p.longDesc}</p>
              </div>

              {/* Key Features Bullet List */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                  What is included in the package:
                </h3>
                <ul className="space-y-3">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Checkout Options Panel */}
            <div className="glass rounded-2xl p-6 border border-border/40 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Dynamic Add to Cart / Remove */}
                <button
                  onClick={() => (inCart ? removeFromCart(p.id) : addToCart(p))}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    inCart
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Trash2 size={20} />
                      <span>Remove from Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Direct Connect WhatsApp */}
                <a
                  href={`https://wa.me/923075177781?text=Hi%20Aayan,%20I%20am%20interested%20in%20buying%20your%20project%20template:%20${encodeURIComponent(
                    p.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-semibold transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle size={20} />
                  <span>Discuss via WhatsApp</span>
                </a>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Instant delivery includes full source-code file setup, clean setup docs, and 30-day developer support!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductDetail;
