import { CHANNEL_PATH } from '@parameters/router/routing/shared/shared-router.parameter';

export enum EChannel {
  default = 'DEFAULT',
  digital = 'DIGITAL',
  call = 'CALL',
  omnichannel = 'OMNI',
  convenio = 'AG'
}

export const CChannelName = {
  [EChannel.digital]: 'Digital',
  [EChannel.call]: 'Call Center',
  [EChannel.omnichannel]: 'Omnicanalidad',
  [EChannel.convenio]: 'Convenio'
};

export const CChannelColor = {
  [EChannel.digital]: 'complementary-three',
  [EChannel.call]: 'complementary-one',
  [EChannel.omnichannel]: 'complementary-two'
};

export const CChannelRoute = {
  [EChannel.digital]: CHANNEL_PATH.channelDigital,
  [EChannel.call]: CHANNEL_PATH.channelCall,
  [EChannel.omnichannel]: CHANNEL_PATH.channelOmnichannel,
};
