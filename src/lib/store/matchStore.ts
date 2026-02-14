import { writable } from "svelte/store"

export const currMatchInfo = writable({
  bestOf: 3,
  player1: 'Joakim1',
  player2: 'Joakim2'
})
