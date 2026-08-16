import americanExpressSvg from './assets/american-express.svg';
import bancontactSvg from './assets/bancontact.svg';
import cartesBancairesSvg from './assets/cartes-bancaires.svg';
import dankortSvg from './assets/dankort.svg';
import dinersClubSvg from './assets/diners-club.svg';
import discoverSvg from './assets/discover.svg';
import eloSvg from './assets/elo.svg';
import hiperSvg from './assets/hiper.svg';
import hipercardSvg from './assets/hipercard.svg';
import jcbSvg from './assets/jcb.svg';
import maestroSvg from './assets/maestro.svg';
import mastercardSvg from './assets/mastercard.svg';
import mirSvg from './assets/mir.svg';
import rupaySvg from './assets/rupay.svg';
import uatpSvg from './assets/uatp.svg';
import unionpaySvg from './assets/unionpay.svg';
import visaElectronSvg from './assets/visa-electron.svg';
import visaSvg from './assets/visa.svg';
import vPaySvg from './assets/v-pay.svg';

type Cardmark = {
	slug: string;
	name: string;
	aliases: readonly string[];
	color: `#${string}`;
	coverage: 'global' | 'regional';
	region: string;
	source: 'Payrexx payment-logos' | 'SVG Credit Card & Payment Icons';
	svg: string;
};

const DEFAULT_SIZE = 240;
const MIN_SIZE = 16;
const MAX_SIZE = 1024;
const ASPECT_RATIO = 3 / 2;

const cardmarks = ([
	{
		slug: 'american-express',
		name: 'American Express',
		aliases: ['amex', 'american express', 'americanexpress'],
		color: '#0071CE',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: americanExpressSvg,
	},
	{
		slug: 'bancontact',
		name: 'Bancontact',
		aliases: ['bcmc', 'bancontact mister cash', 'mister cash'],
		color: '#0A3782',
		coverage: 'regional',
		region: 'Belgium',
		source: 'Payrexx payment-logos',
		svg: bancontactSvg,
	},
	{
		slug: 'cartes-bancaires',
		name: 'Cartes Bancaires',
		aliases: ['cb', 'carte bancaire', 'cartes bancaires', 'carte bleue'],
		color: '#003C65',
		coverage: 'regional',
		region: 'France',
		source: 'Payrexx payment-logos',
		svg: cartesBancairesSvg,
	},
	{
		slug: 'dankort',
		name: 'Dankort',
		aliases: ['dk'],
		color: '#000000',
		coverage: 'regional',
		region: 'Denmark',
		source: 'Payrexx payment-logos',
		svg: dankortSvg,
	},
	{
		slug: 'diners-club',
		name: 'Diners Club',
		aliases: ['diners', 'diners club', 'dinersclub'],
		color: '#004C97',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: dinersClubSvg,
	},
	{
		slug: 'discover',
		name: 'Discover',
		aliases: ['discover card', 'discover network'],
		color: '#F59900',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: discoverSvg,
	},
	{
		slug: 'elo',
		name: 'Elo',
		aliases: ['elo card'],
		color: '#000000',
		coverage: 'regional',
		region: 'Brazil',
		source: 'SVG Credit Card & Payment Icons',
		svg: eloSvg,
	},
	{
		slug: 'hiper',
		name: 'Hiper',
		aliases: ['hiper brazil'],
		color: '#F37421',
		coverage: 'regional',
		region: 'Brazil',
		source: 'SVG Credit Card & Payment Icons',
		svg: hiperSvg,
	},
	{
		slug: 'hipercard',
		name: 'Hipercard',
		aliases: ['hiper card brazil'],
		color: '#B3131B',
		coverage: 'regional',
		region: 'Brazil',
		source: 'SVG Credit Card & Payment Icons',
		svg: hipercardSvg,
	},
	{
		slug: 'jcb',
		name: 'JCB',
		aliases: ['japan credit bureau'],
		color: '#006DBA',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: jcbSvg,
	},
	{
		slug: 'maestro',
		name: 'Maestro',
		aliases: ['mastercard maestro'],
		color: '#4487CA',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: maestroSvg,
	},
	{
		slug: 'mastercard',
		name: 'Mastercard',
		aliases: ['master card', 'mc'],
		color: '#EB001B',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: mastercardSvg,
	},
	{
		slug: 'mir',
		name: 'Mir',
		aliases: ['mir card', 'mir payment system'],
		color: '#37A72E',
		coverage: 'regional',
		region: 'Russia',
		source: 'SVG Credit Card & Payment Icons',
		svg: mirSvg,
	},
	{
		slug: 'rupay',
		name: 'RuPay',
		aliases: ['ru pay', 'national payments corporation of india', 'npci rupay'],
		color: '#2A2C83',
		coverage: 'regional',
		region: 'India',
		source: 'Payrexx payment-logos',
		svg: rupaySvg,
	},
	{
		slug: 'uatp',
		name: 'UATP',
		aliases: ['universal air travel plan', 'air travel card'],
		color: '#43B748',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: uatpSvg,
	},
	{
		slug: 'unionpay',
		name: 'UnionPay',
		aliases: ['union pay', 'china unionpay', 'cup'],
		color: '#D10429',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: unionpaySvg,
	},
	{
		slug: 'visa',
		name: 'Visa',
		aliases: ['visa card'],
		color: '#1434CB',
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		svg: visaSvg,
	},
	{
		slug: 'visa-electron',
		name: 'Visa Electron',
		aliases: ['electron', 'visa electron'],
		color: '#095EA2',
		coverage: 'regional',
		region: 'International',
		source: 'Payrexx payment-logos',
		svg: visaElectronSvg,
	},
	{
		slug: 'v-pay',
		name: 'V Pay',
		aliases: ['vpay', 'visa v pay'],
		color: '#030C18',
		coverage: 'regional',
		region: 'Europe',
		source: 'Payrexx payment-logos',
		svg: vPaySvg,
	},
] as const satisfies readonly Cardmark[]).toSorted((a, b) => a.name.localeCompare(b.name));

const cardmarkBySlug: ReadonlyMap<string, Cardmark> = new Map(cardmarks.map((cardmark) => [cardmark.slug, cardmark]));
const slugByAlias = createAliasMap(cardmarks);

const imageHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Cache-Control': 'public, max-age=31536000, immutable',
	'Content-Type': 'image/svg+xml; charset=utf-8',
	'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
	'X-Content-Type-Options': 'nosniff',
} as const;

const jsonHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Cache-Control': 'no-store',
	'Content-Type': 'application/json; charset=utf-8',
	'X-Content-Type-Options': 'nosniff',
} as const;

const colorHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Cache-Control': 'public, max-age=31536000, immutable',
	'Content-Type': 'text/plain; charset=utf-8',
	'X-Content-Type-Options': 'nosniff',
} as const;

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Max-Age': '86400',
				},
			});
		}

		if (request.method !== 'GET' && request.method !== 'HEAD') {
			return jsonResponse({ error: 'Method not allowed.' }, 405, { Allow: 'GET, HEAD, OPTIONS' });
		}

		const lookup = readLookup(url.pathname);

		if (!lookup || isDocsLookup(lookup)) {
			return jsonResponse(createDocs(url.origin, cardmarks), 200, undefined, request.method === 'HEAD');
		}

		const colorLookup = readColorLookup(lookup);
		const cardmarkLookup = colorLookup ?? lookup;
		const cardmark = resolveCardmark(cardmarkLookup);

		if (!cardmark) {
			return jsonResponse(
				{
					error: `Card brand not found: ${cardmarkLookup}`,
					supported_count: cardmarks.length,
					docs: url.origin,
				},
				404,
				undefined,
				request.method === 'HEAD',
			);
		}

		if (colorLookup !== null) {
			return new Response(request.method === 'HEAD' ? null : cardmark.color, {
				headers: colorHeaders,
			});
		}

		const size = readSize(url.searchParams.get('size'));
		const svg = createCardmarkSvg(cardmark.svg, cardmark.name, size);

		if (!svg) {
			console.error(JSON.stringify({ message: 'Cardmark SVG is invalid.', slug: cardmark.slug }));
			return jsonResponse({ error: 'Card brand asset is unavailable.' }, 500, undefined, request.method === 'HEAD');
		}

		return new Response(request.method === 'HEAD' ? null : svg, {
			headers: {
				...imageHeaders,
				'Content-Disposition': `inline; filename="${cardmark.slug}.svg"`,
			},
		});
	},
} satisfies ExportedHandler<Env>;

function readLookup(pathname: string): string | null {
	const parts = pathname.split('/').filter(Boolean);

	if (parts.length === 0) return null;

	return parts
		.map((part) => {
			try {
				return decodeURIComponent(part);
			} catch {
				return part;
			}
		})
		.join('/')
		.trim();
}

function readColorLookup(lookup: string): string | null {
	const match = lookup.match(/^(.+)\/color$/i);

	return match?.[1]?.trim() || null;
}

function isDocsLookup(lookup: string): boolean {
	const normalized = normalizeAlias(lookup);
	return normalized === 'docs' || normalized === 'docsjson';
}

function resolveCardmark(lookup: string): Cardmark | undefined {
	const withoutExtension = lookup.replace(/\.svg$/i, '');
	const slug = slugByAlias.get(normalizeAlias(withoutExtension));

	return slug ? cardmarkBySlug.get(slug) : undefined;
}

function createAliasMap(items: readonly Cardmark[]): ReadonlyMap<string, string> {
	const candidates = new Map<string, Set<string>>();

	for (const cardmark of items) {
		for (const alias of [cardmark.slug, cardmark.name, ...cardmark.aliases]) {
			const normalized = normalizeAlias(alias);

			if (!normalized) continue;

			const slugs = candidates.get(normalized) ?? new Set<string>();
			slugs.add(cardmark.slug);
			candidates.set(normalized, slugs);
		}
	}

	const resolved = new Map<string, string>();

	for (const [alias, slugs] of candidates) {
		if (slugs.size === 1) resolved.set(alias, [...slugs][0]);
	}

	return resolved;
}

function normalizeAlias(value: string): string {
	return value
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/&/g, 'and')
		.toLocaleLowerCase('en-US')
		.replace(/[^\p{Letter}\p{Number}]+/gu, '');
}

function readSize(value: string | null): number {
	if (!value) return DEFAULT_SIZE;

	const parsed = Number(value);

	if (!Number.isFinite(parsed)) return DEFAULT_SIZE;

	return Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.round(parsed)));
}

function createCardmarkSvg(sourceSvg: string, name: string, width: number): string | null {
	const svgStart = sourceSvg.search(/<svg\b/i);

	if (svgStart === -1) return null;

	const svg = sourceSvg.slice(svgStart);
	const openingTagEnd = svg.indexOf('>');
	const closingTagStart = svg.toLocaleLowerCase('en-US').lastIndexOf('</svg>');

	if (openingTagEnd === -1 || closingTagStart === -1 || closingTagStart <= openingTagEnd) return null;

	const height = Math.round(width / ASPECT_RATIO);
	const title = `${name} card brand`;
	const openingTag = svg
		.slice(0, openingTagEnd)
		.replace(/\s(?:width|height|role|aria-label)\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');
	const body = svg
		.slice(openingTagEnd + 1, closingTagStart)
		.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');

	return `${openingTag} width="${width}" height="${height}" role="img" aria-label="${escapeXml(title)}"><title>${escapeXml(title)}</title>${body}</svg>`;
}

function createDocs(origin: string, items: readonly Cardmark[]) {
	return {
		name: 'Aspekt Cardmarks API',
		description: 'Return international and regional payment-card brand marks as SVG images.',
		endpoint: `${origin}/:brand`,
		color_endpoint: `${origin}/:brand/color`,
		docs: [`${origin}/`, `${origin}/docs.json`],
		response_type: 'image/svg+xml; charset=utf-8',
		color_response_type: 'text/plain; charset=utf-8',
		color_description:
			'A representative primary brand color selected from the bundled logo artwork, returned as an uppercase six-digit hex value.',
		lookup: ['canonical slug', 'brand name', 'common alias'],
		normalization: 'Lookup is case-insensitive and ignores spaces, punctuation, hyphens, underscores, and diacritics. A trailing .svg is optional.',
		query_parameters: {
			size: {
				description: 'SVG width in pixels. Cardmarks use a consistent 3:2 viewport.',
				default: DEFAULT_SIZE,
				min: MIN_SIZE,
				max: MAX_SIZE,
			},
		},
		count: items.length,
		cardmarks: items.map(({ slug, name, color, coverage, region, source }) => ({
			slug,
			name,
			color,
			coverage,
			region,
			source,
		})),
		examples: [
			`${origin}/visa`,
			`${origin}/visa/color`,
			`${origin}/master-card.svg?size=480`,
			`${origin}/amex`,
			`${origin}/union-pay`,
			`${origin}/rupay`,
			`${origin}/cartes-bancaires`,
		],
		assets: {
			sources: [
				{
					name: 'Payrexx payment-logos',
					license: 'CC0-1.0',
					url: 'https://github.com/payrexx/payment-logos',
				},
				{
					name: 'SVG Credit Card & Payment Icons',
					license: 'Apache-2.0',
					url: 'https://github.com/aaronfagan/svg-credit-card-payment-icons',
				},
			],
			trademarks: 'All names, logos, and trademarks belong to their respective owners and are provided for identification only.',
		},
	};
}

function jsonResponse(
	body: unknown,
	status = 200,
	extraHeaders?: HeadersInit,
	head = false,
): Response {
	return new Response(head ? null : JSON.stringify(body, null, 2), {
		status,
		headers: { ...jsonHeaders, ...extraHeaders },
	});
}

function escapeXml(value: string): string {
	return value.replace(/[<>&'"]/g, (character) => {
		switch (character) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return character;
		}
	});
}
