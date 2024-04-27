import { ENV } from '@/env';
import { notify } from '@/utils';
import { CldUploadWidget } from 'next-cloudinary';
import { UploadIcon } from '../icons';

interface Props {
  changeImage: React.Dispatch<React.SetStateAction<string | null>>
}

export const WidgetUploadImages = ({ changeImage }: Props) => {
  return (
    <div>
      <CldUploadWidget
        uploadPreset='raffles-app'
        config={{
          cloud: {
            cloudName: ENV.CLOUDINARY_NAME,
            apiKey: ENV.CLOUDINARY_KEY,
          },
        }}
        options={{
          multiple: false
        }}
        onSuccess={(results, { close }) => {
          if (typeof (results.info) !== 'string') {
            localStorage.setItem('urlImage', results.info!.url)
            changeImage(results.info!.url)
          }
          notify({ type: 'success', message: 'Imagen cargada con éxito' })
          close()
        }}
      >
        {({ open }) => {
          return (
            <>
              <div className="flex items-center justify-center w-full" onClick={() => open()}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center ">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                    <p className="text-xs text-gray-500 ">Width: 400 x Height: 200</p>
                  </div>
                </label>
              </div>
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  )
}


