import type { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'

import XIcon from './XIcon'

const Modal = ({
  children,
  onCloseModal,
}: {
  children: ReactNode
  onCloseModal: () => void
}): JSX.Element => {
  return (
    <Dialog
      onClose={() => {
        onCloseModal()
      }}
      open={true}
    >
      <div
        className="fixed inset-0 z-30 h-full w-full bg-gray-700/80"
        onClick={onCloseModal}
      />
      <div className="fixed inset-0 z-30 mx-4 flex h-full items-start justify-center overflow-auto">
        <Dialog.Panel className="my-8 mx-auto max-w-full rounded bg-white shadow-lg">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal

export const ModalBody = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  return (
    <div className="flex flex-col p-4" role="dialog">
      {children}
    </div>
  )
}

export const ModalHeader = ({
  children,
  onClickClose,
}: {
  children: ReactNode
  onClickClose: () => void
}): JSX.Element => {
  return (
    <div className="flex items-center justify-between">
      <Dialog.Title className="text-xl">{children}</Dialog.Title>
      <div
        className="text-dark-grey h-5 w-5 cursor-pointer"
        data-testid="modal-header-close"
        onClick={onClickClose}
      >
        <XIcon />
      </div>
    </div>
  )
}
