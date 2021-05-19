# 커피공장의 인증/인가 서비스 입니다

### 로컬 개발환경
- mongodb 설치 https://www.mongodb.com/try/download/community
- clone 이후 프로젝트 최상단에 .env 파일 생성 후 "PORT=3000" 과 같이 포트설정 후

```
  npm run dev
```

### 회원가입

- POST 요청 : localhost:3000/api/user
- param : user_id=[이메일]
