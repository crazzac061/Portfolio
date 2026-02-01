export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Projects</h1>
                <p className="text-gray-400 text-xl mb-12">
                    A showcase of my recent work and side projects.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Project Cards */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-800">
                        <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                            <span className="text-gray-300">Project Image</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">E-Commerce Platform</h3>
                            <p className="text-gray-400 mb-4">
                                A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">Next.js</span>
                                <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">TypeScript</span>
                                <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">Stripe</span>
                            </div>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">View Project →</a>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-800">
                        <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                            <span className="text-gray-300">Project Image</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">Design System</h3>
                            <p className="text-gray-400 mb-4">
                                Comprehensive design system with 50+ reusable components and documentation.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">React</span>
                                <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">Storybook</span>
                                <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">Figma</span>
                            </div>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">View Project →</a>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-800">
                        <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                            <span className="text-gray-300">Project Image</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
                            <p className="text-gray-400 mb-4">
                                Real-time analytics dashboard with data visualization and reporting features.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm">React</span>
                                <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm">Chart.js</span>
                                <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm">Node.js</span>
                            </div>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">View Project →</a>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-800">
                        <div className="h-48 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                            <span className="text-gray-300">Project Image</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">Mobile App</h3>
                            <p className="text-gray-400 mb-4">
                                Cross-platform mobile application for task management with offline support.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-orange-900 text-orange-200 rounded-full text-sm">React Native</span>
                                <span className="px-3 py-1 bg-orange-900 text-orange-200 rounded-full text-sm">Firebase</span>
                                <span className="px-3 py-1 bg-orange-900 text-orange-200 rounded-full text-sm">Redux</span>
                            </div>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">View Project →</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
