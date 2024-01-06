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
  name: 'TheMind',
  setup: ({ playOrder, random }) => {
    const players: { [key: string]: TheMindPlayer } = {}
    playOrder.forEach(playerId => {
      players[playerId] = {
        name: null,
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
      onBegin: (G, { playOrder, events, playerID, ...rest }) => {
        Object.entries(G.players).forEach(([playerId, name]) => {
          let numberOfCards = G.currentLevel
          while (numberOfCards > 0) {
            G.players[playerId].hand.push(G.deck.pop() as number)
            numberOfCards--
          }
        })
        console.log({ G, playOrder, events, playerID, rest })
        return G
      },
      onEnd: (G, ctx) => {},
      endIf: (G, { playOrder, ...ctx }) => {
        const players = Object.values(G.players)
        console.log({ G, playOrder, players, ctx })

        // end phase if every player has drawn their cards
        return (
          players.length === playOrder.length &&
          players.every(({ hand }) => hand.length === G.currentLevel)
        )
      },
      next: 'playPhase',
      start: true,
    },
    playPhase: {},
  },
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
}
