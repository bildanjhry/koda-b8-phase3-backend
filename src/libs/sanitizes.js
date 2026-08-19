export default function sanitizes(word) {
	const reservedWords = new Set([
		"order",
		"user",
		"group",
		"table",
		"api",
		"word",
		"login",
		"dashboard",
		"admin"
	])
    if(reservedWords.has(word.trim().toLowerCase())){
        return false
    }
    return true
}