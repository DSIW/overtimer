import {subDays} from 'date-fns'

export const SEC = 1000
export const MIN = 60*SEC
export const HOUR = 60*MIN
export const TODAY = new Date()
export const NOW = new Date()
export const YESTERDAY = subDays(TODAY, 1)