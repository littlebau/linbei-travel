'use client'

import { useState } from 'react'
import type { DayItem } from '../types/plan'

interface Props {
  days: DayItem[]
}

function formatDate(dateStr: string, dow: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getMonth()+1}/${d.getDate()}（${dow}）`
}

export default function DayTimeline({ days }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)
  if (!days?.length) return null

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-xl">🗓</span> 逐日行程
      </h2>
      <div className="space-y-2">
        {days.map((day, i) => {
          const isOpen = expanded === i
          return (
            <div key={i} className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-indigo-500/30 bg-indigo-950/20' : 'border-white/6 bg-white/2 hover:border-white/12'}`}>
              {/* Header */}
              <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isOpen ? 'bg-indigo-500 text-white' : 'bg-white/8 text-slate-400'}`}>
                  D{day.dayNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-600 mb-0.5">{formatDate(day.date, day.dayOfWeek)}</div>
                  <div className={`font-medium text-sm truncate transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>{day.route}</div>
                </div>
                <span className={`text-slate-600 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Body */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Meals */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['breakfast','lunch','dinner'] as const).map((meal) => {
                      const meta = { breakfast: ['🌅','早餐'], lunch: ['☀️','午餐'], dinner: ['🌙','晚餐'] }
                      const [icon, label] = meta[meal]
                      return day.meals[meal] ? (
                        <div key={meal} className="bg-white/4 rounded-xl p-3 border border-white/6">
                          <div className="text-[10px] text-slate-500 mb-1">{icon} {label}</div>
                          <div className="text-xs text-slate-300 leading-snug">{day.meals[meal]}</div>
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* Accommodation */}
                  {day.accommodation?.name && (
                    <div className="flex items-center gap-3 bg-white/3 rounded-xl p-3 border border-white/6">
                      <span className="text-lg">🏨</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] text-slate-500">住宿</span>
                          {day.accommodation.checkIn && <span className="text-[10px] text-emerald-400 font-semibold">Check-in</span>}
                          {day.accommodation.checkOut && <span className="text-[10px] text-amber-400 font-semibold">Check-out</span>}
                        </div>
                        {day.accommodation.url ? (
                          <a href={day.accommodation.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-sky-400 hover:text-sky-300 truncate block">
                            {day.accommodation.name}
                          </a>
                        ) : (
                          <div className="text-xs text-slate-300 truncate">{day.accommodation.name}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {day.activities?.length > 0 && (
                    <div className="space-y-2">
                      {day.activities.map((act, j) => (
                        <div key={j} className="bg-white/3 rounded-xl p-3 border border-white/6">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-500 mt-0.5 text-xs">📍</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-medium text-slate-200">{act.name}</span>
                                {act.duration && <span className="text-[10px] text-slate-600">{act.duration}</span>}
                              </div>
                              {act.description && <p className="text-xs text-slate-500 leading-relaxed mb-2">{act.description}</p>}
                              {act.references?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {act.references.map((ref, k) => (
                                    <a key={k} href={ref.url} target="_blank" rel="noopener noreferrer"
                                      className="text-[10px] text-sky-500 hover:text-sky-400 flex items-center gap-1">
                                      🔗 {ref.title}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {day.notes && (
                    <div className="text-xs text-slate-500 bg-amber-500/5 border border-amber-500/15 rounded-xl p-3">
                      💬 {day.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
