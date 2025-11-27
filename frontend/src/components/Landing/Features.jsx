import React from 'react'

function Features() {
    const items = [
    { title: "REST APIs", desc: "Django / FastAPI-compatible REST APIs with JWT/OAuth security." },
    { title: "Admin Console", desc: "Manage users, posts, comments with approval workflows." },
    { title: "Media Uploads", desc: "Attach images/files and store on cloud (S3/Azure Blob)." },
    { title: "Interactions", desc: "Comments, likes, read-counts, and feedback system." },
  ];

  return (
    <section id="features" className="bg-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl p-6 bg-white/3 border border-white/6">
              <div className="text-lg font-semibold text-white mb-2">{it.title}</div>
              <div className="text-sm text-white/80">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
