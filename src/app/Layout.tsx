import React, { FC } from "react";
import "../styles/globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-xl font-bold">Orbit</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto min-w-3xl p-4">{children}</main>

      {/* フッター */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-4xl mx-auto p-4 text-sm text-gray-500">
          © 2025 Mid Point
        </div>
      </footer>
    </div>
  );
};

export default Layout;
