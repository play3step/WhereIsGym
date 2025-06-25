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

const completeBtn = document.querySelector('.complete');

function createCommunity() {
  const title = document.querySelector('.title');
  const content = document.querySelector('.text-field');
  const titleText = title.value;
  const contentText = content.value;

  createCommunityTitle({
    title: titleText,
  }).then((Community) =>
    createCommunityContent(
      { title: Community.title, content: contentText },
      Community.id
    )
  );
}

completeBtn.addEventListener('click', createCommunity);
