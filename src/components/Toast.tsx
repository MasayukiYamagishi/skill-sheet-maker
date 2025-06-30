import { FC, useEffect, useState } from 'react';
import { ToastKind } from '@/types/types';
import { Icon } from './icons/Icon';
import { toastColorMap, toastKindMap } from '@/constants/toast';
import classNames from 'classnames';

type ToastProps = {
  title: string;
  kind: ToastKind;
  message?: string;
  duration?: number;
  onClose: () => void;
};

const Toast: FC<ToastProps> = ({ title, kind, message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const icon = toastKindMap[kind];
  const colorClass = toastColorMap[kind];

  useEffect(() => {
    // マウント直後に表示状態にする
    setVisible(true);

    // duration（ms）後に隠して、さらにアニメーション後にonCloseを発火する
    const hideTimer = setTimeout(() => setVisible(false), duration);
    const removeTimer = setTimeout(onClose, duration + 500); // 500msはトランジション長

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      className={classNames(
        'toast w-100',
        'transition-opacity duration-500 ease-in-out',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="alert">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <Icon icon={icon} size={24} className={colorClass} />
            <p className="font-bold text-xl wrap-normal">{title}</p>
          </div>
          <div className="pl-11">
            <p className="wrap-normal">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
