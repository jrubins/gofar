import React, { useState } from 'react'

import HomePage from './pages/home/HomePage'

import FeedbackModal from './reusable/modals/FeedbackModal'
import Ga from './reusable/scripts/Ga'
import Inspectlet from './reusable/scripts/Inspectlet'
import PageTracker from './reusable/trackers/PageTracker'

const App = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  return (
    <div className="app-container">
      {/* Our analytics libraries. */}
      <Ga />
      <Inspectlet />

      <PageTracker location={window.location} />

      <HomePage openFeedbackModal={() => setIsFeedbackModalOpen(true)} />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        setIsOpen={setIsFeedbackModalOpen}
      />
    </div>
  )
}

export default App
