
async function signup(name, email, password, passwordConfirm) {
  try {
    const isRender = window.location.hostname.includes('onrender.com');
    const baseURL = isRender
      ? 'https://natours-cxwn.onrender.com'
      : '';
    const res = await axios({
      method: "POST",
      url: baseURL + "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === "success") {
      alert("Signed up successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    alert((err.response && err.response.data && err.response.data.message) || 'Signup failed.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form--signup');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      await signup(name, email, password, passwordConfirm);
    });
  }
});