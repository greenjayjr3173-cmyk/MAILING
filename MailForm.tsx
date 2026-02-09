
import React, { useState } from 'react';
import { CompanyInfo } from '../types';

interface MailFormProps {
  onSubmit: (info: CompanyInfo) => void;
  isLoading: boolean;
}

const MailForm: React.FC<MailFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CompanyInfo>({
    myCompanyName: 'CODE AGENCY',
    senderName: 'YOUNGHOON CHO',
    productCategory: '여성의류 전반(단, 니트류 제외)',
    keyStrengths: [],
    targetCompanyName: '',
    targetPersonName: '',
    targetCompanyFeatures: '',
    specialRequest: '',
    email: 'hcodeagency@gmail.com',
    linkedin: 'https://www.linkedin.com/company/codeagency-co-ltd/',
    phone: '+82)010-4679-9119',
    mailStrategy: 'trust'
  });

  const [strengthInput, setStrengthInput] = useState('');

  const handleAddStrength = () => {
    if (strengthInput.trim() && !formData.keyStrengths.includes(strengthInput.trim())) {
      setFormData({
        ...formData,
        keyStrengths: [...formData.keyStrengths, strengthInput.trim()]
      });
      setStrengthInput('');
    }
  };

  const removeStrength = (index: number) => {
    setFormData({
      ...formData,
      keyStrengths: formData.keyStrengths.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sender Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3">발신자 정보 (당사)</h3>
            <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">고정 정보</span>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">우리 회사명</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-400 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.myCompanyName}
              onChange={(e) => setFormData({ ...formData, myCompanyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">발신자 성함</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-400 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">주력 품목</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-400 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.productCategory}
              onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
            />
          </div>
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="flex items-center text-xs text-slate-900 font-semibold">
              <i className="fas fa-envelope w-5 text-indigo-600"></i>
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center text-xs text-slate-900 font-semibold">
              <i className="fab fa-linkedin w-5 text-indigo-600"></i>
              <span className="truncate">{formData.linkedin}</span>
            </div>
            <div className="flex items-center text-xs text-slate-900 font-semibold">
              <i className="fas fa-phone w-5 text-indigo-600"></i>
              <span>{formData.phone}</span>
            </div>
          </div>
        </div>

        {/* Target Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-l-4 border-emerald-600 pl-3">수신자 정보 (바이어)</h3>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">상대 회사명</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="예: BEAMS, United Arrows"
              value={formData.targetCompanyName}
              onChange={(e) => setFormData({ ...formData, targetCompanyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">담당자 성함 (모를 시 공란)</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="예: 사토 다이스케님"
              value={formData.targetPersonName}
              onChange={(e) => setFormData({ ...formData, targetPersonName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">도달률 극대화 전략 선택</label>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50"
              value={formData.mailStrategy}
              onChange={(e) => setFormData({ ...formData, mailStrategy: e.target.value as any })}
            >
              <option value="trust">신뢰도 우선 (LinkedIn & 업력 강조)</option>
              <option value="quality">품질/디테일 우선 (고감도 소재 & 퀄리티)</option>
              <option value="speed">트렌드/납기 우선 (빠른 시장 대응 & 소량생산)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">상대 기업 특징</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-20 text-sm"
              placeholder="예: 20대 타겟의 스트릿 무드 브랜드"
              value={formData.targetCompanyFeatures}
              onChange={(e) => setFormData({ ...formData, targetCompanyFeatures: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-900">핵심 경쟁력 (클릭하여 추가)</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-slate-400 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="예: 최소수량(MOQ) 50장 대응 가능"
            value={strengthInput}
            onChange={(e) => setStrengthInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStrength())}
          />
          <button
            type="button"
            onClick={handleAddStrength}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors font-bold"
          >
            추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.keyStrengths.map((s, i) => (
            <span key={i} className="bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-sm font-bold border border-slate-300 flex items-center">
              {s}
              <button type="button" onClick={() => removeStrength(i)} className="ml-2 text-slate-400 hover:text-red-500">
                <i className="fas fa-times-circle"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-extrabold text-white shadow-xl transition-all transform active:scale-95 ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <i className="fas fa-circle-notch fa-spin mr-2"></i>
            전략 분석 및 메일 작성 중...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <i className="fas fa-rocket mr-2"></i>
            도달률 극대화 메일 생성하기
          </span>
        )}
      </button>
    </form>
  );
};

export default MailForm;
