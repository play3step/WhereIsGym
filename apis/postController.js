// 게시글 데이터를 처리하는 컨트롤러

// API 요청 시 사용할 기본 헤더
const headers = {
  'x-username': 'fes-6-whereisgym'
};

// 게시글 제목에서 카테고리 제목을 분리
function parsePostTitle(fullTitle) {
    const [sportName, ...titleParts] = fullTitle.split('-').map(part => part.trim());
    const title = titleParts.join('-').trim();
    return { sportName, title };
}

// 게시글 데이터 형식
function processPostData(post) {
    const { sportName, title } = parsePostTitle(post.title);
    return {
        ...post,
        sportName,
        title
    };
}

//게시글 리스트 조회
async function getAllPosts() {
    try {
        const response = await fetch('https://kdt-api.fe.dev-cos.com/documents', {
            headers
        });
        const data = await response.json();
        
        // 각 게시글의 제목을 파싱하여 카테고리 제목과 제목으로 분리
        const processedPosts = data.map(processPostData);
        return processedPosts;
    } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
        throw error;
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) {
            throw new Error('게시글 삭제에 실패했습니다.');
        }
    } catch (error) {
        console.error('게시글을 삭제하는 중 오류 발생:', error);
        throw error;
    }
}

// 특정 스포츠의 게시글만 필터링하는 함수
function filterPostsBySport(posts, sportName) {
    return posts.filter(post => post.sportName.toLowerCase() === sportName.toLowerCase());
}

export {
    getAllPosts,
    filterPostsBySport,
    parsePostTitle,
    processPostData,
    deletePost
};
