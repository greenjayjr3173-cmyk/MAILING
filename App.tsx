
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MailForm from './components/MailForm';
import MailPreview from './components/MailPreview';
import { CompanyInfo, GeneratedMail } from './types';
import { generateColdMail } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMail, setGeneratedMail] = useState<GeneratedMail | null>(null);
  const [error, setError] = useState<{ message: string; isAuth: boolean } | null>(null);
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
      setIsKeyMissing(true);
    }
  }, []);

  const handleGenerate = async (info: CompanyInfo) => {
    setIsLoading(true);
    setError(null);
    setGeneratedMail(null);
    
    try {
      const result = await generateColdMail(info);
      setGeneratedMail(result);
    } catch (err: any) {
      console.error("Mail Generation Failed:", err);
      if (err.message === "API_KEY_MISSING") {
        setIsKeyMissing(true);
      } else {
        setError({
          message: `오류: ${err.message?.substring(0, 100) || '연결에 실패했습니다.'}`,
          isAuth: false
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isKeyMissing) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 py-12 text-slate-900">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-t-8 border-indigo-600">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-cloud-upload-alt text-indigo-600 text-3xl"></i>
              </div>
              <h2 className="text-3xl font-black tracking-tight">GitHub으로 배포해야 해결됩니다</h2>
              <p className="text-slate-600 mt-3 font-medium text-lg">단순 파일 업로드로는 환경 변수가 작동하지 않습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-black text-xl flex items-center text-indigo-600">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  GitHub 저장소 생성
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-10">
                  GitHub에서 <strong>New Repository</strong>를 만들고, 현재 앱의 모든 파일(특히 <code className="bg-slate-100 px-1 rounded text-pink-600 font-bold">package.json</code> 필수)을 업로드하세요.
                </p>

                <h3 className="font-black text-xl flex items-center text-indigo-600">
                  <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Vercel 저장소 연결
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-10">
                  Vercel 대시보드 -> <strong>Add New</strong> -> <strong>Project</strong>에서 방금 만든 GitHub 저장소를 선택(Import)하세요.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <i className="fas fa-key mr-2 text-amber-500"></i>
                  배포 전 환경 변수 입력
                </h3>
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Vercel 배포 화면 하단의 <strong>Environment Variables</strong> 섹션에 아래와 같이 입력해야 합니다.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>KEY</span>
                      <span>VALUE</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                      <code className="text-indigo-600 font-black">API_KEY</code>
                      <code className="text-slate-400">AI-키-값-입력</code>
                    </div>
                  </div>
                  <p className="text-[11px] text-red-500 font-bold">
                    * 위 과정을 거쳐야만 코드가 '빌드'되면서 키가 주입됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <button 
                onClick={() => window.open('https://github.com/new', '_blank')}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-95 inline-flex items-center"
              >
                <i className="fab fa-github mr-3 text-xl"></i>
                GitHub 저장소 만들러 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <MailForm onSubmit={handleGenerate} isLoading={isLoading} />
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start text-red-900 font-bold text-sm">
                <i className="fas fa-exclamation-circle mt-1 mr-3"></i>
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-8">
            {generatedMail ? (
              <MailPreview mail={generatedMail} />
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-12 text-slate-400 min-h-[600px] shadow-inner">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  {isLoading ? <i className="fas fa-spinner fa-spin text-3xl text-indigo-500"></i> : <i className="fas fa-envelope-open text-3xl text-slate-300"></i>}
                </div>
                <h3 className="text-lg font-bold text-slate-600">{isLoading ? '전략 분석 중...' : '생성된 메일이 여기에 표시됩니다'}</h3>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-slate-400 text-sm font-bold border-t border-slate-200 bg-white">
        © 2024 Japan Biz Cold Mailer - Enterprise Edition
      </footer>
    </div>
  );
};

export default App;
