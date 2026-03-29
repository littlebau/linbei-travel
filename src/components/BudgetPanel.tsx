'use client'

import { useState } from 'react'
import type { BudgetSection } from '../types/plan'

interface Props {
  budget: BudgetSection
  defaultMembers: number
}

const catCfg: Record<string, { label: string; abbr: string }> = {
  flights:       { label: '機票',   abbr: 'AIR' },
  accommodation: { label: '住宿',   abbr: 'STAY' },
  simCard:       { label: '網路卡', abbr: 'SIM' },
  insurance:     { label: '保險',   abbr: 'INS' },
  activity:      { label: '活動',   abbr: 'ACT' },
  transport:     { label: '交通',   abbr: 'TRN' },
  misc:          { label: '其他',   abbr: 'ETC' },
}

export default function BudgetPanel({ budget, defaultMembers }: Props) {
  const [members, setMembers] = useState(defaultMembers)
  if (!budget?.items) return null

  const totalAll = budget.items.reduce((s, i) => s + (i.total ?? 0), 0)
  const perPerson = members > 0 ? Math.round(totalAll / members) : 0

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-7">
        <h2 className="font-serif text-2xl text-[#f0ebe3]">費用總覽</h2>
        <div className="flex-1 h-px bg-[#2a2720]" />
        <span className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase">Budget</span>
      </div>

      {/* Includes / Excludes */}
      {(budget.includes?.length || budget.excludes?.length) && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-7 text-[10px]">
          {budget.includes?.map((t) => (
            <span key={t} className="text-[#8a8278]">
              <span className="text-[#c9a96e] mr-1.5">+</span>{t}
            </span>
          ))}
          {budget.excludes?.map((t) => (
            <span key={t} className="text-[#5a5450]">
              <span className="mr-1.5">−</span>{t}
            </span>
          ))}
        </div>
      )}

      {/* Members counter */}
      <div className="flex items-center gap-6 border-t border-b border-[#2a2720] py-5 mb-6">
        <span className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase">Members</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMembers(Math.max(1, members - 1))}
            className="w-6 h-6 flex items-center justify-center text-[#5a5450] hover:text-[#c9a96e] transition-colors text-lg leading-none"
          >
            −
          </button>
          <span className="font-serif text-2xl text-[#f0ebe3] tabular-nums w-8 text-center">{members}</span>
          <button
            onClick={() => setMembers(members + 1)}
            className="w-6 h-6 flex items-center justify-center text-[#5a5450] hover:text-[#c9a96e] transition-colors text-lg leading-none"
          >
            +
          </button>
        </div>
        <div className="ml-auto flex items-baseline gap-3">
          <span className="text-[9px] tracking-[0.35em] text-[#4a4540] uppercase">Per Person</span>
          <span className="font-serif text-3xl text-[#c9a96e] tabular-nums">
            {perPerson.toLocaleString()}
          </span>
          <span className="text-[10px] text-[#5a5450]">TWD</span>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-0 border-t border-[#2a2720]">
        {budget.items.map((item, i) => {
          const cfg = catCfg[item.category] ?? catCfg.misc
          return (
            <div
              key={i}
              className="flex items-baseline gap-4 border-b border-[#1e1c18] py-3.5 hover:bg-[#141210] px-1 transition-colors group"
            >
              {/* Category abbr */}
              <span className="text-[8px] tracking-[0.3em] text-[#4a4540] uppercase flex-shrink-0 w-10">
                {cfg.abbr}
              </span>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#d4cec6]">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-[#c9a96e] hover:text-[#e2c99a] transition-colors">
                      {item.label} ↗
                    </a>
                  ) : item.label}
                </div>
                {(item.unitPrice != null && item.quantity != null) && (
                  <div className="text-[9px] text-[#4a4540] mt-0.5 tabular-nums">
                    {item.unitPrice.toLocaleString()} × {item.quantity} {item.unit}
                  </div>
                )}
                {item.notes && (
                  <div className="text-[9px] text-[#4a4540] mt-0.5">{item.notes}</div>
                )}
              </div>

              {/* Amount */}
              <span className="text-sm text-[#a09890] tabular-nums flex-shrink-0">
                {item.total.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>

      {/* Total bar */}
      <div className="flex items-baseline justify-between pt-6 mt-2">
        <div>
          <div className="text-[9px] tracking-[0.4em] text-[#4a4540] uppercase mb-2">
            Total · {members} Members
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#f0ebe3] tabular-nums">
              {totalAll.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#5a5450]">TWD</span>
          </div>
        </div>
        <div className="w-10 h-px bg-[#c9a96e]" />
      </div>
    </section>
  )
}
