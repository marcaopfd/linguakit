import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import {
  codigoConfere, formatarCodigo, gerarCodigo, hashDoCodigo, normalizarCodigo, pareceCodigo,
} from '@/lib/recovery'

const ler = (p: string) => readFileSync(join(__dirname, '..', p), 'utf8')

describe('o código de recuperação', () => {
  it('sai no formato que a tela mostra', () => {
    const codigo = gerarCodigo()
    expect(codigo).toMatch(/^[a-z2-9]{4}-[a-z2-9]{4}-[a-z2-9]{4}-[a-z2-9]{4}$/)
  })

  it('não usa os caracteres que se confundem ao copiar à mão', () => {
    // Fora 0, 1, l e o — é neles que um código lido de um papel dá errado.
    // É o mesmo alfabeto da senha temporária que o professor gera.
    for (let i = 0; i < 200; i++) {
      expect(gerarCodigo()).not.toMatch(/[01lo]/)
    }
  })

  it('não repete', () => {
    const vistos = new Set(Array.from({ length: 500 }, gerarCodigo))
    expect(vistos.size).toBe(500)
  })

  it('aceita o código como a pessoa digitar', () => {
    const codigo = gerarCodigo()
    const hash = hashDoCodigo(codigo)
    const cru = normalizarCodigo(codigo)

    for (const forma of [
      codigo,
      codigo.toUpperCase(),
      cru,
      ` ${codigo} `,
      codigo.replace(/-/g, ' '),
      codigo.replace(/-/g, ''),
    ]) {
      expect(codigoConfere(forma, hash), forma).toBe(true)
    }
  })

  it('recusa um código errado, e uma conta sem código nenhum', () => {
    const hash = hashDoCodigo(gerarCodigo())
    expect(codigoConfere(gerarCodigo(), hash)).toBe(false)
    expect(codigoConfere(gerarCodigo(), null)).toBe(false)
    expect(codigoConfere('', hash)).toBe(false)
  })

  it('guarda só o hash: o código não aparece no que vai para o banco', () => {
    const codigo = gerarCodigo()
    const hash = hashDoCodigo(codigo)
    expect(hash).not.toContain(normalizarCodigo(codigo))
    expect(hash.startsWith('scrypt:')).toBe(true)
  })

  it('reconhece o formato antes de gastar scrypt', () => {
    expect(pareceCodigo(gerarCodigo())).toBe(true)
    expect(pareceCodigo('curto')).toBe(false)
    expect(pareceCodigo('abcd-efgh-ijkl-mnp0')).toBe(false) // zero não existe no alfabeto
    expect(pareceCodigo('abcd-efgh-ijkl-mnpq-rstu')).toBe(false)
  })

  it('formata de volta o que foi normalizado', () => {
    const codigo = gerarCodigo()
    expect(formatarCodigo(normalizarCodigo(codigo))).toBe(codigo)
  })
})

describe('as rotas de senha e recuperação', () => {
  const senha = ler('app/api/student/password/route.ts')
  const novoCodigo = ler('app/api/student/recovery/route.ts')
  const reset = ler('app/api/student/recovery/reset/route.ts')

  it('não aceita o link do curso como prova de dono', () => {
    // O /learn/<id> abre o curso. Se ele também trocasse a senha, um link
    // compartilhado sem pensar viraria a conta de outra pessoa.
    for (const [nome, fonte] of [['password', senha], ['recovery', novoCodigo]] as const) {
      expect(fonte, nome).toContain('readStudentId(req)')
      expect(fonte, nome).toContain('verifyPassword')
    }
  })

  it('freia a tentativa errada nas três rotas', () => {
    for (const [nome, fonte] of [['password', senha], ['recovery', novoCodigo], ['reset', reset]] as const) {
      expect(fonte, nome).toContain('isLockedOut(')
      expect(fonte, nome).toContain('noteFailure(')
    }
  })

  it('responde a mesma coisa para e-mail que não existe e código errado', () => {
    // Respostas diferentes transformariam a tela num detector de quem é
    // aluno daqui, e diriam a um atacante onde vale a pena insistir. Por
    // isso os dois casos saem pelo mesmo if, com a mesma mensagem.
    expect(reset).toContain('if (!student || !codigoConfere(codigo, student.recoveryCode))')
    expect(reset).toContain('return NextResponse.json(MESMA_RESPOSTA, { status: 401 })')
    // E a conta sem código nenhum cai no mesmo lugar: codigoConfere(x, null)
    // é falso, então ela não ganha resposta própria.
    expect(reset).not.toMatch(/recoveryCode\s*===\s*null/)
  })

  it('gasta o código ao usar e já devolve o próximo', () => {
    expect(reset).toContain('const proximo = gerarCodigo()')
    expect(reset).toContain('recoveryCode: hashDoCodigo(proximo)')
    expect(reset).toContain('codigo: proximo')
  })

  it('cria o código junto com a conta, nos dois caminhos', () => {
    for (const rota of ['app/api/student/signup/route.ts', 'app/api/student/claim/route.ts']) {
      const fonte = ler(rota)
      expect(fonte, rota).toContain('gerarCodigo()')
      expect(fonte, rota).toContain('hashDoCodigo(codigo)')
      expect(fonte, rota).toContain('codigo')
    }
  })

  it('deixa a tela de recuperar aberta a quem não tem sessão', () => {
    // Ela existe exatamente para quem não consegue entrar. Atrás do login
    // seria uma porta trancada por dentro.
    const proxy = ler('proxy.ts')
    const publicas = proxy.slice(proxy.indexOf('const PUBLIC_PATHS'), proxy.indexOf('function isUnder'))
    expect(publicas).toContain("'/recuperar'")
  })
})
