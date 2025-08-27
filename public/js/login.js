const login = async (email, password) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:3000/api/v1/users/login',
      { email, password },
      { withCredentials: true }
    );
    console.log('✅ login response:', res.data);
  } catch (err) {
    const msg = err.response?.data?.message || 'Login failed';
    alert(msg);
    console.error('❌ login error:', err.response?.data || err.message);
  }
};

const logout = async () => {
  try {
    const res = await axios.get(
      'http://127.0.0.1:3000/api/v1/users/logout',
      { withCredentials: true }
    );
    console.log('✅ logout response:', res.data);
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
});
