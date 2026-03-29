import type { TipItem } from '../types/plan'

interface Props {
  tips?: TipItem[]
  notes?: string
}

export default function TipsNotes({ tips = [], notes }: Props) {
  if (!tips.length && !notes) return null

  return (
    <section className="max-w-5xl mx-auto px-6 py-9 space-y-6">
      {tips.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-amber-300/70" />
            <h2 className="text-xl font-black tracking-wide text-white">旅遊小提醒</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-amber-50/10 to-orange-50/5 border border-amber-200/25 rounded-xl px-4 py-3 hover:from-amber-50/15 hover:to-orange-50/10 transition-colors backdrop-blur-sm">
                <span className="text-base flex-shrink-0 mt-0.5">{tip.icon || '💡'}</span>
                <div>
                  <div className="text-sm font-semibold text-amber-100 mb-0.5">{tip.title}</div>
                  <p className="text-xs text-slate-200/85 leading-relaxed">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes && (
        <div className="relative flex items-start gap-3 bg-gradient-to-br from-yellow-100/15 to-amber-100/10 border border-amber-300/30 rounded-xl px-4 py-4 shadow-[0_12px_28px_-20px_rgba(250,200,80,0.5)]">
          <span className="text-amber-200 text-xs font-black tracking-widest flex-shrink-0 mt-0.5">NOTE</span>
          <p className="text-sm text-slate-100/90 leading-relaxed">{notes}</p>
        </div>
      )}
    </section>
  )
}
