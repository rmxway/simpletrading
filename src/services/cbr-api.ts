const CBR_USD_CODE = 'R01235';

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

export const fetchCbrUsdRubDynamics = async (from: Date, to: Date): Promise<string> => {
	const params = new URLSearchParams({
		date_req1: formatCbrQueryDate(from),
		date_req2: formatCbrQueryDate(to),
		VAL_NM_RQ: CBR_USD_CODE,
	});

	const prefix = resolveCbrApiBase();
	const url = `${prefix}/api/cbr?${params.toString()}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`ЦБ РФ: ответ ${response.status}`);
	}

	return response.text();
};
