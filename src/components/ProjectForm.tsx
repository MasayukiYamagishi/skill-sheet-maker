import React, { useEffect, useState } from "react";
import {
  FaAndroid,
  FaApple,
  FaJava,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSwift,
} from "react-icons/fa";
import {
  SiAndroidstudio,
  SiFirebase,
  SiGraphql,
  SiNpm,
  SiPostgresql,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiXcode,
  SiYarn,
} from "react-icons/si";
import type { Language, Project } from "../types/type";
import { generateUniqueId } from "../utils/localStorage";

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [currentProject, setCurrentProject] = useState<Project>(
    project || {
      id: "",
      period: "",
      title: "",
      team_size: 0,
      server: "",
      os: "",
      db: "",
      network: "",
      package: "",
      tools: "",
      languages: [],
      phases: [],
      role: "",
      scale: "",
      details: "",
    }
  );

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: name === "team_size" ? Number(value) : value,
    }));
  };

  const handleLanguageChange = (
    index: number,
    field: keyof Language,
    value: string
  ) => {
    const newLanguages = [...currentProject.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setCurrentProject((prev) => ({ ...prev, languages: newLanguages }));
  };

  const addLanguage = () => {
    setCurrentProject((prev) => ({
      ...prev,
      languages: [...prev.languages, { name: "", version: "" }],
    }));
  };

  const removeLanguage = (index: number) => {
    setCurrentProject((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setCurrentProject((prev) => ({ ...prev, phases: options }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...currentProject, id: currentProject.id || generateUniqueId() });
  };

  const getIconForTech = (techName: string) => {
    switch (techName.toLowerCase()) {
      case "react":
        return <FaReact className="inline-block mr-1" />;
      case "nodejs":
        return <FaNodeJs className="inline-block mr-1" />;
      case "javascript":
        return <FaJs className="inline-block mr-1" />;
      case "typescript":
        return <SiTypescript className="inline-block mr-1" />;
      case "tailwindcss":
        return <SiTailwindcss className="inline-block mr-1" />;
      case "postgresql":
        return <SiPostgresql className="inline-block mr-1" />;
      case "sqlite":
        return <SiSqlite className="inline-block mr-1" />;
      case "firebase":
        return <SiFirebase className="inline-block mr-1" />;
      case "graphql":
        return <SiGraphql className="inline-block mr-1" />;
      case "npm":
        return <SiNpm className="inline-block mr-1" />;
      case "yarn":
        return <SiYarn className="inline-block mr-1" />;
      case "xcode":
        return <SiXcode className="inline-block mr-1" />;
      case "android studio":
        return <SiAndroidstudio className="inline-block mr-1" />;
      case "vercel":
        return <SiVercel className="inline-block mr-1" />;
      case "python":
        return <FaPython className="inline-block mr-1" />;
      case "java":
        return <FaJava className="inline-block mr-1" />;
      case "swift":
        return <FaSwift className="inline-block mr-1" />;
      case "android":
        return <FaAndroid className="inline-block mr-1" />;
      case "ios":
        return <FaApple className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">プロジェクト経歴</h2>
      <div className="mb-4">
        <label
          htmlFor="period"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          期間:
        </label>
        <input
          type="text"
          id="period"
          name="period"
          value={currentProject.period}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          プロジェクト名/案件名:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={currentProject.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="team_size"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          チーム規模:
        </label>
        <input
          type="number"
          id="team_size"
          name="team_size"
          value={currentProject.team_size}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="server"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          サーバー:
        </label>
        <input
          type="text"
          id="server"
          name="server"
          value={currentProject.server}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="os"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          OS:
        </label>
        <input
          type="text"
          id="os"
          name="os"
          value={currentProject.os}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="db"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          DB:
        </label>
        <input
          type="text"
          id="db"
          name="db"
          value={currentProject.db}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="network"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          ネットワーク:
        </label>
        <input
          type="text"
          id="network"
          name="network"
          value={currentProject.network}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="package"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          パッケージ:
        </label>
        <input
          type="text"
          id="package"
          name="package"
          value={currentProject.package}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="tools"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          ツール:
        </label>
        <input
          type="text"
          id="tools"
          name="tools"
          value={currentProject.tools}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          使用言語:
        </label>
        {currentProject.languages.map((lang, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            {getIconForTech(lang.name)}
            <input
              type="text"
              placeholder="言語名"
              value={lang.name}
              onChange={(e) =>
                handleLanguageChange(index, "name", e.target.value)
              }
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              placeholder="バージョン"
              value={lang.version}
              onChange={(e) =>
                handleLanguageChange(index, "version", e.target.value)
              }
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLanguage}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          言語を追加
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="phases"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          担当工程 (複数選択可):
        </label>
        <select
          id="phases"
          name="phases"
          multiple
          value={currentProject.phases}
          onChange={handlePhaseChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        >
          <option value="要件定義">要件定義</option>
          <option value="基本設計">基本設計</option>
          <option value="詳細設計">詳細設計</option>
          <option value="実装">実装</option>
          <option value="テスト">テスト</option>
          <option value="運用・保守">運用・保守</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          役割:
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={currentProject.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="scale"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          規模:
        </label>
        <input
          type="text"
          id="scale"
          name="scale"
          value={currentProject.scale}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="details"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          業務内容、成果物などの詳細:
        </label>
        <textarea
          id="details"
          name="details"
          value={currentProject.details}
          onChange={handleChange}
          rows={5}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
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
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
