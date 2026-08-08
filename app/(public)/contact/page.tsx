import Image from 'next/image';
import Link from 'next/link';

const contact = {
  email: 'ahmedch8990@gmail.com',
  phone: '+923411003874',
  whatsapp: '+923411003874',
  github: 'https://github.com/ahmedch07',
  fiverr: 'https://www.fiverr.com/s/bd40Q3a',
  upwork: 'https://www.upwork.com/freelancers/~01394e72a494260d10?mp_source=share',
  location: 'Pakistan',
  name: 'Ahmed CH',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start">
        <section className="lg:w-5/12">
          <div className="rounded-3xl border border-gray-800 bg-gray-950 p-8 shadow-xl shadow-cyan-500/10">
            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border-4 border-cyan-400 bg-cyan-500">
              <Image
                src="https://github.com/ahmedch07.png"
                alt="Ahmed CH"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Contact</p>
              <h1 className="mt-4 text-4xl font-bold">{contact.name}</h1>
              <p className="mt-3 text-gray-400">AI Automation & n8n Specialist</p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="rounded-3xl bg-gray-900 p-5">
                <p className="text-sm text-gray-400">Email</p>
                <a href={`mailto:${contact.email}`} className="mt-1 block text-lg font-semibold text-cyan-300 hover:text-cyan-100">
                  {contact.email}
                </a>
              </div>

              <div className="rounded-3xl bg-gray-900 p-5">
                <p className="text-sm text-gray-400">Phone</p>
                <a href={`tel:${contact.phone}`} className="mt-1 block text-lg font-semibold text-cyan-300 hover:text-cyan-100">
                  {contact.phone}
                </a>
              </div>

              <div className="rounded-3xl bg-gray-900 p-5">
                <p className="text-sm text-gray-400">WhatsApp</p>
                <a href={`https://wa.me/${contact.whatsapp.replace(/[+]/g, '')}`} target="_blank" rel="noreferrer" className="mt-1 block text-lg font-semibold text-cyan-300 hover:text-cyan-100">
                  {contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:w-7/12">
          <div className="rounded-3xl border border-gray-800 bg-gray-950 p-10 shadow-xl shadow-cyan-500/10">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-400">Let's connect</p>
                <h2 className="mt-4 text-3xl font-bold">Hire me or message me directly</h2>
                <p className="mt-4 text-gray-400 leading-7">
                  I am available for AI automation, chatbot development, workflow integrations, and custom business automations. Connect on GitHub, Fiverr, Upwork, or send me a direct message.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link href={contact.github} target="_blank" className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-cyan-400 hover:bg-gray-800">
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="mt-3 text-lg font-semibold text-white">@ahmedch07</p>
                </Link>

                <Link href={contact.fiverr} target="_blank" className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-cyan-400 hover:bg-gray-800">
                  <p className="text-sm text-gray-400">Fiverr</p>
                  <p className="mt-3 text-lg font-semibold text-white">Hire on Fiverr</p>
                </Link>

                <Link href={contact.upwork} target="_blank" className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-cyan-400 hover:bg-gray-800">
                  <p className="text-sm text-gray-400">Upwork</p>
                  <p className="mt-3 text-lg font-semibold text-white">Hire on Upwork</p>
                </Link>

                <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="mt-3 text-lg font-semibold text-white">{contact.location}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
