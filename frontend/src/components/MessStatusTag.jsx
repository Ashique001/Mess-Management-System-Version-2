import { Tag } from './ui.jsx'

const STATUSES = {
  pending: { tone: 'amber', label: 'Pending' },
  active: { tone: 'green', label: 'Active' },
  suspended: { tone: 'red', label: 'Suspended' },
}

export default function MessStatusTag({ status }) {
  const { tone, label } = STATUSES[status]
  return <Tag tone={tone}>{label}</Tag>
}
