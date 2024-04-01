import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
    const showError = (message) => {
        toast.error(message, { position: "top-right", autoClose: 2000 });
    };

    const showMessage = (message) => {
        toast.info(message, { position: "top-right", autoClose: 1000 });
    };

    return { showError,showMessage };
};