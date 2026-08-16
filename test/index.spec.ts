import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';

type CardmarkSummary = {
	slug: string;
	name: string;
	color: `#${string}`;
	coverage: 'global' | 'regional';
	region: string;
	source: 'Payrexx payment-logos' | 'SVG Credit Card & Payment Icons';
};

type Docs = {
	name: string;
	count: number;
	color_endpoint: string;
	color_response_type: string;
	cardmarks: CardmarkSummary[];
};

async function readSvg(response: Response): Promise<string> {
	return new TextDecoder().decode(await response.arrayBuffer());
}

describe('Aspekt Cardmarks API', () => {
	it('describes the complete API at the root', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/');
		const docs = await response.json<Docs>();

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
		expect(response.headers.get('Cache-Control')).toBe('no-store');
		expect(docs.name).toBe('Aspekt Cardmarks API');
		expect(docs.count).toBe(19);
		expect(docs.color_endpoint).toBe('https://cardmarks.aspekt.systems/:brand/color');
		expect(docs.color_response_type).toBe('text/plain; charset=utf-8');
		expect(docs.cardmarks).toContainEqual({
			slug: 'visa',
			name: 'Visa',
			color: '#1434CB',
			coverage: 'global',
			region: 'Worldwide',
			source: 'Payrexx payment-logos',
		});
		expect(docs.cardmarks).toContainEqual({
			slug: 'rupay',
			name: 'RuPay',
			color: '#2A2C83',
			coverage: 'regional',
			region: 'India',
			source: 'Payrexx payment-logos',
		});
	});

	it('returns the documented primary color for every card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmarks.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		const responses = await Promise.all(
			docs.cardmarks.map(async (cardmark) => ({
				cardmark,
				response: await SELF.fetch(
					`https://cardmarks.aspekt.systems/${cardmark.slug}/color`,
				),
			})),
		);

		for (const { cardmark, response } of responses) {
			expect(response.status, cardmark.slug).toBe(200);
			expect(response.headers.get('Content-Type'), cardmark.slug).toBe('text/plain; charset=utf-8');
			expect(response.headers.get('Cache-Control'), cardmark.slug).toBe(
				'public, max-age=31536000, immutable',
			);
			expect(response.headers.get('Access-Control-Allow-Origin'), cardmark.slug).toBe('*');
			expect(await response.text(), cardmark.slug).toBe(cardmark.color);
			expect(cardmark.color, cardmark.slug).toMatch(/^#[0-9A-F]{6}$/);
		}
	});

	it.each([
		['visa', '#1434CB'],
		['master-card', '#EB001B'],
		['amex', '#0071CE'],
		['American%20Express', '#0071CE'],
		['union-pay', '#D10429'],
	])('resolves the %s alias for color lookup', async (alias, color) => {
		const response = await SELF.fetch(`https://cardmarks.aspekt.systems/${alias}/color`);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe(color);
	});

	it('also serves discovery JSON from /docs.json', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/docs.json');
		const docs = await response.json<Docs>();

		expect(response.status).toBe(200);
		expect(docs.count).toBe(19);
	});

	it('returns a safe, accessible SVG for every documented card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmarks.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		const responses = await Promise.all(
			docs.cardmarks.map(async (cardmark) => ({
				cardmark,
				response: await SELF.fetch(`https://cardmarks.aspekt.systems/${cardmark.slug}`),
			})),
		);

		for (const { cardmark, response } of responses) {
			const svg = await readSvg(response);

			expect(response.status, cardmark.slug).toBe(200);
			expect(response.headers.get('Content-Type'), cardmark.slug).toBe('image/svg+xml; charset=utf-8');
			expect(svg, cardmark.slug).toContain(`<title>${cardmark.name} card brand</title>`);
			expect(svg, cardmark.slug).toContain(`aria-label="${cardmark.name} card brand"`);
			expect(svg, cardmark.slug).not.toMatch(/<(?:script|foreignObject|iframe|image)\b/i);
			expect(svg, cardmark.slug).not.toMatch(/\son[a-z]+\s*=/i);
		}
	});

	it.each([
		['visa', 'Visa'],
		['VISA.svg', 'Visa'],
		['master-card', 'Mastercard'],
		['mc', 'Mastercard'],
		['amex', 'American Express'],
		['American%20Express', 'American Express'],
		['diners_club', 'Diners Club'],
		['union-pay', 'UnionPay'],
		['cup', 'UnionPay'],
		['ru-pay', 'RuPay'],
		['cb', 'Cartes Bancaires'],
		['mister-cash', 'Bancontact'],
		['vpay', 'V Pay'],
	])('resolves the %s alias', async (alias, brand) => {
		const response = await SELF.fetch(`https://cardmarks.aspekt.systems/${alias}`);
		const svg = await readSvg(response);

		expect(response.status).toBe(200);
		expect(svg).toContain(`<title>${brand} card brand</title>`);
	});

	it('returns cacheable SVG with public CORS and security headers', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/jcb');

		expect(response.status).toBe(200);
		expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
		expect(response.headers.get('Content-Disposition')).toBe('inline; filename="jcb.svg"');
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
		expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'none'");
	});

	it('supports a clamped size parameter with a 3:2 viewport', async () => {
		const smallResponse = await SELF.fetch('https://cardmarks.aspekt.systems/visa?size=1');
		const largeResponse = await SELF.fetch('https://cardmarks.aspekt.systems/mastercard?size=2000');

		expect(await readSvg(smallResponse)).toMatch(/<svg\b[^>]* width="16" height="11"/i);
		expect(await readSvg(largeResponse)).toMatch(/<svg\b[^>]* width="1024" height="683"/i);
	});

	it('returns a useful 404 for unsupported card brands', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/atlantis-card');
		const body = await response.json<{ error: string; supported_count: number; docs: string }>();

		expect(response.status).toBe(404);
		expect(body.error).toBe('Card brand not found: atlantis-card');
		expect(body.supported_count).toBe(19);
		expect(body.docs).toBe('https://cardmarks.aspekt.systems');
	});

	it('supports HEAD requests without returning a response body', async () => {
		const imageResponse = await SELF.fetch('https://cardmarks.aspekt.systems/visa', { method: 'HEAD' });
		const colorResponse = await SELF.fetch('https://cardmarks.aspekt.systems/visa/color', { method: 'HEAD' });
		const docsResponse = await SELF.fetch('https://cardmarks.aspekt.systems/', { method: 'HEAD' });

		expect(imageResponse.status).toBe(200);
		expect(imageResponse.headers.get('Content-Type')).toBe('image/svg+xml; charset=utf-8');
		expect(await imageResponse.text()).toBe('');
		expect(colorResponse.status).toBe(200);
		expect(colorResponse.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
		expect(await colorResponse.text()).toBe('');
		expect(docsResponse.status).toBe(200);
		expect(docsResponse.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
		expect(await docsResponse.text()).toBe('');
	});

	it('answers CORS preflight requests', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/visa', { method: 'OPTIONS' });

		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD, OPTIONS');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
	});

	it('rejects unsupported methods', async () => {
		const response = await SELF.fetch('https://cardmarks.aspekt.systems/visa', { method: 'POST' });

		expect(response.status).toBe(405);
		expect(response.headers.get('Allow')).toBe('GET, HEAD, OPTIONS');
	});
});
