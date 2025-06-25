document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.text-field');
  const preview = document.querySelector('.markdown-preview');

  textarea.addEventListener('input', () => {
    preview.innerHTML = marked.parse(textarea.value);
  });
});