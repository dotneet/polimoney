'use client';
import { BoardChart } from '@/components/BoardChart';
import { BoardContainer } from '@/components/BoardContainer';
import type { Flow, Profile, Report } from '@/models/type';
import {
  Avatar,
  Badge,
  Box,
  HStack,
  NativeSelect,
  SimpleGrid,
  Stack,
  Stat,
  Text,
} from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import { LandmarkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  profile: Profile;
  report: Report;
  otherReports: Report[];
  flows: Flow[];
};

export function BoardSummary({ profile, report, otherReports, flows }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  // const [selectedTab, setSelectedTab] = useState('amount')
  const handleCopyImage = async () => {
    const button = document.getElementById('copy-image-btn');
    if (button) button.style.display = 'none'; // ボタンを非表示
    const element = document.getElementById('summary');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 3 });
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } catch (e) {
          alert('コピーに失敗しました');
        }
      }
      if (button) button.style.display = ''; // ボタンを再表示
    });
  };
  return (
    <BoardContainer id={'summary'}>
      {/* プロフィール */}
      <Box mb={10}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems={'center'}
          justify={'space-between'}
          gap={5}
        >
          <HStack gap={5} minW={'250px'}>
            <Avatar.Root w={'80px'} h={'80px'}>
              <Avatar.Fallback name={profile.name} />
              <Avatar.Image src={profile.image} />
            </Avatar.Root>
            <Stack gap={0}>
              <Text fontSize={'xs'}>{profile.title}</Text>
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                {profile.name}
              </Text>
              <HStack mt={1}>
                <Badge variant={'outline'} colorPalette={'red'}>
                  {profile.party}
                </Badge>
                {profile.district && (
                  <Badge variant={'outline'}>{profile.district}</Badge>
                )}
              </HStack>
            </Stack>
          </HStack>
          <NativeSelect.Root
            w={'300px'}
            defaultValue={report.id}
            onChange={(e) => {
              const target = e.target as HTMLSelectElement;
              router.push(`/${target.value}`);
            }}
          >
            <NativeSelect.Field>
              {otherReports.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.year}年 {report.orgName}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Stack>
      </Box>
      {/* タイトル */}
      <Box mb={5}>
        <HStack justify={'space-between'} alignItems={'center'}>
          <HStack fontSize={'xl'} fontWeight={'bold'}>
            <LandmarkIcon size={28} className={'income'} />
            <Text>収支の流れ</Text>
          </HStack>
        </HStack>
      </Box>
      {/* サマリー */}
      <Box mb={5}>
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={5}>
          <Box
            border={'1px solid #dddddd'}
            borderRadius={'lg'}
            p={5}
            minW={'200px'}
          >
            <Stat.Root>
              <Stat.Label
                className={'income'}
                fontWeight={'bold'}
                fontSize={'sm'}
              >
                収入総額
              </Stat.Label>
              <Stat.ValueText alignItems="baseline" fontSize={'2xl'}>
                {Math.round(report.totalIncome / 10000)}
                <Stat.ValueUnit>万円</Stat.ValueUnit>
              </Stat.ValueText>
            </Stat.Root>
          </Box>
          <Box
            border={'1px solid #dddddd'}
            borderRadius={'lg'}
            p={5}
            minW={'200px'}
          >
            <Stat.Root>
              <Stat.Label
                className={'expense'}
                fontWeight={'bold'}
                fontSize={'sm'}
              >
                支出総額
              </Stat.Label>
              <Stat.ValueText alignItems="baseline" fontSize={'2xl'}>
                {Math.round(report.totalExpense / 10000)}
                <Stat.ValueUnit>万円</Stat.ValueUnit>
              </Stat.ValueText>
            </Stat.Root>
          </Box>
          <Box
            border={'1px solid #dddddd'}
            borderRadius={'lg'}
            p={5}
            minW={'200px'}
          >
            <Stat.Root>
              <Stat.Label fontWeight={'bold'} fontSize={'sm'}>
                年間収支
              </Stat.Label>
              <Stat.ValueText alignItems="baseline" fontSize={'2xl'}>
                {Math.round(report.totalBalance / 10000)}
                <Stat.ValueUnit>万円</Stat.ValueUnit>
              </Stat.ValueText>
            </Stat.Root>
          </Box>
        </SimpleGrid>
      </Box>
      {/* タブ */}
      {/*<Box mb={5}>*/}
      {/*  <Tabs.Root*/}
      {/*    value={selectedTab}*/}
      {/*    onValueChange={(e) => setSelectedTab(e.value)}*/}
      {/*  >*/}
      {/*    <Tabs.List>*/}
      {/*      <Tabs.Trigger*/}
      {/*        value="amount"*/}
      {/*        fontWeight={'bold'}*/}
      {/*        className={selectedTab === 'amount' ? 'income' : ''}*/}
      {/*      >*/}
      {/*        金額(円)*/}
      {/*      </Tabs.Trigger>*/}
      {/*      <Tabs.Trigger*/}
      {/*        value="percentage"*/}
      {/*        fontWeight={'bold'}*/}
      {/*        className={selectedTab === 'percentage' ? 'income' : ''}*/}
      {/*      >*/}
      {/*        割合(%)*/}
      {/*      </Tabs.Trigger>*/}
      {/*    </Tabs.List>*/}
      {/*  </Tabs.Root>*/}
      {/*</Box>*/}
      {/* チャート */}
      <BoardChart flows={flows} />
      <Box mb={3} display="flex" justifyContent="flex-end">
        <button
          type="button"
          id="copy-image-btn"
          onClick={handleCopyImage}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '8px 16px',
            background: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#888';
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#888';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fff';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#ccc';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fff';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#ccc';
          }}
        >
          {copied ? (
            <>
              <svg
                width="20"
                height="20"
                fill="#38a169"
                viewBox="0 0 20 20"
                role="img"
                aria-label="コピー完了"
              >
                <title>コピー完了</title>
                <path
                  fillRule="evenodd"
                  d="M16.707 6.293a1 1 0 010 1.414l-7.004 7.004a1 1 0 01-1.414 0l-3.004-3.004a1 1 0 111.414-1.414l2.297 2.297 6.297-6.297a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <>画像としてコピー</>
          )}
        </button>
      </Box>
    </BoardContainer>
  );
}
