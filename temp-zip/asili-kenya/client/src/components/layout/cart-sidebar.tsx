import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";
import { SHIPPING_COST, COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartSidebar() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    toggleCart, 
    itemCount, 
    subtotal 
  } = useCart();
  const [_, navigate] = useLocation();
  
  const handleCheckout = () => {
    toggleCart();
    navigate("/checkout");
  };
  
  const handleContinueShopping = () => {
    toggleCart();
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };
  
  return (
    <>
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleBackdropClick}
        ></div>
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-medium text-lg">
              Shopping Cart <span className="text-sm" style={{ color: COLORS.primary }}>{itemCount > 0 ? `(${itemCount} items)` : ""}</span>
            </h2>
            <button 
              className="text-gray-500 hover:text-primary"
              onClick={toggleCart}
              aria-label="Close cart"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {/* Empty cart message */}
            {items.length === 0 && (
              <div className="text-center py-12">
                <div 
                  className="w-20 h-20 rounded-full bg-neutral-light flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: COLORS.neutral.light }}
                >
                  <i className="fas fa-shopping-bag text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to your cart</p>
                <Button 
                  onClick={handleContinueShopping}
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
            
            {/* Cart items */}
            {items.length > 0 && (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start py-3 border-b border-gray-200">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          className="text-gray-400 hover:text-error"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{ backgroundColor: COLORS.neutral.light }}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{ backgroundColor: COLORS.neutral.light }}
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        <div className="font-semibold">KSh {(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-medium">KSh {subtotal.toLocaleString()}</span>
              </div>
              <Separator className="my-2" />
              <div className="text-xs text-gray-500 mb-4">Shipping and taxes calculated at checkout</div>
              <Button 
                className="w-full mb-2"
                onClick={handleCheckout}
                style={{ backgroundColor: COLORS.primary }}
              >
                Checkout
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
