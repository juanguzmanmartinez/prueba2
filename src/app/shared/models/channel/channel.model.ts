import { CHANNEL_PATH } from '@parameters/router/paths/shared-path.parameter';

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
    [EChannel.digital]: 'secondary-three',
    [EChannel.call]: 'secondary-four',
    [EChannel.omnichannel]: 'secondary-two'
};

export const CChannelRoute = {
    [EChannel.digital]: CHANNEL_PATH.channelDigital,
    [EChannel.call]: CHANNEL_PATH.channelCall,
    [EChannel.omnichannel]: CHANNEL_PATH.channelOmnichannel,
};
