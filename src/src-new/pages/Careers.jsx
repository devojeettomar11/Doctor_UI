const Careers = () => {
  return (
    <>
      <section id="careers" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-4 block">Work With Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Explore Internship Opportunities</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We are always looking for passionate medical professionals, engineers, and creative thinkers
                who want to make a real impact on people's lives. Join a team where your work translates
                into health and happiness.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center space-x-3">
                  <span className="bg-sky-500/20 text-sky-400 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>👥 Collaborative Environment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-sky-500/20 text-sky-400 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>❤️ Healthcare Impact</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="bg-sky-500/20 text-sky-400 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>📈 Professional Growth</span>
                </li>
              </ul>
              <button className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold transition-all transform hover:scale-105">
                <a href="https://forms.gle/Rc6ooVeCXD5gQym28" target="_blank" rel="noreferrer" className="btn-primary">Apply Now</a>
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="opening-card">
                <h3>Full Stack Internship</h3>
                <a href="https://forms.gle/Rc6ooVeCXD5gQym28" target="_blank" rel="noreferrer">Apply Now</a>
              </div>
              <div className="opening-card">
                <h3>UI/UX Design Intern</h3>
                <a href="https://forms.gle/Rc6ooVeCXD5gQym28" target="_blank" rel="noreferrer">Apply Now</a>
              </div>
              <div className="opening-card">
                <h3>React Native Internship</h3>
                <a href="https://forms.gle/Rc6ooVeCXD5gQym28" target="_blank" rel="noreferrer">Apply Now</a>
              </div>
              <div className="opening-card">
                <h3>Data Analysis Intern</h3>
                <a href="https://forms.gle/Rc6ooVeCXD5gQym28" target="_blank" rel="noreferrer">Apply Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
