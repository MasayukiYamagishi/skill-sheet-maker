import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import SkillSheetPdf from "../components/SkillSheetPdf";
import type { Project, User } from "../types/type";

import { generateUniqueId, loadUsers, saveUsers } from "../utils/localStorage";
import { exportUsersToZip } from "../utils/zipUtils";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | undefined>(undefined);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  useEffect(() => {
    if (id) {
      const users = loadUsers();
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        setUser(foundUser);
        setCompanyLogo(foundUser.company_logo);
      } else {
        navigate("/");
      }
    } else {
      setUser({
        id: "",
        name: "",
        affiliation: "",
        age: 0,
        gender: "",
        qualification: "",
        education: "",
        work_term: "",
        station: "",
        speciality: "",
        strong_skills: "",
        pr: "",
        projects: [],
      });
      setCompanyLogo(undefined);
    }
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      if (!prevUser) return null;
      return { ...prevUser, [name]: value };
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const userToSave = { ...user, company_logo: companyLogo };

    let updatedUsers: User[];
    const existingUsers = loadUsers();

    if (userToSave.id) {
      updatedUsers = existingUsers.map((u) =>
        u.id === userToSave.id ? userToSave : u
      );
    } else {
      const newUser = { ...userToSave, id: generateUniqueId() };
      updatedUsers = [...existingUsers, newUser];
    }
    saveUsers(updatedUsers);
    navigate("/");
  };

  const handleProjectSave = (project: Project) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedProjects = project.id
        ? prevUser.projects.map((p) => (p.id === project.id ? project : p))
        : [...prevUser.projects, { ...project, id: generateUniqueId() }];
      return { ...prevUser, projects: updatedProjects };
    });
    setCurrentProject(undefined);
  };

  const handleProjectDelete = (projectId: string) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedProjects = prevUser.projects.filter(
        (p) => p.id !== projectId
      );
      return { ...prevUser, projects: updatedProjects };
    });
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "スキルシート編集" : "新規スキルシート作成"}
      </h1>
      <form onSubmit={handleSave} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            名前:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="affiliation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            所属:
          </label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={user.affiliation}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            年齢:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            性別:
          </label>
          <select
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">選択してください</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="回答しない">回答しない</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="qualification"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            資格:
          </label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={user.qualification}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="education"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            最終学歴:
          </label>
          <input
            type="text"
            id="education"
            name="education"
            value={user.education}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="work_term"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            稼働 (現職年数等):
          </label>
          <input
            type="text"
            id="work_term"
            name="work_term"
            value={user.work_term}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="station"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            最寄り駅:
          </label>
          <input
            type="text"
            id="station"
            name="station"
            value={user.station}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="speciality"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            得意分野:
          </label>
          <input
            type="text"
            id="speciality"
            name="speciality"
            value={user.speciality}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="strong_skills"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            得意技術:
          </label>
          <input
            type="text"
            id="strong_skills"
            name="strong_skills"
            value={user.strong_skills}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pr"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            自己PR:
          </label>
          <textarea
            id="pr"
            name="pr"
            value={user.pr}
            onChange={handleChange}
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="company_logo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            会社ロゴ (Base64):
          </label>
          <input
            type="file"
            id="company_logo"
            name="company_logo"
            accept="image/*"
            onChange={handleLogoUpload}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {companyLogo && (
            <div className="mt-2">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="max-w-xs max-h-32"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            保存
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            キャンセル
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">プロジェクト経歴</h2>
      <button
        onClick={() => setCurrentProject(undefined)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        新しいプロジェクトを追加
      </button>

      {currentProject !== undefined && (
        <ProjectForm
          project={currentProject || undefined}
          onSave={handleProjectSave}
          onCancel={() => setCurrentProject(undefined)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {user.projects.map((proj) => (
          <div key={proj.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{proj.title}</h3>
            <p className="text-gray-600">期間: {proj.period}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setCurrentProject(proj)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                編集
              </button>
              <button
                onClick={() => handleProjectDelete(proj.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">プレビューと出力</h2>
      {user && (
        <div className="flex space-x-4 mb-4">
          <PDFDownloadLink
            document={<SkillSheetPdf user={user} companyLogo={companyLogo} />}
            fileName={`${user.name}_スキルシート.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                  PDFを生成中...
                </button>
              ) : (
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  PDFをダウンロード
                </button>
              )
            }
          </PDFDownloadLink>

          <button
            onClick={() => user && exportUsersToZip([user])}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            ZIPでダウンロード
          </button>
        </div>
      )}

      {user && (
        <div style={{ width: "100%", height: "800px" }}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <SkillSheetPdf user={user} companyLogo={companyLogo} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default EditPage;
