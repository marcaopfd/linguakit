import { NextRequest, NextResponse } from 'next/server'
import { randomInt } from 'crypto'
import { prisma, withDb } from '@/lib/db'
import { requireTeacher } from '@/lib/auth'
import { hashPassword } from '@/lib/student-auth'

// No 0/O/1/l/I — this password gets read aloud or copied by hand.
const ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789'

function temporaryPassword(): string {
  const group = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('')
  return `lk-${group()}-${group()}`
}

/**
 * Teacher-initiated password reset. The plaintext is returned once, in this
 * response, and never stored — the teacher passes it to the student.
 *
 * /api/students is in the proxy allowlist (the student portal reads it), so
 * this handler must do its own teacher check.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireTeacher(req)
  if (denied) return denied

  const { id } = await params

  try {
    const student = await withDb(() => prisma.student.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    }))

    if (!student) return NextResponse.json({ error: 'Aluno não encontrado.' }, { status: 404 })
    if (!student.email) {
      return NextResponse.json(
        { error: 'Este aluno não tem conta — ele acessa pelo link do curso.' },
        { status: 400 },
      )
    }

    const password = temporaryPassword()
    await withDb(() => prisma.student.update({
      where: { id },
      data: { password: hashPassword(password) },
    }))

    return NextResponse.json({ ok: true, password, email: student.email })
  } catch (err) {
    return NextResponse.json({ error: 'Não foi possível resetar a senha.', details: String(err) }, { status: 500 })
  }
}
