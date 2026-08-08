import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/lib/models/Project'
import Admin from '@/lib/models/Admin'
import bcrypt from 'bcryptjs'

const SEED_PROJECTS = [
  {
    slug: 'email-automation',
    title: 'n8n email automation system',
    description: 'sends email after schedule timeline',
    image: 'https://raw.githubusercontent.com/ahmedch07/N8N-AUTOMATION-PROJECT/main/1st%20project%20n8n.png',
    details: 'Is project me n8n ka Schedule Trigger use kiya gaya hai. Rozana subah 9 baje Google Sheet se data uthata hai aur har client ko personalized email bhej deta hai.',
    tech: ['n8n', 'Gmail', 'Google Sheets'],
  },
  {
    slug: 'inventory-ai',
    title: 'AI powered inventory search system',
    description: 'airtable with gemini + n8n',
    image: 'https://raw.githubusercontent.com/ahmedch07/N8N-AUTOMATION-PROJECT/main/3rd%20project.png',
    details: 'Ye AI Agent hai. Jab WhatsApp pe koi product ka naam likhta hai to n8n Airtable me search karta hai aur Gemini AI se jawab generate karke wapis bhej deta hai.',
    tech: ['n8n', 'Airtable', 'Google Gemini', 'WhatsApp API'],
  },
  {
    slug: 'ai-chat-board-with-memory',
    title: 'Ai chat board with memory',
    description: 'chat agent which can store the conversation for later use',
    image: 'https://raw.githubusercontent.com/ahmedch07/N8N-AUTOMATION-PROJECT/main/2md%20project%20.png',
    details: 'chat agent which can store the conversation for later use',
    tech: ['AI chat board', 'n8n Automation'],
  },
]

export async function GET(req: Request) {
  try {
    await dbConnect()

    // 1. Seed Admin
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin'
    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@ahmed.com'
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123'

    let admin = await Admin.findOne({
      $or: [{ username: defaultUsername }, { email: defaultEmail }],
    })

    let adminResult = ''
    if (!admin) {
      const passwordHash = await bcrypt.hash(defaultPassword, 10)
      admin = await Admin.create({
        username: defaultUsername,
        email: defaultEmail,
        passwordHash,
      })
      adminResult = `Created default admin (${defaultEmail})`
    } else {
      adminResult = `Admin already exists (${admin.email})`
    }

    // 2. Seed Projects
    const projectResults = []
    for (const data of SEED_PROJECTS) {
      const existing = await Project.findOne({ slug: data.slug })
      if (!existing) {
        const project = await Project.create(data)
        projectResults.push({ created: project.slug })
      } else {
        projectResults.push({ skipped: data.slug })
      }
    }

    return NextResponse.json({
      ok: true,
      admin: adminResult,
      credentials: {
        usernameOrEmail: defaultEmail,
        password: defaultPassword,
      },
      projects: projectResults,
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
