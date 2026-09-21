import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Home,
  Calculator,
  Info,
  Mail,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sliders,
  Check,
  User,
  UserPlus,
  Lock,
  Globe,
  LogOut
} from 'lucide-react';
import { StudentRecord, ModelType, ActiveView, UserProfile } from '../types';
import { formatDisplayName, getFirstName } from '../utils/authStorage';

interface HeaderProps {
  students?: StudentRecord[];
  activeModel?: ModelType;
  activeView?: ActiveView;
  currentUser?: UserProfile | null;
  onOpenAccountModal?: () => void;
  onViewChange?: (view: ActiveView) => void;
  onModelChange?: (model: ModelType) => void;
  onLogout?: () => void;
  onOpenInsights?: () => void;
  onOpenBatchUpload?: () => void;
  onExportCsv?: () => void;
  onResetBenchmark?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModel = 'random_forest',
  activeView = 'home',
  currentUser = null,
  onOpenAccountModal,
  onViewChange,
  onModelChange,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [desktopAccountOpen, setDesktopAccountOpen] = useState(false);

  const displayName = currentUser ? formatDisplayName(currentUser.name, currentUser.email) : '';
  const firstName = currentUser ? getFirstName(currentUser.name, currentUser.email) : '';
  const avatarInitial = (firstName[0] || displayName[0] || currentUser?.name[0] || 'U').toUpperCase();

  const handleNavClick = (view: ActiveView) => {
    if (onViewChange) {
      onViewChange(view);
    }
    setMobileMenuOpen(false);
    setModelDropdownOpen(false);
    setDesktopAccountOpen(false);
  };

  const navItems: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: 'home', label: 'Home', icon: Home, desc: 'Overview & analytics dashboard' },
    { id: 'predict', label: 'Predict Score', icon: Calculator, desc: 'Interactive ML exam score predictor' },
    { id: 'about', label: 'About', icon: Info, desc: 'Methodology & dataset benchmarks' },
    { id: 'contact', label: 'Contact Us', icon: Mail, desc: 'Support, research & feedback' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 1. Left: Brand & Logo + Prediction Model Selector (Switched to Left) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              id="nav-logo"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-700 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">Insight</span>
                  <span className="text-lg font-bold text-teal-600 tracking-tight">Ed</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden xl:block">
                  Student Performance Predictor
                </p>
              </div>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            {/* Model Switcher Dropdown (Switched to Left side) */}
            {onModelChange && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  id="nav-model-selector"
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap"
                  title="Switch between Random Forest and Linear Regression"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                  <span className="hidden sm:inline text-slate-400 text-[11px]">Model:</span>
                  <span className="font-semibold text-slate-800">
                    {activeModel === 'random_forest' ? (
                      <>
                        <span className="hidden sm:inline">Random Forest</span>
                        <span className="sm:hidden">RF</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Linear Reg.</span>
                        <span className="sm:hidden">OLS</span>
                      </>
                    )}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {/* Dropdown Menu - Left-aligned */}
                {modelDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setModelDropdownOpen(false)}
                    />
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Select Prediction Model
                      </div>

                      {/* Random Forest Option */}
                      <button
                        type="button"
                        id="nav-select-rf"
                        onClick={() => {
                          onModelChange('random_forest');
                          setModelDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                          activeModel === 'random_forest'
                            ? 'bg-teal-50/80 text-teal-950 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`mt-0.5 p-1 rounded-lg ${activeModel === 'random_forest' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold">Random Forest (Primary)</span>
                            {activeModel === 'random_forest' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            R² 0.7973 • Depth=5 • 10 Trees
                          </p>
                        </div>
                      </button>

                      {/* Linear Regression Option */}
                      <button
                        type="button"
                        id="nav-select-lr"
                        onClick={() => {
                          onModelChange('linear_regression');
                          setModelDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 mt-1 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                          activeModel === 'linear_regression'
                            ? 'bg-slate-100 text-slate-950 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`mt-0.5 p-1 rounded-lg ${activeModel === 'linear_regression' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Sliders className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold">Linear Regression</span>
                            {activeModel === 'linear_regression' && <Check className="w-3.5 h-3.5 text-slate-700" />}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            R² 0.7702 • OLS Baseline
                          </p>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 2. Center: Desktop Navigation Bar (Desktop lg+) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-teal-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Desktop CTA Button & Mobile/Tablet Toggle Dropdown Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Desktop Only (lg+): Create Account / Profile Button */}
            {onOpenAccountModal && (
              <div className="hidden lg:flex items-center relative">
                {currentUser ? (
                  <>
                    <button
                      type="button"
                      id="nav-account-button"
                      onClick={() => setDesktopAccountOpen(!desktopAccountOpen)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-teal-200/90 bg-gradient-to-r from-teal-50 via-emerald-50/70 to-teal-50 text-teal-950 hover:bg-teal-100/80 shadow-xs hover:shadow-md transition-all duration-200 group shrink-0 whitespace-nowrap cursor-pointer"
                      title={`Account: ${displayName}. Click to view account menu.`}
                      aria-expanded={desktopAccountOpen}
                    >
                      <div className="w-6 h-6 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-[11px] shadow-xs shrink-0 ring-1 ring-teal-600/30">
                        {avatarInitial}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-teal-900 transition-colors max-w-[120px] truncate">
                          {firstName}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-2xs ${
                            currentUser.shareDataPublicly
                              ? 'bg-amber-100 text-amber-900 border border-amber-200/80'
                              : 'bg-teal-100 text-teal-900 border border-teal-200/80'
                          }`}
                        >
                          {currentUser.shareDataPublicly ? (
                            <>
                              <Globe className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                              <span>Public</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-2.5 h-2.5 text-teal-700 shrink-0" />
                              <span>Private</span>
                            </>
                          )}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-teal-700 transition-transform duration-200 shrink-0 ${
                            desktopAccountOpen ? 'rotate-180 text-teal-600' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Desktop Account Dropdown Menu */}
                    {desktopAccountOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setDesktopAccountOpen(false)}
                        />
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                          {/* User details header */}
                          <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-100 mb-1.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                                {avatarInitial}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-xs text-slate-900 truncate">
                                  {displayName}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate">
                                  {currentUser.email || 'User Profile'}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                              <span className="text-slate-500 font-medium">Privacy Status</span>
                              <span
                                className={`font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                  currentUser.shareDataPublicly
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-teal-100 text-teal-900'
                                }`}
                              >
                                {currentUser.shareDataPublicly ? (
                                  <>
                                    <Globe className="w-2.5 h-2.5 text-amber-700" />
                                    <span>Public Data</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-2.5 h-2.5 text-teal-700" />
                                    <span>Private Data</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Action Items */}
                          <div className="space-y-1">
                            <button
                              type="button"
                              id="desktop-menu-profile-btn"
                              onClick={() => {
                                setDesktopAccountOpen(false);
                                onOpenAccountModal();
                              }}
                              className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                            >
                              <User className="w-4 h-4 text-teal-600" />
                              <span>Manage Profile & Settings</span>
                            </button>

                            {onLogout && (
                              <button
                                type="button"
                                id="desktop-menu-logout-btn"
                                onClick={() => {
                                  setDesktopAccountOpen(false);
                                  onLogout();
                                }}
                                className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <LogOut className="w-4 h-4 text-rose-500" />
                                <span>Sign Out</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    id="nav-account-button"
                    onClick={onOpenAccountModal}
                    className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:via-emerald-700 hover:to-teal-800 shadow-md shadow-teal-600/30 hover:shadow-lg hover:shadow-teal-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-teal-400/40 cursor-pointer shrink-0 whitespace-nowrap"
                    title="Create an account or sign in to configure data privacy"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-300 transition-transform duration-700 ease-out pointer-events-none" />
                    <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <UserPlus className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="tracking-wide">Create Account</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse hidden sm:inline" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile & Tablet Trigger: Shows Account Logo + Dropdown Symbol when signed in; Toggle Symbol when not */}
            {currentUser ? (
              <button
                type="button"
                id="mobile-tablet-account-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-teal-200/90 bg-gradient-to-r from-teal-50/90 via-emerald-50/70 to-teal-50/90 hover:bg-teal-100/70 text-slate-800 transition-all shadow-2xs group cursor-pointer"
                aria-label="Toggle account navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {/* Account Logo */}
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 ring-2 ring-teal-200/90">
                  {avatarInitial}
                </div>
                {/* Account Name */}
                <span className="font-bold text-xs text-slate-900 max-w-[85px] sm:max-w-[120px] truncate">
                  {firstName}
                </span>
                {/* Dropdown Symbol */}
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 group-hover:text-teal-700 transition-transform duration-200 shrink-0 ${
                    mobileMenuOpen ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </button>
            ) : (
              <button
                type="button"
                id="mobile-tablet-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-700 shrink-0" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700 shrink-0" />
                )}
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">Menu</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Toggle Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3.5 border-t border-slate-100 animate-in slide-in-from-top-2 duration-150 space-y-3">
            {/* 1. Inside Dropdown: The Eye-Catching Create Account / Profile CTA */}
            {onOpenAccountModal && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1.5">
                  Account & Privacy
                </div>
                {currentUser ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      id="drawer-account-button"
                      onClick={() => {
                        onOpenAccountModal();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-teal-200/90 bg-gradient-to-r from-teal-50 via-emerald-50/60 to-teal-50 hover:bg-teal-100/70 transition-all text-left shadow-2xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                          {avatarInitial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 group-hover:text-teal-950 truncate">
                              {displayName}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0 ${
                                currentUser.shareDataPublicly
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200/80'
                                  : 'bg-teal-100 text-teal-900 border border-teal-200/80'
                              }`}
                            >
                              {currentUser.shareDataPublicly ? (
                                <>
                                  <Globe className="w-2.5 h-2.5 text-amber-700" />
                                  <span>Public Data</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-2.5 h-2.5 text-teal-700" />
                                  <span>Private Data</span>
                                </>
                              )}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                            {currentUser.email || 'Manage profile & privacy settings'}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {onLogout && (
                      <button
                        type="button"
                        id="drawer-logout-button"
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100/80 transition-colors border border-rose-200/60 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    id="drawer-account-button"
                    onClick={() => {
                      onOpenAccountModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full relative group overflow-hidden flex items-center justify-between p-3 rounded-2xl text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md shadow-teal-600/25 transition-all text-left border border-teal-400/40"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-300 transition-transform duration-700 ease-out pointer-events-none" />
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-white">Create Account</span>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
                        </div>
                        <p className="text-[11px] text-teal-100 font-normal">
                          Sign up or sign in to configure data privacy
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-teal-100 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                )}
              </div>
            )}

            <div className="h-px bg-slate-100 my-1" />

            {/* 2. Navigation Pages */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1.5">
                Navigation
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-link-${item.id}`}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-teal-50 text-teal-950 font-bold border border-teal-200/80'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold">{item.label}</div>
                          <p className="text-[10px] text-slate-500 font-normal">{item.desc}</p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 3. Model Information Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Active Model:</span>
                <span className="font-semibold text-slate-800">
                  {activeModel === 'random_forest' ? 'Random Forest (R² 0.812)' : 'Linear Regression (R² 0.770)'}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
