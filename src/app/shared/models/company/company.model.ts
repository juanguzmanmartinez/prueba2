export enum ECompany {
    inkafarma = 'IKF',
    mifarma = 'MF'
}

export const CCompanyName = {
    [ECompany.inkafarma]: 'Inkafarma',
    [ECompany.mifarma]: 'Mifarma'
};

export const CompanyList = [
    ECompany.inkafarma,
    ECompany.mifarma
];
