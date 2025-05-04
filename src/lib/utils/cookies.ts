export function setCookie(name: string, value: string | null, daysToExpire = 0, sameSite = "Strict") {
	const date = new Date();
	daysToExpire && date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	const expires = daysToExpire ? `expires=${date.toUTCString()}` : undefined;
	const secure = location.protocol === "https:" ? "Secure" : "";
	const cookieString = `${name}=${value}; ${expires}; path=/; ${secure}; SameSite=${sameSite}`;
	document.cookie = cookieString;
}

export function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift();
	return null;
}
