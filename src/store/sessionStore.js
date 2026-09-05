import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createConsentAwareStorage } from './consentAwareStorage';

const SESSIONS_KEY = 'connect-four-sessions';

/**
 * @typedef {Object} GameSession
 * @property {string} id — унікальний ідентифікатор виду `session_<timestamp>`.
 * @property {Object} settings — знімок налаштувань гри на момент створення сесії.
 * @property {{ player1Wins: number, player2Wins: number, draws: number, totalGames: number }} stats
 * @property {string} createdAt — ISO 8601 дата створення сесії.
 * @property {string} lastPlayedAt — ISO 8601 дата останньої зіграної гри в сесії.
 */

export const useSessionStore = create(
    persist(
        (set, get) => ({
            /**
             * Мапа id сесії → сама сесія.
             * @type {Object.<string, GameSession>}
             */
            sessions: {},

            createSession: (settings) => {
                const sessionId = `session_${Date.now()}`;
                const newSession = {
                    id: sessionId,
                    settings,
                    stats: {
                        player1Wins: 0,
                        player2Wins: 0,
                        draws: 0,
                        totalGames: 0
                    },
                    createdAt: new Date().toISOString(),
                    lastPlayedAt: new Date().toISOString()
                };

                set((state) => ({
                    sessions: {
                        ...state.sessions,
                        [sessionId]: newSession
                    }
                }));

                return sessionId;
            },

            getSession: (sessionId) => {
                return get().sessions[sessionId] || null;
            },

            updateSessionStats: (sessionId, winner) => {
                set((state) => {
                    const session = state.sessions[sessionId];
                    if (!session) return state;

                    return {
                        sessions: {
                            ...state.sessions,
                            [sessionId]: {
                                ...session,
                                stats: {
                                    player1Wins: winner === 1 ? session.stats.player1Wins + 1 : session.stats.player1Wins,
                                    player2Wins: winner === 2 ? session.stats.player2Wins + 1 : session.stats.player2Wins,
                                    draws: winner === 'draw' ? session.stats.draws + 1 : session.stats.draws,
                                    totalGames: session.stats.totalGames + 1
                                },
                                lastPlayedAt: new Date().toISOString()
                            }
                        }
                    };
                });
            },

            deleteSession: (sessionId) => {
                set((state) => {
                    const newSessions = { ...state.sessions };
                    delete newSessions[sessionId];
                    return { sessions: newSessions };
                });
            },

            getAllSessions: () => {
                return Object.values(get().sessions).sort((a, b) =>
                    new Date(b.lastPlayedAt) - new Date(a.lastPlayedAt)
                );
            },

            clearAllSessions: () => {
                set({ sessions: {} });
            }
        }),
        {
            name: SESSIONS_KEY,
            storage: createJSONStorage(() => createConsentAwareStorage('history'))
        }
    )
);