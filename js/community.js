import { getAllPosts, filterPostsBySport } from '../apis/postController.js';

const communityBoxs = document.querySelector('.communityBoxs');
const golfBtn = document.querySelector('.golf');
const cycleBtn = document.querySelector('.cycle');
const badmintonBtn = document.querySelector('.badminton');
const bowlingBtn = document.querySelector('.bowling');
const resetBtn = document.querySelector('.resetButton');
const searchForm = document.querySelector('.searchForm');
const inputBtn = document.querySelector('.inputButton');

let posts = []; // 전체 게시글을 저장할 변수

//태그 생성
function createCommunityBox({
  sportName = 'sportName',
  title = 'title',
  createdAt = new Date().toISOString(),
}) {
  const date = new Date(createdAt).toLocaleDateString('ko-KR');
  return /* html */ `
    <div class="communityBox" id="${sportName}">
      <div class="box">
        <div class="imageContainer">
          <input type="checkbox" class="checkbox"/>
          <div class="likeButton"></div>
          <img src="../assets/images/workout.jpg" alt="${sportName} 모임" />
        </div>
        <div class="textContainer">
          <div class="areaSport">
            <p class="sportName" id="${sportName}">${sportName}</p>
            <p class="date">${date}</p>
          </div>
          <p class="title">${title}</p>
        </div>
      </div>
    </div>`;
}

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
    posts.forEach((post) => renderCommunityBox(communityBoxs, post));
  } catch (error) {
    console.error('게시글을 렌더링하는 중 오류 발생:', error);
    communityBoxs.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
  }
}

// 페이지 로드시 게시글 렌더링
renderCommunityList();

// 필터링
function filterCategory(sportName) {
  communityBoxs.innerHTML = '';
  const filteredPosts = filterPostsBySport(posts, sportName);
  filteredPosts.forEach((post) => renderCommunityBox(communityBoxs, post));
}

//필터링 초기화
function filterReset() {
  communityBoxs.innerHTML = '';
  posts.forEach((post) => renderCommunityBox(communityBoxs, post));
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

//좋아요
function isActiveLike(e) {
  const target = e.target;
  target.classList.toggle('active');
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
    post.originalTitle.toLowerCase().includes(keyword)
  );

  communityBoxs.innerHTML = '';
  if (filteredPosts.length === 0) {
    alert('일치하는 모임이 없습니다.');
    return;
  }
  
  filteredPosts.forEach(post => renderCommunityBox(communityBoxs, post));
}

searchForm.addEventListener('submit', handleInput);
inputBtn.addEventListener('click', handleInput);

badmintonBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: badmintonBtn });
  filterCategory('자전거');
});
bowlingBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: bowlingBtn });
  filterCategory('배드민턴');
});
golfBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: golfBtn });
  filterCategory('골프');
});
cycleBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: cycleBtn });
  filterCategory('자전거');
});
resetBtn.addEventListener('click', () => {
  isActiveFilterBtn({ target: resetBtn });
  filterReset();
});

//DOM이 로드된 후에만 likeButton을 찾고 이벤트 핸들러를 등록
document.addEventListener('DOMContentLoaded', function () {
  const likeBtns = document.querySelectorAll('.likeButton');
  if (likeBtns) {
    likeBtns.forEach((likebtn) => {
      likebtn.addEventListener('click', isActiveLike);
    });
  }
});
