import { deletePost } from '../apis/postController.js';

const title = document.querySelector('.title')
const category = document.querySelector('.category')
const content = document.querySelector('.group-content')
const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get('id')

fetch(`https://kdt-api.fe.dev-cos.com/documents/${postId}`,{
  method: 'GET',
  headers: {
    "x-username" : 'fes-6-whereisgym'
  }
}).then(res => res.json())
  .then(data => {
    const [categorytext,titletext] = data.title.split('-') 
    title.textContent = titletext
    category.textContent = categorytext
    content.textContent = data.content

    return data
})

// 게시글 삭제
const deleteButton = document.querySelector('.group-btn.delete');
if (deleteButton) {
  deleteButton.addEventListener('click', async () => {

    const confirmDelete = confirm('정말로 이 게시글을 삭제하시겠습니까?');
    
    if (confirmDelete) {
      try {
        await deletePost(postId);
        alert('게시글이 성공적으로 삭제되었습니다.');
        window.location.href = '/pages/community.html';
      } catch (error) {
        alert('게시글 삭제 중 오류가 발생했습니다.');
        console.error('삭제 중 오류:', error);
      }
    }
  });
}