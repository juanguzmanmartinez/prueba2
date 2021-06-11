export enum ECompany {
    inkafarma = 'IKF',
    mifarma = 'MF'
}

export const CCompanyName = {
    [ECompany.inkafarma]: 'Inkafarma',
    [ECompany.mifarma]: 'Mifarma'
};

export const CCompanyIcon = {
    [ECompany.inkafarma]: 'inkafarma',
    [ECompany.mifarma]: 'mifarma'
};

export const CompanyList = [
    ECompany.inkafarma,
    ECompany.mifarma
];
