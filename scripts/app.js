
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');

const chatUI = new ChatUI(chatList);

newChatForm.addEventListener('submit',e=>{
  e.preventDefault();
  const msg = newChatForm.message.value.trim();
  chatroom.addChat(msg)
          .then(()=> newChatForm.reset())
          .catch(err => console.log(err));
 });

newNameForm.addEventListener('submit',e=>{
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();

  updateMsg.innerText = `Your name updated to ${newName}`;
  setTimeout(()=>updateMsg.innerText='',3000);

});


const username = localStorage.username ? localStorage.username : 'anonymous';

const chatroom = new Chatroom(username);
chatroom.getChats(data=>{
  chatUI.render(data);
});
