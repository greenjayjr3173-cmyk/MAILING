
import React, { useState } from 'react';
import { GeneratedMail } from '../types';

interface MailPreviewProps {
  mail: GeneratedMail;
}

const MailPreview: React.FC<MailPreviewProps> = ({ mail }) => {
  const [activeTab, setActiveTab] = useState<'jp' | 'ko'>('jp');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = activeTab === 'jp' 
      ? `件名: ${mail.subject_jp}\n\n${mail.body_jp}` 
      : `제목: ${mail.subject_ko}\n\n${mail.body_ko}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden flex flex-col h-full min-h-[500px]">
      <div className="bg-indigo-600 p-4 text-white">
        <h4 className="text-sm font-bold flex items-center">
          <i className="fas fa-lightbulb mr-2"></i>
          AI 도달률 극대화 포인트:
        </h4>
        <p className="text-xs mt-1 text-indigo-100 font-medium">
          {mail.strategy_tip}
        </p>
      </div>

      <div className="flex bg-slate-50 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('jp')}
          className={`flex-1 py-4 font-bold transition-all border-b-2 ${
            activeTab === 'jp' ? 'text-indigo-600 border-indigo-600 bg-white' : 'text-slate-500 border-transparent hover:text-indigo-400'
          }`}
        >
          <span className="mr-2">🇯🇵</span> Japanese (Actual)
        </button>
        <button
          onClick={() => setActiveTab('ko')}
          className={`flex-1 py-4 font-bold transition-all border-b-2 ${
            activeTab === 'ko' ? 'text-indigo-600 border-indigo-600 bg-white' : 'text-slate-500 border-transparent hover:text-indigo-400'
          }`}
        >
          <span className="mr-2">🇰🇷</span> Korean (Reference)
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Subject Line</label>
          <div className="text-lg font-bold text-slate-900 p-3 bg-slate-50 rounded-lg border border-slate-200">
            {activeTab === 'jp' ? mail.subject_jp : mail.subject_ko}
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Message Body</label>
          <div className="whitespace-pre-wrap text-slate-900 leading-relaxed font-medium p-4 bg-white rounded-lg border border-slate-100 min-h-[300px]">
            {activeTab === 'jp' ? mail.body_jp : mail.body_ko}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
        <div className="text-xs text-slate-500 font-bold italic">
          <i className="fas fa-info-circle mr-1 text-indigo-500"></i>
          {activeTab === 'jp' ? '복사 후 이메일 본문에 붙여넣으세요.' : '번역본은 참고용으로만 사용하세요.'}
        </div>
        <button
          onClick={copyToClipboard}
          className={`px-6 py-2 rounded-lg font-extrabold transition-all flex items-center shadow-md ${
            copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-black'
          }`}
        >
          {copied ? (
            <><i className="fas fa-check mr-2"></i> 복사 완료!</>
          ) : (
            <><i className="fas fa-copy mr-2"></i> 메일 내용 복사</>
          )}
        </button>
      </div>
    </div>
  );
};

export default MailPreview;
