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

  signIn: function(username, password){
    return Amplify.Auth.signIn(username, password)
    .then(user => console.log(user))
    .catch(err => console.log(err));

  },

  signUp: function(username, password){
    return Amplify.Auth.signUp({
      username,
      password,
      
      validationData: []
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  },

  confirmSignUp: function(username, code){

    return Amplify.Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
    }).then(data => console.log(data))
    .catch(err => console.log(err));


  },

  currentSession: function(){
    let session = new Promise (function(resolve, reject){
      Amplify.Auth.currentSession()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return session;
  }


};
