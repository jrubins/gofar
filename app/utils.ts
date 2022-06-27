import Analytics from 'analytics'
import type { AnalyticsInstance } from 'analytics'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Can't find types for this plugin right now.
import segmentPlugin from '@analytics/segment'

export interface Symptom {
  helpText?: string
  id: number
  label: string
  name: string
  points: number
}

export const SYMPTOMS: Symptom[] = [
  {
    helpText:
      'Moderate = able to live independently with disabilities which may include hemiplegia, seizures, ' +
      'ataxia, dysphagia, or permanent memory or mental changes',
    id: 1,
    label: 'Moderate or Severe cognitive/neurologic disability',
    name: 'cognitive-disability',
    points: 15,
  },
  {
    id: 2,
    label: 'Admission from a skilled nursing facility',
    name: 'nursing-facility-admit',
    points: 6,
  },
  {
    helpText:
      'Any solid tissue malignancy with evidence of metastasis or any blood-borne malignancy',
    id: 3,
    label: 'Metastatic or hematologic cancer',
    name: 'metastatic-hematologic-cancer',
    points: 7,
  },
  {
    helpText:
      'Evidence of multisystem injury or single-system injury associated with shock or altered mental ' +
      'status during the current hospitalization',
    id: 4,
    label: 'Major trauma',
    name: 'major-trauma',
    points: 10,
  },
  {
    helpText:
      'Documented diagnosis of active pneumonia, in which antibiotic therapy has not yet been ' +
      'started or is still ongoing',
    id: 5,
    label: 'Pneumonia',
    name: 'pneumonia',
    points: 1,
  },
  {
    helpText:
      'Documented bloodstream infection in which anti-biotic therapy has not yet been ' +
      'started or is still ongoing',
    id: 6,
    label: 'Septicemia',
    name: 'septicemia',
    points: 7,
  },
  {
    helpText:
      'Any evidence of hypotension within 4 h of the event, defined as any of the following: ' +
      'SBP <90 or MAP <60 mm Hg vasopressor or inotropic requirement after volume expansion (except for ' +
      'dopamine <= 3 microgram/kg/min) or intra-aortic balloon pump',
    id: 7,
    label: 'Hypotension or hypoperfusion',
    name: 'hypotension-hypoperfusion',
    points: 5,
  },
  {
    helpText:
      'Documented diagnosis of an intracranial or intra-ventricular hemorrhage or ' +
      'thrombosis during the current admission',
    id: 8,
    label: 'Acute stroke',
    name: 'acute-stroke',
    points: 8,
  },
  {
    helpText:
      'Evidence of acute or chronic respiratory insufficiency within 4 h of the event, ' +
      'defined as any of the following: PaO2/FiO2 ratio <300, PaO2 <60 mm Hg, or SaO2 <90% (without ' +
      'preexisting cyanotic heartdisease) PaCO2, ETCO2, or TcCO2 >50 mm Hg spontaneous respiratory ' +
      'rate >40/min or <5/min requirement for noninvasive ventilation (eg, bag-valve mask, mask CPAP ' +
      'or BiPAP, nasal CPAP or BiPAP), or negative pressure ventilation or requirement for ventilation ' +
      'via invasive airway',
    id: 9,
    label: 'Respiratory insufficiency',
    name: 'respiratory-insufficiency',
    points: 4,
  },
  {
    helpText:
      'Evidence of hepatic insufficiency within 24 h of the event, defined by total ' +
      'bilirubin >2 mg/dL (to convert to micromoles per liter, multiply by 17.104) and AST > 2 ' +
      'times the upper limit of normal or cirrhosis',
    id: 10,
    label: 'Hepatic insufficiency',
    name: 'hepatic-insufficiency',
    points: 6,
  },
  {
    helpText:
      'Requiring ongoing dialysis or extracorporeal filtration therapies, or serum ' +
      'creatinine >2 mg/dL (to convert to micromoles per liter, multiply by 88.4) within 24 h of the event',
    id: 11,
    label: 'Renal insufficiency or dialysis',
    name: 'renal-insufficiency-dialysis',
    points: 4,
  },
  {
    id: 12,
    label: 'Medical noncardiac diagnosis',
    name: 'noncardiac-diagnosis',
    points: 7,
  },
]

export function calculatePointsFromAge(age: number | '') {
  if (age >= 70 && age < 75) {
    return 2
  } else if (age >= 75 && age < 80) {
    return 5
  } else if (age >= 80 && age < 85) {
    return 6
  } else if (age >= 85) {
    return 11
  }

  return 0
}

export function calculateSurvivalProbabilityFromPoints(points: number) {
  if (points >= 24) {
    return '0.9%'
  } else if (points <= 23 && points >= 14) {
    return '1.7%'
  } else if (points <= 13 && points >= -5) {
    return '9.4%'
  } else if (points >= -15 && points <= -6) {
    return '27%'
  }
}

let analytics: AnalyticsInstance | undefined = undefined

export function getAnalytics() {
  if (!analytics) {
    throw new Error('Analytics must be initialized before it can be used.')
  }

  return analytics
}

export function initAnalytics(segmentWriteKey: string) {
  analytics = Analytics({
    app: 'gofar',
    plugins:
      process.env.NODE_ENV === 'test'
        ? []
        : [
            segmentPlugin({
              writeKey: segmentWriteKey,
            }),
          ],
  })
}
