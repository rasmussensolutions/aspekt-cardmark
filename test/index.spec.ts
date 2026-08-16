import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';

type CardmarkTheme = {
	background: `#${string}`;
	foreground: `#${string}`;
	logoVariant: 'original' | 'monochrome-light' | 'monochrome-dark';
};

type CardmarkSummary = {
	slug: string;
	name: string;
	color: `#${string}`;
	theme: CardmarkTheme;
	coverage: 'global' | 'regional';
	region: string;
	source: 'Payrexx payment-logos' | 'SVG Credit Card & Payment Icons';
};

type Docs = {
	name: string;
	count: number;
	color_endpoint: string;
	color_response_type: string;
	theme_endpoint: string;
	cardmarks: CardmarkSummary[];
};

async function readSvg(response: Response): Promise<string> {
	return new TextDecoder().decode(await response.arrayBuffer());
}

describe('Aspekt Cardmarks API', () => {
	it('describes the complete API at the root', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/');
		const docs = await response.json<Docs>();

		expect(response.status).toBe(200);
		expect(response.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
		expect(response.headers.get('Cache-Control')).toBe('no-store');
		expect(docs.name).toBe('Aspekt Cardmarks API');
		expect(docs.count).toBe(19);
		expect(docs.color_endpoint).toBe('https://cardmark.aspekt.systems/:brand/color');
		expect(docs.color_response_type).toBe('text/plain; charset=utf-8');
		expect(docs.theme_endpoint).toBe('https://cardmark.aspekt.systems/:brand/theme');
		expect(docs.cardmarks).toContainEqual({
			slug: 'visa',
			name: 'Visa',
			color: '#1434CB',
			theme: {
				background: '#1434CB',
				foreground: '#FFFFFF',
				logoVariant: 'monochrome-light',
			},
			coverage: 'global',
			region: 'Worldwide',
			source: 'Payrexx payment-logos',
		});
		expect(docs.cardmarks).toContainEqual({
			slug: 'rupay',
			name: 'RuPay',
			color: '#2A2C83',
			theme: {
				background: '#F1F0FF',
				foreground: '#1E1B4B',
				logoVariant: 'original',
			},
			coverage: 'regional',
			region: 'India',
			source: 'Payrexx payment-logos',
		});
	});

	it('returns UI-ready, accessible theme metadata for every card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmark.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		for (const cardmark of docs.cardmarks) {
			const response = await SELF.fetch(
				`https://cardmark.aspekt.systems/${cardmark.slug}/theme`,
			);
			const theme = await response.json<CardmarkTheme>();

			expect(response.status, cardmark.slug).toBe(200);
			expect(response.headers.get('Content-Type'), cardmark.slug).toBe(
				'application/json; charset=utf-8',
			);
			expect(response.headers.get('Cache-Control'), cardmark.slug).toBe(
				'public, max-age=31536000, immutable',
			);
			expect(theme, cardmark.slug).toEqual(cardmark.theme);
			expect(contrastRatio(theme.background, theme.foreground), cardmark.slug).toBeGreaterThanOrEqual(4.5);
		}
	});

	it('returns the documented primary color for every card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmark.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		const responses = await Promise.all(
			docs.cardmarks.map(async (cardmark) => ({
				cardmark,
				response: await SELF.fetch(
					`https://cardmark.aspekt.systems/${cardmark.slug}/color`,
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
		const response = await SELF.fetch(`https://cardmark.aspekt.systems/${alias}/color`);

		expect(response.status).toBe(200);
		expect(await response.text()).toBe(color);
	});

	it('also serves discovery JSON from /docs.json', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/docs.json');
		const docs = await response.json<Docs>();

		expect(response.status).toBe(200);
		expect(docs.count).toBe(19);
	});

	it('returns a safe, accessible SVG for every documented card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmark.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		const responses = await Promise.all(
			docs.cardmarks.map(async (cardmark) => ({
				cardmark,
				response: await SELF.fetch(`https://cardmark.aspekt.systems/${cardmark.slug}`),
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

	it('returns a complete themed brand-card SVG for every documented card brand', async () => {
		const docsResponse = await SELF.fetch('https://cardmark.aspekt.systems/');
		const docs = await docsResponse.json<Docs>();

		for (const cardmark of docs.cardmarks) {
			const response = await SELF.fetch(
				`https://cardmark.aspekt.systems/${cardmark.slug}?variant=brand&size=300`,
			);
			const svg = await readSvg(response);

			expect(response.status, cardmark.slug).toBe(200);
			expect(response.headers.get('Content-Disposition'), cardmark.slug).toBe(
				`inline; filename="${cardmark.slug}-brand.svg"`,
			);
			expect(svg, cardmark.slug).toMatch(/<svg\b[^>]* width="300" height="200"/i);
			expect(svg, cardmark.slug).toContain(`<title>${cardmark.name} brand card</title>`);
			expect(svg, cardmark.slug).toContain(`data-background="${cardmark.theme.background}"`);
			expect(svg, cardmark.slug).toContain(`data-foreground="${cardmark.theme.foreground}"`);
			expect(svg, cardmark.slug).toContain(`data-logo-variant="${cardmark.theme.logoVariant}"`);
			expect(svg, cardmark.slug).not.toContain('aspekt-logo-surface');
			expect(svg, cardmark.slug).not.toMatch(/<(?:script|foreignObject|iframe|image)\b/i);
			expect(svg, cardmark.slug).not.toMatch(/\son[a-z]+\s*=/i);
		}
	});

	it('preserves multicolor marks and applies curated monochrome treatments', async () => {
		const mastercard = await readSvg(
			await SELF.fetch('https://cardmark.aspekt.systems/mastercard?variant=brand'),
		);
		const visa = await readSvg(
			await SELF.fetch('https://cardmark.aspekt.systems/visa?variant=brand'),
		);

		expect(mastercard).toContain('data-logo-variant="original"');
		expect(mastercard).toContain('data-background="#111827"');
		expect(mastercard).toMatch(/#f79e1b/i);
		expect(mastercard).not.toContain('aspekt-logo-surface');
		expect(mastercard).not.toMatch(/<rect\b[^>]*fill="#FFFFFF"/i);
		expect(visa).toContain('data-logo-variant="monochrome-light"');
		expect(visa).toContain('#aspekt-cardmark-logo *{fill:#FFFFFF!important}');
	});

	it('keeps primary brand color metadata independent from the themed surface', async () => {
		const color = await SELF.fetch('https://cardmark.aspekt.systems/mastercard/color');
		const theme = await SELF.fetch('https://cardmark.aspekt.systems/mastercard/theme');

		expect(await color.text()).toBe('#EB001B');
		expect(await theme.json<CardmarkTheme>()).toEqual({
			background: '#111827',
			foreground: '#FFFFFF',
			logoVariant: 'original',
		});
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
		const response = await SELF.fetch(`https://cardmark.aspekt.systems/${alias}`);
		const svg = await readSvg(response);

		expect(response.status).toBe(200);
		expect(svg).toContain(`<title>${brand} card brand</title>`);
	});

	it('returns cacheable SVG with public CORS and security headers', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/jcb');

		expect(response.status).toBe(200);
		expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
		expect(response.headers.get('Content-Disposition')).toBe('inline; filename="jcb.svg"');
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
		expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'none'");
	});

	it('supports a clamped size parameter with a 3:2 viewport', async () => {
		const smallResponse = await SELF.fetch('https://cardmark.aspekt.systems/visa?size=1');
		const largeResponse = await SELF.fetch('https://cardmark.aspekt.systems/mastercard?size=2000');

		expect(await readSvg(smallResponse)).toMatch(/<svg\b[^>]* width="16" height="11"/i);
		expect(await readSvg(largeResponse)).toMatch(/<svg\b[^>]* width="1024" height="683"/i);
	});

	it('rejects unsupported SVG variants', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/visa?variant=embossed');
		const body = await response.json<{ error: string; supported_variants: string[] }>();

		expect(response.status).toBe(400);
		expect(body.error).toBe('Unsupported variant: embossed');
		expect(body.supported_variants).toEqual(['logo', 'brand']);
	});

	it('returns a useful 404 for unsupported card brands', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/atlantis-card');
		const body = await response.json<{ error: string; supported_count: number; docs: string }>();

		expect(response.status).toBe(404);
		expect(body.error).toBe('Card brand not found: atlantis-card');
		expect(body.supported_count).toBe(19);
		expect(body.docs).toBe('https://cardmark.aspekt.systems');
	});

	it('supports HEAD requests without returning a response body', async () => {
		const imageResponse = await SELF.fetch('https://cardmark.aspekt.systems/visa', { method: 'HEAD' });
		const colorResponse = await SELF.fetch('https://cardmark.aspekt.systems/visa/color', { method: 'HEAD' });
		const themeResponse = await SELF.fetch('https://cardmark.aspekt.systems/visa/theme', { method: 'HEAD' });
		const brandResponse = await SELF.fetch('https://cardmark.aspekt.systems/visa?variant=brand', { method: 'HEAD' });
		const docsResponse = await SELF.fetch('https://cardmark.aspekt.systems/', { method: 'HEAD' });

		expect(imageResponse.status).toBe(200);
		expect(imageResponse.headers.get('Content-Type')).toBe('image/svg+xml; charset=utf-8');
		expect(await imageResponse.text()).toBe('');
		expect(colorResponse.status).toBe(200);
		expect(colorResponse.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
		expect(await colorResponse.text()).toBe('');
		expect(themeResponse.status).toBe(200);
		expect(themeResponse.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
		expect(await themeResponse.text()).toBe('');
		expect(brandResponse.status).toBe(200);
		expect(brandResponse.headers.get('Content-Disposition')).toBe(
			'inline; filename="visa-brand.svg"',
		);
		expect(await brandResponse.text()).toBe('');
		expect(docsResponse.status).toBe(200);
		expect(docsResponse.headers.get('Content-Type')).toBe('application/json; charset=utf-8');
		expect(await docsResponse.text()).toBe('');
	});

	it('answers CORS preflight requests', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/visa', { method: 'OPTIONS' });

		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD, OPTIONS');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
	});

	it('rejects unsupported methods', async () => {
		const response = await SELF.fetch('https://cardmark.aspekt.systems/visa', { method: 'POST' });

		expect(response.status).toBe(405);
		expect(response.headers.get('Allow')).toBe('GET, HEAD, OPTIONS');
	});
});

function contrastRatio(first: `#${string}`, second: `#${string}`): number {
	const firstLuminance = relativeLuminance(first);
	const secondLuminance = relativeLuminance(second);
	const lighter = Math.max(firstLuminance, secondLuminance);
	const darker = Math.min(firstLuminance, secondLuminance);

	return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color: `#${string}`): number {
	const channels = [1, 3, 5].map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16) / 255);
	const linearChannels = channels.map((channel) =>
		channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
	);

	return 0.2126 * linearChannels[0] + 0.7152 * linearChannels[1] + 0.0722 * linearChannels[2];
}
