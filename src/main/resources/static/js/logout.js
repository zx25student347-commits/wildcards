// simple helper for logging out from client side
async function logout() {
    try {
        await fetch('/auth/logout', { method: 'GET', credentials: 'include' });
    } catch (e) {
        console.error('logout error', e);
    }
    localStorage.removeItem('token');
    window.location.href = '/login';
}
