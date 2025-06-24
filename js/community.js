import { data } from '../data/communityData.js';

const communityBoxs = document.querySelector('.communityBoxs');
const golfBtn = document.querySelector('.golf');
const cycleBtn = document.querySelector('.cycle');
const badmintonBtn = document.querySelector('.badminton');
const bowlingBtn = document.querySelector('.bowling');
const resetBtn = document.querySelector('.resetButton');
const searchForm = document.querySelector('.searchForm');
const inputBtn = document.querySelector('.inputButton');

//태그 생성
function createCommunityBox({
  photo = 'photo',
  title = 'title',
  area = 'area',
  sportName = 'sportName',
}) {
  return `<div class="communityBox" id="${sportName}">
            <div class="box">
            <div class="imageContainer">
              <div class="likeButton"></div>
              <img
                src="${photo}"
              />
            </div>
            <div class="textContainer">
              <div class="areaSport">
                <p class="area" id="${area}">${area} ·</p>
                <p class="sportName" id="${sportName}">${sportName}</p>
              </div>
              <p class="title">${title}</p>
            </div></div>
          </div>`;
}

//모임 렌더링
function renderCommunityBox(target, data) {
  target.insertAdjacentHTML('beforeend', createCommunityBox(data));
}

//전체 모임 렌더링
function renderCommunityList() {
  data.forEach((data) => renderCommunityBox(communityBoxs, data));
}
renderCommunityList();

// 필터링
function filterCategory(node, categoryValue) {
  const communityBoxs = document.querySelectorAll('.communityBox');
  communityBoxs.forEach((communityBox) => {
    const category = communityBox.querySelector(node);

    if (!(category.id === categoryValue)) {
      communityBox.hidden = true;
    } else {
      communityBox.hidden = false;
    }
  });
}
//필터링 초기화
function filterReset() {
  const communityBoxs = document.querySelectorAll('.communityBox');
  communityBoxs.forEach((communityBox) => {
    communityBox.hidden = false;
  });
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

//검색 기능 -> 보완 필요 : 배드민턴 대신 배드만 검색해도 결과가 나오게
function handleInput(e) {
  e.preventDefault();
  isActiveFilterBtn(e);
  const input = document.querySelector('.input');
  const keyword = input.value;
  if (!keyword.trim()) {
    alert('검색어를 입력해 주세요.');
    input.focus();
  }

  if (searchKeyword(keyword) === 0) alert('일치하는 모임이 없습니다.');
}

//검색어와 일치하는 모임 찾기
function searchKeyword(keyword) {
  let matchNum = 0;
  data.forEach(({ title, area, sportName }) => {
    if (
      keyword.includes(title) ||
      keyword.includes(area) ||
      keyword.includes(sportName)
    ) {
      filterCategory('.sportName', sportName);
      matchNum++;
    }
  });
  return matchNum;
}

searchForm.addEventListener('submit', handleInput);
inputBtn.addEventListener('click', handleInput);

badmintonBtn.addEventListener('click', () =>
  filterCategory('.sportName', '배드민턴')
);
bowlingBtn.addEventListener('click', () =>
  filterCategory('.sportName', '볼링')
);
golfBtn.addEventListener('click', () => filterCategory('.sportName', '골프'));
cycleBtn.addEventListener('click', () =>
  filterCategory('.sportName', '자전거')
);
resetBtn.addEventListener('click', filterReset);

badmintonBtn.addEventListener('click', isActiveFilterBtn);
bowlingBtn.addEventListener('click', isActiveFilterBtn);
golfBtn.addEventListener('click', isActiveFilterBtn);
cycleBtn.addEventListener('click', isActiveFilterBtn);
resetBtn.addEventListener('click', isActiveFilterBtn);

//DOM이 로드된 후에만 likeButton을 찾고 이벤트 핸들러를 등록
document.addEventListener('DOMContentLoaded', function () {
  const likeBtns = document.querySelectorAll('.likeButton');
  if (likeBtns) {
    likeBtns.forEach((likebtn) => {
      likebtn.addEventListener('click', isActiveLike);
    });
  }
});
