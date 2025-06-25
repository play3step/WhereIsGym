/* document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.text-field');
  const preview = document.querySelector('.markdown-preview');

  textarea.addEventListener('input', () => {
    preview.innerHTML = marked.parse(textarea.value);
  });
});
 */

let user = {
  title: 'John',
};

let response = await fetch('https://kdt-api.fe.dev-cos.com/documents', {
  method: 'POST',
  headers: {
    'x-username': 'fes-6-whereisgym',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(user),
});

let result = await response.json();
console.log(result);
