async function createCommunityTitle(Community) {
  const response = await fetch('https://kdt-api.fe.dev-cos.com/documents', {
    method: 'POST',
    headers: {
      'x-username': 'fes-6-whereisgym',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(Community),
  });
  const title = await response.json();
  return title;
}

async function createCommunityContent(Community, documentId) {
  const response = await fetch(
    `https://kdt-api.fe.dev-cos.com/documents/${documentId}`,
    {
      method: 'PUT',
      headers: {
        'x-username': 'fes-6-whereisgym',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(Community),
    }
  );
  const content = await response.json();
  return content;
}

export function createCommunity() {
  const title = document.querySelector('.title');
  const content = document.querySelector('.text-field');

  const category = document.querySelector('#category');
  const region1 = document.querySelector('#region1');
  const region2 = document.querySelector('#region2');

  const categoryText = communitycategory();
  const titleText = categoryText + title.value;
  const contentText = content.value;

  if (!category.value) {
    alert('카테고리를 선택해주세요.');
    return;
  }

  if (!region1.value || !region2.value) {
    alert('지역을 선택해주세요.');
    return;
  }

  if (!title.value.trim()) {
    alert('제목을 입력해주세요.');
    return;
  }

  if (!content.value.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }

  createCommunityTitle({ title: titleText })
    .then((Community) => {
      const id = Community.id;
      return createCommunityContent(
        { title: Community.title, content: contentText },
        id
      ).then(() => id); // 없어도 되나?
    })
    .then((id) => {
      return createCommunityTitle({
        parent: id,
        title: communityRegion()
      }).then(() => id);
    })
    .then((id) => {
      alert('모임 글 작성이 완료되었습니다.');
      window.location.href = `/pages/community-detail.html?id=${id}`;
    })
}

//지역 받아오기
function communityRegion() {
  const region1 = document.querySelector('#region1');
  const region2 = document.querySelector('#region2');
  const region = region1.value + ' ' + region2.value;
  return region;
}

//카테고리 받아오기
function communitycategory() {
  const category = document.querySelector('#category');
  const categoryText = category.value + '-';
  return categoryText;
}
