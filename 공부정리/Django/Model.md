models가 바뀜 -> 설계도가 바뀜 -> makemigrations
데이터 베이스에는 공백이 존재할 수 없음, 따라서 default 값을 넣어주어야 함!
1. 입력하면 default로 넣어주겠다!
2. 나가서 직접 default를 넣어라! 
날짜와 시간을 직접 입력해서 넣기 어렵기 때문에, 1번 선택
자동으로 timezone.now로 넣어줌
새로 생긴 0002는 dependacies가 존재, 0001에서 변경사항이 생겨 만들어진 것이기 때문에 의존성을 가지게 됨!
만약 같은 class에서 추가한 게 아니라면 의존성이 생기지 않음
그럼 0003은 의존성이 0002에 있을까? YES

최신 설계도만 두는 것이 아니라 쌓아가는 이유?
언제 문제가 생길 지 모르기 때문에, 문제가 생길 때 정상이었을 때로 migrate하기 위해
정상이었을 때의 기록을 보고, 그것과 똑같이 model을 수정한 후 migrations -> migrate
or migration 되돌리기를 보면 특정 번호에 대해서 roll back을 하는 방법이 있음!

`python manage.py shell_plus`
파이썬 shell이 장고 안에서 켜진다! shell_plus는 shell과 다르게 필요한 것들 import를 다 해줌 
objects는 자동, 고정, 중요하지 않음
API가 중요!
save가 되어야 id값이 반영 됨

시간을 한국으로 바꾸더라도, db에는 UTC로 저장, 이를 한국 시간으로 읽어오는 것!
article.pk도 제공해줌
pk = id임!(장고에서 자동으로 해주니까)
Article.objects.all()에서 Article 대문자!!
1번 방법
```python
article = Article()
article.title = 'first'
article.content = 'django'
article.save()
```
2번 방법
```python
article = Article(title='second', content='django!')
article.save()
```
3번 방법
`Article.objects.create(title='third', content='django!')`
위와 달리 create는 한 번에 save까지 진행해줌!!!

어떻게 조회하는지가 중요
queryset을 받느냐 받지 않느냐
즉 목록을 받느냐, 단일로 받느냐
1. 목록을 받는 경우
`.all()` 사용
```python
articles = Article.objects.all() 
for article in articles: #쿼리는 반복 가능한 개체
    print(article)
```
2. 단일 데이터를 받는 경우
`.get()` 사용
- 찾을 수 없어도 에러
- 둘 이상이어도 에러
즉, 유니크한 값(pk)에만 사용

vs
#### filter의 경우,
- 해당되는 데이터가 1개임에도 **queryset**으로 준다(중요)
- 값이 없어도 에러가 나지 않고 빈 쿼리셋을 줌
- 중복인 것에 대해서는 전부 반환해줌!
`Article.objects.filter(pk=1)`의 경우도 제대로 단일 데이터를 주는데 사용안하는 이유
1. queryset으로 줌 -> queryset에 들어가 한 번 더 접근해야함
2. 없으면 빈 queryset을 줌 -> 예외를 발생시키지 않아 pk를 조회할 때 적합하지는 않음

만약 조회할 때 조건을 걸고 싶으면,
`Article.objects.filter(content__contains='ja')`
위와 같이 \_ \_를 이용하여 조건을 걸어줌
다양한 built-in lookups는 공식문서에 존재
https://docs.djangoproject.com/en/3.2/ref/models/querysets/#filed-lookups

### Update 과정
수정 전에 먼저 해야할 것! 무엇을 수정할 지 선택(조회)
```python
article = Article.objects.get(pk=1) # 조회
article.title = 'byebye' # 수정
article.save() # 저장을 해주어야 db에 반영, 수정일자도 자동으로 변경
```

### Delete 과정
```python
article = Article.objects.get(pk=1) # 조회
article.delete() # 삭제
```
delete로 id=1이 지워진 상황에서, 새로운 데이터를 추가하면 id=1 이 아니라 기존 추가될 id가 나옴(삭제된 값 재사용하지 않음)

매직 method 복습
```python
def __str__(self): # 출력 형식 바꾸는 method
    return self.title
```
적용하고 무조건 shell `exit()`해주고 다시 실행시켜야 반영
매직 method는 DB의 구조에 영향을 주지 않기 때문에 makemigrations를 해도 반영이 안됨

#### Create 로직을 구현하기 위해서는 몇 개의 view 함수가 필요할까? 2개
1. 글 작성 후, 페이지에 리턴
2. 데이터를 받아서 DB에 저장하는 함수

현재까지
1. create를 랜더링 x
2. GET을 사용하면, 내용 노출됨(DB의 구조를 유추할 수 있게 됨, 변수가 많으면 길이제한에 걸림)
GET은 조회에만 사용한다!! -> POST로 바꿀 것 ! 
csrf 토큰 입력!(잘 까먹음!!)
---
위의 코드 정리하는 방법  
Ctrl + L  
```python
created_at = models.DateTimeField(auto_now_add=True)
```
위의 식에서 created_at.day, created_at.month, created_at.year 등 datetime에서 사용하는 문법과 같이 일, 월, 년을 뽑아낼 수 있다.