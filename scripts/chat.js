class Chatroom{
  constructor(username){
    this.username =username;
    this.chats=db.collection('chats');

  }
  async addChat(message){
    const now = new Date();
    const chat = {
      message : message,
      username : this.username,
      created_at : firebase.firestore.Timestamp.fromDate(now)
    };
    const resposne = await this.chats.add(chat);
    return resposne;
  }
  getChats(callback){
    this.chats
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
          snapshot.docChanges().forEach( change => {
            if(change.type==='added'){
              callback(change.doc.data());
            }
          });

        });
  }
  updateName(username){
    this.username =username;
    localStorage.setItem('username',username);
  }

}
