export const state = () => {
  return {
    menuList: [
      { name: 'マグロ', prise: 250, wasabi: true },
      { name: 'タイ', prise: 300, wasabi: true },
      { name: 'エビ', prise: 150, wasabi: true },
      { name: 'タマゴ', prise: 100, wasabi: false },
    ],
    soySauces: [
      { name: '特性醤油', value: 'tokusei' },
      { name: 'だし醤油', value: 'dashi' },
      { name: '刺身醤油', value: 'sashimi' },
    ],
    optionList: [
      { name: 'がり', value: 'gari' },
      { name: 'わさび', value: 'wasabi' },
      { name: 'わりばし', value: 'waribashi' },
    ],
  }
}
