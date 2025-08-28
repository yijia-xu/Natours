const login = async (email, password) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:3000/api/v1/users/login',
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
    await axios.get(
      'http://127.0.0.1:3000/api/v1/users/logout',
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