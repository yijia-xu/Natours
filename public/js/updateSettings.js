
// type is either 'password' or 'data'
async function updateSettings(data, type) {
  try {
    const isRender = window.location.hostname.includes('onrender.com');
    const baseURL = isRender
      ? 'https://natours-cxwn.onrender.com'
      : '';
    const url =
      type === 'password'
        ? baseURL + '/api/v1/users/updateMyPassword'
        : baseURL + '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      alert(type.toUpperCase() + ' updated successfully!');
    }
  } catch (err) {
    console.error('AXIOS ERROR:', err);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
      console.error('Response headers:', err.response.headers);
      alert((err.response.data && err.response.data.message) || 'Update failed.');
    } else if (err.request) {
      console.error('No response received:', err.request);
      alert('No response from server.');
    } else {
      console.error('Error setting up request:', err.message);
      alert('Request setup error: ' + err.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
    // Update user data
    const form = document.querySelector('.form-user-data');
    if (form) {
        form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        updateSettings({ name, email }, 'data');
        });
    }

    // Update user password
    const passwordForm = document.querySelector('.form-user-password');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(passwordForm);
        const passwordCurrent = String(formData.get('password-current') || '');
        const password = String(formData.get('password') || '');
        const passwordConfirm = String(formData.get('password-confirm') || '');
        updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
        });
    }
});