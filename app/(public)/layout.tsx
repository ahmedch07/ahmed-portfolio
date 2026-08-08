import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-7xl bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none fixed top-1/3 -right-40 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none fixed top-2/3 -left-40 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
