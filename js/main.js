// 내 위치 띄우기
window.addEventListener('DOMContentLoaded', function () {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lng, lat, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const regionName =
              result[0].region_3depth_name || result[0].address_name;
            document.querySelector('.location').childNodes[0].nodeValue =
              regionName + ' ';
          }
        });
      },
      function (error) {

      }
    );
  }
});


// 카테고리 클릭 시 해당 이름으로 검색 페이지 이동
document.querySelectorAll('.category').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const label = this.querySelector('span').textContent.trim(); // span 태그 안의 텍스트를 읽어온다
    const keyword = (label === '수영') ? '수영장' : label; // 수영이면 수영장
    window.location.href = `./pages/search_list.html?query=${encodeURIComponent(keyword)}`;
  });
});


// 태그 클릭 시 해당 이름으로 검색 페이지 이동
document.querySelectorAll('.tag').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const keyword = this.textContent.trim();
    window.location.href = `./pages/search_list.html?query=${encodeURIComponent(keyword)}`;
  });
});


// 랜덤으로 둘러보기
document.querySelector('.random-link').addEventListener('click', function(e) {
  e.preventDefault();

  const keywords = [
  // 체력·헬스
  '헬스', 'PT', 'F45', '크로스핏', '줄넘기', '스피닝', '역도',

  // 격투기·무도
  '복싱', '무에타이', '킥복싱', '주짓수', '유도',
  '레슬링', 'MMA', '합기도', '검도', '태권도', '펜싱',

  // 요가·필라테스
  '요가', '필라테스', '플라잉요가',

  // 댄스·유산소
  '줌바댄스', '에어로빅', '발레',

  // 구기 스포츠
  '농구', '축구', '풋살', '야구', '럭비', '배구', '하키',

  // 라켓 스포츠
  '테니스', '탁구', '배드민턴', '스쿼시',

  // 레저/기타 스포츠
  '수영장', '볼링', '골프', '당구', '클라이밍', '양궁', '사격',
  '패러글라이딩', '스카이다이빙', '스노우보드', '스키', '컬링', '승마',
  '인라인스케이트', '아이스스케이트', '서핑', '게이트볼'
  ];

  const random = keywords[Math.floor(Math.random() * keywords.length)];
  window.location.href = `./pages/search_list.html?query=${encodeURIComponent(random)}`;
})


// 검색어 없을 때 페이지 이동 막고 alert창 띄우기
document.querySelector('.search-input-wrap').addEventListener('submit', function(e) {
  const input = this.querySelector('input[name="query"]');
  if (!input.value.trim()) {
    e.preventDefault(); // form 제출 막기
    alert('검색어를 입력해 주세요.');
    input.focus(); // 입력창에 포커스 이동
  }
});


// api에서 데이터 가져와서 사진 뿌리기
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

const cardArea = document.querySelector('.community-cards');

fetch('https://kdt-api.fe.dev-cos.com/documents', {
  method: 'GET',
  headers: {
    'x-username': 'fes-6-whereisgym'
  }
})
  .then(res => res.json())
  .then(data => {
    // 무작위 4개 선택
    const randomFour = data.length <= 4
      ? data : data.slice().sort(() => Math.random() - 0.5).slice(0, 4);

    // 카드 렌더링
    cardArea.innerHTML = randomFour.map(item => {
      const id = item.id;
      const [category] = item.title.split('-');
      const imageSrc = sportImages[category];

      return `
        <a href="/pages/community-detail.html?id=${id}" class="card">
          <img src="${imageSrc}" alt="${category} 소모임 이미지">
        </a>
      `;
    }).join('');
  })
  .catch(err => {
    console.error('데이터 불러오기 실패:', err);
  });