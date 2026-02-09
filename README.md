
# 🚀 Japan Business Cold Mailer 배포 및 업데이트 가이드

이 프로젝트를 GitHub에 올리고 Vercel/Netlify에서 배포 및 업데이트하는 방법입니다.

## 1. GitHub에 코드 올리기 (중요: ZIP 파일 안됨)
"requested branch not found" 에러가 발생한다면 저장소가 비어있기 때문입니다. 
압축을 푼 파일들을 GitHub 웹사이트에서 **드래그 앤 드롭**으로 올리거나 아래 명령어를 사용하세요.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [본인의_저장소_주소]
git push -u origin main
```

## 2. Vercel에서 다시 배포(Redeploy) 하는 순서
파일을 새로 올렸거나 `API_KEY`를 등록했다면 다음 순서로 재배포하세요.

1. **Vercel 대시보드** 접속 → 프로젝트 선택
2. 상단 **[Deployments]** 메뉴 클릭
3. 최신 배포 항목 우측의 **점 세 개(···)** 클릭
4. **[Redeploy]** 선택
5. **[Redeploy]** 버튼을 눌러 확정

## 3. 환경 변수 설정
반드시 Settings -> Environment Variables에서 `API_KEY`를 등록해야 AI가 작동합니다.
