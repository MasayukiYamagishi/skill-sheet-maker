// src/components/Modal.tsx
import { FC, ReactNode, useRef } from 'react';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';

export type ModalProps = {
  /** モーダルを開くボタンのラベル. */
  buttonLabel: string;
  /** モーダルのタイトル. */
  title: string;
  /** モーダル内部に表示するコンテンツ */
  children: ReactNode;
  /** ボタンを広くするかどうか. */
  isWide?: boolean;
};

const Modal: FC<ModalProps> = ({ buttonLabel, title, children, isWide = false }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button label={buttonLabel} isWide={isWide} onClick={() => dialogRef.current?.showModal()} />
      <dialog ref={dialogRef} className="modal backdrop-blur-sm">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box bg-base-100 text-base-content">
          <div className="modal-action mt-0">
            <IconButton
              icon="close"
              onClick={() => dialogRef.current?.close()}
              className="btn-sm absolute right-2 top-2"
            />
            {/* <Button label="閉じる" isWide={false} onClick={() => dialogRef.current?.close()} /> */}
          </div>
          <h3 className="font-bold text-lg mb-4">{title}</h3>
          <div className="mb-4">{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
