import { createCommunity } from './post.js';

const saveBtn = document.querySelector('.save');
const completeBtn = document.querySelector('.complete');

function renderSaveData() {
  const title = localStorage.getItem('title');
  const text = localStorage.getItem('text');
  const category = localStorage.getItem('category');
  const region1 = localStorage.getItem('region1');
  const region2 = localStorage.getItem('region2');
  const saveData = { title, text, category, region1, region2 };

  for (const [key, value] of Object.entries(saveData)) {
    if (value) {
      regionChange(document.querySelector('#region1'));
      document.querySelector(`#${key}`).value = value;
    }
  }

  if (text) {
    const preview = document.querySelector('#markdown-preview');
    if (preview) {
      preview.innerHTML = marked.parse(text);
    }
  }
}

function handleSave() {
  const title = document.querySelector('#title').value;
  const text = document.querySelector('#text').value;
  const category = document.querySelector('#category').value;
  const region1 = document.querySelector('#region1').value;
  const region2 = document.querySelector('#region2').value;
  const saveData = { title, text, category, region1, region2 };

  if (!title || !text) {
    !title ? alert('제목을 입력해주세요') : alert('내용을 입력해주세요');
    return;
  }

  for (const [key, value] of Object.entries(saveData)) {
    if (value) {
      localStorage.setItem(key, value);
    }
  }

  alert('성공적으로 임시 저장되었습니다!')
}

function deleteSave() {
  window.localStorage.clear();
  createCommunity();
  // btn();
}

function regionChange(e) {
  let add = [];
  const region2 = document.querySelector('#region2');

  const gangwon = [
    '강릉시',
    '동해시',
    '삼척시',
    '속초시',
    '원주시',
    '춘천시',
    '태백시',
    '고성군',
    '양구군',
    '양양군',
    '영월군',
    '인제군',
    '정선군',
    '철원군',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
  ];
  const gyeonggi = [
    '고양시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '수원시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '오산시',
    '용인시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
    '가평군',
    '양평군',
    '여주군',
    '연천군',
  ];
  const gyeongsangnam = [
    '거제시',
    '김해시',
    '마산시',
    '밀양시',
    '사천시',
    '양산시',
    '진주시',
    '진해시',
    '창원시',
    '통영시',
    '거창군',
    '고성군',
    '남해군',
    '산청군',
    '의령군',
    '창녕군',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
  ];
  const gyeongsangbuk = [
    '경산시',
    '경주시',
    '구미시',
    '김천시',
    '문경시',
    '상주시',
    '안동시',
    '영주시',
    '영천시',
    '포항시',
    '고령군',
    '군위군',
    '봉화군',
    '성주군',
    '영덕군',
    '영양군',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
  ];
  const gwangju = ['광산구', '남구', '동구', '북구', '서구'];
  const daegu = [
    '남구',
    '달서구',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
    '달성군',
  ];
  const daejeon = ['대덕구', '동구', '서구', '유성구', '중구'];
  const busan = [
    '강서구',
    '금정구',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
    '기장군',
  ];
  const seoul = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];
  const ulsan = ['남구', '동구', '북구', '중구', '울주군'];
  const incheon = [
    '계양구',
    '남구',
    '남동구',
    '동구',
    '부평구',
    '서구',
    '연수구',
    '중구',
    '강화군',
    '옹진군',
  ];
  const jeonnam = [
    '광양시',
    '나주시',
    '목포시',
    '순천시',
    '여수시',
    '강진군',
    '고흥군',
    '곡성군',
    '구례군',
    '담양군',
    '무안군',
    '보성군',
    '신안군',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
  ];
  const jeonbuk = [
    '군산시',
    '김제시',
    '남원시',
    '익산시',
    '전주시',
    '정읍시',
    '고창군',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '임실군',
    '장수군',
    '진안군',
  ];
  const jeju = ['서귀포시', '제주시', '남제주군', '북제주군'];
  const chungnam = [
    '천안시',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계룡시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군',
  ];
  const chungbuk = [
    '제천시',
    '청주시',
    '충주시',
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '증평군',
    '진천군',
    '청원군',
  ];

  if (e.value == '강원') {
    add = gangwon;
  } else if (e.value == '경기') {
    add = gyeonggi;
  } else if (e.value == '경남') {
    add = gyeongsangnam;
  } else if (e.value == '경북') {
    add = gyeongsangbuk;
  } else if (e.value == '광주') {
    add = gwangju;
  } else if (e.value == '대구') {
    add = daegu;
  } else if (e.value == '대전') {
    add = daejeon;
  } else if (e.value == '부산') {
    add = busan;
  } else if (e.value == '서울') {
    add = seoul;
  } else if (e.value == '울산') {
    add = ulsan;
  } else if (e.value == '인천') {
    add = incheon;
  } else if (e.value == '전남') {
    add = jeonnam;
  } else if (e.value == '전북') {
    add = jeonbuk;
  } else if (e.value == '제주') {
    add = jeju;
  } else if (e.value == '충남') {
    add = chungnam;
  } else if (e.value == '충북') {
    add = chungbuk;
  }

  //초기화
  region2.options.length = 1;

  //그리기
  add.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    region2.appendChild(option);
  });
}

saveBtn.addEventListener('click', handleSave);
completeBtn.addEventListener('click', deleteSave);
document.addEventListener('DOMContentLoaded', renderSaveData);

window.regionChange = regionChange;
