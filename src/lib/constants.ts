export const columnsLabels = {
  chargeName: 'Charge Name',
  chargeCode: 'Charge Code',
  bidderOrg: 'Bidder Organisation',
  mode: 'Mode',
  planType: 'Plan Type',
  subPlanType: 'Sub-Plan Type',
  incoterm: 'Incoterm',
  currency: 'Default Currency',
  user: 'User',
  lastEdit: 'Last Edit',
  editable: 'Editable',
  mandatory: 'Mandatory',
  actions: '',
};

export const filterResetPayload = {
  chargeNameList: [],
  incoterms: [],
  rfqPlanModeList: [],
  rfqPlanTypeList: [],
  rfqPlanSubTypeList: [],
  defaultCurrencyList: [],
  bidderOrganisationTypeList: [],
  isEditable: undefined,
  isMandatory: undefined,
};

export const advancedFiltersList: any = [
  'incoterms',
  'defaultCurrencyList',
  'bidderOrganisationTypeList',
  'isEditable',
  'isMandatory',
];
