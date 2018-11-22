/**
 * The different symptoms the user can select.
 *
 * @type {Array}
 */
export const SYMPTOMS = [
  {
    id: 1,
    label: 'Moderate or Severe cognitive/neurologic disability',
    points: 15,
    helpText:
      'Moderate = able to live independently with disabilities which may include hemiplegia, seizures, ' +
      'ataxia, dysphagia, or permanent memory or mental changes',
  },
  {
    id: 2,
    label: 'Admission from a skilled nursing facility',
    points: 6,
  },
  {
    id: 3,
    label: 'Metastatic or hematologic cancer',
    points: 7,
    helpText:
      'Any solid tissue malignancy with evidence of metastasis or any blood-borne malignancy',
  },
  {
    id: 4,
    label: 'Major trauma',
    points: 10,
    helpText:
      'Evidence of multisystem injury or single-system injury associated with shock or altered mental ' +
      'status during the current hospitalization',
  },
  {
    id: 5,
    label: 'Pneumonia',
    points: 1,
    helpText:
      'Documented diagnosis of active pneumonia, in which antibiotic therapy has not yet been ' +
      'started or is still ongoing',
  },
  {
    id: 6,
    label: 'Septicemia',
    points: 7,
    helpText:
      'Documented bloodstream infection in which anti-biotic therapy has not yet been ' +
      'started or is still ongoing',
  },
  {
    id: 7,
    label: 'Hypotension or hypoperfusion',
    points: 5,
    helpText:
      'Any evidence of hypotension within 4 h of the event, defined as any of the following: ' +
      'SBP <90 or MAP <60 mm Hg vasopressor or inotropic requirement after volume expansion (except for ' +
      'dopamine <= 3 microgram/kg/min) or intra-aortic balloon pump',
  },
  {
    id: 8,
    label: 'Acute stroke',
    points: 8,
    helpText:
      'Documented diagnosis of an intracranial or intra-ventricular hemorrhage or ' +
      'thrombosis during the current admission',
  },
  {
    id: 9,
    label: 'Respiratory insufficiency',
    points: 4,
    helpText:
      'Evidence of acute or chronic respiratory insufficiency within 4 h of the event, ' +
      'defined as any of the following: PaO2/FiO2 ratio <300, PaO2 <60 mm Hg, or SaO2 <90% (without ' +
      'preexisting cyanotic heartdisease) PaCO2, ETCO2, or TcCO2 >50 mm Hg spontaneous respiratory ' +
      'rate >40/min or <5/min requirement for noninvasive ventilation (eg, bag-valve mask, mask CPAP ' +
      'or BiPAP, nasal CPAP or BiPAP), or negative pressure ventilation or requirement for ventilation ' +
      'via invasive airway',
  },
  {
    id: 10,
    label: 'Hepatic insufficiency',
    points: 6,
    helpText:
      'Evidence of hepatic insufficiency within 24 h of the event, defined by total ' +
      'bilirubin >2 mg/dL (to convert to micromoles per liter, multiply by 17.104) and AST > 2 ' +
      'times the upper limit of normal or cirrhosis',
  },
  {
    id: 11,
    label: 'Renal insufficiency or dialysis',
    points: 4,
    helpText:
      'Requiring ongoing dialysis or extracorporeal filtration therapies, or serum ' +
      'creatinine >2 mg/dL (to convert to micromoles per liter, multiply by 88.4) within 24 h of the event',
  },
  {
    id: 12,
    label: 'Medical noncardiac diagnosis',
    points: 7,
  },
]
