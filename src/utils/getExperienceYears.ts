import moment from 'moment'

import { STARTING_PROFESSIONAL_TIME } from '@/constants/project'

export default function getExperienceYears(): string {
  const currentDate = new Date()
  const momentStart = moment(STARTING_PROFESSIONAL_TIME)
  const momentToday = moment(currentDate)

  const computedYear = momentToday.diff(momentStart, 'year', true)
  const shouldDisplayPlus = computedYear % 1 > 0.3

  return shouldDisplayPlus
    ? `${Math.ceil(computedYear)}+ years`
    : `${Math.floor(computedYear)} years`
}
