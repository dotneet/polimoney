import type { Flow, OldTransaction, Profile, Report } from '@/models/type';

const profile: Profile = {
  name: 'テスト太郎',
  title: 'テスト党',
  party: 'テスト党',
  image: '/demo-example.png',
};

const reports: Report[] = [
  {
    id: 'demo-takahiro-anno-2024',
    totalIncome: 2300000,
    totalExpense: 1800000,
    totalBalance: 2300000 - 1800000,
    year: 2024,
    orgType:
      '政治資金規正法第18条の２第１項の規定による政治団体\nその他の政治団体',
    orgName: 'デジタル民主主義を考える会',
    activityArea: '東京都内',
    representative: '安野 貴博',
    fundManagementOrg: '有り/東京都知事候補 安野貴博',
    accountingManager: '安野 貴博',
    administrativeManager: '高山 聡史',
    lastUpdate: '2024年3月31日',
  },
];

const report = reports[0];

const flows: Flow[] = [
  // 収入
  {
    id: 'i3',
    name: '個人からの寄附',
    direction: 'income',
    value: 800000,
    parent: '寄付',
  },
  {
    id: 'i4',
    name: '法人その他の団体からの寄附',
    direction: 'income',
    value: 500000,
    parent: '寄付',
  },
  {
    id: 'i4',
    name: '寄付',
    direction: 'income',
    value: 1300000,
    parent: '総収入',
  },
  {
    id: 'i5',
    name: '本部又は支部から供与された交付金',
    direction: 'income',
    value: 500000,
    parent: '総収入',
  },
  {
    id: 'i3',
    name: '前年度からの繰越',
    direction: 'income',
    value: 500000,
    parent: '総収入',
  },
  {
    id: 'i_total',
    name: '総収入',
    direction: 'expense',
    value: 1000000,
    parent: null,
  },

  // 支出
  {
    id: 'e4',
    name: '事務所費',
    direction: 'expense',
    value: 150000,
    parent: '経常経費',
  },
  {
    id: 'e4_1',
    name: '水道光熱費',
    direction: 'expense',
    value: 50000,
    parent: '経常経費',
  },
  {
    id: 'e5_1',
    name: '人件費',
    direction: 'expense',
    value: 900000,
    parent: '経常経費',
  },
  {
    id: 'e5',
    name: '経常経費',
    direction: 'expense',
    value: 1100000,
    parent: '総収入',
  },
  {
    id: 'e7',
    name: '選挙関係費',
    direction: 'expense',
    value: 200000,
    parent: '政治活動費',
  },
  {
    id: 'e12',
    name: '宣伝事業費',
    direction: 'expense',
    value: 200000,
    parent: '政治活動費',
  },
  {
    id: 'e15',
    name: 'その他の経費',
    direction: 'expense',
    value: 300000,
    parent: '政治活動費',
  },
  {
    id: 'e16',
    name: '政治活動費',
    direction: 'expense',
    value: 700000,
    parent: '総収入',
  },
  // 翌年への繰越
  {
    id: 'e_next',
    name: '翌年への繰越額',
    direction: 'expense',
    value: 500000,
    parent: '総収入',
  },
];

const incomeTransactions: OldTransaction[] = [
  {
    id: '7-1',
    name: '個人からの寄附',
    date: '-',
    category: '個人からの寄附',
    value: 800000,
    percentage: (800000 / (800000 + 500000 + 1000000)) * 100,
  },
  {
    id: '7-2',
    name: '法人その他の団体からの寄附',
    date: '-',
    category: '法人その他の団体からの寄附',
    value: 500000,
    percentage: (500000 / (800000 + 500000 + 1000000)) * 100,
  },
  {
    id: '7-3',
    name: '前年度からの繰越',
    date: '-',
    category: '前年度からの繰越',
    value: 1000000,
    percentage: (1000000 / (800000 + 500000 + 1000000)) * 100,
  },
];

const totalExpense = 200000 + 900000 + 200000 + 200000 + 300000;
const expenseTransactions: OldTransaction[] = [
  {
    id: 'e4',
    name: '事務所費',
    date: '-',
    category: '経常経費',
    value: 150000,
    percentage: (150000 / totalExpense) * 100,
  },
  {
    id: 'e4',
    name: '水道光熱費',
    date: '-',
    category: '経常経費',
    value: 50000,
    percentage: (50000 / totalExpense) * 100,
  },
  {
    id: 'e5_1',
    name: '人件費',
    date: '-',
    category: '経常経費',
    value: 900000,
    percentage: (900000 / totalExpense) * 100,
  },
  {
    id: 'e7',
    name: '選挙関係費',
    date: '-',
    category: '政治活動費',
    value: 200000,
    percentage: (200000 / totalExpense) * 100,
  },
  {
    id: 'e12',
    name: '宣伝事業費',
    date: '-',
    category: '政治活動費',
    value: 200000,
    percentage: (200000 / totalExpense) * 100,
  },
  {
    id: 'e15',
    name: 'その他の経費',
    date: '-',
    category: '政治活動費',
    value: 300000,
    percentage: (300000 / totalExpense) * 100,
  },
];

export default {
  id: report.id,
  profile,
  report,
  reports,
  flows,
  incomeTransactions,
  expenseTransactions,
};
