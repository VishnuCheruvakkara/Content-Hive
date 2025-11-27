import React from 'react'

function MobileMenu() {
    return (
        <details className="text-white">
            <summary className="cursor-pointer px-3 py-2 rounded-md bg-brand-3/90">Menu</summary>
            <div className="mt-2 bg-brand-1/90 p-4 rounded-md flex flex-col gap-3">
                <a href="#features" className="hover:text-brand-4">Features</a>
                <a href="#modules" className="hover:text-brand-4">Modules</a>
                <a href="#pricing" className="hover:text-brand-4">Pricing</a>
                <a href="#contact" className="hover:text-brand-4">Contact</a>
                <div className="flex gap-2 mt-2">
                    <a href="/login" className="flex-1 text-center px-3 py-2 rounded-md bg-brand-3">Login</a>
                    <a href="/signup" className="flex-1 text-center px-3 py-2 rounded-md border border-brand-4 text-brand-4">Sign up</a>
                </div>
            </div>
        </details>
    )
}

export default MobileMenu
