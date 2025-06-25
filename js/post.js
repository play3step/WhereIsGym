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

  const categoryText = communitycategory();
  const titleText = categoryText + title.value;
  const contentText = content.value;

  createCommunityTitle({
    title: titleText,
  })
    .then((Community) =>
      createCommunityContent(
        { title: Community.title, content: contentText },
        Community.id
      )
    )
    .then((Community) =>
      createCommunityTitle({ parent: Community.id, title: communityRegion() })
    );
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
