import { deletePost } from '../apis/postController.js';

const title = document.querySelector('.title')
const category = document.querySelector('.category')
const content = document.querySelector('.group-content')
const heroImage = document.querySelector('.hero-img img')
const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get('id')

// 스포츠별 이미지 매핑
const sportImages = {
  '배드민턴': '../assets/groupImage/badminton.jpg',
  '볼링': '../assets/groupImage/balling.jpg',
  '야구': '../assets/groupImage/baseball.jpg',
  '농구': '../assets/groupImage/bascketball.jpg',
  '자전거': '../assets/groupImage/cycle.jpg',
  '축구': '../assets/groupImage/football.jpg',
  '골프': '../assets/groupImage/golf.jpg',
  '수영': '../assets/groupImage/swimming.jpg',
  '탁구': '../assets/groupImage/tabletennis.jpg',
};

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
    content.innerHTML = marked.parse(data.content);

    // 카테고리에 맞는 이미지 설정
    const categoryImage = sportImages[categorytext.trim()]
    if (categoryImage) {
      heroImage.src = categoryImage
    }

    return data
})

async function deleteChildren(id) {
  try {
    const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${id}`, {
      headers: {
        "x-username": 'fes-6-whereisgym'
      }
    });

    if (!response.ok) {
      throw new Error('문서 정보를 가져오는데 실패했습니다.');
    }

    const document = await response.json();

    // 하위 문서가 있다면 먼저 삭제합니다
    if (document.documents && document.documents.length > 0) {
      for (const childDoc of document.documents) {
        await deletePost(childDoc.id);
      }
    }
    
    deletePost(id)

  } catch (error) {
    console.error('문서를 삭제하는 중 오류 발생:', error);
    throw error;
  }
}

// 삭제 버튼 이벤트 리스너
const deleteButton = document.querySelector('.group-btn:last-child');
if (deleteButton) {
  deleteButton.addEventListener('click', async () => {
    const confirmDelete = confirm('정말로 이 게시글을 삭제하시겠습니까?');
    
    if (confirmDelete) {
      try {
        await deleteChildren(postId);
        alert('게시글이 성공적으로 삭제되었습니다.');
        window.location.href = '/pages/community.html';
      } catch (error) {
        alert('게시글 삭제 중 오류가 발생했습니다.');
        console.error('삭제 중 오류:', error);
      }
    }
  });
}
