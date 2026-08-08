import dbConnect from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FolderKanban } from "lucide-react";

interface ProjectItem {
  _id: { toString(): string };
  slug?: string;
  title?: string;
  description?: string;
  image?: string;
  tech?: string[];
}

async function getProjects(): Promise<ProjectItem[]> {
  await dbConnect();
  const rawProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return (rawProjects as unknown) as ProjectItem[];
}

export const metadata = {
  title: "My Projects — Ahmed CH Portfolio",
  description: "Explore AI automation and n8n projects built by Ahmed CH",
};

export default async function ProjectsPage() {
  let projects: ProjectItem[] = [];
  let dbError = false;

  try {
    projects = await getProjects();
  } catch {
    dbError = true;
  }

  return (
    <main className="min-h-screen px-6 pt-36 pb-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
          <FolderKanban className="h-3.5 w-3.5 text-cyan-400" />
          <span>Portfolio Showcase</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Featured <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Projects &amp; Automations</span>
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
          Real-world AI agents, n8n workflows, and data pipelines built for efficiency.
        </p>
      </div>

      {dbError ? (
        <div className="max-w-xl mx-auto rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 text-center text-amber-300 shadow-2xl space-y-2">
          <h2 className="text-xl font-bold">MongoDB Connection Notice</h2>
          <p className="text-sm text-slate-300">
            Please check your <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400">.env.local</code> file for a valid MongoDB URI string.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-slate-500 py-24 space-y-3">
          <p className="text-2xl font-bold text-slate-400">No projects published yet.</p>
          <p className="text-sm">Log in to the Admin Panel to publish your first project!</p>
          <div className="pt-4">
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id.toString()}
              href={`/projects/${project.slug || project._id.toString()}`}
              className="group flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                {project.image && (
                  <div className="h-48 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title || "Project image"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 space-y-4 border-t border-slate-800/60 mt-6">
                {(project.tech || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech || []).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs px-2.5 py-0.5 rounded-lg"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span>View Project Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Back to home */}
      <div className="text-center mt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-400 hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
