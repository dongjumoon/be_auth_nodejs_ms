# 커피공장 마이크로 서비스 

### 로컬 개발환경
- mongodb 설치 https://www.mongodb.com/try/download/community
- clone 이후 프로젝트 최상단에 .env 파일 생성 후 "PORT=3000" 과 같이 포트설정 후

```
# 몽고디비 환경설정에 등록
export MONGO_HOST=[트렐로참고]
# 인스톨
yarn 
# 개발환경 실행
yarn dev 
# 운영환경 실행
yarn start
```

### 회원가입

- POST 요청 : localhost:3000/api/user
- param : user_id=[이메일]

### 도커빌드
docker build --tag be_auth_nodejs_ms:0.1 .
### 도커운영 실행 
docker run --name be_auth_node_ms_prd -d -p 8888:8888 be_auth_node_ms:0.1
### 도커데브 실행 
docker run --name be_auth_node_ms_dev -d -p 8888:8888 -f Dockerfile-Dev be_auth_node_ms:0.1
### 도커컴포즈 실행
docker-compose up --build -d
### 도커컴포즈 중지
docker-compose down 

