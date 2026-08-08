import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project, { generateSlug, normalizeImageUrl } from '@/lib/models/Project'
import { verifyAdminSession } from '@/lib/auth'

// GET /api/projects — public, returns all projects
export async function GET() {
  try {
    await dbConnect()
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json(projects)
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST /api/projects — admin only, create project
export async function POST(req: Request) {
  if (!(await verifyAdminSession(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const { title, image, description, details, tech } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const techArray: string[] = Array.isArray(tech)
      ? tech
      : typeof tech === 'string'
      ? tech.split(',').map((s: string) => s.trim()).filter(Boolean)
      : []

    // Generate a unique slug
    const slugBase = generateSlug(title)
    let slug = slugBase
    let i = 1
    while (await Project.exists({ slug })) {
      slug = `${slugBase}-${i++}`
    }

    const project = await Project.create({
      slug,
      title,
      description,
      details: details || description,
      image: normalizeImageUrl(image),
      tech: techArray,
    })

    return NextResponse.json({ ok: true, project })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PATCH /api/projects — admin only, update project
export async function PATCH(req: Request) {
  if (!(await verifyAdminSession(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const { id, title, image, description, details, tech } = body

    if (!id || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const techArray: string[] = Array.isArray(tech)
      ? tech
      : typeof tech === 'string'
      ? tech.split(',').map((s: string) => s.trim()).filter(Boolean)
      : []

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        details: details || description,
        image: normalizeImageUrl(image),
        tech: techArray,
      },
      { new: true }
    )

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, project })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE /api/projects — admin only, delete project
export async function DELETE(req: Request) {
  if (!(await verifyAdminSession(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  try {
    await dbConnect()
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const result = await Project.findByIdAndDelete(id)
    if (!result) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
