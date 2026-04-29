'use client'

import { useState } from 'react'

const SECTIONS = [
  {
    id: 'vocab', name: 'Vocabulary', emoji: '📖', color: '#e8f4fd', accent: '#1a5c9e',
    desc: 'Choose the correct word or phrase.',
    questions: [
      { level: 'A1', text: 'What does "bom dia" mean?', opts: ['Good night', 'Good morning', 'Good afternoon', 'Goodbye'], ans: 1 },
      { level: 'A1', text: 'How do you say "my family" in Portuguese?', opts: ['meu família', 'minha família', 'meu familiares', 'a família meu'], ans: 1 },
      { level: 'A2', text: 'Which word means "last week"?', opts: ['semana que vem', 'semana passada', 'próxima semana', 'essa semana'], ans: 1 },
      { level: 'A2', text: '"Quanto custa?" means:', opts: ['How much does it cost?', 'Where is it?', 'What time is it?', 'How far is it?'], ans: 0 },
      { level: 'B1', text: 'Choose the word that means "although":', opts: ['portanto', 'além disso', 'embora', 'no entanto'], ans: 2 },
      { level: 'B2', text: '"Saudade" is best described as:', opts: ['Anger at something lost', 'A nostalgic longing for something loved and absent', 'Excitement about the future', 'A formal greeting'], ans: 1 },
    ],
  },
  {
    id: 'grammar', name: 'Grammar', emoji: '⚙️', color: '#edf7ed', accent: '#1f6b2e',
    desc: 'Choose the grammatically correct option.',
    questions: [
      { level: 'A1', text: 'Complete: "Eu ___ brasileira." (I am Brazilian)', opts: ['estou', 'sou', 'tenho', 'fico'], ans: 1 },
      { level: 'A1', text: 'How do you say "I am 25 years old" in Portuguese?', opts: ['Eu sou 25 anos', 'Eu estou com 25 anos', 'Eu tenho 25 anos', 'Eu fico 25 anos'], ans: 2 },
      { level: 'A2', text: 'Choose the correct past tense: "Yesterday I ___ to the market."', opts: ['vou ao mercado', 'fui ao mercado', 'foi ao mercado', 'ia ao mercado'], ans: 1 },
      { level: 'A2', text: '"I\'ve lived here for 3 years." → Moro aqui ___ três anos.', opts: ['por', 'desde', 'há', 'para'], ans: 2 },
      { level: 'B1', text: '"I hope he comes." → Espero que ele ___', opts: ['vem', 'venha', 'vai vir', 'vêm'], ans: 1 },
      { level: 'B2', text: '"If I were rich, I would travel." → Se eu ___ rico, ___', opts: ['seria / viajaria', 'fosse / viajaria', 'era / viajava', 'fui / viajei'], ans: 1 },
    ],
  },
  {
    id: 'reading', name: 'Reading', emoji: '📄', color: '#fef3e2', accent: '#9a4f0a',
    desc: 'Read the text and answer the questions.',
    questions: [
      { level: 'A1', text: 'Read: "Oi! Meu nome é Ana. Sou de São Paulo. Tenho 28 anos."\n\nHow old is Ana?', opts: ['18', '25', '28', '30'], ans: 2 },
      { level: 'A1', text: 'Read: "O café está quente. Não está frio."\n\nThe coffee is:', opts: ['Cold', 'Hot', 'Old', 'Cheap'], ans: 1 },
      { level: 'A2', text: 'Read: "Ontem fui ao cinema com minha amiga. O filme foi ótimo!"\n\nWhen did she go to the cinema?', opts: ['Today', 'Tomorrow', 'Yesterday', 'Last week'], ans: 2 },
      { level: 'B1', text: 'Read: "Embora esteja chovendo, decidi sair para correr."\n\nWhy is this sentence surprising?', opts: ['She didn\'t go running', 'She went running despite the rain', 'She loves rain', 'She stayed inside'], ans: 1 },
      { level: 'B1', text: 'Read: "Segundo o jornal, a temperatura vai cair nos próximos dias."\n\n"Segundo o jornal" means:', opts: ['The second newspaper', 'According to the newspaper', 'The newspaper said yesterday', 'In the second article'], ans: 1 },
      { level: 'B2', text: 'Read: "Malgrado os desafios, a equipe conseguiu entregar o projeto no prazo."\n\n"Malgrado os desafios" is closest in meaning to:', opts: ['Because of the challenges', 'Thanks to the challenges', 'Despite the challenges', 'After the challenges'], ans: 2 },
    ],
  },
  {
    id: 'listening', name: 'Comprehension', emoji: '💬', color: '#f3ecfd', accent: '#6b21a8',
    desc: 'Read these dialogues and answer the questions.',
    questions: [
      { level: 'A1', text: 'Dialogue:\nA: "Boa tarde! Como vai?"\nB: "Tudo bem, obrigada!"\n\nWhat time of day is it probably?', opts: ['Morning', 'Afternoon', 'Night', 'Midnight'], ans: 1 },
      { level: 'A1', text: 'Dialogue:\nA: "Você tem irmãos?"\nB: "Sim, tenho um irmão e duas irmãs."\n\nHow many siblings does B have?', opts: ['One', 'Two', 'Three', 'Four'], ans: 2 },
      { level: 'A2', text: 'Dialogue:\nA: "Que tal nos encontrarmos na quinta?"\nB: "Não posso quinta. Que tal sexta?"\nA: "Combinado!"\n\nWhat did they agree on?', opts: ['Monday', 'Thursday', 'Friday', 'Saturday'], ans: 2 },
      { level: 'B1', text: 'Dialogue:\nA: "Você acha que vai chover amanhã?"\nB: "Talvez. Ao que parece, tem uma frente fria chegando."\n\nWhat is B saying about tomorrow\'s weather?', opts: ['It will definitely rain', 'It might rain — there\'s a cold front coming', 'It won\'t rain', 'The weather will be perfect'], ans: 1 },
      { level: 'B1', text: 'A colleague says: "Você foi muito \'corajoso\' em apresentar aquilo sem avisar a gerência..." (with a raised eyebrow)\n\nWhat is the colleague really saying?', opts: ['They genuinely admire your courage', 'They think you made a mistake', 'They are asking a question', 'They didn\'t notice'], ans: 1 },
      { level: 'B2', text: 'Dialogue:\nA: "O projeto o qual apresentamos na semana passada foi bem recebido."\nB: "Com efeito. Outrossim, os clientes pediram uma continuação."\n\n"Com efeito. Outrossim" is best translated as:', opts: ['However. In contrast', 'Indeed. Furthermore', 'Therefore. Nevertheless', 'In fact. Although'], ans: 1 },
    ],
  },
  {
    id: 'writing', name: 'Language Use', emoji: '✍️', color: '#fff0f0', accent: '#9b1c1c',
    desc: 'Choose the most natural or correct expression.',
    questions: [
      { level: 'A1', text: 'How do you politely ask "where is the pharmacy?" in Portuguese?', opts: ['Onde é a farmácia?', 'Onde fica a farmácia?', 'Farmácia onde?', 'Qual é farmácia?'], ans: 1 },
      { level: 'A2', text: 'Which is the most polite way to request something at a restaurant?', opts: ['Quero água.', 'Me dá água!', 'Pode me trazer uma água?', 'Água agora.'], ans: 2 },
      { level: 'A2', text: 'How do you express "I like to travel" in Portuguese?', opts: ['Eu gosto viajar', 'Eu gosto de viajar', 'Eu gostar de viajar', 'Eu gosto viajando'], ans: 1 },
      { level: 'B1', text: 'Choose the most natural way to connect these ideas:\n"It\'s expensive." + "It\'s worth it."', opts: ['É caro e vale a pena.', 'É caro, portanto vale a pena.', 'É caro. No entanto, vale a pena.', 'É caro mas é pena.'], ans: 2 },
      { level: 'B2', text: 'Which sentence uses the subjunctive correctly?', opts: ['Espero que ele vem amanhã.', 'Espero que ele venha amanhã.', 'Espero que ele vai vir amanhã.', 'Espero ele venha amanhã.'], ans: 1 },
      { level: 'C1', text: 'Complete with the correct formal expression:\n"___ os obstáculos, o projeto foi um sucesso."', opts: ['Apesar de', 'Malgrado', 'A despeito de', 'All of the above are correct'], ans: 3 },
    ],
  },
]

const LEVELS: Record<string, { name: string; desc: string; color: string }> = {
  A1: { name: 'Complete Beginner', color: '#1a5c9e', desc: 'You\'re at the start of your Portuguese journey. Your first lessons will focus on greetings, numbers, family, and basic survival phrases.' },
  A2: { name: 'Basic', color: '#9a4f0a', desc: 'You have the foundations. Now it\'s time to build real conversational ability — past tense, making plans, expressing opinions, and navigating daily life.' },
  B1: { name: 'Intermediate', color: '#1f6b2e', desc: 'You can hold a conversation! The focus now is on complex grammar (subjunctive, conditionals), more nuanced vocabulary, and Brazilian media.' },
  B2: { name: 'Upper Intermediate', color: '#6b21a8', desc: 'You\'re near-fluent. Lessons focus on formal register, sophisticated argument, literature, advanced grammar, and cultural depth.' },
  C1: { name: 'Advanced', color: '#9b1c1c', desc: 'You operate at a high level. Focus on idiomatic expression, regional variation, register switching, and elegant Portuguese.' },
  C2: { name: 'Proficient', color: '#1a1814', desc: 'Near-native mastery. You can access all of Brazilian culture — literature, comedy, formal discourse — in its original form.' },
}

type Screen = 'welcome' | 'test' | 'result'

export default function TestPage() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [studentName, setStudentName] = useState('')
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState<Record<string, (number | null)[]>>(
    Object.fromEntries(SECTIONS.map(s => [s.id, Array(6).fill(null)]))
  )
  const [result, setResult] = useState<null | ReturnType<typeof calculateResult>>(null)
  const [saveStatus, setSaveStatus] = useState<'saving' | 'ok' | 'fail'>('saving')

  function startTest() {
    setScreen('test')
    setCurrentSection(0)
  }

  function selectAnswer(qi: number, oi: number) {
    const sec = SECTIONS[currentSection]
    setAnswers(prev => ({ ...prev, [sec.id]: prev[sec.id].map((a, i) => i === qi ? oi : a) }))
  }

  function nextSection() {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(c => c + 1)
      window.scrollTo(0, 0)
    } else {
      const r = calculateResult(answers)
      setResult(r)
      setScreen('result')
      saveResult(r, studentName)
    }
  }

  function prevSection() {
    if (currentSection > 0) {
      setCurrentSection(c => c - 1)
      window.scrollTo(0, 0)
    }
  }

  const totalAnswered = SECTIONS.reduce((total, s, si) => {
    if (si < currentSection) return total + 6
    if (si === currentSection) return total + answers[s.id].filter(a => a !== null).length
    return total
  }, 0)

  async function saveResult(r: ReturnType<typeof calculateResult>, name: string) {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, ...r }),
      })
      setSaveStatus(res.ok ? 'ok' : 'fail')
    } catch {
      setSaveStatus('fail')
    }
  }

  if (screen === 'welcome') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center', background: 'var(--cream)' }}>
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>🇧🇷</div>
        <h1 style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 28, fontWeight: 700, marginBottom: '.3rem' }}>Portuguese Level Test</h1>
        <p style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: '2rem' }}>LinguaKit · by Marcos</p>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', maxWidth: 420, width: '100%', textAlign: 'left', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: '.75rem' }}>What to expect</h3>
          {[
            ['📝', '30 questions across vocabulary, grammar, and reading comprehension'],
            ['⏱️', 'Takes about 10–15 minutes — take your time, no rush'],
            ['🎯', 'The test identifies your level from A1 (beginner) to C2 (advanced)'],
            ['📤', 'Your result is sent automatically to your teacher'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', marginBottom: '.6rem', fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}>
              <span style={{ flexShrink: 0, fontSize: 16 }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 420, width: '100%', marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: '.4rem' }}>Your first name</label>
          <input
            type="text"
            placeholder="e.g. Sarah"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && startTest()}
            style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 10, padding: '.7rem .9rem', fontSize: 15, fontFamily: 'inherit', background: '#fff', outline: 'none' }}
          />
        </div>
        <button
          onClick={startTest}
          style={{ width: '100%', maxWidth: 420, background: 'var(--ink)', color: 'var(--cream)', border: 'none', borderRadius: 12, padding: '.9rem', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Start the test →
        </button>
      </div>
    )
  }

  if (screen === 'test') {
    const sec = SECTIONS[currentSection]
    const isLast = currentSection === SECTIONS.length - 1
    const pct = Math.round((totalAnswered / 30) * 100)

    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        {/* Top bar */}
        <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid var(--border)', padding: '.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 16, fontWeight: 700 }}>🇧🇷 LinguaKit</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div style={{ width: 120, height: 4, background: 'var(--border)', borderRadius: 2 }}>
              <div style={{ height: 4, background: 'var(--ink)', borderRadius: 2, width: `${pct}%`, transition: 'width .4s' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{totalAnswered} / 30</span>
          </div>
        </div>

        <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem 1.5rem 6rem' }}>
          {/* Section intro */}
          <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '.85rem 1.1rem', marginBottom: '1.1rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 13, fontWeight: 700, padding: '.2rem .6rem', borderRadius: 6, background: sec.color, color: sec.accent, flexShrink: 0 }}>
              {sec.emoji} {sec.name}
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.5 }}>{sec.desc} ({currentSection + 1} of 5)</p>
          </div>

          {sec.questions.map((q, qi) => {
            const selected = answers[sec.id][qi]
            const globalNum = currentSection * 6 + qi + 1
            return (
              <div key={qi} style={{ background: '#fff', border: `1px solid ${selected !== null ? 'var(--green)' : 'var(--border)'}`, borderRadius: 14, padding: '1.1rem', marginBottom: '.75rem', transition: 'border-color .15s' }}>
                <div style={{ fontSize: 11, color: 'var(--ink3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>
                  Question {globalNum} · {q.level}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, marginBottom: '.85rem', whiteSpace: 'pre-line' }}>{q.text}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                  {q.opts.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => selectAnswer(qi, oi)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '.65rem .9rem',
                        border: `1.5px solid ${selected === oi ? 'var(--ink)' : 'var(--border)'}`,
                        borderRadius: 8, fontSize: 14,
                        background: selected === oi ? 'var(--ink)' : '#fff',
                        color: selected === oi ? '#fff' : 'var(--ink)',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all .12s', lineHeight: 1.4,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom nav */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid var(--border)', padding: '.85rem 1.5rem', display: 'flex', gap: '.6rem' }}>
          {currentSection > 0 && (
            <button onClick={prevSection} style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: '1.5px solid var(--border)', background: 'var(--paper)', color: 'var(--ink)' }}>
              ← Back
            </button>
          )}
          <button
            onClick={nextSection}
            style={{ flex: 1, padding: '.8rem', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: isLast ? 'var(--green)' : 'var(--ink)', color: '#fff' }}
          >
            {isLast ? 'See my result →' : 'Next section →'}
          </button>
        </div>
      </div>
    )
  }

  // Result screen
  if (screen === 'result' && result) {
    const lvl = LEVELS[result.level]
    const modNames: Record<string, string> = {
      A1: 'Module 1 — A1: Complete Beginner', A2: 'Module 2 — A2: Basic',
      B1: 'Module 3 — B1: Intermediate', B2: 'Module 4 — B2: Upper Intermediate',
      C1: 'Module 5 — C1: Advanced', C2: 'Module 6 — C2: Proficient',
    }
    const skillLabels: Record<string, string> = {
      vocab: 'Vocabulary', grammar: 'Grammar', reading: 'Reading',
      listening: 'Comprehension', writing: 'Language Use',
    }

    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        {/* Hero */}
        <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '2.5rem 1.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 200, fontWeight: 700, color: 'rgba(255,255,255,.04)', pointerEvents: 'none', userSelect: 'none' }}>
            {result.level}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: '.5rem' }}>{studentName ? studentName + '\'s result' : 'Your result'}</div>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 48, fontWeight: 700, marginBottom: '.25rem', color: lvl.color === '#1a1814' ? 'var(--gold)' : '#fff' }}>
            {result.level}
          </div>
          <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 600, marginBottom: '.5rem' }}>{lvl.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{result.totalCorrect} / 30 correct ({result.pct}%)</div>
        </div>

        <div style={{ maxWidth: 560, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>
          {/* Skills breakdown */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem' }}>📊 Skills breakdown</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {SECTIONS.map(sec => {
                const p = result.skillPcts[sec.id]
                const correct = result.sectionScores[sec.id]
                return (
                  <div key={sec.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '.75rem' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: '.3rem' }}>{sec.emoji} {sec.name}</div>
                    <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginBottom: '.25rem' }}>
                      <div style={{ height: 5, borderRadius: 3, background: 'var(--green)', width: `${p}%`, transition: 'width .8s .2s' }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink3)' }}>{correct}/6 · {p}%</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Strengths */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem' }}>✅ Strengths</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {result.strengths.length === 0 ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: 13, lineHeight: 1.5, padding: '.5rem .7rem', borderRadius: 8, background: 'var(--green-light)', color: 'var(--green)' }}>
                  <span style={{ fontWeight: 700 }}>✓</span> You showed effort across all areas — keep going!
                </div>
              ) : result.strengths.slice(0, 3).map(id => (
                <div key={id} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: 13, lineHeight: 1.5, padding: '.5rem .7rem', borderRadius: 8, background: 'var(--green-light)', color: 'var(--green)' }}>
                  <span style={{ fontWeight: 700 }}>✓</span> {skillLabels[id]} — {result.skillPcts[id]}% correct
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem' }}>📌 Areas to focus on</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {result.weaknesses.length === 0 ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: 13, lineHeight: 1.5, padding: '.5rem .7rem', borderRadius: 8, background: 'var(--red-light)', color: 'var(--red)' }}>
                  <span style={{ fontWeight: 700 }}>→</span> Great performance! Keep challenging yourself.
                </div>
              ) : result.weaknesses.map(id => (
                <div key={id} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: 13, lineHeight: 1.5, padding: '.5rem .7rem', borderRadius: 8, background: 'var(--red-light)', color: 'var(--red)' }}>
                  <span style={{ fontWeight: 700 }}>→</span> {skillLabels[id]} ({result.skillPcts[id]}%)
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem' }}>🎯 Recommended starting point</div>
            <div style={{ background: 'var(--gold-light)', border: '1px solid #e8d48a', borderRadius: 12, padding: '1rem 1.1rem' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#7a5a0a', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Start here</div>
              <div style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif', fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: '.25rem' }}>{modNames[result.level]}</div>
              <div style={{ fontSize: 13, color: '#6b4f0d', lineHeight: 1.55 }}>{lvl.desc}</div>
            </div>
          </div>

          {/* Save status */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--ink3)', marginBottom: '.6rem' }}>📤 Teacher notification</div>
            <div style={{ background: 'var(--ink)', borderRadius: 14, padding: '1.1rem', color: 'var(--cream)' }}>
              {saveStatus === 'saving' && (
                <div style={{ textAlign: 'center', padding: '.5rem 0', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
                  ⏳ Saving your result...
                </div>
              )}
              {saveStatus === 'ok' && (
                <div style={{ textAlign: 'center', padding: '.5rem 0' }}>
                  <div style={{ fontSize: 36, marginBottom: '.5rem' }}>✅</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: '.3rem' }}>Result saved!</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>
                    Your teacher can already see your result. They&apos;ll be in touch to schedule your first lesson.
                  </div>
                </div>
              )}
              {saveStatus === 'fail' && (
                <div style={{ padding: '.25rem 0' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.6rem' }}>Send this code to your teacher:</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, background: 'rgba(255,255,255,.07)', borderRadius: 8, padding: '.75rem', lineHeight: 1.6, wordBreak: 'break-all', marginBottom: '.75rem', color: '#c9e4ca' }}>
                    {buildFallbackCode(result, studentName, modNames)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function calculateResult(answers: Record<string, (number | null)[]>) {
  const sectionScores: Record<string, number> = {}
  let totalCorrect = 0
  const levelPoints: Record<string, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }
  const levelTotal: Record<string, number> = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }

  SECTIONS.forEach(sec => {
    let correct = 0
    sec.questions.forEach((q, qi) => {
      levelTotal[q.level]++
      if (answers[sec.id][qi] === q.ans) { correct++; levelPoints[q.level]++ }
    })
    sectionScores[sec.id] = correct
    totalCorrect += correct
  })

  let detectedLevel = 'A1'
  for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const pct = levelTotal[lv] ? levelPoints[lv] / levelTotal[lv] : 0
    if (pct >= 0.6) detectedLevel = lv
    else break
  }

  const skillPcts: Record<string, number> = {}
  SECTIONS.forEach(sec => { skillPcts[sec.id] = Math.round(sectionScores[sec.id] / 6 * 100) })

  const secIds = Object.keys(skillPcts).sort((a, b) => skillPcts[b] - skillPcts[a])
  const strengths = secIds.filter(id => skillPcts[id] >= 60)
  const weaknesses = secIds.filter(id => skillPcts[id] < 50)

  return { level: detectedLevel, totalCorrect, pct: Math.round(totalCorrect / 30 * 100), sectionScores, skillPcts, strengths, weaknesses, levelPoints, levelTotal }
}

function buildFallbackCode(result: ReturnType<typeof calculateResult>, name: string, modNames: Record<string, string>) {
  return [
    '=== LINGUAKIT RESULT ===',
    'Student: ' + (name || 'Student'),
    'Date: ' + new Date().toISOString().slice(0, 10),
    'Level: ' + result.level + ' — ' + LEVELS[result.level].name,
    'Score: ' + result.totalCorrect + '/30 (' + result.pct + '%)',
    '',
    'Skills: ' + SECTIONS.map(s => s.name + ' ' + result.sectionScores[s.id] + '/6').join(' | '),
    'Weaknesses: ' + (result.weaknesses.length ? result.weaknesses.join(', ') : 'None'),
    'Recommendation: ' + modNames[result.level],
    '========================',
  ].join('\n')
}
