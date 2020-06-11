export enum NotificationType {
  Warning = 'warning',
  Error = "error",
  Success = 'success',
  Info = 'info'
};

export enum NotificationPosition {
  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  Center = 'center',
  CenterStart = 'center-start',
  CenterEnd = 'center-end',
  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end'
}

export interface Notification {
  type: NotificationType,
  title: string,
  position: NotificationPosition
}
