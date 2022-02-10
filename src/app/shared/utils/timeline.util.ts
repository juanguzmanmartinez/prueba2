import { OrderTimeline } from '../../business/order/views/order-detail/interfaces/order-detail.interface';
import { EStatusOrder } from '@models/status-order/status-order.model';

export const reorderTimeline = (timeline: OrderTimeline[]): OrderTimeline[] => {
  const timelineDone: OrderTimeline[] = [];
  const timelineCancelledOrRejected: OrderTimeline[] = [];
  const timelinePending: OrderTimeline[] = [];

  const indexCancelled = indexStatus(timeline, EStatusOrder.cancelled, false);
  const indexIsCancelled = indexStatus(timeline, EStatusOrder.cancelled, true);

  const indexRejected = indexStatus(timeline, EStatusOrder.rejected, false);
  const indexIsRejected = indexStatus(timeline, EStatusOrder.rejected, true);

  if (indexCancelled !== -1) {
    timeline.splice(Number(indexCancelled));
  }

  if (indexRejected !== -1) {
    timeline.splice(Number(indexRejected));
  }

  timelineDone.push(
    ...timeline.filter(value => (
        value.code !== EStatusOrder.rejected && value.code !== EStatusOrder.cancelled && value.selected === true
      )
    ));

  if (indexIsCancelled !== -1) {
    timelineCancelledOrRejected.push(timeline[Number(indexIsCancelled)]);
  } else if (indexIsRejected !== -1) {
    timelineCancelledOrRejected.push(timeline[Number(indexIsRejected)]);
  }

  timelinePending.push(
    ...timeline.filter(value => (
        value.code !== EStatusOrder.rejected && value.code !== EStatusOrder.cancelled && value.selected === false
      )
    ));

  return [
    ...timelineDone,
    ...timelineCancelledOrRejected,
    ...timelinePending
  ];
};

const indexStatus = (timeline: OrderTimeline[], code: EStatusOrder, selected: boolean): number | boolean => {
  return timeline.findIndex(value => (value.code === code && value.selected === selected));
};
