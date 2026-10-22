// @ts-check
import { defineConfig } from 'astro/config';

/** @param {string | undefined} value */
function publicSiteUrl(value) {
	const input = value?.trim();
	if (!input) return undefined;

	const invalidUrl = () => new Error('SITE_URL must be an absolute public HTTP(S) URL without credentials, query, or fragment.');
	let url;
	try {
		url = new URL(input);
	} catch {
		throw invalidUrl();
	}

	const hostname = url.hostname.replace(/^\[|\]$/g, '').replace(/\.$/, '');
	const localHost = hostname === 'localhost' || hostname.endsWith('.localhost')
		|| hostname === '0.0.0.0' || /^127\.\d+\.\d+\.\d+$/.test(hostname)
		|| hostname === '::' || hostname === '::1'
		|| hostname === '::ffff:0:0' || /^::ffff:7f[\da-f]{2}:/.test(hostname);
	if (!/^https?:\/\//i.test(input) || !['http:', 'https:'].includes(url.protocol)
		|| url.username || url.password || url.href.includes('?') || url.href.includes('#') || localHost) {
		throw invalidUrl();
	}

	return url.href;
}

// https://astro.build/config
export default defineConfig({
	site: publicSiteUrl(process.env.SITE_URL),
	devToolbar: { enabled: false },
});
