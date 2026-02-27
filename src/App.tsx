import React, { useEffect, useState } from 'react';
import { Loader2, Zap, GitPullRequest, Target } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from your live Render API
    fetch('https://test-6doc.onrender.com/api/impact')
      .then(res => res.json())
      .then(d => {
        setData(d.top_5 || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-20 selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto">

        <header className="mb-20 flex justify-between items-end border-b border-zinc-900 pb-10">
          <div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">Impact <span className="text-zinc-500 font-light">Report</span></h1>
            <p className="text-[10px] uppercase tracking-[0.3em] mt-2 text-zinc-600 font-bold">PostHog Open Source / 90-Day Sprint</p>
          </div>
          <Target size={20} className="text-zinc-800" />
        </header>

        <div className="space-y-12">
          {data.map((eng, i) => (
            <div key={eng.user} className="flex items-start justify-between group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex gap-6">
                <span className="text-zinc-800 font-mono text-sm pt-1">0{i + 1}</span>
                <div>
                  <h2 className="text-zinc-100 text-lg font-medium group-hover:text-blue-400 transition-colors">
                    @{eng.user}
                  </h2>
                  <div className="flex items-center gap-4 mt-1 mb-3 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1"><GitPullRequest size={12}/> {eng.stats.prs} PRs</span>
                    <span className="flex items-center gap-1"><Zap size={12}/> {eng.stats.issues} Issues</span>
                  </div>
                  <p className="text-sm text-zinc-500 italic max-w-sm">
                    "{eng.reason}"
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-4xl font-light text-white tabular-nums tracking-tighter">
                  {Math.round(eng.score)}
                </span>
                <p className="text-[9px] uppercase tracking-tighter text-zinc-700 font-bold mt-1">Impact Score</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-32 pt-10 border-t border-zinc-900 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] text-zinc-800">
          <span>Engineered with FastAPI + React</span>
          <span>© 2024</span>
        </footer>
      </div>
    </div>
  );
}
