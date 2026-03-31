const CBR_USD_CODE = 'R01235';

const CBR_ORIGIN = 'https://www.cbr.ru';

const CBR_DYNAMIC_PATH = '/scripts/XML_dynamic.asp';

/** Полный URL эндпоинта динамики курсов (официальный адрес ЦБ). */
export const CBR_DYNAMIC_URL = `${CBR_ORIGIN}${CBR_DYNAMIC_PATH}`;

/**
 * В development запрос идёт на тот же origin → `setupProxy.js` проксирует на cbr.ru (без CORS).
 * В production без своего прокси задайте `REACT_APP_CBR_API_BASE` (URL вашего бэкенда, который проксирует ЦБ).
 */
const resolveCbrOrigin = (): string => {
	const custom = process.env.REACT_APP_CBR_API_BASE?.trim();
	if (custom) return custom.replace(/\/$/, '');
	if (process.env.NODE_ENV === 'development') return '/cbr-proxy';
	return CBR_ORIGIN;
};

/** Формат даты для запроса ЦБ: dd/mm/yyyy */
export const formatCbrQueryDate = (date: Date): string => {
	const d = String(date.getDate()).padStart(2, '0');
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const y = date.getFullYear();
	return `${d}/${m}/${y}`;
};

export const fetchCbrUsdRubDynamics = async (from: Date, to: Date): Promise<string> => {
	const params = new URLSearchParams({
		date_req1: formatCbrQueryDate(from),
		date_req2: formatCbrQueryDate(to),
		VAL_NM_RQ: CBR_USD_CODE,
	});

	const url = `${resolveCbrOrigin()}${CBR_DYNAMIC_PATH}?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`ЦБ РФ: ответ ${response.status}`);
	}

	return response.text();
};
