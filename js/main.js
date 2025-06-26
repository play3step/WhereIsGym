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