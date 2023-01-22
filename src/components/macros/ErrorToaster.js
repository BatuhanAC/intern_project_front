import toast, { Toaster, ToastBar } from 'react-hot-toast';


const ErrorToaster = ({duration=1500, position="top-right",}) => {
  return (
    <>
      <Toaster toastOptions={{duration:duration, position:position, style: {zIndex:'auto'}}}>
        {(t) => (
          <ToastBar toast={t} >
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  )
}

export default ErrorToaster