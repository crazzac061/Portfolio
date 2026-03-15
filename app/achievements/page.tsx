export default function AchievementsPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Achievements</h1>
                <p className="text-gray-400 text-xl mb-12">
                    Milestones and accomplishments throughout my career.
                </p>
                
                <div className="grid gap-8">
                    {/* Achievement Cards */}
                    <div className="border-l-4 border-blue-500 pl-6 py-4">
                        <h3 className="text-2xl font-bold mb-2">2024 - Full Stack Developer Award</h3>
                        <p className="text-gray-400 mb-2">Recognition for outstanding contributions to web development</p>
                        <span className="text-sm text-gray-500">Tech Innovation Conference</span>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-4">
                        <h3 className="text-2xl font-bold mb-2">2024 - Design Excellence Award</h3>
                        <p className="text-gray-400 mb-2">Award for creating user-centric and beautiful designs</p>
                        <span className="text-sm text-gray-500">Design Leaders Summit</span>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-4">
                        <h3 className="text-2xl font-bold mb-2">2023 - Published 50+ Articles</h3>
                        <p className="text-gray-400 mb-2">Reached 100k+ readers with technical content</p>
                        <span className="text-sm text-gray-500">Tech Writing Community</span>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-4">
                        <h3 className="text-2xl font-bold mb-2">Participant first Nepal Waste Hackathon</h3>
                        <p className="text-gray-400 mb-2">Made a project titled "Sudha" that helps in circular landfill wastage.</p>
                        <span className="text-sm text-gray-500">Hackathon</span>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-4">
                        <h3 className="text-2xl font-bold mb-2">Graphic Designer at Free Student Union, Pulchowk Campus</h3>
                        <p className="text-gray-400 mb-2">Helping Free Student Union in graphic designing.</p>
                        <span className="text-sm text-gray-500">Pulchowk Campus</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
