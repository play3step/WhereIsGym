import { getAllPosts, filterPostsBySport } from '../apis/postController.js';

const communityBoxs = document.querySelector('.communityBoxs');
const filterButtons = document.querySelectorAll('.filterList li');
const resetBtn = document.querySelector('.resetButton');
const searchForm = document.querySelector('.searchForm');
const inputBtn = document.querySelector('.inputButton');

let posts = []; // 전체 게시글을 저장할 변수

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

//태그 생성
function createCommunityBox({
  id,
  sportName = 'sportName',
  title = 'title',
  createdAt = new Date().toISOString(),
}) {
  const date = new Date(createdAt).toLocaleDateString('ko-KR');
  const sportImage = sportImages[sportName] || sportImages.default;
  
  return /* html */ `
    <div class="communityBox" id="${sportName}" data-id="${id}">
      <div class="box">
        <div class="imageContainer">
          <div class="likeButton"></div>
          <img src="${sportImage}" alt="${sportName} 모임" />
        </div>
        <div class="textContainer">
          <div class="areaSport">
            <p class="sportName">${sportName}</p>
            <p class="date">${date}</p>
          </div>
          <p class="title">${title}</p>
        </div>
      </div>
    </div>`;
}

// 게시글 클릭 이동
function handlePostClick(e) {
  const postBox = e.target.closest('.communityBox');
  if (!postBox) return;
  
  const postId = postBox.dataset.id;
  if (!postId) return;

  if (e.target.classList.contains('likeButton')) return;
  
  window.location.href = `/pages/community-detail.html?id=${postId}`;
}

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.postId) {
    renderCommunityList();
  }
});

//모임 렌더링
function renderCommunityBox(target, data) {
  target.insertAdjacentHTML('beforeend', createCommunityBox(data));
}

//전체 모임 렌더링
async function renderCommunityList() {
  try {
    // 기존 게시글 삭제
    communityBoxs.innerHTML = '';
    
    // API에서 게시글 가져오기
    posts = await getAllPosts();
    posts.reverse();
    posts.forEach((post) => renderCommunityBox(communityBoxs, post));
    
    // 좋아요 버튼 이벤트 추가
    addLikeButtonListeners();
    
    // 게시글 클릭 이벤트 추가
    communityBoxs.addEventListener('click', handlePostClick);
  } catch (error) {
    console.error('게시글을 렌더링하는 중 오류 발생:', error);
    communityBoxs.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
  }
}

//좋아요
function isActiveLike(e) {
  const target = e.target;
  target.classList.toggle('active');
}

// 좋아요 버튼 이벤트 리스너 등록
function addLikeButtonListeners() {
  const likeBtns = document.querySelectorAll('.likeButton');
  likeBtns.forEach((likebtn) => {
    likebtn.addEventListener('click', isActiveLike);
  });
}

// 필터링
function filterCategory(sportName) {
  communityBoxs.innerHTML = '';
  const filteredPosts = filterPostsBySport(posts, sportName);
  filteredPosts.forEach((post) => renderCommunityBox(communityBoxs, post));
  addLikeButtonListeners();
}

//필터링 초기화
function filterReset() {
  communityBoxs.innerHTML = '';
  posts.forEach((post) => renderCommunityBox(communityBoxs, post));
  addLikeButtonListeners();
}

//클릭한 필터 버튼 활성화
function isActiveFilterBtn(e) {
  const target = e.target;
  const btns = document.querySelectorAll('.filterList li');
  btns.forEach((btn) => {
    if (btn !== target) {
      btn.classList.remove('active');
    } else {
      btn.classList.add('active');
    }
  });
}

//검색 기능
function handleInput(e) {
  e.preventDefault();
  isActiveFilterBtn(e);
  const input = document.querySelector('.input');
  const keyword = input.value.trim().toLowerCase();
  
  if (!keyword) {
    alert('검색어를 입력해 주세요.');
    input.focus();
    return;
  }

  const filteredPosts = posts.filter(post => 
    post.sportName.toLowerCase().includes(keyword) ||
    post.title.toLowerCase().includes(keyword)
  );

  communityBoxs.innerHTML = '';
  if (filteredPosts.length === 0) {
    alert('일치하는 모임이 없습니다.');
    return;
  }
  
  filteredPosts.forEach(post => renderCommunityBox(communityBoxs, post));
  addLikeButtonListeners();
}

// 이벤트 리스너 등록
searchForm.addEventListener('submit', handleInput);
inputBtn.addEventListener('click', handleInput);

filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    isActiveFilterBtn(e);
    const sportName = button.textContent;
    filterCategory(sportName);
  });
});

resetBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: resetBtn });
  filterReset();
});

const makeButton = document.querySelector('.make');
makeButton.addEventListener('click', () => {
  window.location.href = '/pages/note.html';
});

// 페이지 로드시 게시글 렌더링
renderCommunityList();
