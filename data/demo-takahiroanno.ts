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
    totalIncome: 16500000,
    totalExpense: 14700000,
    totalBalance: 16500000 - 14700000,
    year: 2024,
    orgType: 'その他の政治団体',
    orgName: 'テストの会',
    activityArea: '2以上の都道府県の区域等',
    representative: 'テスト花子',
    fundManagementOrg: '有/参議院議員(現職)テスト花子',
    accountingManager: 'テスト花子',
    administrativeManager: 'テスト花子',
    lastUpdate: '2024年1月1日',
  },
];

const report = reports[0];

const flows: Flow[] = [
  // 収入
  {
    id: 'i3',
    name: '個人からの寄附',
    direction: 'income',
    value: 4000000,
    parent: '寄付',
  },
  {
    id: 'i4',
    name: '法人その他の団体からの寄附',
    direction: 'income',
    value: 2500000,
    parent: '寄付',
  },
  {
    id: 'i4',
    name: '寄付',
    direction: 'income',
    value: 6500000,
    parent: '総収入',
  },
  {
    id: 'i5',
    name: '本部又は支部から供与された交付金',
    direction: 'income',
    value: 5000000,
    parent: '総収入',
  },
  {
    id: 'i3',
    name: '前年度からの繰越',
    direction: 'income',
    value: 5000000,
    parent: '総収入',
  },
  {
    id: 'i_total',
    name: '総収入',
    direction: 'expense',
    value: 16500000,
    parent: null,
  },

  // 支出
  {
    id: 'e4',
    name: '事務所費',
    direction: 'expense',
    value: 1500000,
    parent: '経常経費',
  },
  {
    id: 'e4_1',
    name: '水道光熱費',
    direction: 'expense',
    value: 200000,
    parent: '経常経費',
  },
  {
    id: 'e5_1',
    name: '人件費',
    direction: 'expense',
    value: 8000000,
    parent: '経常経費',
  },
  {
    id: 'e5',
    name: '経常経費',
    direction: 'expense',
    value: 9700000,
    parent: '総収入',
  },
  {
    id: 'e7',
    name: '選挙関係費',
    direction: 'expense',
    value: 2000000,
    parent: '政治活動費',
  },
  {
    id: 'e12',
    name: '宣伝事業費',
    direction: 'expense',
    value: 2000000,
    parent: '政治活動費',
  },
  {
    id: 'e15',
    name: 'その他の経費',
    direction: 'expense',
    value: 1000000,
    parent: '政治活動費',
  },
  {
    id: 'e16',
    name: '政治活動費',
    direction: 'expense',
    value: 5000000,
    parent: '総収入',
  },
  // 翌年への繰越
  {
    id: 'e_next',
    name: '翌年への繰越額',
    direction: 'expense',
    value: 1800000,
    parent: '総収入',
  },
];

const incomeTransactions: OldTransaction[] = [
  {
    id: '7-1',
    name: '個人からの寄附',
    date: '-',
    category: '個人からの寄附',
    value: 4000000,
    percentage: (4000000 / (4000000 + 2500000 + 5000000)) * 100,
  },
  {
    id: '7-2',
    name: '法人その他の団体からの寄附',
    date: '-',
    category: '法人その他の団体からの寄附',
    value: 2500000,
    percentage: (2500000 / (4000000 + 2500000 + 5000000)) * 100,
  },
  {
    id: '7-3',
    name: '前年度からの繰越',
    date: '-',
    category: '前年度からの繰越',
    value: 5000000,
    percentage: (5000000 / (4000000 + 2500000 + 5000000)) * 100,
  },
];

const totalExpense = 1500000 + 200000 + 8000000 + 2000000 + 2000000 + 1000000; // 事務所費1.5M, 水道光熱費0.2M, 人件費8M, 選挙関係費2M, 宣伝事業費2M, その他の経費1M = 14.7M
const expenseTransactions: OldTransaction[] = [
  {
    id: 'e4',
    name: '事務所費',
    date: '-',
    category: '経常経費',
    value: 1500000,
    percentage: (1500000 / totalExpense) * 100,
  },
  {
    id: 'e4_1',
    name: '水道光熱費',
    date: '-',
    category: '経常経費',
    value: 200000,
    percentage: (200000 / totalExpense) * 100,
  },
  {
    id: 'e5_1',
    name: '人件費',
    date: '-',
    category: '経常経費',
    value: 8000000,
    percentage: (8000000 / totalExpense) * 100,
  },
  {
    id: 'e7',
    name: '選挙関係費',
    date: '-',
    category: '政治活動費',
    value: 2000000,
    percentage: (2000000 / totalExpense) * 100,
  },
  {
    id: 'e12',
    name: '宣伝事業費',
    date: '-',
    category: '政治活動費',
    value: 2000000,
    percentage: (2000000 / totalExpense) * 100,
  },
  {
    id: 'e15',
    name: 'その他の経費',
    date: '-',
    category: '政治活動費',
    value: 1000000,
    percentage: (1000000 / totalExpense) * 100,
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
