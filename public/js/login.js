const login = async (email, password) => {
  try {
    const isRender = window.location.hostname.includes('onrender.com');
    const baseURL = isRender
      ? 'https://natours-cxwn.onrender.com'
      : '';
    const res = await axios.post(
      baseURL + '/api/v1/users/login',
      { email, password },
      { withCredentials: true }
    );
    if (res.data.status === 'success') {
      window.location.assign('/');
    }
  } catch (err) {
    console.error('❌ login error:', err.response?.data || err.message);
  }
};

const logout = async () => {
  try {
    const isRender = window.location.hostname.includes('onrender.com');
    const baseURL = isRender
      ? 'https://natours-cxwn.onrender.com'
      : '';
    await axios.get(
      baseURL + '/api/v1/users/logout',
      { withCredentials: true }
    );
    window.location.replace('/');
  } catch (err) {
    console.error('❌ logout error:', err.response?.data || err.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form--login');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      await login(email, password);
    });
  }


  document.body.addEventListener('click', async (e) => {
    const logoutBtn = e.target.closest('.nav__el--logout');
    if (logoutBtn) {
        e.preventDefault();
        await logout();
    }
});
});