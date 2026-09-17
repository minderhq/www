import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TabKey = 'chat' | 'knowledge' | 'models' | 'plugins' | 'settings'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'chat', label: 'Chat' },
  { key: 'knowledge', label: 'Knowledge' },
  { key: 'models', label: 'Models' },
  { key: 'plugins', label: 'Plugins' },
  { key: 'settings', label: 'Settings' },
]

function ChatPane() {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[76%] rounded-xl rounded-tr-sm bg-elevated px-4 py-2.5 text-[13px] leading-[1.55] text-ink">
            What does our Q3 renewal policy say about auto-cancellation?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 text-[13px] leading-[1.6] text-ink-dim">
            Auto-cancellation triggers after 14 days of non-payment, with a 3-day grace window for
            annual plans.
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
                renewal-policy.md · p.4
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span className="text-[12.5px] text-ink-dim">Ask your knowledge base…</span>
      </div>
    </div>
  )
}

function KnowledgePane() {
  const docs = [
    { name: 'renewal-policy.md', status: 'Indexed', chunks: 42 },
    { name: 'onboarding-runbook.pdf', status: 'Indexed', chunks: 118 },
    { name: 'q3-roadmap.docx', status: 'Embedding…', chunks: 6 },
    { name: 'support-transcripts/', status: 'Indexed', chunks: 963 },
  ]
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-dim">
          4 sources
        </span>
        <span className="cursor-pointer rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/25">
          + Add source
        </span>
      </div>
      <div className="divide-y divide-border rounded-lg border border-border bg-surface">
        {docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center justify-between px-4 py-3 text-[12.5px] transition-colors hover:bg-elevated/40"
          >
            <span className="text-ink">{d.name}</span>
            <span className="flex items-center gap-3 text-ink-dim">
              <span className="font-mono text-[10.5px]">{d.chunks} chunks</span>
              <span className={d.status === 'Indexed' ? 'text-primary' : 'text-secondary'}>
                {d.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModelsPane() {
  const models = [
    { name: 'llama3.1:8b', engine: 'Ollama', state: 'Running' },
    { name: 'qwen2.5-coder:7b', engine: 'Ollama', state: 'Idle' },
    { name: 'nomic-embed-text', engine: 'Ollama', state: 'Running' },
  ]
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5">
        <span className="font-mono text-[12px] text-accent">$</span>
        <span className="font-mono text-[12px] text-ink-dim">ollama pull mixtral:8x7b</span>
        <span className="ml-auto h-3.5 w-px animate-pulse rounded-full bg-accent" />
      </div>
      <div className="divide-y divide-border rounded-lg border border-border bg-surface">
        {models.map((m) => (
          <div
            key={m.name}
            className="flex items-center justify-between px-4 py-3 text-[12.5px] transition-colors hover:bg-elevated/40"
          >
            <div>
              <div className="text-ink">{m.name}</div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-dim">
                {m.engine}
              </div>
            </div>
            <span
              className={`flex items-center gap-1.5 text-[11px] ${m.state === 'Running' ? 'text-primary' : 'text-ink-dim'}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${m.state === 'Running' ? 'animate-pulse bg-primary' : 'bg-ink-dim'}`}
              />
              {m.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PluginsPane() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    'Web search': true,
    'Calendar tools': true,
    'Code sandbox': false,
  })
  const plugins = [
    { name: 'Web search', desc: 'Fetch and summarize live pages' },
    { name: 'Calendar tools', desc: 'Read and create events' },
    { name: 'Code sandbox', desc: 'Execute snippets in an isolated runtime' },
  ]
  return (
    <div className="p-5">
      <div className="divide-y divide-border rounded-lg border border-border bg-surface">
        {plugins.map((p) => (
          <div key={p.name} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-[12.5px] text-ink">{p.name}</div>
              <div className="text-[11px] text-ink-dim">{p.desc}</div>
            </div>
            <button
              onClick={() => setEnabled((prev) => ({ ...prev, [p.name]: !prev[p.name] }))}
              aria-label={`Toggle ${p.name}`}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full px-0.5 transition-colors duration-200 ${
                enabled[p.name] ? 'bg-primary' : 'bg-border'
              }`}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`h-4 w-4 rounded-full bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.45)] ${
                  enabled[p.name] ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsPane() {
  const rows = [
    { k: 'Data directory', v: '~/minder/data' },
    { k: 'Telemetry', v: 'Off' },
    { k: 'Network access', v: 'Local only' },
    { k: 'Update channel', v: 'Stable' },
  ]
  return (
    <div className="p-5">
      <div className="divide-y divide-border rounded-lg border border-border bg-surface">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-center justify-between px-4 py-3 text-[12.5px] transition-colors hover:bg-elevated/40"
          >
            <span className="text-ink-dim">{r.k}</span>
            <span className="font-mono text-ink">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PANES: Record<TabKey, () => JSX.Element> = {
  chat: ChatPane,
  knowledge: KnowledgePane,
  models: ModelsPane,
  plugins: PluginsPane,
  settings: SettingsPane,
}

export default function ProductPreview() {
  const [tab, setTab] = useState<TabKey>('chat')
  const Pane = PANES[tab]

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_32px_80px_-36px_rgba(0,0,0,0.55)]">
      {/* rainbow top bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            'linear-gradient(90deg, var(--primary), var(--accent) 45%, var(--secondary) 75%, var(--terracotta))',
        }}
      />

      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-terracotta/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-3 font-mono text-[11px] text-ink-dim">minder.local</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Running locally
        </span>
      </div>

      <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[168px_1fr]">
        {/* sidebar with layoutId tab indicator */}
        <div className="border-r border-border p-2 sm:p-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-label={t.label}
              aria-current={tab === t.key ? 'true' : undefined}
              className={`relative mb-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors sm:px-3 ${
                tab === t.key ? 'text-ink' : 'text-ink-dim hover:text-ink'
              }`}
            >
              {tab === t.key && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-lg bg-elevated"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                  tab === t.key ? 'bg-accent' : 'bg-border'
                }`}
              />
              <span className="relative z-10 hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* pane with AnimatePresence transition */}
        <div className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Pane />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
