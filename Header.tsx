
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-slate-900 py-6 px-4 shadow-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            <i className="fas fa-paper-plane mr-3 text-indigo-600"></i>
            Japan Biz <span className="text-indigo-600">Cold Mailer</span>
          </h1>
          <p className="mt-1 text-slate-600 text-sm md:text-base font-medium">
            의류 ODM 해외영업을 위한 일본 비즈니스 콜드메일 전문가 시스템
          </p>
        </div>
        <div className="hidden md:block">
          <span className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 text-xs font-bold text-indigo-700">
            High-Conversion Strategy v1.2
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
