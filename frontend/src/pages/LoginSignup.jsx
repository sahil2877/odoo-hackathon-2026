import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Account created! Logging you in...');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased overflow-hidden min-h-screen">
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Branded Illustration/Graphic */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-primary relative items-center justify-center p-margin overflow-hidden">
          {/* Atmospheric Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }}
          ></div>
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
            {/* Branding Anchor */}
            <div className="mb-stack-lg flex items-center gap-stack-sm">
              <span className="material-symbols-outlined text-on-primary text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                inventory_2
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">AssetFlow</h1>
            </div>
            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="3D isometric representation of an enterprise asset management dashboard" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDevVMDgu7JsucC3UAGj9hKINlcjoDBlcQmcc-AOTIpL98PdMJ-pxMnefJueB1eh97e5C7ltPy2pB9f0eAIBFFbGmFa8h3pTGXwCGGim7nRU_KZ4KMSfrHmcAB-LjkOxwESfLuIZZGhTkg_icLuEvzwn_FGd9ej-ZVYpsN1dY3uCEq52ocvfydW-gA9y25OInozxi4L6fZ3Vn7DwkYQDp1via4XQIBTffbd1vTstG8VxKaM9gZwOEfY__4yZS-tZGsvyEW9EYf55AA7"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-stack-lg text-left">
                <h2 className="font-headline-md text-headline-md text-on-primary mb-stack-xs">Enterprise Asset Control</h2>
                <p className="font-body-md text-on-primary/80 max-w-md">Precision management for industrial inventory, fleet logistics, and operational infrastructure across global clusters.</p>
              </div>
            </div>
            {/* Status Chips */}
            <div className="mt-stack-lg flex gap-stack-md flex-wrap justify-center">
              <div className="bg-white/10 backdrop-blur-md px-stack-md py-stack-xs rounded-full border border-white/20 flex items-center gap-stack-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="font-label-md text-label-md text-on-primary">Network Online</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-stack-md py-stack-xs rounded-full border border-white/20 flex items-center gap-stack-sm">
                <span className="material-symbols-outlined text-on-primary text-sm">verified_user</span>
                <span className="font-label-md text-label-md text-on-primary">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
          {/* Footer Quote Area */}
          <div className="absolute bottom-margin left-margin right-margin text-center">
            <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary/50">Trusted by 500+ Global Enterprises</p>
          </div>
        </section>

        {/* Right Side: Authentication Forms */}
        <section className="flex-1 bg-surface-container-lowest flex flex-col items-center justify-center p-gutter relative">
          {/* Mobile Brand Logo */}
          <div className="md:hidden absolute top-stack-lg left-stack-lg flex items-center gap-stack-sm">
            <span className="material-symbols-outlined text-primary text-[32px]">inventory_2</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">AssetFlow</span>
          </div>

          <div className="w-full max-w-[400px] space-y-stack-lg">
            {/* Auth Header */}
            <div className="space-y-stack-xs text-center">
              <h2 className="font-display text-display text-on-surface">
                {activeTab === 'login' ? 'Welcome back' : 'Join AssetFlow'}
              </h2>
              <p className="font-body-md text-on-surface-variant">
                {activeTab === 'login' 
                  ? 'Enter your credentials to access your organization.' 
                  : 'Start managing your organization\'s assets with precision.'}
              </p>
            </div>

            {/* Auth Toggle / Tab */}
            <div className="bg-surface-container p-stack-xs rounded-lg flex">
              <button 
                className={`flex-1 py-stack-sm rounded font-body-md font-bold transition-all cursor-pointer ${
                  activeTab === 'login' 
                    ? 'bg-surface-container-lowest text-primary shadow-sm' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-stack-sm rounded font-body-md font-bold transition-all cursor-pointer ${
                  activeTab === 'signup' 
                    ? 'bg-surface-container-lowest text-primary shadow-sm' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Sign up
              </button>
            </div>

            {/* Form Container */}
            <div className="relative min-h-[340px]">
              {/* Login Form */}
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-stack-md">
                  <div className="space-y-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="login-email">Work Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                      <input 
                        className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                        id="login-email" 
                        placeholder="name@company.com" 
                        required 
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-stack-xs">
                    <div className="flex justify-between items-center">
                      <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="login-password">Password</label>
                      <a className="font-label-md text-label-md text-primary hover:underline transition-all" href="#">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                      <input 
                        className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                        id="login-password" 
                        placeholder="••••••••" 
                        required 
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-stack-sm py-stack-xs">
                    <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox"/>
                    <label className="font-body-sm text-body-sm text-on-surface-variant select-none" htmlFor="remember">Remember this device for 30 days</label>
                  </div>
                  <button 
                    className="w-full bg-primary hover:bg-primary/90 text-on-primary py-stack-md rounded-lg font-body-md font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : 'Login to Dashboard'}
                  </button>
                </form>
              ) : (
                /* Signup Form */
                <form onSubmit={handleSignupSubmit} className="space-y-stack-md">
                  <div className="space-y-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="signup-name">Full Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                      <input 
                        className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                        id="signup-name" 
                        placeholder="John Doe" 
                        required 
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="signup-email">Work Email</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                      <input 
                        className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                        id="signup-email" 
                        placeholder="name@company.com" 
                        required 
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-stack-md">
                    <div className="space-y-stack-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="signup-password">Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                        <input 
                          className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                          id="signup-password" 
                          placeholder="••••••••" 
                          required 
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="space-y-stack-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirm-password">Confirm Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-stack-md top-1/2 -translate-y-1/2 text-outline text-[20px]">verified</span>
                        <input 
                          className="w-full pl-12 pr-stack-md py-stack-md bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface transition-all" 
                          id="confirm-password" 
                          placeholder="••••••••" 
                          required 
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-stack-sm bg-surface-container-low rounded border border-outline-variant/30">
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      New accounts are assigned the <strong className="text-on-surface">Employee</strong> role by default.
                    </p>
                  </div>
                  <button 
                    className="w-full bg-primary hover:bg-primary/90 text-on-primary py-stack-md rounded-lg font-body-md font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : 'Create Account'}
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-stack-lg border-t border-outline-variant flex flex-col gap-stack-sm items-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">Or continue with SSO</p>
              <div className="flex gap-stack-md w-full">
                <button className="flex-1 flex items-center justify-center gap-stack-sm py-stack-sm border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer">
                  <img alt="Google" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7yh9p3B4feFPqPL3EYWw6puSX6ee3oQMk5ILtVm0Hd_vi5iaFEO8HKBY4bvRALh67CF6uhYu0PGgaQPuFybisrOVV-TBoNsl7D3LfXlMkSnPcPXThhIIMR5uLHYfyaTZYD3wmsc7Wbsoqn0yF71W6WlBYmIgAmLFGah8lJJ_uqeGYMu-Gz8zm28KFQO_cxzT2tmnb19H8tpkOKxLqBaStsxyCuGezmgRWZ_6YeW7WCCMgEe-7IkGyXu1YQCAvqUizLe6lfOjhK_p"/>
                  <span className="font-body-sm font-medium text-on-surface-variant">Google</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-stack-sm py-stack-sm border border-outline-variant rounded-lg hover:bg-surface-container-low transition-all cursor-pointer">
                  <img alt="Microsoft" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuWe51VaErDD32KMrVhRUb8JuAhPUTnxi5A3eZfXDyXaUgUXHpfNvpWQjudKKuCTaVv5Mrb7aNxNu55Gm-TSDyUpDTamwwqVNxae8p0sL2z0qzONqHjpzZxulDNVZkpabFC4pwj0-B52X9rh8nkvMaroEGrI2Y2uE0-a_g6qwaPUq8Ebl_qdoYFZqKu5YVmfS4UnaXLvtUeQZIshD1KWuDuy8cgMVInESXVAwaSZBOdwOQTAmmv-5A00cood4PjqdntRJSQF3E-dNY"/>
                  <span className="font-body-sm font-medium text-on-surface-variant">Azure AD</span>
                </button>
              </div>
            </div>

            {/* Footer Text */}
            <div className="text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                By continuing, you agree to our <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Background Aesthetic */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>
      </main>
    </div>
  );
}
