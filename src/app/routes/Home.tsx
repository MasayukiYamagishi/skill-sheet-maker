import Button from '@/components/buttons/Button';
import { invoke } from '@tauri-apps/api/core';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const newUser = {
        name: 'テストユーザー',
        name_reading: 'テストユーザー',
        email: `test${Date.now()}@example.com`,
        birth_date: '2000-01-01',
        age: 25,
        gender: 'Male',
        mbti_result: 'INTJ',
        mbti_explanation: 'テスト',
        enrollment_start_date: '2023-04-01',
        enrollment_end_date: undefined,
        user_identifier: `user_test_data`,
      };
      const createdUser = await invoke('create_user_cmd', { u: newUser });
      console.log('User created:', createdUser);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleReadUsers = async () => {
    try {
      const users = await invoke<any[]>('list_users_cmd');
      // user_identifierが"user_test_data"のユーザーだけ表示
      const testUser = users.find((u) => u.user_identifier === 'user_test_data');
      if (!testUser) {
        console.log('No test user found.');
      } else {
        console.log('Test User:', testUser);
      }
    } catch (error) {
      console.error('Failed to read users:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const users = await invoke<any[]>('list_users_cmd');
      const userToUpdate = users.find((u) => u.user_identifier === 'user_test_data');
      if (!userToUpdate) {
        console.log('No test user to update.');
        return;
      }
      const updatedUserData = {
        ...userToUpdate,
        name: '更新されたテストユーザー',
      };
      const updatedUser = await invoke('update_user_cmd', { user: updatedUserData });
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const users = await invoke<any[]>('list_users_cmd');
      const userToDelete = users.find((u) => u.user_identifier === 'user_test_data');
      if (!userToDelete) {
        console.log('No test user to delete.');
        return;
      }
      await invoke('delete_user_cmd', { id: userToDelete.id });
      console.log('User deleted:', userToDelete.id);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-heading-h1">Welcome!</h1>
      {/* 後でちゃんとしたボタンとかに切り替えること。 */}
      <Button label="ユーザー一覧表示テスト" isWide={false} onClick={() => navigate('/users')} />
      <div className="flex flex-row gap-2">
        <Button label="Create User" isWide={false} onClick={handleCreateUser} />
        <Button label="Read Users" isWide={false} onClick={handleReadUsers} />
        <Button label="Update User" isWide={false} onClick={handleUpdateUser} />
        <Button label="Delete User" isWide={false} onClick={handleDeleteUser} />
      </div>
      {/* ここに統計情報を表示できるとベスト。表示のタイミングでバックエンド経由でデータをfetchする */}
      <div className="min-w-192 flex flex-col items-center gap-4">
        <h2 className="text-heading-h2">統計情報</h2>
        <div className="flex flex-row justify-center items-center gap-2 p-4 rounded-lg bg-base-100 drop-shadow-lg">
          <p className="text-center text-lg">
            統計情報１
            <br />
            登録されている受講生
            <br /> or <br />
            社員の数
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-center text-lg">
              統計情報２ <br />
              今月のユーザ数増減
            </p>
            <p className="text-center text-lg">
              統計情報３ ユーザ数の推移
              <br />
              （直近半年か１年。選択できるといいかも）
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
('');
