import React from 'react'

function Modules() {
    const modules = [
        { id: 1, title: "DB + API", note: "Design DB, build REST APIs, auth with JWT/OAuth" },
        { id: 2, title: " FAdmin Views", note: "User management, posts, comments CRUD" },
        { id: 3, title: "Frontend Templates", note: "List/detail pages, responsive UI" },
        { id: 4, title: "Media & Storage", note: "File uploads to S3/Azure, CDN-ready" },
        { id: 5, title: "Interactions", note: "Likes, comments, read counts" },
        { id: 6, title: "Deployment", note: "CI, GitHub + Hosting (optional)" },
    ];
    return (
        <section id="modules" className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-white mb-6">Project Modules (brief)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {modules.map((m) => (
                        <div key={m.id} className="rounded-xl p-6 bg-white/4 border border-white/6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-md bg-brand-4 text-brand-1 flex items-center justify-center font-semibold">{m.id}</div>
                                <div className="text-sm text-white/80">{m.title}</div>
                            </div>
                            <div className="text-white/80 text-sm">{m.note}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Modules
