import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'app', 'projects.json')

const ADMIN_SECRET = process.env.NEXT_ADMIN_SECRET || process.env.NEXT_PUBLIC_ADMIN_SECRET || ''
function isAuthorized(req: Request) {
  const secret = req.headers.get('x-admin-secret') || ''
  return ADMIN_SECRET && secret === ADMIN_SECRET
}

function normalizeImageUrl(value: unknown) {
  if (!value || typeof value !== 'string') return ''
  const url = value.trim()
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/')
  }
  return url
}

async function readProjects() {
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

export async function POST(req: Request) {
    if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    try {
    const body = await req.json()
    const { title, image, description, tech } = body
    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const projects = await readProjects()

    const slugBase = title
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    let id = slugBase
    let i = 1
    while (projects.some((p: any) => p.id === id)) {
      id = `${slugBase}-${i++}`
    }

    const techArray = Array.isArray(tech)
      ? tech
      : typeof tech === 'string'
      ? tech.split(',').map((s) => s.trim()).filter(Boolean)
      : []

    const newProject = {
      id,
      title,
      description,
      image: normalizeImageUrl(image),
      details: description,
      tech: techArray,
    }

    projects.push(newProject)
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8')

    return NextResponse.json({ ok: true, project: newProject })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  try {
    const body = await req.json()
    const { id, title, image, description, details, tech } = body
    if (!id || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const projects = await readProjects()
    const index = projects.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const techArray = Array.isArray(tech)
      ? tech
      : typeof tech === 'string'
      ? tech.split(',').map((s) => s.trim()).filter(Boolean)
      : []

    projects[index] = {
      ...projects[index],
      title,
      description,
      details,
      image: normalizeImageUrl(image),
      tech: techArray,
    }

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8')
    return NextResponse.json({ ok: true, project: projects[index] })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const projects = await readProjects()
    const filtered = projects.filter((p: any) => p.id !== id)
    if (filtered.length === projects.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
