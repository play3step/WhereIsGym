# 🏋️‍♀️ 어디있짐 - 체육 시설 통합 검색 플랫폼

**어디있짐**은 사용자가 현재 위치 기반으로 스포츠 관련 시설(헬스장, 체육관 등)**을 검색하고 지도 상에서 확인할 수 있도록 도와주는 웹 애플리케이션입니다.  
**카카오 지도 API**와 **순수 HTML, CSS, JavaScript**만을 사용해 제작되었습니다.

---

## 📍 주요 기능

- 📍 현재 위치 기반 장소 검색
- 🏀 '스포츠' 카테고리로 필터링된 장소만 표시
- 🗺️ 지도에 마커 및 커스텀 오버레이로 정보 제공
- 📄 검색 결과 목록과 페이지네이션
- 📌 검색된 장소 클릭 시 지도 중심으로 이동

---

## ⚙️ 사용 기술

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Kakao Maps JavaScript API**
- **[marked.js](https://github.com/markedjs/marked)**
- **localStorage**

---

## 📁 프로젝트 구조
```
📦 WhereIsGym/
├── 📁 assets/ # 이미지, 아이콘 등 정적 리소스
├── 📁 css/ # 스타일시트
│   ├── reset.css
│   ├── main.css
│   └── ...
├── 📁 js/ # 주요 화면별 자바스크립트 파일
│   ├── main.js
│   ├── markdown.js
│   ├── local_storage.js
│   ├── community.js
│   ├── communityMain.js
│   ├── detail.js
│   ├── post.js
│   ├── reservation.js
│   ├── search.js
│   └── search_list.js
├── 📁 pages/ # 개별 화면 HTML
│   ├── community.html
│   ├── community-detail.html
│   ├── note.html
│   ├── reservation.html
│   ├── reservation_complete.html
│   ├── search.html
│   ├── search_list.html
│   └── detail.html
├── index.html # 메인 진입 페이지
├── package.json
├── package-lock.json
└── README.md # 프로젝트 설명 문서
```
---

## 🚀 실행 방법

- `npm install`로 패키지를 설치한 후,
- `npm run dev`로 실행합니다.

---

## 👨‍💻 팀원 

| 박철현 👑 | 임가희 | 이성균 | 김태은 | 문태민 |
| --- | --- | --- | --- | --- |
| ![image](https://avatars.githubusercontent.com/play3step?s=420)| ![image](https://avatars.githubusercontent.com/gahee6?s=420)| ![Image](https://avatars.githubusercontent.com/skyunlee98?s=420) | ![Image](https://avatars.githubusercontent.com/taeeun98?s=420) | ![Image](https://avatars.githubusercontent.com/mtm-git1018?s=420) |
| [GitHub](https://github.com/play3step) | [GitHub](https://github.com/gahee6) | [GitHub](https://github.com/skyunlee98) | [GitHub](https://github.com/taeeun98) | [GitHub](https://github.com/mtm-git1018) |