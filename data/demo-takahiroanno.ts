import type {
  AccountingReports,
  Flow,
  Profile,
  Report,
  Transaction,
} from '@/models/type';

const profile: Profile = {
  name: '安野貴博',
  title: 'AIエンジニア',
  party: '無所属',
  image: '/demo-takahiroanno.jpg',
};

const reports: Report[] = [
  {
    id: 'demo-takahiro-anno-2024',
    totalIncome: 18416736,
    totalExpense: 7580065,
    totalBalance: 10836671,
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
    value: 16416736,
    parent: '総収入',
  },
  {
    id: 'i8',
    name: '借入金',
    direction: 'income',
    value: 2000000,
    parent: '総収入',
  },
  {
    id: 'i_total',
    name: '総収入',
    direction: 'expense',
    value: 18416736,
    parent: null,
  },

  // 支出
  {
    id: 'e4',
    name: '事務所費',
    direction: 'expense',
    value: 1173737,
    parent: '経常経費',
  },
  {
    id: 'e5',
    name: '経常経費',
    direction: 'expense',
    value: 1173737,
    parent: '総収入',
  },
  {
    id: 'e7',
    name: '選挙関係費',
    direction: 'expense',
    value: 2500000,
    parent: '政治活動費',
  },
  {
    id: 'e12',
    name: '宣伝事業費',
    direction: 'expense',
    value: 1906328,
    parent: '政治活動費',
  },
  {
    id: 'e15',
    name: 'その他の経費',
    direction: 'expense',
    value: 2000000,
    parent: '政治活動費',
  },
  {
    id: 'e16',
    name: '政治活動費',
    direction: 'expense',
    value: 6406328,
    parent: '総収入',
  },
  // 翌年への繰越
  {
    id: 'e_next',
    name: '翌年への繰越額',
    direction: 'expense',
    value: 10836671,
    parent: '総収入',
  },
];

const transactions: Transaction[] = [
  {
    id: '4-1',
    direction: '収入',
    category: '借入金',
    purpose: '安野貴博',
    name: '安野貴博',
    amount: 2000000,
    date: '-',
  },
  {
    id: '7-1',
    direction: '収入',
    category: '個人からの寄附',
    purpose: '個人からの寄附',
    name: '個人からの寄附',
    amount: 16416736,
    date: '-',
  },
  {
    id: '14-1',
    direction: '支出',
    category: '経常経費',
    purpose: 'コミュニケーションツール費用(slack)',
    name: 'コミュニケーションツール費用(slack)',
    amount: 107265 + 152845 + 80552 + 63525 + 62818 + 66105,
    date: '-',
  },
  {
    id: '14-2',
    direction: '支出',
    category: '経常経費',
    purpose: '献金システム手数料(ボネクタ)',
    name: '献金システム手数料(ボネクタ)',
    amount: 300575 + 130680,
    date: '-',
  },
  {
    id: '14-3',
    direction: '支出',
    category: '経常経費',
    purpose: 'その他の経常経費',
    name: 'その他の経常経費',
    amount: 209372,
    date: '-',
  },
  {
    id: '15-1',
    direction: '支出',
    category: '選挙関係費',
    purpose: '寄付',
    name: '寄付',
    amount: 2500000,
    date: '-',
  },
  {
    id: '15-2',
    direction: '支出',
    category: '組織活動費',
    purpose: 'ブロードリスニングAPI利用料(X)',
    name: 'ブロードリスニングAPI利用料(X)',
    amount: 801378,
    date: '-',
  },
  {
    id: '15-3',
    direction: '支出',
    category: '組織活動費',
    purpose: 'ブロードリスニングAPI利用料(OpenAI)',
    name: 'ブロードリスニングAPI利用料(OpenAI)',
    amount: 163808 + 166257 + 166257,
    date: '-',
  },
  {
    id: '15-4',
    direction: '支出',
    category: '組織活動費',
    purpose: '政策広報用音声コンテンツ作成API利用料(ElevenLabs)',
    name: '政策広報用音声コンテンツ作成API利用料(ElevenLabs)',
    amount: 53832 + 112135 + 110797 + 110267 + 110389 + 67069,
    date: '-',
  },
  {
    id: '15-5',
    direction: '支出',
    category: '組織活動費',
    purpose: 'その他の組織活動費',
    name: 'その他の組織活動費',
    amount: 44139,
    date: '-',
  },
  {
    id: '15-6',
    direction: '支出',
    category: 'その他の経費',
    purpose: '借入金の返済',
    name: '借入金の返済',
    amount: 2000000,
    date: '-',
  },
];

const data: AccountingReports = {
  id: 'demo-takahiro-anno',
  latestReportId: 'demo-takahiro-anno-2024',
  profile,
  datas: [
    {
      report: report,
      flows: flows,
      transactions: transactions,
    },
  ],
};

export default data;
