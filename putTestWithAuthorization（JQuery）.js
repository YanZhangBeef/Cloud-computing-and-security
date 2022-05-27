var settings = {
  "url": "https://6hyu9pfbw1.execute-api.us-east-1.amazonaws.com/dev/api",
  "method": "PUT",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJraWQiOiJqazA1bU1OTGpUQVNmUWxoNTZFbDZJT0ZhT0dkYUY3WmF6Z3lUaThQS3p3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiSGlwN3c0X3dQX1l0YjlGUG85VFBqZyIsInN1YiI6IjEyNDM2ZDY4LTU2OWQtNGZiNS05MmE2LWMwZmQ0NzYwMjA1MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9HZDVWeU9ZVHciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbiIsImF1ZCI6IjcyMzc3bm8zMzNpYzNnNHVqN3JvMWU4cmE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTM1NzE4MTgsInBob25lX251bWJlciI6IisxMjM0NTYiLCJleHAiOjE2NTM1NzU0MTgsImlhdCI6MTY1MzU3MTgxOCwianRpIjoiMzkzZGE1YjktNjkyNi00ODc4LWE0ZjctYmMxNWE4NGJmNjk2IiwiZW1haWwiOiJ5emhhMDgwMEBzdHVkZW50Lm1vbmFzaC5lZHUifQ.Zo8YW4EqxcIMSsQMBnd3p1scoB8fm1atfEZNEaptjorEjiPi1qCf8DMm1FgtW6VcGVeE1NUkvjNzWgP8TR5-6GGDHhfczYcQNeOAToerUTEngXYRty_LzJKvm8bn4SdI3l0U4N6kKSnrPlMzlKIr9B2ooMBcX8mRxS_GWOTpV8Zl06tGS_y8--Fq2nErzb7bkHp0C1mrcJCft8kk64c91UIE6thQisiml3v3v8GFg73fg3Eml-vF0rLQ3DRasE7YgioVHB3Sox1CuO5InD6R4n2OSgSLKdOBd1Ov9tPVO1ynX1UDbiMFdG3bkhlkRe0fJC16wyEdIXlwq-cvtAu3Jw",
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    "url": "https://imagetodetect.s3.amazonaws.com/000000026923.jpg",
    "type": "1",
    "tags": "person,lion,person,lion"
  }),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});