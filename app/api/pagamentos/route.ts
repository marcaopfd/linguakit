import { NextRequest, NextResponse } from 'next/server'
import { requireTeacher } from '@/lib/auth'
import { pagamentosSemDono } from '@/lib/pagamento'

/**
 * Os pagamentos que chegaram e não acharam ninguém.
 *
 * É a lista que impede o pior caso do produto: alguém paga, usa um e-mail
 * diferente do da conta, não recebe nada e não reclama. Sem esta tela, isso
 * seria invisível para sempre.
 *
 * Só o professor vê: a lista é feita de e-mails de quem comprou.
 */
export async function GET(req: NextRequest) {
  const denied = requireTeacher(req)
  if (denied) return denied

  try {
    const avisos = await pagamentosSemDono()
    return NextResponse.json({ avisos })
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
