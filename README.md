# LabelImg

* <https://sia.recruiter.co.kr/app/applicant/myPage/detail>
  * 채용페이지
* <https://github.com/heartexlabs/labelImg>
  * label img 예시 라이브러리
* <https://xd.adobe.com/view/21da78f5-6694-4841-7043-93c30bd11181-57eb/>
  * 어도비 디자인 시안
* <https://jsonplaceholder.typicode.com/photos>
  * photos example

## 동작방법

```sh
# 레포지토리 클론
git clone https://github.com/koremp/label-img.git

# 설치
yarn install

# 실행
yarn start
```

## src/utils/label.ts

| 함수/변수/타입 이름      | 기능                                           |
| ------------------------ | ---------------------------------------------- |
| interface: LabelRect     | 라벨 직사각형의 인터페이스                     |
| type: LabelMode          | 기본, 라벨 생성, 라벨 선택 타입들              |
| type: SelectedLabelEvent | LabelMode가 SelectLabel일 때 할 동작들         |
| class: LabelCanvas       | Canvas Context로 동작할 기능들을 정의한 클래스 |

LabelCanvas class 함수

| 함수명                    | 기능                                             |
| ------------------------- | ------------------------------------------------ |
| changeLabelMode           | 모드 변경                                        |
| addAnchorToSelectedLabels | 선택된 라벨 직사각형에 앵커들을 생성             |
| createLabel               | 라벨 생성하는 함수                               |
| selectLabel               | 라벨 선택하는 함수                               |
| onMouseDownCanvas         | 캔버스에 마우스 클릭시 동작할 행동을 정의한 함수 |

## 못한 것

* 필수 구현
  * 라벨 생성
  * 라벨 선택
    * 라벨 다중 선택
  * 라벨 이동 기능
  * 라벨 삭제
* 선택 요구 사항
  * 라벨 크기 조정
  * 라벨 회전
  * 테스트 코드

## 디버깅

### React.useEffect 내 console.log가 두번 찍히는 현상

<https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar>

React.Strict 모드가 on일 때 생기는 문제.
> StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).

### React Hook(React.useEffect)에서 data fetch 하는 방법

<https://www.robinwieruch.de/react-hooks-fetch-data/>

### How to declare iterable union types

<https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant>

```ts
const permissions = ['read', 'write', 'execute'] as const;
type Permission = typeof permissions[number]; // 'read' | 'write' | 'execute'

// you can iterate over permissions
for (const permission of permissions) {
  // do something
}
```
