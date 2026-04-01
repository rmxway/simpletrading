const CBR_DYNAMIC_URL = 'https://www.cbr.ru/scripts/XML_dynamic.asp';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const dateReq1 = searchParams.get('date_req1');
	const dateReq2 = searchParams.get('date_req2');
	const valNmRq = searchParams.get('VAL_NM_RQ') ?? 'R01235';

	if (!dateReq1 || !dateReq2) {
		return new Response(JSON.stringify({ error: 'date_req1 и date_req2 обязательны' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const upstream = new URL(CBR_DYNAMIC_URL);
	upstream.searchParams.set('date_req1', dateReq1);
	upstream.searchParams.set('date_req2', dateReq2);
	upstream.searchParams.set('VAL_NM_RQ', valNmRq);

	const response = await fetch(upstream.toString(), { cache: 'no-store' });

	if (!response.ok) {
		return new Response(JSON.stringify({ error: `ЦБ РФ: ${response.status}` }), {
			status: response.status,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const xml = await response.text();
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
