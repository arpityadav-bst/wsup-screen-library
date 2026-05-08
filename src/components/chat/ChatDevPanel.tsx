'use client'

import type { Dispatch, SetStateAction } from 'react'
import DevStateToggle, { DevStateOption } from '@/components/ui/DevStateToggle'
import {
  STATES,
  STATE_LABELS,
  FLOWS,
  FLOW_LABELS,
  type ChatDemoState,
  type FlowMode,
} from '@/app/chat/chat-config'

interface ChatDevPanelProps {
  open: boolean
  flowMode: FlowMode
  setFlowMode: (flow: FlowMode) => void
  chatState: ChatDemoState
  setChatState: Dispatch<SetStateAction<ChatDemoState>>
}

// Two-axis dev panel for /chat. Top section = Flow (which demo journey is being run); bottom
// section = State (what's currently rendered). Flow drives post-login routing inside useSendGate;
// State is the discrete preview / current step. Both rows show "active" simultaneously when in a flow.
export default function ChatDevPanel({ open, flowMode, setFlowMode, chatState, setChatState }: ChatDevPanelProps) {
  return (
    <DevStateToggle open={open} title="Flow" hint="R toggle · Shift+R cycles state">
      {FLOWS.map((flow) => (
        <DevStateOption key={flow} active={flowMode === flow} onClick={() => setFlowMode(flow)}>
          {FLOW_LABELS[flow]}
        </DevStateOption>
      ))}
      <div className="h-px bg-white-10 my-xxs" aria-hidden />
      <span className="text-xxs font-semibold text-text-dim uppercase tracking-[0.8px] mb-xxs">State</span>
      {STATES.map((state) => (
        <DevStateOption key={state} active={chatState === state} onClick={() => setChatState(state)}>
          {STATE_LABELS[state]}
        </DevStateOption>
      ))}
    </DevStateToggle>
  )
}
