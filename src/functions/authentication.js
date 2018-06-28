import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
      region: 'us-east-2',

      userPoolId: 'us-east-2_G5UTw92eS',

      userPoolWebClientId: 't5l3pivnb992ngp5hem4qsogo',

      //oauth: oauth
    },

});



export default {

  signOut: function(){
    let user = new Promise (function(resolve, reject){
      Amplify.Auth.signOut()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(data);
        });
    });
    return user;
  },

  signIn: function(username, password){
    let user = new Promise (function(resolve, reject){
      Amplify.Auth.signIn(username, password)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(user);
      });
    });
    return user;
  },

  signUp: function(username, password){
    let user = new Promise (function(resolve, reject){
      Amplify.Auth.signUp({ username, password, validationData: [] })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
    });
    return user;
  },

  confirmSignUp: function(username, code){
    let user = new Promise (function(resolve, reject){
      Amplify.Auth.confirmSignUp(username, code, { forceAliasCreation: true})
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
    });
    return user;
  },

  currentSession: function(){
    let session = new Promise (function(resolve, reject){
      Amplify.Auth.currentSession()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
    });

    return session;


  },


};
