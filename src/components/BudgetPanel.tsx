import { useState } from 'react'
import type { BudgetSection } from '../types/plan'

interface Props {
  budget: BudgetSection
  defaultMembers: number
}

const catCfg: Record<string, { label: string; color: string; dot: string }> = {
  flights:       { label: '機票',   color: 'text-sky-400 bg-sky-400/10 border-sky-400/20',     dot: 'bg-sky-400' },
  accommodation: { label: '住宿',   color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', dot: 'bg-emerald-400' },
  simCard:       { label: '網路卡', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',    dot: 'bg-yellow-400' },
  insurance:     { label: '保險',   color: 'text-violet-400 bg-violet-400/10 border-violet-400/20',   dot: 'bg-violet-400' },
  activity:      { label: '活動',   color: 'text-orange-400 bg-orange-400/10 border-orange-400/20',   dot: 'bg-orange-400' },
  transport:     { label: '交通',   color: 'text-rose-400 bg-rose-400/10 border-rose-400/20',         dot: 'bg-rose-400' },
  misc:          { label: '其他',   color: 'text-slate-400 bg-slate-400/10 border-slate-400/20',      dot: 'bg-slate-400' },
}

export default function BudgetPanel({ budget, defaultMembers }: Props) {
  const [members, setMembers] = useState(defaultMembers)
  if (!budget?.items) return null

  const totalAll = budget.items.reduce((s, i) => s + (i.total ?? 0), 0)
  const perPerson = members > 0 ? Math.round(totalAll / members) : 0

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">💰</span> 費用總覽
      </h2>

      {/* Includes / Excludes */}
      <div className="flex flex-wrap gap-2 mb-5 text-xs">
        {budget.includes?.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✅ 含 {t}</span>
        ))}
        {budget.excludes?.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">❌ 不含 {t}</span>
        ))}
      </div>

      {/* Members counter */}
      <div className="flex items-center gap-4 mb-5 bg-white/3 border border-white/8 rounded-2xl p-4">
        <span className="text-sm text-slate-400">出遊人數</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setMembers(Math.max(1, members-1))}
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 text-slate-300 font-bold transition-colors flex items-center justify-center">−</button>
          <span className="w-8 text-center font-bold text-white text-xl">{members}</span>
          <button onClick={() => setMembers(members+1)}
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 text-slate-300 font-bold transition-colors flex items-center justify-center">+</button>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs text-slate-500 mb-0.5">每人費用</div>
          <div className="text-2xl font-bold text-white">{perPerson.toLocaleString()} <span className="text-sm text-slate-500">TWD</span></div>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2 mb-4">
        {budget.items.map((item, i) => {
          const cfg = catCfg[item.category] ?? catCfg.misc
          return (
            <div key={i} className="flex items-center gap-3 bg-white/2 border border-white/6 rounded-xl px-4 py-3 hover:bg-white/4 transition-colors">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.color}`}>{cfg.label}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-200 truncate">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">{item.label}</a>
                  ) : item.label}
                </div>
                {item.unitPrice != null && item.quantity != null && (
                  <div className="text-[10px] text-slate-600">{item.unitPrice.toLocaleString()} × {item.quantity} {item.unit}</div>
                )}
                {item.notes && <div className="text-[10px] text-slate-600">{item.notes}</div>}
              </div>
              <div className="text-sm font-semibold text-slate-200 flex-shrink-0">{item.total.toLocaleString()}</div>
            </div>
          )
        })}
      </div>

      {/* Total bar */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600/30 to-violet-600/30 border border-indigo-500/20 px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-xs text-slate-400 mb-1">總費用（{members} 人）</div>
          <div className="text-2xl font-bold text-white">{totalAll.toLocaleString()} <span className="text-sm text-slate-400">TWD</span></div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 mb-1">每人均攤</div>
          <div className="text-2xl font-bold text-indigo-300">{perPerson.toLocaleString()} <span className="text-sm text-slate-500">TWD</span></div>
        </div>
      </div>
    </section>
  )
}
