import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyUsers from "../data/dummyUsers.json";
import type { User } from "../types/type";
import { deleteUser, loadUsers, saveUsers } from "../utils/localStorage";
import { exportUsersToZip } from "../utils/zipUtils";

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let storedUsers = loadUsers();
    if (storedUsers.length === 0) {
      storedUsers = dummyUsers as User[];
      saveUsers(storedUsers); // ダミーデータをローカルストレージに保存
    }
    setUsers(storedUsers);
  }, []);

  const handleCreateNew = () => {
    navigate("/edit");
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("本当にこのユーザーを削除しますか？")) {
      const updatedUsers = deleteUser(id);
      setUsers(updatedUsers);
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDownload = async () => {
    const usersToDownload = users.filter((user) =>
      selectedUsers.includes(user.id)
    );
    if (usersToDownload.length > 0) {
      await exportUsersToZip(usersToDownload);
    } else {
      alert("ダウンロードするユーザーを選択してください。");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">スキルシート一覧</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleCreateNew}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          新規スキルシート作成
        </button>
        <button
          onClick={handleBulkDownload}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          disabled={selectedUsers.length === 0}
        >
          選択したユーザーをZIPでダウンロード ({selectedUsers.length})
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleSelectUser(user.id)}
                className="mr-2"
              />
              <h2 className="text-xl font-semibold">{user.name}</h2>
            </div>
            <p className="text-gray-600">{user.affiliation}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(user.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
