import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
  slug: string
  title: string
  description: string
  details: string
  image: string
  tech: string[]
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    details: { type: String, default: '' },
    image: { type: String, default: '' },
    tech: { type: [String], default: [] },
  },
  { timestamps: true }
)

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper to normalize GitHub image URLs
export function normalizeImageUrl(value: unknown): string {
  if (!value || typeof value !== 'string') return ''
  const url = value.trim()
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/')
  }
  return url
}

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
