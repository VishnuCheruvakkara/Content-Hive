import React from 'react'
import Header from '../../components/Landing/Header'
import Hero from '../../components/Landing/Hero'
import Features from '../../components/Landing/Features'
import Modules from '../../components/Landing/Modules'
import CTA from '../../components/Landing/CTA'
import Footer from '../../components/Landing/Footer'

function LandingPage() {
    return (
        <div className="min-h-screen bg-brand-1 text-white flex flex-col">
            <Header />

            <main className="flex-1">
                <Hero />
                <Features />
                <Modules />
                <CTA />
            </main>

            <Footer />
        </div>
    )
}

export default LandingPage
