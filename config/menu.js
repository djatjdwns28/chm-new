export const menuList = [
  { title: '대시보드', name: 'dashboard', path: '/dashboard' },
  { title: 'o2o', name: 'o2o', subMenuList: [{ title: '예약', name: 'orders', path: '/o2o/orders' }] },
  {
    title: '브랜드',
    name: 'brands',
    subMenuList: [
      {
        title: '윙크',
        name: 'winc',
        nestedSubMenuList: [
          { title: '예약', name: 'orders', path: '/brands/winc/orders' },
          { title: '쿠폰 스탬프', name: 'couponStamps', path: '/brands/winc/coupon-stamps' },
          { title: '컬렉션', name: 'collections' },
          { title: '상품', name: '' },
          { title: '오버레이', name: '' },
          { title: '상품 가격수정', name: '' },
          { title: '사은품 설정', name: '' },
          { title: '윙크 세팅', name: '' },
          { title: '게시글', name: '' },
          { title: '리뷰', name: '' },
          { title: '유저', name: '' },
          { title: '브랜드', name: '' },
          { title: '딥링크', name: '' },
          { title: '이벤트페이지', name: '' },
          { title: '추천인', name: '' },
          { title: 'PriceGroup 관리', name: '' },
          { title: '윙플루언서 목록', name: '' },
          { title: '윙플루언서 캠페인 신청 목록', name: '' },
          { title: '윙플루언서 캠페인 관리', name: '' },
          { title: '재입고 알림', name: '' }
        ]
      },
      { title: '하파(kR)', subKey: 'hapaKr' },
      { title: '츄렌즈', subKey: 'chuulens' },
      { title: '젬아워', subKey: 'gemhour' },
      { title: '센터', subKey: 'center' }
    ]
  },
  { title: '멤버십', key: 'membership' }
];
