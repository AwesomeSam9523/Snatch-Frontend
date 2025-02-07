const BASE_URL = 'https://snatch-ieeecs-backend.vercel.app';

async function get(path) {
  const response = await fetch(`${BASE_URL}/${path.replace(/^\/+/, '')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return await response.json();
}

async function post(path, data) {
  const response = await fetch(`${BASE_URL}/${path.replace(/^\/+/, '')}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export { get, post };
