import { COMPANY_PATH } from '@parameters/router/routing/shared/shared-router.parameter';

export enum ECompany {
  default = 'DEFAULT',
  inkafarma = 'IKF',
  mifarma = 'MF',
  todos = '%'
}

export const CCompanyName = {
  [ECompany.inkafarma]: 'Inkafarma',
  [ECompany.mifarma]: 'Mifarma',
  [ECompany.todos]: 'todos'
};

export const CCompanyIcon = {
  [ECompany.inkafarma]: 'inkafarma',
  [ECompany.mifarma]: 'mifarma',
  [ECompany.todos]: 'todos'
};

export const CCompanyIconDisable = {
  [ECompany.inkafarma]: 'inkafarma-disable',
  [ECompany.mifarma]: 'mifarma-disable',
  [ECompany.todos]: 'todos'
};

export const CCompanyColor = {
  [ECompany.inkafarma]: 'inkafarma',
  [ECompany.mifarma]: 'mifarma',
  [ECompany.todos]: 'secondary-two'
};

export const CompanyList = [
  ECompany.inkafarma,
  ECompany.mifarma,
  // ECompany.todos
];

export const CCompanyRoute = {
  [ECompany.inkafarma]: COMPANY_PATH.companyInkafarma,
  [ECompany.mifarma]: COMPANY_PATH.companyMifarma,
  [ECompany.todos]: COMPANY_PATH.compoanyTodos,
};
