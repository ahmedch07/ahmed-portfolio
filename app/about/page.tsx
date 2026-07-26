import Link from 'next/link';

export const metadata = {
  title: 'About Me - AHMED CH',
  description: 'Learn more about Ahmed CH, AI automation specialist and developer.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 pt-32 pb-20">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-gray-800 bg-gray-950 p-10 shadow-xl shadow-cyan-500/10">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">About Me</p>
              <h1 className="mt-4 text-5xl font-bold text-white">Ahmed CH</h1>
              <p className="mt-4 text-xl text-gray-300">
                I build AI-powered automations, chatbots, and workflow integrations that help businesses save time, reduce errors, and scale smarter.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-800 bg-black/80 p-6">
                <h2 className="text-2xl font-semibold text-cyan-400">Skills</h2>
                <ul className="mt-4 space-y-3 text-gray-300">
                  <li>AI automation & n8n workflow design</li>
                  <li>Chatbot automation</li>
                  <li>API & system integrations</li>
                  <li>Process automation for business tasks</li>
                  <li>Freelance automation delivery</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-800 bg-black/80 p-6">
                <h2 className="text-2xl font-semibold text-cyan-400">What I do</h2>
                <p className="mt-4 text-gray-300 leading-7">
                  I help startups and businesses automate routine work, build intelligent systems, and connect tools across platforms. My focus is on practical AI solutions that deliver measurable results.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex rounded-full bg-cyan-500 px-8 py-4 text-black font-semibold transition hover:bg-cyan-400"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
