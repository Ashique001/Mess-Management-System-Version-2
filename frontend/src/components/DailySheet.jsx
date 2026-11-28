// The day-by-day matrix: one row per date, a lunch (D) and dinner (N) column
// for each member. Headers, dates and totals stay visible while scrolling.

import { useState } from 'react'
import { formatDate, weekday } from '../lib/format.js'

// One pastel colour per member, shared by that member's two columns.
const COLOURS = [
  { head: 'bg-[#c3d8f8]', body: 'bg-[#dbecfc]' },
  { head: 'bg-[#b6f0d0]', body: 'bg-[#d8f5e8]' },
  { head: 'bg-[#f5e46e]', body: 'bg-[#fcf3c8]' },
  { head: 'bg-[#d4bcf8]', body: 'bg-[#e8e4fc]' },
  { head: 'bg-[#f8b4be]', body: 'bg-[#fce0e2]' },
  { head: 'bg-[#aff2e4]', body: 'bg-[#dcf8f2]' },
  { head: 'bg-[#f5c48e]', body: 'bg-[#fcead6]' },
  { head: 'bg-[#cdd6e4]', body: 'bg-[#e8eef4]' },
]

const CELL =
  'border-r border-b border-slate-200 px-1.5 py-2 text-center whitespace-nowrap sm:px-3 sm:py-2.5'
const HEAD = `${CELL} sticky top-0 font-semibold text-slate-600`
const FOOT = `${CELL} sticky bottom-0 border-t-2 border-t-blue-200 bg-blue-50 font-bold text-blue-700`
const SELECTED = 'bg-blue-500 text-white'

export default function DailySheet({ members, days, summary, mealCount }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const colour = (index) => COLOURS[index % COLOURS.length]

  // Members who share a name are numbered to tell them apart.
  const label = (member) => {
    const namesakes = members.filter((m) => m.name === member.name)
    return namesakes.length > 1 ? `${member.name} #${namesakes.indexOf(member) + 1}` : member.name
  }

  return (
    <div className="max-h-[65vh] overflow-auto rounded-lg border border-slate-200">
      <table className="w-full border-separate border-spacing-0 text-xs sm:text-sm">
        <thead>
          <tr>
            <th scope="col" className={`${HEAD} left-0 z-3 bg-slate-100 text-left`}>
              তারিখ (Date)
            </th>
            {members.map((member, i) =>
              ['D', 'N'].map((meal) => (
                <th key={member.id + meal} scope="col" className={`${HEAD} z-2 ${colour(i).head}`}>
                  {label(member)} ({meal})
                </th>
              )),
            )}
            <th scope="col" className={`${HEAD} z-2 bg-indigo-100 text-blue-700`}>
              দৈনিক মোট (Total)
            </th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const selected = day.date === selectedDate
            return (
              <tr key={day.date} className="cursor-pointer" onClick={() => setSelectedDate(day.date)}>
                <th
                  scope="row"
                  className={`${CELL} sticky left-0 z-1 text-left font-semibold ${selected ? SELECTED : 'bg-slate-50'}`}
                >
                  {formatDate(day.date)} ({weekday(day.date)})
                </th>
                {day.cells.map((cell, i) =>
                  ['lunch', 'dinner'].map((meal) => (
                    <td
                      key={cell.memberId + meal}
                      className={`${CELL} ${selected ? SELECTED : colour(i).body}`}
                    >
                      {cell[meal]}
                    </td>
                  )),
                )}
                <td className={`${CELL} font-bold ${selected ? SELECTED : 'bg-indigo-50 text-blue-700'}`}>
                  {day.total}
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className={`${FOOT} left-0 z-3 text-left`}>
              মোট মিল (Total)
            </th>
            {summary.map((row) =>
              ['lunch', 'dinner'].map((meal) => (
                <td key={row.id + meal} className={`${FOOT} z-2`}>
                  {row[meal]}
                </td>
              )),
            )}
            <td className={`${FOOT} z-2`}>{mealCount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
