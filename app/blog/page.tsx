export default function BlogPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
                <p className="text-gray-400 text-xl mb-12">
                    Thoughts on design, development, and everything in between.
                </p>
                
                <div className="grid gap-8">
                    {/* Blog Post Cards */}
                    <article className="border-b border-gray-700 pb-8 hover:translate-x-2 transition-transform">
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-2xl font-bold">Getting Started with Next.js</h2>
                            <time className="text-gray-500 text-sm">Feb 2026</time>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Learn how to build modern web applications with Next.js. A comprehensive guide for beginners.
                        </p>
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Read More →</a>
                    </article>

                    <article className="border-b border-gray-700 pb-8 hover:translate-x-2 transition-transform">
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-2xl font-bold">Design Systems Explained</h2>
                            <time className="text-gray-500 text-sm">Jan 2026</time>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Understanding design systems and how they can improve your workflow and consistency.
                        </p>
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Read More →</a>
                    </article>

                    <article className="border-b border-gray-700 pb-8 hover:translate-x-2 transition-transform">
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-2xl font-bold">Web Performance Tips</h2>
                            <time className="text-gray-500 text-sm">Dec 2025</time>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Practical tips to improve your website performance and user experience.
                        </p>
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Read More →</a>
                    </article>
                </div>
            </div>
        </main>
    );
}
