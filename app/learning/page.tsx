export default function LearningPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Learning</h1>
                <p className="text-gray-400 text-xl mb-12">
                    My learning path and resources I'm currently exploring.
                </p>
                
                <div className="space-y-8">
                    {/* Learning Category 1 */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-blue-500">📚</span> Currently Learning
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                <h3 className="text-xl font-bold mb-2">Advanced TypeScript</h3>
                                <p className="text-gray-400 mb-4">Mastering advanced TypeScript patterns and types.</p>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">75% Complete</p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                <h3 className="text-xl font-bold mb-2">Web Performance</h3>
                                <p className="text-gray-400 mb-4">Optimizing web applications for speed and efficiency.</p>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">60% Complete</p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                <h3 className="text-xl font-bold mb-2">System Design</h3>
                                <p className="text-gray-400 mb-4">Learning to design scalable systems and architecture.</p>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '50%'}}></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">50% Complete</p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                <h3 className="text-xl font-bold mb-2">AI & Machine Learning</h3>
                                <p className="text-gray-400 mb-4">Introduction to ML and AI for web developers.</p>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '30%'}}></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">30% Complete</p>
                            </div>
                        </div>
                    </section>

                    {/* Learning Category 2 */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-green-500">✅</span> Completed Courses
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div>
                                    <h3 className="text-lg font-bold">React Mastery</h3>
                                    <p className="text-gray-400">Advanced React patterns and hooks</p>
                                </div>
                                <span className="text-green-500 font-bold">✓</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div>
                                    <h3 className="text-lg font-bold">Next.js Fundamentals</h3>
                                    <p className="text-gray-400">Building full-stack applications with Next.js</p>
                                </div>
                                <span className="text-green-500 font-bold">✓</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div>
                                    <h3 className="text-lg font-bold">Node.js Backend</h3>
                                    <p className="text-gray-400">Building scalable backend services</p>
                                </div>
                                <span className="text-green-500 font-bold">✓</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div>
                                    <h3 className="text-lg font-bold">Responsive Design</h3>
                                    <p className="text-gray-400">Mobile-first and adaptive design techniques</p>
                                </div>
                                <span className="text-green-500 font-bold">✓</span>
                            </div>
                        </div>
                    </section>

                    {/* Learning Resources */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-purple-500">🔗</span> Favorite Resources
                        </h2>
                        <ul className="space-y-3 text-gray-400">
                            <li>• <a href="#" className="text-blue-400 hover:text-blue-300">MDN Web Docs</a> - Comprehensive web development documentation</li>
                            <li>• <a href="#" className="text-blue-400 hover:text-blue-300">CSS-Tricks</a> - Advanced CSS techniques and tutorials</li>
                            <li>• <a href="#" className="text-blue-400 hover:text-blue-300">Dev.to</a> - Community-driven technical articles</li>
                            <li>• <a href="#" className="text-blue-400 hover:text-blue-300">GitHub</a> - Learning from open source projects</li>
                            <li>• <a href="#" className="text-blue-400 hover:text-blue-300">YouTube</a> - Video tutorials and talks</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
