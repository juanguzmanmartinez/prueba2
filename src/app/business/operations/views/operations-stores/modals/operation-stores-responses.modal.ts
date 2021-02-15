export interface IStore {
    store: string;
    name: string;
    brand: Array<'inkafarma' | 'mifarma'>;
    channel: string;
    status: string;
}

export const STORES_LIST: IStore[] = [
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma', 'mifarma'], channel: 'Digital', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['mifarma'], channel: 'Omnicanalidad', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Digital', status: 'cerrado'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['mifarma'], channel: 'Call center', status: 'cerrado'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
    {store: 'IKB-B03', name: 'DC Surquillo', brand: ['inkafarma'], channel: 'Call center', status: 'activo'},
];
