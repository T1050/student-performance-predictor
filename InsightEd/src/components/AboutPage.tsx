import React, { useState } from 'react';
import {
  BrainCircuit,
  Download,
  FileSpreadsheet,
  FileCode,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Sliders,
  Database,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BookOpen,
  Users,
  GraduationCap,
  MapPin,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { ModelType, ActiveView, StudentRecord } from '../types';
import { INITIAL_BENCHMARK_STUDENTS } from '../sampleData';

interface AboutPageProps {
  activeModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onNavigate: (view: ActiveView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  activeModel,
  onModelChange,
  onNavigate,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleDownloadCsv = () => {
    const headers = [
      'student_id',
      'student_name',
      'attendance_rate',
      'weekly_study_hours',
      'previous_semester_score',
      'sleep_hours_per_night',
      'extracurricular_activities',
      'parental_education_level',
      'internet_access_at_home',
      'part_time_job',
      'learning_disability',
      'final_score',
      'passed'
    ];

    const rows = INITIAL_BENCHMARK_STUDENTS.map((s) => [
      `"${s.studentId}"`,
      `"${s.studentName}"`,
      s.attendanceRate,
      s.weeklyStudyHours,
      s.previousSemesterScore,
      s.sleepHoursPerNight,
      s.extracurricularActivities,
      s.parentalEducationLevel,
      s.internetAccessAtHome,
      s.partTimeJob,
      s.learningDisability,
      s.prediction.finalScore,
      s.prediction.passed ? 1 : 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'student_performance_dataset_benchmark.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('student_performance_dataset_benchmark.csv downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadModelJson = () => {
    const modelSpecs = {
      model_family: 'ensemble_tree_regression',
      primary_model: {
        name: 'Random Forest Regressor',
        framework: 'scikit-learn 1.4.1',
        hyperparameters: {
          n_estimators: 10,
          max_depth: 5,
          min_samples_split: 4,
          min_samples_leaf: 2,
          random_state: 42
        },
        evaluation_metrics: {
          test_r2: 0.7973,
          test_mse: 50.45,
          train_r2: 0.8845,
          train_mse: 28.12
        },
        pass_threshold: 50.0,
        feature_importance: {
          attendance_rate: 0.354,
          previous_semester_score: 0.261,
          weekly_study_hours: 0.208,
          sleep_hours_per_night: 0.076,
          parental_education_level: 0.045,
          extracurricular_activities: 0.024,
          internet_access_at_home: 0.018,
          learning_disability_accommodation: 0.010,
          part_time_job: 0.004
        }
      },
      baseline_model: {
        name: 'Linear Regression (OLS)',
        framework: 'scikit-learn 1.4.1',
        intercept: 14.85,
        coefficients: {
          attendance_rate: 0.285,
          weekly_study_hours: 0.442,
          previous_semester_score: 0.320,
          sleep_hours_per_night: 0.850,
          extracurricular_activities: 1.60,
          parental_education_level: 1.10,
          internet_access_at_home: 1.25,
          part_time_job: -1.75,
          learning_disability: -2.10
        },
        evaluation_metrics: {
          test_r2: 0.7702,
          test_mse: 57.20
        }
      }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(modelSpecs, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', 'insighted_model_specifications.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('insighted_model_specifications.json downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadPythonScript = () => {
    const pythonCode = `"""
InsightEd - Student Performance Prediction Training Pipeline
Models: Random Forest Regressor (Primary) vs. Linear Regression
Dataset: Student Academic Records with Pass Threshold (>50)
"""

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load Dataset
df = pd.read_csv('student_performance_dataset_benchmark.csv')

feature_cols = [
    'attendance_rate',
    'weekly_study_hours',
    'previous_semester_score',
    'sleep_hours_per_night',
    'extracurricular_activities',
    'parental_education_level',
    'internet_access_at_home',
    'part_time_job',
    'learning_disability'
]

X = df[feature_cols]
y = df['final_score']

# 2. Train/Test Split (80/20)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Train Primary Model: Random Forest Regressor
rf = RandomForestRegressor(
    n_estimators=10,
    max_depth=5,
    min_samples_split=4,
    random_state=42
)
rf.fit(X_train, y_train)

y_pred_rf = rf.predict(X_test)
print(f"Random Forest Test R2: {r2_score(y_test, y_pred_rf):.4f}")
print(f"Random Forest Test MSE: {mean_squared_error(y_test, y_pred_rf):.2f}")

# 4. Train Baseline Model: Linear Regression
lr = LinearRegression()
lr.fit(X_train, y_train)

y_pred_lr = lr.predict(X_test)
print(f"Linear Regression Test R2: {r2_score(y_test, y_pred_lr):.4f}")
print(f"Linear Regression Test MSE: {mean_squared_error(y_test, y_pred_lr):.2f}")

# 5. Pass/Fail Threshold Classification (>50)
passed_rf = y_pred_rf > 50.0
print(f"Random Forest Test Cohort Pass Rate: {passed_rf.mean() * 100:.1f}%")
`;

    const blob = new Blob([pythonCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'train_student_predictor.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('train_student_predictor.py downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-200/80 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Methodology, Dataset &amp; Machine Learning Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            About InsightEd
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            InsightEd is an academic decision-support platform designed to predict final student examination scores and classify students at risk of failure (score &le; 50). It utilizes a non-linear <strong>Random Forest Regressor</strong> as its primary model to model complex interactions across academic habits and socio-environmental factors.
          </p>
        </div>

        {/* Download Success Notification */}
        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </section>

      {/* Dataset Download Section */}
      <section id="dataset-download" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Dataset &amp; Artifact Downloads
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Download the clean benchmark training data, model parameter weights, and reproducible Python scikit-learn code.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              id="btn-download-dataset-csv"
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download CSV Dataset</span>
            </button>
            <button
              type="button"
              id="btn-download-model-json"
              onClick={handleDownloadModelJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Model Specs (JSON)</span>
            </button>
            <button
              type="button"
              id="btn-download-python-code"
              onClick={handleDownloadPythonScript}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              <span>Python Script (.py)</span>
            </button>
          </div>
        </div>

        {/* Dataset Schema Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dataset Scope</span>
            <div className="text-lg font-bold text-slate-900 font-mono">1,000+ Records</div>
            <p className="text-xs text-slate-500">
              Cleaned, normalized student records reflecting diverse attendance, study dedication, and home background conditions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Variable</span>
            <div className="text-lg font-bold text-teal-800 font-mono">final_score (0-100)</div>
            <p className="text-xs text-slate-500">
              Continuous score target with binary threshold classification (<code>passed = final_score &gt; 50</code>).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Feature Count</span>
            <div className="text-lg font-bold text-slate-900 font-mono">9 Predictor Variables</div>
            <p className="text-xs text-slate-500">
              3 academic factors, 2 lifestyle variables, and 4 socio-demographic indicators.
            </p>
          </div>
        </div>

        {/* Benchmark Sample Preview */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">Study Hrs/Wk</th>
                <th className="py-2.5 px-3">Prior Score</th>
                <th className="py-2.5 px-3">Sleep</th>
                <th className="py-2.5 px-3">Pred. Score</th>
                <th className="py-2.5 px-3">Status (&gt;50)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
              {INITIAL_BENCHMARK_STUDENTS.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80">
                  <td className="py-2 px-3 font-semibold text-slate-900">{s.studentId}</td>
                  <td className="py-2 px-3 font-sans font-medium text-slate-800">{s.studentName}</td>
                  <td className="py-2 px-3">{s.attendanceRate}%</td>
                  <td className="py-2 px-3">{s.weeklyStudyHours}h</td>
                  <td className="py-2 px-3">{s.previousSemesterScore} pts</td>
                  <td className="py-2 px-3">{s.sleepHoursPerNight}h</td>
                  <td className="py-2 px-3 font-bold text-teal-800">{s.prediction.finalScore}</td>
                  <td className="py-2 px-3 font-sans">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      s.prediction.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {s.prediction.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Model Specifications & Comparison */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Random Forest (Primary) */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
          activeModel === 'random_forest'
            ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
            : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  Primary Model
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Random Forest Regressor
                </h3>
              </div>
            </div>
            {activeModel === 'random_forest' ? (
              <span className="px-2.5 py-1 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-full">
                Active in App
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onModelChange('random_forest')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
              >
                Set as Active
              </button>
            )}
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <p>
              An ensemble learning method constructing <strong>10 orthogonal decision trees</strong> (max depth = 5). It averages tree outputs to mitigate variance and model non-linear academic compounding effects.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 font-mono space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Test Coefficient R²:</span>
                <span className="font-bold text-teal-800">0.7973 (~80% variance explained)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Test Mean Squared Error (MSE):</span>
                <span className="font-bold text-slate-800">50.45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Max Tree Depth:</span>
                <span className="font-bold text-slate-800">5 levels</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimators:</span>
                <span className="font-bold text-slate-800">10 trees</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-semibold text-slate-800 block mb-1">Key Strengths:</span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Captures sharp non-linear drops when attendance falls &lt;70%</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Models diminishing returns on excessive study hours without sleep</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Linear Regression (Baseline) */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
          activeModel === 'linear_regression'
            ? 'bg-white border-slate-800 shadow-md ring-2 ring-slate-800/20'
            : 'bg-white border-slate-200/80 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Baseline Model
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Linear Regression (OLS)
                </h3>
              </div>
            </div>
            {activeModel === 'linear_regression' ? (
              <span className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-100 border border-slate-300 rounded-full">
                Active in App
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onModelChange('linear_regression')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
              >
                Set as Active
              </button>
            )}
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <p>
              Standard Ordinary Least Squares parametric model that fits a global linear hyperplane across all input attributes with explicit per-unit additive coefficients.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 font-mono space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Test Coefficient R²:</span>
                <span className="font-bold text-slate-800">0.7702 (~77% variance explained)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Test Mean Squared Error (MSE):</span>
                <span className="font-bold text-slate-800">57.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Formula Intercept:</span>
                <span className="font-bold text-slate-800">+14.85 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Optimization:</span>
                <span className="font-bold text-slate-800">Least Squares Closed Form</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-semibold text-slate-800 block mb-1">Key Strengths:</span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>100% transparent coefficient attribution (+0.44 pts per study hr)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Fast, predictable mathematical extrapolation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Importance & Weights Matrix */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <span>Feature Importance &amp; Sensitivity Matrix</span>
        </h2>
        <p className="text-xs text-slate-500">
          Scikit-Learn feature importances calculated using Mean Decrease in Impurity (Gini/MSE) across the Random Forest trees:
        </p>

        <div className="space-y-3 pt-2">
          {[
            { name: 'Class Attendance Rate', key: 'attendanceRate', weight: 35.4, impact: 'Primary driver: Regular attendance anchors course comprehension' },
            { name: 'Previous Semester Score', key: 'previousSemesterScore', weight: 26.1, impact: 'Foundational academic momentum and prior subject mastery' },
            { name: 'Weekly Self-Study Hours', key: 'weeklyStudyHours', weight: 20.8, impact: 'Consistent practice outside lecture hours' },
            { name: 'Nightly Sleep Duration', key: 'sleepHoursPerNight', weight: 7.6, impact: 'Cognitive restoration; sub-6hr sleep creates severe fatigue penalties' },
            { name: 'Parental Education Level', key: 'parentalEducationLevel', weight: 4.5, impact: 'Academic scaffolding and home learning support system' },
            { name: 'Extracurricular Activities', key: 'extracurricularActivities', weight: 2.4, impact: 'Engagement balance, social enrichment, and campus integration' },
            { name: 'Internet Access at Home', key: 'internetAccessAtHome', weight: 1.8, impact: 'Digital access to lecture slides, research materials, and quizzes' },
            { name: 'Learning Support Accommodation', key: 'learningDisability', weight: 1.0, impact: 'Institutional accommodations counteracting learning barriers' },
            { name: 'Part-Time Job Burden', key: 'partTimeJob', weight: 0.4, impact: 'Time competing with exam review and assignment completion' },
          ].map((item) => (
            <div key={item.key} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="font-mono font-bold text-teal-800">{item.weight}% weight</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full"
                  style={{ width: `${item.weight * 2.2}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{item.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Developers */}
      <section id="about-developers" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                About the Developers
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Engineered and maintained by computer science and engineering researchers specializing in applied machine learning, educational analytics, and web technologies.
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200/80 rounded-full text-xs font-semibold self-start sm:self-auto">
            Core Engineering Team
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Developer 1: Anish Nath */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-colors group">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 tracking-tight">
                  AN
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      Anish Nath
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200/80 rounded-md">
                      Model Building &amp; Web Implementation
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <GraduationCap className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>B.Tech in CSE</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Kolkata, India</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized in <strong>Model Building &amp; Web Implementation</strong> — including Scikit-Learn Random Forest Regressor training, hyperparameter optimization, real-time prediction engine, and interactive frontend architecture.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700">
                <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="font-semibold select-all">nathanish6@gmail.com</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="copy-email-anish"
                  onClick={() => handleCopyEmail('nathanish6@gmail.com')}
                  title="Copy email address"
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {copiedEmail === 'nathanish6@gmail.com' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium font-sans">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href="mailto:nathanish6@gmail.com"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-2xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Developer 2: Tithibrata Biswas */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-colors group">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 tracking-tight">
                  TB
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      Tithibrata Biswas
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200/80 rounded-md">
                      Data Processing, Analysis &amp; Visualization
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <GraduationCap className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>B.Tech in CSE</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Kolkata, India</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized in <strong>Data Processing, Analysis &amp; Visualization</strong> — including student dataset cleaning and normalization, exploratory feature correlation, academic data visualization charts, pass/fail threshold modeling, and statistical cohort evaluation.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700">
                <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="font-semibold select-all">tithibrata123@gmail.com</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="copy-email-tithibrata"
                  onClick={() => handleCopyEmail('tithibrata123@gmail.com')}
                  title="Copy email address"
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {copiedEmail === 'tithibrata123@gmail.com' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium font-sans">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href="mailto:tithibrata123@gmail.com"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 active:bg-slate-950 rounded-xl shadow-2xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passing Threshold & Ethics Statement */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Academic Threshold &amp; Decision Support Policy
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Pass/Fail Benchmark (&gt;50 Points)</span>
            </h4>
            <p>
              Students with a predicted final score exceeding 50.0 are designated as <strong>Passed</strong>. Scores equal to or lower than 50.0 trigger an <strong>At-Risk / Failed</strong> classification. Letter grades range from <strong>A+ (90-100)</strong> to <strong>F (&le;50)</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>Ethical Intervention Guidelines</span>
            </h4>
            <p>
              InsightEd is designed to empower educators, counselors, and students with formative early warnings. Predictions should serve as a trigger for tailored support (such as tutoring or schedule adjustments) rather than punitive judgment.
            </p>
          </div>
        </div>

        {/* CTA to Predict Score */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-3 border-t border-slate-100">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Ready to test student predictions?</h4>
            <p className="text-[11px] text-slate-500">Run the live Random Forest model on custom student profiles.</p>
          </div>
          <button
            type="button"
            id="about-cta-predict"
            onClick={() => onNavigate('predict')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors"
          >
            <span>Launch Prediction Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
