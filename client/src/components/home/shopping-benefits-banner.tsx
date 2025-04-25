import { COLORS } from "@/lib/constants";

export default function ShoppingBenefitsBanner() {
  return (
    <section className="py-8">
      <div className="rounded-lg overflow-hidden shadow-md" style={{ backgroundColor: COLORS.secondary }}>
        <div className="flex flex-col lg:flex-row">
          {/* Banner Image */}
          <div 
            className="lg:w-2/5 h-64 lg:h-auto bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1000&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Benefits Content */}
          <div className="lg:w-3/5 p-6 lg:p-8 text-white">
            <h2 
              className="font-display text-2xl md:text-3xl mb-6 text-center lg:text-left"
            >
              Why Shop With Asili
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefit 1 */}
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: COLORS.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fast Nationwide Delivery</h3>
                  <p className="text-sm text-gray-100">We deliver across Kenya within 2-5 business days with real-time tracking.</p>
                </div>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: COLORS.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Authentic Quality</h3>
                  <p className="text-sm text-gray-100">All products are handcrafted by Kenyan artisans with the highest quality standards.</p>
                </div>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: COLORS.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Secure Payment Options</h3>
                  <p className="text-sm text-gray-100">Multiple secure payment methods including M-Pesa, credit cards, and PayPal.</p>
                </div>
              </div>
              
              {/* Benefit 4 */}
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-full" style={{ backgroundColor: COLORS.accent }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">24/7 Customer Support</h3>
                  <p className="text-sm text-gray-100">Our dedicated support team is available to assist you anytime via chat, email, or phone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 