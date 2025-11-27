// Call to action section 
import React from 'react'

function CTA() {
    return (
        <section id="pricing" className="py-16 bg-linear-to-r from-brand-2/30 to-brand-3/20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to ship your content?</h3>
                <p className="text-white/80 mt-3 mb-6">Start a free trial, connect your storage, and publish your first post in minutes.</p>
                <div className="flex justify-center gap-4">
                    <a href="/signup" className="px-6 py-3 rounded-xl bg-brand-4 text-brand-1 font-semibold">Start Free</a>
                    <a href="/contact" className="px-6 py-3 rounded-xl border border-white/20 text-white">Contact Sales</a>
                </div>
            </div>
        </section>
    )
}

export default CTA
