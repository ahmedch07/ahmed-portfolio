import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const filePath = path.join(process.cwd(), 'app', 'projects.json')
    const raw = await fs.readFile(filePath, 'utf8')
    let projects = JSON.parse(raw)
    const before = projects.length
    projects = projects.filter((p: any) => p.id !== id)
    if (projects.length === before) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8')
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
