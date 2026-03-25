import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ExternalLink, Check, Circle,
  Camera, Mic, Volume2, ChevronDown,
  Info, Clock, MessageCircle, RotateCcw,
  Shield, CalendarDays, Lightbulb, Zap,
  MessageSquare, Target, Pause, BookOpen,
  RefreshCw, Sparkles, Play,
} from 'lucide-react'
import { JOBS } from '../data/jobs'

export default function InterviewSetupPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = JOBS.find((j) => j.id === Number(id))
  const [practiceOpen, setPracticeOpen] = useState(false)

  if (!job) {
    return (
      <div className="max-w-[960px] mx-auto px-6 lg:px-10 py-8">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={15} />
          View all opportunities
        </Link>
        <div className="text-center py-24">
          <h1 className="font-display font-bold text-2xl text-surface-900 mb-2">Job not found</h1>
          <p className="text-surface-500">This opportunity may no longer be available.</p>
        </div>
      </div>
    )
  }

  // Find the current (first not_done) interview step
  const currentStepIndex = job.applicationSteps.findIndex((s) => s.status === 'not_done')
  const currentStep = currentStepIndex !== -1 ? job.applicationSteps[currentStepIndex] : null
  const interviewName = currentStep?.name || 'AI Interview'
  const completedSteps = job.applicationSteps.filter((s) => s.status === 'completed').length
  const totalSteps = job.applicationSteps.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className="animate-fade-in-up">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-surface-200 bg-white">
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors duration-200 group"
          >
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Go back
          </button>
          <Link
            to={`/jobs/${job.id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 inline-flex items-center gap-1"
          >
            View listing
            <ExternalLink size={12} />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="#"
            className="text-sm font-medium text-surface-600 hover:text-surface-900 px-4 py-2 border border-surface-200 rounded-lg transition-colors duration-200"
            style={{ borderRadius: '8px' }}
          >
            FAQ
          </Link>
          <Link
            to="#"
            className="text-sm font-medium text-surface-600 hover:text-surface-900 px-4 py-2 border border-surface-200 rounded-lg transition-colors duration-200"
            style={{ borderRadius: '8px' }}
          >
            Contact support
          </Link>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8">
        <div className="lg:grid lg:grid-cols-[260px_1fr_300px] lg:gap-10">

          {/* ─── Left Sidebar ─── */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-8 lg:self-start">
              <h2 className="font-display font-bold text-base text-surface-900 leading-snug mb-1">
                {job.fullTitle}
              </h2>
              <p className="text-xs text-surface-400 mb-5">Application</p>

              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-surface-500 mb-2">
                <span>{completedSteps} of {totalSteps} steps done</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-6" style={{ borderRadius: '9999px' }}>
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%`, borderRadius: '9999px' }}
                />
              </div>

              {/* Step list */}
              <div className="space-y-1">
                {job.applicationSteps.map((step, i) => {
                  const isCurrent = i === currentStepIndex
                  const isCompleted = step.status === 'completed'

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-3 rounded-xl transition-colors duration-200 ${
                        isCurrent
                          ? 'bg-primary-50 border border-primary-200'
                          : 'border border-transparent'
                      }`}
                      style={{ borderRadius: '10px' }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <StepIcon step={step} isCurrent={isCurrent} />
                        <div className="min-w-0">
                          <span className={`text-sm font-medium block truncate ${
                            isCurrent ? 'text-primary-700' : isCompleted ? 'text-surface-700' : 'text-surface-500'
                          }`}>
                            {step.name}
                          </span>
                          {step.core && (
                            <span className="inline-flex px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-surface-100 text-surface-500 rounded mt-0.5" style={{ borderRadius: '4px' }}>
                              Core
                            </span>
                          )}
                        </div>
                      </div>
                      {isCompleted && (
                        <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0" style={{ borderRadius: '9999px' }}>
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </span>
                      )}
                      {isCurrent && (
                        <span className="w-5 h-5 rounded-full border-2 border-primary-400 flex items-center justify-center shrink-0 animate-pulse" style={{ borderRadius: '9999px' }}>
                          <span className="w-2 h-2 rounded-full bg-primary-500" style={{ borderRadius: '9999px' }} />
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ─── Center Content ─── */}
          <div className="min-w-0">
            {/* Interview title */}
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-display font-bold text-2xl text-surface-900 tracking-tight">
                {interviewName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-surface-100 text-surface-600 rounded-lg" style={{ borderRadius: '6px' }}>
                <Clock size={12} />
                13 min
              </span>
            </div>
            <p className="text-sm text-surface-500 leading-relaxed mb-6">
              A short interview that evaluates the level of depth and passion that you have for {job.skills?.[0] || 'this role'}.
            </p>

            {/* Camera preview */}
            <div className="relative w-full aspect-video bg-surface-900 rounded-xl overflow-hidden mb-5 flex items-center justify-center" style={{ borderRadius: '12px' }}>
              <div className="flex flex-col items-center gap-3 text-surface-400">
                <div className="w-16 h-16 rounded-full border-2 border-surface-600 flex items-center justify-center" style={{ borderRadius: '9999px' }}>
                  <Camera size={28} className="text-surface-500" />
                </div>
                <span className="text-sm text-surface-500">Camera preview</span>
              </div>
            </div>

            {/* Device selectors */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <DeviceSelector icon={Mic} label="MacBook Air Microphone" action="Test your mic" />
              <DeviceSelector icon={Volume2} label="MacBook Air Speakers" action="Play test sound" />
              <DeviceSelector icon={Camera} label="MacBook Air Camera" action="Restart devices" />
            </div>

            {/* Troubleshooting help */}
            <button className="w-full py-3 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200" style={{ borderRadius: '10px' }}>
              Troubleshooting help
            </button>

            {/* ─── Bottom navigation ─── */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-surface-200">
              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="px-5 py-2.5 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-lg hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
                style={{ borderRadius: '8px' }}
              >
                Back
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-lg hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none" style={{ borderRadius: '8px' }}>
                Next
              </button>
            </div>
          </div>

          {/* ─── Right Sidebar ─── */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-8 lg:self-start space-y-5">
              {/* AI interview info + what to expect (merged) */}
              <div className="bg-white rounded-xl border border-surface-200 p-5" style={{ borderRadius: '12px' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Info size={15} className="text-primary-600" />
                  <h3 className="font-display font-semibold text-sm text-surface-900">This is an AI interview</h3>
                </div>
                <p className="text-xs text-surface-500 leading-relaxed mb-4">
                  {`Explores your background in ${job.skills?.[0] || 'this field'}. Use a professional recording setup in a quiet room.`}
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    { icon: MessageSquare, text: '5-7 questions, ~13 minutes' },
                    { icon: Zap, text: 'AI adapts follow-ups to your answers' },
                    { icon: Target, text: 'Real scenarios, conversational format' },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-surface-600 leading-relaxed">
                      <Icon size={13} className="text-primary-500 shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 pt-3 border-t border-surface-100">
                  {[
                    { icon: RotateCcw, text: '3 of 3 retakes remaining' },
                    { icon: Shield, text: 'Your data is in your control' },
                    { icon: CalendarDays, text: 'Interview on your own time' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-surface-500">
                      <Icon size={13} className="text-surface-400 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Tips for a strong interview ─── */}
              <div className="bg-white rounded-xl border border-surface-200 p-5" style={{ borderRadius: '12px' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-teal-600" />
                  <h3 className="font-display font-semibold text-sm text-surface-900">Tips for a strong interview</h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { icon: Pause, text: "It's okay to pause and think first" },
                    { icon: BookOpen, text: 'Give specific examples from experience' },
                    { icon: RefreshCw, text: '3 retakes, but most pass on try #1' },
                    { icon: MessageCircle, text: "Speak naturally — not a quiz" },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-surface-600 leading-relaxed">
                      <Icon size={14} className="text-teal-500 shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ─── Try a practice round ─── */}
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 p-5" style={{ borderRadius: '12px' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Play size={15} className="text-primary-600" />
                  <h3 className="font-display font-semibold text-sm text-surface-900">Try a practice round</h3>
                </div>
                <p className="text-xs text-surface-500 leading-relaxed mb-3">
                  Experience the format without affecting your application
                </p>
                <button
                  onClick={() => setPracticeOpen(true)}
                  className="w-full py-2 text-xs font-semibold text-primary-600 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
                  style={{ borderRadius: '8px' }}
                >
                  Start practice
                </button>
              </div>

              {/* Start button */}
              <button className="w-full py-3 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none" style={{ borderRadius: '10px' }}>
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Practice round modal */}
      {practiceOpen && <PracticeModal onClose={() => setPracticeOpen(false)} />}
    </div>
  )
}

/* ─── Practice round modal ─── */
function PracticeModal({ onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  const steps = [
    {
      num: 1,
      title: 'The AI will greet you and ask a warm-up question',
      desc: 'Something simple, like "tell me a bit about your background."',
    },
    {
      num: 2,
      title: 'You respond out loud, just like a normal conversation',
      desc: 'Speak naturally. The AI listens and responds to what you say.',
    },
    {
      num: 3,
      title: "After 2 questions, you're done",
      desc: "That's it — about 2 minutes. You'll feel ready for the real thing.",
    },
  ]

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-200 ${
        visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        className={`relative w-full max-w-[560px] bg-white rounded-2xl shadow-modal transition-all duration-200 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-2'
        }`}
        style={{ borderRadius: '16px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 group"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to interview prep
          </button>
          <span className="inline-flex px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 border border-primary-100 rounded-lg" style={{ borderRadius: '8px' }}>
            Practice mode
          </span>
        </div>

        {/* Body */}
        <div className="px-6 pt-8 pb-6">
          {/* Mic icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center" style={{ borderRadius: '14px' }}>
              <Mic size={28} className="text-primary-500" />
            </div>
          </div>

          <h2 className="font-display font-bold text-xl text-surface-900 text-center mb-2">
            Practice round
          </h2>
          <p className="text-sm text-surface-500 text-center leading-relaxed max-w-[380px] mx-auto mb-8">
            Get comfortable with the AI interview format. This won't affect your application — it's just for you.
          </p>

          {/* Steps */}
          <div className="bg-surface-50 rounded-xl p-5 space-y-5 mb-8" style={{ borderRadius: '12px' }}>
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-sm font-bold shrink-0" style={{ borderRadius: '9999px' }}>
                  {step.num}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-surface-900 leading-snug mb-0.5">
                    {step.title}
                  </p>
                  <p className="text-xs text-surface-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-semibold text-surface-600 bg-white border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
              style={{ borderRadius: '10px' }}
            >
              Skip, I'm ready
            </button>
            <button
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
              style={{ borderRadius: '10px' }}
            >
              Start practice round
            </button>
          </div>

          <p className="text-xs text-surface-400 text-center">
            This practice is not recorded and won't be reviewed.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ─── Step icon ─── */
function StepIcon({ step, isCurrent }) {
  const iconMap = {
    'Resume': BookOpen,
    'Upload Resume': BookOpen,
    'Work Authorization': Shield,
    'Availability': CalendarDays,
  }
  const Icon = iconMap[step.name] || MessageSquare

  if (step.status === 'completed') {
    return (
      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0" style={{ borderRadius: '8px' }}>
        <Icon size={15} className="text-teal-600" />
      </div>
    )
  }

  if (isCurrent) {
    return (
      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0" style={{ borderRadius: '8px' }}>
        <Icon size={15} className="text-primary-600" />
      </div>
    )
  }

  return (
    <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0" style={{ borderRadius: '8px' }}>
      <Icon size={15} className="text-surface-400" />
    </div>
  )
}

/* ─── Device selector ─── */
function DeviceSelector({ icon: Icon, label, action }) {
  return (
    <div className="text-center">
      <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-surface-700 bg-white border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors duration-200" style={{ borderRadius: '8px' }}>
        <Icon size={14} className="text-surface-400 shrink-0" />
        <span className="truncate text-xs font-medium">{label}</span>
        <ChevronDown size={14} className="text-surface-400 shrink-0" />
      </button>
      <button className="mt-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
        {action}
      </button>
    </div>
  )
}

/* ─── Info item ─── */
function InfoItem({ icon: Icon, title, description, link }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={16} className="text-surface-400" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-surface-900 leading-snug">
          {title}
          {link && (
            <button className="ml-1 font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors duration-200">
              {link}
            </button>
          )}
        </p>
        {description && (
          <p className="text-xs text-surface-500 leading-relaxed mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}
