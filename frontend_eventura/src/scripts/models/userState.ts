export function setUserId(id: number) {
    localStorage.setItem("userId", id.toString());
}

export function getUserId(): number | null {
    const val = localStorage.getItem("userId");
    return val ? Number(val) : null;
}

export function clearUserId() {
    localStorage.removeItem("userId");
}