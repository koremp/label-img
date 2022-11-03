# LabelImg

* <https://sia.recruiter.co.kr/app/applicant/myPage/detail>
  * 채용페이지
* <https://github.com/heartexlabs/labelImg>
  * label img 예시 라이브러리
  * Password
    * SIA_coding_test_2021
* <https://xd.adobe.com/view/21da78f5-6694-4841-7043-93c30bd11181-57eb/>
  * 어도비 디자인 시안
* <https://jsonplaceholder.typicode.com/photos>
  * photos example


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