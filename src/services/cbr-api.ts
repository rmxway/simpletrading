/** Коды валют (VAL_NM_RQ) в сервисе динамики ЦБ РФ */
export const CBR_VAL_CODES = {
	USD: 'R01235',
	EUR: 'R01239',
	CNY: 'R01375',
} as const;

export type CbrQuoteCurrency = keyof typeof CBR_VAL_CODES;

/** Как long staleTime в query-provider: после F5 данные берутся отсюда, без сети. */
const CBR_CLIENT_CACHE_MS = 10 * 60 * 1000;

const CBR_STORAGE_KEY_PREFIX = 'st:cbr-dynamics:';

type CbrClientCacheEntry = { savedAt: number; xml: string };

const readCbrClientCache = (key: string): string | null => {
	if (typeof window === 'undefined') return null;
	try {
		const raw = sessionStorage.getItem(key);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CbrClientCacheEntry;
		if (Date.now() - parsed.savedAt > CBR_CLIENT_CACHE_MS) {
			sessionStorage.removeItem(key);
			return null;
		}
		return parsed.xml;
	} catch {
		return null;
	}
};

const writeCbrClientCache = (key: string, xml: string): void => {
	if (typeof window === 'undefined') return;
	try {
		const entry: CbrClientCacheEntry = { savedAt: Date.now(), xml };
		sessionStorage.setItem(key, JSON.stringify(entry));
	} catch {
		// квота / приватный режим
	}
};

/** Публичный URL прокси к ЦБ (по умолчанию тот же origin, `/api/cbr`). */
const resolveCbrApiBase = (): string => {
	const custom = process.env.NEXT_PUBLIC_CBR_API_BASE?.trim();
	return custom ? custom.replace(/\/$/, '') : '';
};

/** Формат даты для запроса ЦБ: dd/mm/yyyy */
export const formatCbrQueryDate = (date: Date): string => {
	const d = String(date.getDate()).padStart(2, '0');
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const y = date.getFullYear();
	return `${d}/${m}/${y}`;
};

export const fetchCbrQuoteDynamics = async (from: Date, to: Date, quote: CbrQuoteCurrency): Promise<string> => {
	const params = new URLSearchParams({
		date_req1: formatCbrQueryDate(from),
		date_req2: formatCbrQueryDate(to),
		VAL_NM_RQ: CBR_VAL_CODES[quote],
	});

	const prefix = resolveCbrApiBase();
	const url = `${prefix}/api/cbr?${params.toString()}`;
	const storageKey = `${CBR_STORAGE_KEY_PREFIX}${prefix}|${params.toString()}`;

	const cached = readCbrClientCache(storageKey);
	if (cached !== null) return cached;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`ЦБ РФ: ответ ${response.status}`);
	}

	const xml = await response.text();
	writeCbrClientCache(storageKey, xml);
	return xml;
};
