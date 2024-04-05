'use client'

import { useModalStore } from "@/store"
import { ContentModal } from "../modal-content"

export const Modal = () => {
  const isOpenModal = useModalStore(state => state.openModal)
  const toggleOpenModal = useModalStore(state => state.onToggleModal)

  return (
    <div className={`${isOpenModal ? 'fixed' : 'hidden'} fadeIn  top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-30`}>
      <div
        onClick={() => toggleOpenModal()}
        className="fixed top-0 left-0 w-screen h-screen z-20  backdrop-blur-[2px] backdrop-filter "
      />
      <div className="flex justify-center items-center w-full h-full">
        <div className="fade-in opacity-1 z-30 mx-4 md:m-0 p-2 md:p-4 w-full rounded-lg">
          <div className="flex justify-center w-full mb-4">
            <button
              type="button"
              onClick={() => toggleOpenModal()}
              className="bg-light outline-none rounded-full p-2 inline-flex items-center me-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </button>
          </div>
          <div className="w-full md:max-w-96 mx-auto px-1 py-5 mb-6 bg-light rounded-lg grid place-content-center">
            <ContentModal />
          </div>
        </div>
      </div>
    </div>
  )
}
