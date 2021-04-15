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

export const CChannelColor = {
    [EChannel.digital]: 'dark-secondary-three',
    [EChannel.call]: 'secondary-four',
    [EChannel.omnichannel]: 'secondary-two'
};
