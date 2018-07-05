import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
      region: 'us-east-2',
      userPoolId: 'us-east-2_G5UTw92eS',
      userPoolWebClientId: 't5l3pivnb992ngp5hem4qsogo',
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
          reject(err);
        });
    });
    return user;
  },

  signIn: function(username, password){
    let user = new Promise (function(resolve, reject){
      Amplify.Auth.signIn(username, password)
      .then((user) => {
        console.log( "User", user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED'){
          let requiredAttributes= {"requiredAttributes": user.requiredAttributes};
          Amplify.Auth.completeNewPassword(user, password, requiredAttributes)
          .then((data)=>{
            console.log(data);
            resolve(data);
          });
        } else {
            console.log(user);
            resolve(user);
        }
        //console.log("User sign in", user);

      })
      .catch((err) => {
        reject(err);
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

  currentSession: async function(){
    let session = await Amplify.Auth.currentSession()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });


    return session;


  },


};
