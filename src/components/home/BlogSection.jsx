import React from 'react';
import { ArrowRight, BookOpen, Clock, X } from 'lucide-react';
import { BLOGS } from '../../data/blogs';
import { useUI } from '../../context/UIContext';

export const BlogSection = () => {
  const { selectedBlogForReader, setSelectedBlogForReader } = useUI();

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 space-y-2 sm:space-y-0">
          <div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-rose-50 text-[#7A0000] text-xs font-bold uppercase tracking-wider mb-2 border border-rose-100">
              Science & Knowledge Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Learn With Amega Max
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Evidence-based guides on marine Omega-3 fatty acids, EPA/DHA absorption, and daily heart health.
            </p>
          </div>
        </div>

        {/* 4 Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOGS.map((blog) => (
            <div
              key={blog.id}
              onClick={() => setSelectedBlogForReader(blog)}
              className="group cursor-pointer rounded-3xl bg-slate-50 border border-slate-200/70 overflow-hidden hover:shadow-xl hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 flex items-center space-x-1 shadow-xs">
                  <Clock className="w-3 h-3 text-[#7A0000]" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold text-[#7A0000] bg-rose-50 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#7A0000] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {blog.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/50 flex items-center text-xs font-bold text-[#7A0000] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedBlogForReader && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedBlogForReader(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-48 sm:h-56 bg-slate-900">
              <img
                src={selectedBlogForReader.image}
                alt={selectedBlogForReader.title}
                className="w-full h-full object-cover opacity-75"
              />
              <button
                onClick={() => setSelectedBlogForReader(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#7A0000] text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-full">
                  {selectedBlogForReader.readTime}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 drop-shadow-md">
                  {selectedBlogForReader.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              <p className="font-semibold text-slate-900 text-base sm:text-lg border-l-4 border-[#7A0000] pl-3">
                {selectedBlogForReader.subtitle}
              </p>
              <div>{selectedBlogForReader.content}</div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBlogForReader(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
