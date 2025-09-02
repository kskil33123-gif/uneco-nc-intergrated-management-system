
import React, { useState } from 'react';
import { auth } from '../firebase/config';
// FIX: Removed modular imports as they are not available in v8/compat mode.
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword 
// } from 'firebase/auth';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (authAction: 'signIn' | 'signUp') => {
    setIsLoading(true);
    setError(null);
    try {
      if (authAction === 'signIn') {
        // FIX: Switched to v8/compat syntax for signing in.
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        // FIX: Switched to v8/compat syntax for creating a user.
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-white">로그인</h1>
            <p className="text-slate-400 mt-2">시스템에 접근하려면 로그인하세요.</p>
        </div>
        
        {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-sm">{error}</p>}

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-slate-300 block mb-2">이메일 주소</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-bold text-slate-300 block mb-2">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleAuth('signIn')}
              disabled={isLoading}
              className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
            <button
              onClick={() => handleAuth('signUp')}
              disabled={isLoading}
              className="w-full px-4 py-3 font-bold text-indigo-300 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
