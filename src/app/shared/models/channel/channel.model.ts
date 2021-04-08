export enum EChannel {
    default = 'DEFAULT',
    digital = 'DIGITAL',
    call = 'CALL',
    omnichannel = 'OMNI'
}

export const CChannelName = {
    [EChannel.digital]: 'Digital',
    [EChannel.call]: 'Call Center',
    [EChannel.omnichannel]: 'Omnicanalidad'
};
