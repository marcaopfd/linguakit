import { NextRequest, NextResponse } from 'next/server'
import { renderToStream, DocumentProps } from '@react-pdf/renderer'
import { createElement, JSXElementConstructor, ReactElement } from 'react'
import { MODULES } from '@/lib/curriculum'
import { UnitPDF } from '@/lib/pdf-template'

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mod: string; unit: string }> },
) {
  const { mod: modId, unit: unitIndexStr } = await params
  const unitIndex = parseInt(unitIndexStr)

  const mod = MODULES.find(m => m.id === modId)
  const unit = mod?.units[unitIndex]

  if (!mod || !unit) {
    return NextResponse.json({ error: 'Unit not found' }, { status: 404 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await renderToStream(
    createElement(UnitPDF, { mod, unit, unitIndex }) as unknown as ReactElement<DocumentProps, JSXElementConstructor<DocumentProps>>,
  )

  const chunks: Uint8Array[] = []
  for await (const chunk of stream as AsyncIterable<Uint8Array>) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  const filename = `LinguaKit_PT_${mod.id}_Unit${unitIndex + 1}_${unit.title.replace(/[^a-z0-9]/gi, '_')}.pdf`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
