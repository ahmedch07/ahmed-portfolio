import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3 font-sans select-none">
      <div className="relative flex items-center justify-center h-10 w-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-indigo-500 opacity-70 blur-[3px] transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
        <div className="absolute inset-[1.5px] rounded-[10px] bg-slate-950 flex items-center justify-center overflow-hidden z-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-cyan-400 group-hover:text-teal-300 transition-all duration-300 relative z-20 group-hover:rotate-45"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="2.5" className="fill-cyan-400/30 animate-pulse" />
            <path d="M12 4.5v5M12 14.5v5M4.5 12h5M14.5 12h5" />
            <circle cx="12" cy="4.5" r="1.5" className="fill-cyan-400" />
            <circle cx="12" cy="19.5" r="1.5" className="fill-indigo-400" />
            <circle cx="4.5" cy="12" r="1.5" className="fill-cyan-400" />
            <circle cx="19.5" cy="12" r="1.5" className="fill-indigo-400" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <span className="text-base font-black uppercase tracking-[0.18em] text-white leading-none group-hover:text-cyan-400 transition-colors duration-300">
            Ahmed
          </span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:bg-teal-300 animate-pulse" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase leading-none mt-1 group-hover:text-slate-200 transition-colors duration-300">
          AUTOMATION<span className="text-indigo-400">.CH</span>
        </span>
      </div>
    </Link>
  );
}
