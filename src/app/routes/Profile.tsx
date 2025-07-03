import Button from '@/components/buttons/Button';
import { default as CirclePhotoCard } from '@/components/CirclePhotoCard';
import { Icon } from '@/components/icons/Icon';
import { sampleUsers } from '@/test/sampleUser';
import { chunkArray } from '@/utils/array';
import { formatDate } from '@/utils/format';
import { getMbtiDetails } from '@/utils/mbti';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const user = sampleUsers.find((u) => u.uuid === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  // MBTI詳細情報
  const mbtiDetail = getMbtiDetails(user.mbti.code);

  // キーワードの配列を7個の要素ごとに分割
  const perColumn = 7;
  const positiveKeywords = useMemo(
    () => chunkArray(mbtiDetail.keywords.positive, perColumn),
    [mbtiDetail.keywords.positive, perColumn],
  );
  const negativeKeywords = useMemo(
    () => chunkArray(mbtiDetail.keywords.negative, perColumn),
    [mbtiDetail.keywords.negative, perColumn],
  );

  // TODO: 横幅のサイズを可能な限り768px（Tailwind CSSのmdサイズのブレークポイント）に合うように調整して要素のサイズを変える
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full flex justify-end">
        <Button label="ユーザ一覧へ戻る" isWide={false} onClick={() => navigate('/users')} />
      </div>
      <div className="min-w-192 w-fit flex flex-row justify-center content-center items-start rounded-lg gap-8 p-4  bg-white drop-shadow-lg">
        <CirclePhotoCard src={user.avatarImagePath} altText="avatar image" size={128} />
        <div className="flex flex-col gap-2">
          <p className="text-sm">ID: {user.uuid}</p>
          <div className="flex flex-row justify-center content-center items-start gap-24">
            <div className="flex flex-col justify-center content-center gap-2">
              <div>
                <div className="flex flex-row gap-2 text-3xl font-bold ">
                  <p>{user.name.lastName}</p>
                  <p>{user.name.firstName}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p>{user.name.lastNameKana}</p>
                  <p>{user.name.firstNameKana}</p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Icon icon="mail" />
                <p>{user.email}</p>
              </div>
            </div>
            <div className="min-w-55 flex flex-col content-end justify-end gap-2">
              <p>生年月日：{formatDate(user.birthDate)}</p>
              <div className="flex flex-row gap-8 content-center">
                <p>年齢：{user.age} 歳</p>
                <p>性別：{user.gender}</p>
              </div>
              <p>受講開始日：{formatDate(user.startDate)}</p>
              <p>受講終了予定日：{formatDate(user.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
      {/* MBTI */}
      <div className="flex flex-col gap-4">
        <h2 className="text-heading-h1">MBTI</h2>
        <div className="min-w-192 w-fit flex flex-row justify-between gap-4 rounded-lg p-4 bg-white drop-shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4 content-center">
                <p className="text-heading-h2">
                  {user.mbti.code}-{user.mbti.identity}
                </p>
                <p className="text-heading-h2">{mbtiDetail.typeName}</p>
              </div>
              <div>
                <p className="break-words">{mbtiDetail.description}</p>
              </div>
            </div>
            <div className="max-w-115 flex flex-col gap-2">
              <p className="text-heading-h3">特徴</p>
              <div className="rounded-lg p-4 bg-slate-100">
                <ul className="list-disc list-outside text-wrap pl-4">
                  {mbtiDetail.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-heading-h3">キーワード</p>
            <div className="flex flex-col gap-4">
              <div className="p-4 ounded-lg bg-slate-100">
                <p className="font-bold">ポジティブ</p>
                <div className="flex flex-row gap-8">
                  {positiveKeywords.map((col, i) => (
                    <ul key={i} className="list-disc list-inside">
                      {col.map((keyword, j) => (
                        <li key={j}>{keyword}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-100">
                <p className="font-bold">ネガティブ</p>
                <div className="flex flex-row gap-8">
                  {negativeKeywords.map((col, i) => (
                    <ul key={i} className="list-disc list-inside">
                      {col.map((keyword, j) => (
                        <li key={j}>{keyword}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* スキル */}
      <div className="flex flex-col gap-4">
        <h2 className="text-heading-h2">スキル</h2>
        <div className="min-w-192 flex flex-col p-4 gap-4 rounded-lg bg-white drop-shadow-lg">
          {/* TODO: カテゴリごとに保有しているスキルの一覧、
            向いている職業（保有しているスキルと必要なスキルセットが合致している数をパーセンテージで内部的に出してランキング形式で３位まで表示、
            保有しているスキルごとのタグの数を集計して技術スタックの傾向を測る横棒グラフまたはPie_barチャートの表示
          */}
          <p>工事中</p>
        </div>
      </div>
      {/* 資格と職歴 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-heading-h2">保有資格</h2>
        <div className="min-w-192 flex flex-col p-4 gap-4 rounded-lg bg-white drop-shadow-lg">
          {/* TODO: 資格一覧はトーストによる詳細表示、ユーザー全体に占める保有率、難易度という資格自体に紐づいた情報に加えて、取得年月日も表示できるようにするとなお良い*/}
          <ul className="flex flex-col gap-2">
            {user.qualifications.map((qualification, _) => (
              <li className="pl-4 pr-4 pt-2 pb-2 rounded-lg bg-slate-100" key={qualification.id}>
                {qualification.label}
              </li>
              // 取得年月日を表示できるようにしておく
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-heading-h2">学歴・職歴</h2>
        <div className="min-w-192 flex flex-col p-4 gap-4 rounded-lg bg-white drop-shadow-lg">
          <div className="flex flex-row justify-between">
            <p className="w-40 text-center">年月日</p>
            <p className="w-full text-center">学歴・職歴</p>
          </div>
          <ul className="flex flex-col gap-2">
            {user.experiences.map((experience, index) => (
              <li
                className="flex flex-row justify-between pl-4 pr-4 pt-2 pb-2 rounded-lg bg-slate-100"
                key={index}
              >
                <p className="w-60">{formatDate(experience.date)}</p>
                <p className="w-full">{experience.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
