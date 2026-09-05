import { create } from 'zustand';

export const CONSENT_KEY = 'connect-four-cookie-consent';

const readStoredConsent = () => {
    try {
        const raw = window.localStorage.getItem(CONSENT_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const useConsentStore = create((set, get) => {
    const stored = readStoredConsent();

    const persist = (status, categories) => {
        try {
            window.localStorage.setItem(
                CONSENT_KEY,
                JSON.stringify({ status, categories, decidedAt: new Date().toISOString() })
            );
        } catch {

        }
    };

    return {
        status: stored?.status ?? 'pending',
        categories: stored?.categories ?? {
            necessary: true,
            preferences: false,
            history: false,
        },

        acceptAll: () => {
            const categories = { necessary: true, preferences: true, history: true };
            persist('accepted', categories);
            set({ status: 'accepted', categories });
        },

        rejectAll: () => {
            const categories = { necessary: true, preferences: false, history: false };
            persist('rejected', categories);
            set({ status: 'rejected', categories });
        },

        savePreferences: (categories) => {
            const merged = { necessary: true, ...categories };
            const status = merged.preferences || merged.history ? 'accepted' : 'rejected';
            persist(status, merged);
            set({ status, categories: merged });
        },

        resetConsent: () => {
            try {
                window.localStorage.removeItem(CONSENT_KEY);
            } catch {

            }
            set({
                status: 'pending',
                categories: { necessary: true, preferences: false, history: false },
            });
        },

        isPending: () => get().status === 'pending',
    };
});
