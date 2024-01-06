import { Game } from 'boardgame.io'

export type TheMindPlayer = {
  name: string
  hand: number[]
}

export type TheMindState = {
  currentLevel: number
  deck: number[]
  discard: number[]
  players: { [key: string]: TheMindPlayer }
}

export const TheMind: Game<TheMindState> = {
  name: 'The Mind',
  setup: ({ activePlayers, random }) => {
    const players: { [key: string]: TheMindPlayer } = {}
    Object.entries(activePlayers || {}).forEach(([playerId, name]) => {
      players[playerId] = {
        name,
        hand: [],
      }
    })

    return {
      currentLevel: 1,
      deck: random?.Shuffle(Array.from(Array(100).keys(), x => x + 1)) as number[],
      discard: [],
      players,
    }
  },
  phases: {
    drawPhase: {
      onBegin: (G, { activePlayers }) => {
        Object.entries(activePlayers || {}).forEach(([playerId, name]) => {
          let numberOfCards = G.currentLevel
          while (numberOfCards > 0) {
            G.players[playerId].hand.push(G.deck.pop() as number)
            numberOfCards--
          }
        })
      },
      onEnd: (G, ctx) => {},
      endIf: (G, ctx) => {},
      next: 'play',
      start: true,
    },
  },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
}
