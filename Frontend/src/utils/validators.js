export function isValidUrl(str) {
	try {
		new URL(str);
		return true;
	} catch (_) {
		return false;
	}
}

export function isValidShortcode(code) {
	return /^[a-zA-Z0-9]{4,15}$/.test(code);
}

export function isValidValidity(value) {
	return value === undefined || (Number.isInteger(+value) && +value > 0);
}
