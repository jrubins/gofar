import { useEffect, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'

import {
  calculatePointsFromAge,
  calculateSurvivalProbabilityFromPoints,
  getAnalytics,
  initAnalytics,
  SYMPTOMS,
} from '../utils'
import type { Symptom as ISymptom } from '../utils'

import Button from '~/components/Button'
import InfoIcon from '~/components/InfoIcon'
import Input from '~/components/Input'
import Label from '~/components/Label'
import Modal, { ModalBody, ModalHeader } from '~/components/Modal'
import Textarea from '~/components/Textarea'
import Tooltip from '~/components/Tooltip'

export default function Index() {
  const [age, setAge] = useState<number | ''>('')
  const [selectedSymptomIDs, setSelectedSymptomIDs] = useState<Set<number>>(
    new Set()
  )

  useEffect(() => {
    initAnalytics(window.ENV.SEGMENT_WRITE_KEY)

    getAnalytics().page()
  }, [])

  return (
    <div className="mx-auto mt-4 max-w-[1200px] space-y-4 px-4 pb-8 text-sm sm:px-0">
      <h1 className="text-4xl sm:px-4 sm:text-2xl">
        Good Outcome Following Attempted Resuscitation (GO-FAR)
      </h1>

      <p className="bg-blue-400/25 p-4">
        Check each condition present on admission to the hospital to calculate
        total score and probability of survival.
      </p>

      <PatientAgeForm age={age} onAgeChanged={setAge} />

      <SymptomsForm
        onSymptomToggled={(symptomID) => {
          setSelectedSymptomIDs((currentSymptomIDs) => {
            const newSelectedSymptomIDs = new Set(currentSymptomIDs)

            if (currentSymptomIDs.has(symptomID)) {
              newSelectedSymptomIDs.delete(symptomID)
            } else {
              newSelectedSymptomIDs.add(symptomID)
            }

            return newSelectedSymptomIDs
          })
        }}
        selectedSymptomIDs={selectedSymptomIDs}
      />

      <ScoreOutput
        age={age}
        onClearAllClicked={() => {
          setAge('')
          setSelectedSymptomIDs(new Set())
        }}
        selectedSymptoms={SYMPTOMS.filter(({ id }) => {
          return selectedSymptomIDs.has(id)
        })}
      />

      <Attribution />

      <div className="flex items-center justify-center space-x-2 text-xs sm:px-4">
        <span>Jonathan Rubins &copy; 2014-2022</span>
        <div className="h-1 w-1 rounded-full bg-black sm:hidden" />
        <Feedback />
      </div>
    </div>
  )
}

const debouncedAgeCustomEvent = _.debounce((age) => {
  getAnalytics().track('Entered: Patient Age', age)
}, 400)

const PatientAgeForm = ({
  age,
  onAgeChanged,
}: {
  age: number | ''
  onAgeChanged(newAge: number | ''): void
}): JSX.Element => (
  <div className="flex items-center space-x-4 px-4">
    <label htmlFor="patient-age">Patient Age:</label>
    <div className="w-36">
      <Input
        id="patient-age"
        name="patient-age"
        onChange={(event) => {
          const newPatientAge = event.target.value
          const newPatientAgeNum = newPatientAge ? Number(newPatientAge) : ''

          debouncedAgeCustomEvent(newPatientAgeNum)

          onAgeChanged(newPatientAgeNum)
        }}
        type="number"
        value={age}
      />
    </div>
  </div>
)

const SymptomsForm = ({
  onSymptomToggled,
  selectedSymptomIDs,
}: {
  onSymptomToggled(symptomID: number): void
  selectedSymptomIDs: Set<number>
}): JSX.Element => (
  <div className="grid grid-cols-3 gap-6 px-4 md:grid-cols-1">
    {SYMPTOMS.map((symptom) => (
      <Symptom
        key={symptom.id}
        isSelected={selectedSymptomIDs.has(symptom.id)}
        onSymptomToggled={onSymptomToggled}
        symptom={symptom}
      />
    ))}
  </div>
)

const Symptom = ({
  isSelected,
  onSymptomToggled,
  symptom,
}: {
  isSelected: boolean
  onSymptomToggled(symptomID: number): void
  symptom: ISymptom
}): JSX.Element => {
  function _onSymptomToggled() {
    getAnalytics().track('Toggled: Symptom', symptom.label)

    onSymptomToggled(symptom.id)
  }

  return (
    <label className="flex items-start space-x-2">
      <input
        checked={isSelected}
        className="mt-1"
        name={`symptom-${symptom.name}`}
        onChange={_onSymptomToggled}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            _onSymptomToggled()
          }
        }}
        type="checkbox"
      />

      <div>
        <span>{symptom.label}</span>

        {symptom.helpText && (
          <>
            {' '}
            <div className="mt-1 hidden text-gray-500 md:block">
              {symptom.helpText}
            </div>
            <Tooltip
              trigger={
                <div
                  className="inline-block h-4 w-4 align-text-bottom md:hidden"
                  onClick={(event) => {
                    // We prevent the default behavior and stop propagation so that clicking on the info
                    // icon does not toggle a symptom's checked status. The user may be clicking on the info
                    // icon if they're on mobile.
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                >
                  <InfoIcon strokeWidth={2} />
                </div>
              }
            >
              <p className="p-2 text-sm">{symptom.helpText}</p>
            </Tooltip>
          </>
        )}
      </div>
    </label>
  )
}

const ScoreOutput = ({
  age,
  onClearAllClicked,
  selectedSymptoms,
}: {
  age: number | ''
  onClearAllClicked(): void
  selectedSymptoms: ISymptom[]
}): JSX.Element => {
  const numSymptomsSelected = selectedSymptoms.length
  const initialSymptomPoints = -15
  const symptomPoints = _.reduce(
    selectedSymptoms,
    (points, symptom) => points + symptom.points,
    0
  )
  const totalPoints =
    calculatePointsFromAge(age) + initialSymptomPoints + symptomPoints
  const probability = calculateSurvivalProbabilityFromPoints(totalPoints)
  const clearAllBtnDisabled = numSymptomsSelected === 0 && !age

  const rowClasses = 'grid grid-cols-[1fr_100px] gap-4 border-t py-2 sm:px-4'

  return (
    <div className="md:sticky md:bottom-0 md:bg-gray-50">
      <div className={rowClasses}>
        <span>GO-FAR Score:</span>
        <span className="text-center">
          <strong>{totalPoints}</strong>
        </span>
      </div>
      <div className={rowClasses}>
        <span>
          Probability of survival to discharge with good neurologic status
          following CPR for in-hospital arrest:
        </span>
        <span className="text-center">
          <strong>{probability}</strong>
        </span>
      </div>
      <div className={rowClasses}>
        <span />
        <Button
          disabled={clearAllBtnDisabled}
          onClick={() => {
            getAnalytics().track('Clicked: Clear All')

            onClearAllClicked()
          }}
          type="button"
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}

const Attribution = (): JSX.Element => (
  <div className="space-y-4 text-xs sm:px-4">
    <p>
      Content derived from{' '}
      <a
        className="text-blue-600 hover:text-blue-800 hover:underline"
        href="http://archinte.jamanetwork.com/article.aspx?articleid=1735894"
        onClick={() => {
          getAnalytics().track('Clicked: Attribution')
        }}
        rel="noreferrer"
        target="_blank"
      >
        Ebell MA et al, Development and Validation of the Good Outcome Following
        Attempted Resuscitation (GO-FAR) Score to Predict Neurologically Intact
        Survival After In-Hospital Cardiopulmonary Resuscitation JAMA Internal
        Medicine November 11, 2013 Volume 173, Number 20
      </a>
    </p>
    <p>
      DISCLAIMER: All calculations must be confirmed before use. The author make
      no claims of the accuracy of the information contained herein; and these
      suggested doses are not a substitute for clinical judgment. Neither
      Jonathan Rubins nor any other party involved in the preparation or
      publication of this site shall be liable for any special, consequential,
      or exemplary damages resulting in whole or part from any user's use of or
      reliance upon this material.
    </p>
  </div>
)

const Feedback = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        asLink
        onClick={() => {
          getAnalytics().track('Opened:Feedback Modal')

          setIsModalOpen(true)
        }}
        type="button"
      >
        Feedback
      </Button>

      {isModalOpen && (
        <FeedbackModal
          onCloseModal={() => {
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}

const FeedbackModal = ({
  onCloseModal,
}: {
  onCloseModal(): void
}): JSX.Element => {
  const [feedback, setFeedback] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  return (
    <Modal onCloseModal={onCloseModal}>
      <ModalBody>
        <div className="w-[600px] max-w-full">
          <div className="mb-4">
            <ModalHeader onClickClose={onCloseModal}>Feedback</ModalHeader>
          </div>

          {/* This is a hidden iFrame that is used to submit the feedback form data to the Google spreadsheet */}
          <iframe
            className="hidden"
            name="feedback-iframe"
            title="feedback-iframe"
          />

          <form
            action="https://docs.google.com/forms/d/1ji9XNn0RiJzuaRAtCObXhVi5_Pe54K2dHafOVytTpJ0/formResponse"
            method="POST"
            onSubmit={() => {
              getAnalytics().track('Submitted: Feedback')

              setIsFormSubmitted(true)
            }}
            target="feedback-iframe"
          >
            <div
              className={clsx('space-y-4', {
                hidden: isFormSubmitted,
              })}
            >
              <p className="bg-blue-400/25 p-4">
                If you have any improvements or suggestions for the GO-FAR
                calculator or are experiencing any issues, please submit your
                feedback using the form below. If you supply your name and
                email, I will be sure to get back to you in a timely manner.
                Thanks!
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback-name">Name</Label>
                  <Input
                    id="feedback-name"
                    name="entry.468931824"
                    type="text"
                  />
                </div>
                <div>
                  <Label htmlFor="feedback-email">Email</Label>
                  <Input
                    id="feedback-email"
                    name="entry.455716436"
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="feedback-text">Feedback</Label>
                  <Textarea
                    id="feedback-text"
                    name="entry.612948227"
                    onChange={(event) => setFeedback(event.target.value)}
                    rows={6}
                    value={feedback}
                  />
                </div>
              </div>
            </div>

            <div
              className={clsx({
                hidden: !isFormSubmitted,
              })}
            >
              <p className="bg-success padding">
                Thanks for your feedback! If you have provided contact
                information, I will get back to you as soon as possible.
              </p>
            </div>

            <div className="mt-4 text-right">
              {isFormSubmitted ? (
                <Button onClick={onCloseModal} type="button">
                  Close
                </Button>
              ) : (
                <Button disabled={!_.trim(feedback)} type="submit">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  )
}
