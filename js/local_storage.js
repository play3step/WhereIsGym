const saveBtn = document.querySelector('.save');
const completeBtn = document.querySelector('.complete');




function renderSaveData() {
  const title = localStorage.getItem('title');
  const text = localStorage.getItem('text');
  const category = localStorage.getItem('category');
  const saveData = {title, text, category};


  for(const [key, value] of Object.entries(saveData)){
    document.querySelector(`#${key}`).value = value;
  }
}


function handleSave() {
    const title = document.querySelector('#title').value;
    const text = document.querySelector('#text').value;
    const category = document.querySelector('#category').value;
    const saveData = {title, text, category};

    if(!title || !text){
        !title? alert('제목을 입력해주세요') : alert('내용을 입력해주세요');
        return;
    }

    for(const [key, value] of Object.entries(saveData)){
        window.localStorage.setItem(key, value);
    }
}


function deleteSave() {
    window.localStorage.clear();
}



saveBtn.addEventListener('click', handleSave);
completeBtn.addEventListener('click', deleteSave);
document.addEventListener('DOMContentLoaded', renderSaveData);


