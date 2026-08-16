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

type HexColor = `#${string}`;
type LogoVariant = 'original' | 'monochrome-light' | 'monochrome-dark';
type CardmarkTheme = {
	background: HexColor;
	foreground: HexColor;
	logoVariant: LogoVariant;
};

type Cardmark = {
	slug: string;
	name: string;
	aliases: readonly string[];
	color: HexColor;
	theme: CardmarkTheme;
	coverage: 'global' | 'regional';
	region: string;
	source: 'Payrexx payment-logos' | 'SVG Credit Card & Payment Icons';
	logoCanvas?: 'full-bleed' | 'remove-first' | 'remove-first-two' | 'v-pay';
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
		theme: { background: '#0071CE', foreground: '#FFFFFF', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'full-bleed',
		svg: americanExpressSvg,
	},
	{
		slug: 'bancontact',
		name: 'Bancontact',
		aliases: ['bcmc', 'bancontact mister cash', 'mister cash'],
		color: '#0A3782',
		theme: { background: '#FFF4CC', foreground: '#0A3782', logoVariant: 'original' },
		coverage: 'regional',
		region: 'Belgium',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first-two',
		svg: bancontactSvg,
	},
	{
		slug: 'cartes-bancaires',
		name: 'Cartes Bancaires',
		aliases: ['cb', 'carte bancaire', 'cartes bancaires', 'carte bleue'],
		color: '#003C65',
		theme: { background: '#003C65', foreground: '#FFFFFF', logoVariant: 'original' },
		coverage: 'regional',
		region: 'France',
		source: 'Payrexx payment-logos',
		logoCanvas: 'full-bleed',
		svg: cartesBancairesSvg,
	},
	{
		slug: 'dankort',
		name: 'Dankort',
		aliases: ['dk'],
		color: '#000000',
		theme: { background: '#000000', foreground: '#FFFFFF', logoVariant: 'monochrome-light' },
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
		theme: { background: '#EFF6FF', foreground: '#172033', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: dinersClubSvg,
	},
	{
		slug: 'discover',
		name: 'Discover',
		aliases: ['discover card', 'discover network'],
		color: '#F59900',
		theme: { background: '#FFF4E6', foreground: '#1A1918', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: discoverSvg,
	},
	{
		slug: 'elo',
		name: 'Elo',
		aliases: ['elo card'],
		color: '#000000',
		theme: { background: '#F5F5F4', foreground: '#000000', logoVariant: 'original' },
		coverage: 'regional',
		region: 'Brazil',
		source: 'SVG Credit Card & Payment Icons',
		logoCanvas: 'remove-first',
		svg: eloSvg,
	},
	{
		slug: 'hiper',
		name: 'Hiper',
		aliases: ['hiper brazil'],
		color: '#F37421',
		theme: { background: '#FFF1E8', foreground: '#1F130D', logoVariant: 'original' },
		coverage: 'regional',
		region: 'Brazil',
		source: 'SVG Credit Card & Payment Icons',
		logoCanvas: 'remove-first',
		svg: hiperSvg,
	},
	{
		slug: 'hipercard',
		name: 'Hipercard',
		aliases: ['hiper card brazil'],
		color: '#B3131B',
		theme: { background: '#B3131B', foreground: '#FFFFFF', logoVariant: 'monochrome-light' },
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
		theme: { background: '#EFF6FF', foreground: '#111827', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: jcbSvg,
	},
	{
		slug: 'maestro',
		name: 'Maestro',
		aliases: ['mastercard maestro'],
		color: '#4487CA',
		theme: { background: '#0F172A', foreground: '#FFFFFF', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: maestroSvg,
	},
	{
		slug: 'mastercard',
		name: 'Mastercard',
		aliases: ['master card', 'mc'],
		color: '#EB001B',
		theme: { background: '#111827', foreground: '#FFFFFF', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: mastercardSvg,
	},
	{
		slug: 'mir',
		name: 'Mir',
		aliases: ['mir card', 'mir payment system'],
		color: '#37A72E',
		theme: { background: '#EFFAF0', foreground: '#102A13', logoVariant: 'original' },
		coverage: 'regional',
		region: 'Russia',
		source: 'SVG Credit Card & Payment Icons',
		logoCanvas: 'remove-first',
		svg: mirSvg,
	},
	{
		slug: 'rupay',
		name: 'RuPay',
		aliases: ['ru pay', 'national payments corporation of india', 'npci rupay'],
		color: '#2A2C83',
		theme: { background: '#F1F0FF', foreground: '#1E1B4B', logoVariant: 'original' },
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
		theme: { background: '#EFFAF0', foreground: '#052C18', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first',
		svg: uatpSvg,
	},
	{
		slug: 'unionpay',
		name: 'UnionPay',
		aliases: ['union pay', 'china unionpay', 'cup'],
		color: '#D10429',
		theme: { background: '#EFF7F7', foreground: '#022E64', logoVariant: 'original' },
		coverage: 'global',
		region: 'Worldwide',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first-two',
		svg: unionpaySvg,
	},
	{
		slug: 'visa',
		name: 'Visa',
		aliases: ['visa card'],
		color: '#1434CB',
		theme: { background: '#1434CB', foreground: '#FFFFFF', logoVariant: 'monochrome-light' },
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
		theme: { background: '#EAF5FF', foreground: '#0B3B66', logoVariant: 'original' },
		coverage: 'regional',
		region: 'International',
		source: 'Payrexx payment-logos',
		logoCanvas: 'remove-first-two',
		svg: visaElectronSvg,
	},
	{
		slug: 'v-pay',
		name: 'V Pay',
		aliases: ['vpay', 'visa v pay'],
		color: '#030C18',
		theme: { background: '#030C18', foreground: '#FFFFFF', logoVariant: 'original' },
		coverage: 'regional',
		region: 'Europe',
		source: 'Payrexx payment-logos',
		logoCanvas: 'v-pay',
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

		const metadataLookup = readMetadataLookup(lookup);
		const cardmarkLookup = metadataLookup?.brand ?? lookup;
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

		if (metadataLookup?.resource === 'color') {
			return new Response(request.method === 'HEAD' ? null : cardmark.color, {
				headers: colorHeaders,
			});
		}

		if (metadataLookup?.resource === 'theme') {
			return jsonResponse(
				cardmark.theme,
				200,
				{ 'Cache-Control': 'public, max-age=31536000, immutable' },
				request.method === 'HEAD',
			);
		}

		const variant = readVariant(url.searchParams.get('variant'));

		if (!variant) {
			return jsonResponse(
				{
					error: `Unsupported variant: ${url.searchParams.get('variant')}`,
					supported_variants: ['logo', 'brand'],
				},
				400,
				undefined,
				request.method === 'HEAD',
			);
		}

		const size = readSize(url.searchParams.get('size'));
		const svg = variant === 'brand' ? createBrandCardmarkSvg(cardmark, size) : createCardmarkSvg(cardmark.svg, cardmark.name, size);

		if (!svg) {
			console.error(JSON.stringify({ message: 'Cardmark SVG is invalid.', slug: cardmark.slug }));
			return jsonResponse({ error: 'Card brand asset is unavailable.' }, 500, undefined, request.method === 'HEAD');
		}

		return new Response(request.method === 'HEAD' ? null : svg, {
			headers: {
				...imageHeaders,
				'Content-Disposition': `inline; filename="${cardmark.slug}${variant === 'brand' ? '-brand' : ''}.svg"`,
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

function readMetadataLookup(
	lookup: string,
): { brand: string; resource: 'color' | 'theme' } | null {
	const match = lookup.match(/^(.+)\/(color|theme)$/i);
	const brand = match?.[1]?.trim();
	const resource = match?.[2]?.toLocaleLowerCase('en-US');

	if (!brand || (resource !== 'color' && resource !== 'theme')) return null;

	return { brand, resource };
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

function readVariant(value: string | null): 'logo' | 'brand' | null {
	if (!value) return 'logo';

	const normalizedValue = value.toLocaleLowerCase('en-US');

	if (normalizedValue === 'logo' || normalizedValue === 'brand') return normalizedValue;

	return null;
}

type ParsedSourceSvg = {
	openingTag: string;
	body: string;
	namespaces: string;
	viewBox: string;
};

function parseSourceSvg(sourceSvg: string): ParsedSourceSvg | null {
	const svgStart = sourceSvg.search(/<svg\b/i);

	if (svgStart === -1) return null;

	const svg = sourceSvg.slice(svgStart);
	const openingTagEnd = svg.indexOf('>');
	const closingTagStart = svg.toLocaleLowerCase('en-US').lastIndexOf('</svg>');

	if (openingTagEnd === -1 || closingTagStart === -1 || closingTagStart <= openingTagEnd) return null;

	const openingTag = svg.slice(0, openingTagEnd);
	const declaredViewBox = openingTag
		.match(/\bviewBox\s*=\s*(?:"([^"]+)"|'([^']+)')/i)
		?.slice(1)
		.find(Boolean);
	const declaredWidth = readSvgLength(openingTag, 'width');
	const declaredHeight = readSvgLength(openingTag, 'height');
	const viewBox =
		declaredViewBox ??
		(declaredWidth && declaredHeight
			? `0 0 ${declaredWidth} ${declaredHeight}`
			: undefined);

	if (!viewBox) return null;

	return {
		openingTag,
		body: svg
			.slice(openingTagEnd + 1, closingTagStart)
			.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, ''),
		namespaces: Array.from(
			openingTag.matchAll(/\s+xmlns:[\w-]+\s*=\s*(?:"[^"]+"|'[^']+')/gi),
		)
			.map((match) => match[0])
			.join(''),
		viewBox,
	};
}

function readSvgLength(openingTag: string, attribute: 'width' | 'height'): number | null {
	const rawValue = openingTag
		.match(new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]+)"|'([^']+)')`, 'i'))
		?.slice(1)
		.find(Boolean);
	const value = rawValue ? Number.parseFloat(rawValue) : Number.NaN;

	return Number.isFinite(value) && value > 0 ? value : null;
}

function createCardmarkSvg(sourceSvg: string, name: string, width: number): string | null {
	const parsedSvg = parseSourceSvg(sourceSvg);

	if (!parsedSvg) return null;

	const height = Math.round(width / ASPECT_RATIO);
	const title = `${name} card brand`;
	const openingTag = parsedSvg.openingTag
		.replace(/\s(?:width|height|role|aria-label)\s*=\s*(?:"[^"]*"|'[^']*')/gi, '');

	return `${openingTag} width="${width}" height="${height}" role="img" aria-label="${escapeXml(title)}"><title>${escapeXml(title)}</title>${parsedSvg.body}</svg>`;
}

function createBrandCardmarkSvg(cardmark: Cardmark, width: number): string | null {
	const parsedSvg = parseSourceSvg(cardmark.svg);

	if (!parsedSvg) return null;

	const height = Math.round(width / ASPECT_RATIO);
	const title = `${cardmark.name} brand card`;
	const { background, foreground, logoVariant } = cardmark.theme;
	const logo =
		logoVariant === 'original'
			? createOriginalBrandLogo(parsedSvg, cardmark.logoCanvas)
			: createMonochromeBrandLogo(parsedSvg, foreground);

	return `<svg xmlns="http://www.w3.org/2000/svg"${parsedSvg.namespaces} width="${width}" height="${height}" viewBox="0 0 120 80" role="img" aria-label="${escapeXml(title)}" data-background="${background}" data-foreground="${foreground}" data-logo-variant="${logoVariant}"><title>${escapeXml(title)}</title><rect width="120" height="80" rx="10" fill="${background}"/>${logo}</svg>`;
}

function createOriginalBrandLogo(
	parsedSvg: ParsedSourceSvg,
	logoCanvas?: Cardmark['logoCanvas'],
): string {
	if (logoCanvas === 'full-bleed') {
		return `<svg width="120" height="80" viewBox="${escapeXml(parsedSvg.viewBox)}" preserveAspectRatio="xMidYMid slice">${parsedSvg.body}</svg>`;
	}

	const elementsToRemove = logoCanvas === 'remove-first-two' ? 2 : logoCanvas === 'remove-first' ? 1 : 0;
	const body = logoCanvas === 'v-pay'
		? extractVPayLogo(parsedSvg.body)
		: removeLeadingCanvasElements(parsedSvg.body, elementsToRemove);

	return `<svg x="12" y="12" width="96" height="56" viewBox="${escapeXml(parsedSvg.viewBox)}" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
}

function createMonochromeBrandLogo(parsedSvg: ParsedSourceSvg, foreground: HexColor): string {
	const bodyWithoutCanvas = removeFirstRect(parsedSvg.body);

	return `<svg x="15" y="15" width="90" height="50" viewBox="${escapeXml(parsedSvg.viewBox)}" preserveAspectRatio="xMidYMid meet"><style>#aspekt-cardmark-logo *{fill:${foreground}!important}#aspekt-cardmark-logo [fill="none"]{fill:none!important}</style><g id="aspekt-cardmark-logo">${bodyWithoutCanvas}</g></svg>`;
}

function removeFirstRect(body: string): string {
	return body.replace(/<rect\b[^>]*(?:\/\s*>|>[\s\S]*?<\/rect\s*>)/i, '');
}

function removeLeadingCanvasElements(body: string, count: number): string {
	let result = body;

	for (let index = 0; index < count; index += 1) {
		result = result.replace(/<(rect|path)\b[^>]*(?:\/\s*>|>[\s\S]*?<\/\1\s*>)/i, '');
	}

	return result;
}

function extractVPayLogo(body: string): string {
	const definitions = body.match(/<defs\b[\s\S]*?<\/defs>/i)?.[0] ?? '';
	const layerStart = body.search(/<g\s+id="Layer_1-3"(?=[\s>])/i);

	if (layerStart < 0) return body;

	return `${definitions}${removeLeadingCanvasElements(body.slice(layerStart), 1)}`;
}

function createDocs(origin: string, items: readonly Cardmark[]) {
	return {
		name: 'Aspekt Cardmarks API',
		description: 'Return payment-card brand marks as raw logos, themed brand cards, and UI-ready metadata.',
		endpoint: `${origin}/:brand`,
		color_endpoint: `${origin}/:brand/color`,
		theme_endpoint: `${origin}/:brand/theme`,
		docs: [`${origin}/`, `${origin}/docs.json`],
		response_type: 'image/svg+xml; charset=utf-8',
		color_response_type: 'text/plain; charset=utf-8',
		color_description:
			'The representative primary brand color, returned as an uppercase six-digit hex value.',
		theme_description:
			'UI-ready background, accessible foreground, and curated logo treatment metadata.',
		lookup: ['canonical slug', 'brand name', 'common alias'],
		normalization: 'Lookup is case-insensitive and ignores spaces, punctuation, hyphens, underscores, and diacritics. A trailing .svg is optional.',
		query_parameters: {
			variant: {
				description: 'Use brand to render a complete themed card surface, or logo for the raw mark.',
				default: 'logo',
				values: ['logo', 'brand'],
			},
			size: {
				description: 'SVG width in pixels. Cardmarks use a consistent 3:2 viewport.',
				default: DEFAULT_SIZE,
				min: MIN_SIZE,
				max: MAX_SIZE,
			},
		},
		count: items.length,
		cardmarks: items.map(({ slug, name, color, theme, coverage, region, source }) => ({
			slug,
			name,
			color,
			theme,
			coverage,
			region,
			source,
		})),
		examples: [
			`${origin}/visa`,
			`${origin}/visa?variant=brand`,
			`${origin}/visa/color`,
			`${origin}/visa/theme`,
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
