// If a screen crashes, show a way back instead of a blank page.

import { Component } from 'react'
import { Button } from './ui.jsx'

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-xl font-bold">Something went wrong</h1>
        <p className="text-slate-500">Please reload the page. Your saved records are safe.</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    )
  }
}
