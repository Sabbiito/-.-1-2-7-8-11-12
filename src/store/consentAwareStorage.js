import { CONSENT_KEY } from './consentStore';

const readConsentCategories = () => {
    try {
        const raw = window.localStorage.getItem(CONSENT_KEY);
        if (!raw) return { necessary: true, preferences: false, history: false };
        const parsed = JSON.parse(raw);
        return parsed.categories ?? { necessary: true, preferences: false, history: false };
    } catch {
        return { necessary: true, preferences: false, history: false };
    }
};

/**
 * @param {'preferences' | 'history'} category — яку категорію згоди
 *   перевіряти перед кожною операцією читання/запису.
 */
export const createConsentAwareStorage = (category) => ({
    getItem: (key) => {
        const categories = readConsentCategories();
        if (!categories[category]) return null;
        try {
            return window.localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    setItem: (key, value) => {
        const categories = readConsentCategories();
        if (!categories[category]) return;
        try {
            window.localStorage.setItem(key, value);
        } catch {

        }
    },
    removeItem: (key) => {
        try {
            window.localStorage.removeItem(key);
        } catch {

        }
    },
});
