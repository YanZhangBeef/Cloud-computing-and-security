// Add 'aws-amplify' library into your application

// Configure Auth category with your Amazon Cognito credentials
Amplify.configure({
    Auth: {
        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX', // Amazon Cognito Identity Pool ID
        region: 'XX-XXXX-X', // Amazon Cognito Region
    }
});

// Call Auth.signIn with user credentials
Auth.signIn(username, password)
    .then(user => console.log(user))
    .catch(err => console.log(err));