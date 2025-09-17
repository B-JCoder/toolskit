"use client"

const CtaSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="w-full relative py-10 md:py-16 px-6 md:px-10 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 shadow-xl overflow-hidden">
          
          {/* Decorative Blur Shapes */}
          <div className="absolute right-0 top-0 h-full w-full flex justify-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-blue-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-blue-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-teal-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 dark:text-white">
              Request Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-900 via-blue-900 to-teal-600">Custom Tool</span> Design
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Do you have an idea for a tool or calculator?  
              Our team will design and build it tailored to your needs with clean UI, smooth UX, and your branding.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="outline-none h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-105 transition transform">
                Request a Custom Tool
              </button>
              <button className="outline-none h-12 px-8 rounded-xl border border-blue-600 dark:border-indigo-400 text-blue-700 dark:text-indigo-300 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                View Existing Tools
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
