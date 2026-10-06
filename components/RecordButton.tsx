'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type State = 'idle' | 'requesting' | 'recording' | 'recorded' | 'denied'

export function recordingSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    Boolean(navigator.mediaDevices?.getUserMedia)
  )
}

type Props = {
  labels: {
    record: string
    recordAgain: string
    stopRecording: string
    playYours: string
    micDenied: string
  }
  onError?: (message: string) => void
}

/**
 * Records the learner's own voice so they can play it back against the model
 * pronunciation — the shadowing drill.
 *
 * The audio never leaves the browser: it lives as a blob URL for as long as the
 * lesson is open and is revoked when it is replaced or the component unmounts.
 * Nothing is uploaded and nothing is stored.
 */
export function RecordButton({ labels, onError }: Props) {
  const [state, setState] = useState<State>('idle')
  const [supported, setSupported] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Identifies the in-flight permission request, so a stream that arrives after
  // we gave up is released instead of quietly opening the microphone.
  const requestId = useRef(0)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const urlRef = useRef<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Matches the server render on the first client render, then enables.
  useEffect(() => { setSupported(recordingSupported()) }, [])

  /** Releases the microphone. Without this the browser keeps showing "recording". */
  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null
  }, [])

  const dropRecording = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    audioRef.current?.pause()
    audioRef.current = null
  }, [])

  useEffect(() => () => {
    recorderRef.current?.state === 'recording' && recorderRef.current.stop()
    releaseStream()
    dropRecording()
  }, [releaseStream, dropRecording])

  const start = useCallback(async () => {
    const id = ++requestId.current
    setState('requesting')

    /**
     * getUserMedia does not reject when the permission prompt is ignored — it
     * simply never settles. Without this the button would sit disabled forever
     * with no explanation.
     */
    const giveUp = setTimeout(() => {
      if (requestId.current !== id) return
      requestId.current++
      setState('idle')
      onError?.(labels.micDenied)
    }, 20_000)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      if (requestId.current !== id) {
        // We already gave up; never leave the microphone open behind the user.
        stream.getTracks().forEach(track => track.stop())
        return
      }
      clearTimeout(giveUp)
      streamRef.current = stream

      const chunks: BlobPart[] = []
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder

      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
      recorder.onstop = () => {
        releaseStream()
        dropRecording()
        if (chunks.length) {
          urlRef.current = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }))
          setState('recorded')
        } else {
          setState('idle')
        }
      }

      recorder.start()
      setState('recording')
    } catch {
      clearTimeout(giveUp)
      if (requestId.current !== id) return
      releaseStream()
      setState('denied')
      onError?.(labels.micDenied)
    }
  }, [releaseStream, dropRecording, onError, labels.micDenied])

  const stop = useCallback(() => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }, [])

  const playBack = useCallback(() => {
    if (!urlRef.current) return
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }
    const audio = new Audio(urlRef.current)
    audioRef.current = audio
    audio.onended = () => setPlaying(false)
    audio.onerror = () => setPlaying(false)
    setPlaying(true)
    audio.play().catch(() => setPlaying(false))
  }, [playing])

  if (!supported) return null

  const recording = state === 'recording'
  const busy = state === 'requesting'

  return (
    <>
      <button
        onClick={recording ? stop : start}
        disabled={busy}
        aria-label={recording ? labels.stopRecording : state === 'recorded' ? labels.recordAgain : labels.record}
        title={recording ? labels.stopRecording : state === 'recorded' ? labels.recordAgain : labels.record}
        style={{
          flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
          border: `1px solid ${recording ? 'var(--red)' : 'var(--border)'}`,
          background: recording ? 'var(--red)' : 'var(--paper)',
          color: recording ? '#fff' : 'var(--ink3)',
          fontSize: 10, fontFamily: 'inherit', cursor: busy ? 'default' : 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1, opacity: busy ? 0.5 : 1,
        }}
      >
        {recording ? '■' : busy ? '⋯' : '🎤'}
      </button>

      {state === 'recorded' && (
        <button
          onClick={playBack}
          aria-label={labels.playYours}
          title={labels.playYours}
          style={{
            flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
            border: '1px solid var(--gold)',
            background: playing ? 'var(--gold)' : 'var(--gold-light)',
            color: 'var(--ink)', fontSize: 10, fontFamily: 'inherit', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
          }}
        >
          {playing ? '■' : '▶'}
        </button>
      )}
    </>
  )
}
