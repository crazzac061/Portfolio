'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <section className="pt-32 pb-20 px-6 md:px-12 bg-black text-white min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Designer */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl text-gray-400 mb-2">UI/UX Designer</h3>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">designer</h1>
                            <p className="text-gray-400 max-w-md">
                                UI/UX Designer with a passion for designing beautiful and functional user experiences.
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Link 
                                href="/projects"
                                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                View Work
                            </Link>
                            <Link 
                                href="#contact"
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Coder */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <h3 className="text-lg md:text-xl text-gray-400 mb-2">Full Stack Developer</h3>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">&lt;coder/&gt;</h1>
                            <p className="text-gray-400 max-w-md">
                                Full Stack Developer who focuses on writing clean, elegant and efficient code.
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Link 
                                href="/projects"
                                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                View Code
                            </Link>
                            <Link 
                                href="/learning"
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
                            >
                                Learning
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-12">
                    <div className="text-gray-400 mb-6 md:mb-0">
                        <p>Let's connect and create something amazing together</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1.5 11-5-2.25.75-4.5.5-6-1.5a5.5 5.5 0 00.78-4.55" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href="mailto:your-email@example.com" className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
