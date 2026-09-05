import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
    currentPlayer: 1,
    winner: null,
    isGameOver: false,
    lastMove: null,

    setCurrentPlayer: (player) => set({ currentPlayer: player }),

    setWinner: (winner) => set({ winner, isGameOver: true }),

    setLastMove: (move) => set({ lastMove: move }),

    switchPlayer: () => set((state) => ({
        currentPlayer: state.currentPlayer === 1 ? 2 : 1
    })),

    resetGame: () => set({
        currentPlayer: 1,
        winner: null,
        isGameOver: false,
        lastMove: null
    })
}));