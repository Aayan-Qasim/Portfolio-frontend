import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading.jsx";
import { ShoppingCart, Eye, Trash2 } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

const ShopSection = () => {
  const { addToCart, removeFromCart, isItemInCart } = useCart();

  return (
    <section id="shop" className="section-padding bg-card/10 border-t border-border/10">
      <div className="container mx-auto">
        <SectionHeading title="Premium Templates Shop" subtitle="Own my highly optimized, responsive source codes" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p, i) => {
            const inCart = isItemInCart(p.id);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-xl overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-300 group"
              >
                {/* Product Image & Hover Overlay */}
                <div className="relative h-56 overflow-hidden bg-secondary/30">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Glass Blur Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 px-6">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => (inCart ? removeFromCart(p.id) : addToCart(p))}
                      className={`w-full max-w-[200px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        inCart
                          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20"
                          : "bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Trash2 size={16} />
                          <span>Remove from Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* View Button */}
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full max-w-[200px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-semibold transition-all"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <span className="text-lg font-mono font-bold text-primary">{p.price}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.techs.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
