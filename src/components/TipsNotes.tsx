import type { TipItem } from '../types/plan'

interface Props {
  tips?: TipItem[]
  notes?: string
}

export default function TipsNotes({ tips = [], notes }: Props) {
  if (!tips.length && !notes) return null

  return (
    <section className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {tips.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span> 旅遊小提醒
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/3 border border-white/6 rounded-xl px-4 py-3 hover:bg-white/5 transition-colors">
                <span className="text-base flex-shrink-0 mt-0.5">{tip.icon || '💡'}</span>
                <div>
                  <div className="text-sm font-medium text-white mb-0.5">{tip.title}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes && (
        <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3">
          <span className="text-amber-400 text-xs font-bold flex-shrink-0 mt-0.5">NOTE</span>
          <p className="text-sm text-slate-300 leading-relaxed">{notes}</p>
        </div>
      )}
    </section>
  )
}
