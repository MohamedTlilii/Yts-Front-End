import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TestToast() {
    return (
        <div>
            <button onClick={() => toast.success("Success!")}>Show Success</button>
            <button onClick={() => toast.error("Error!")}>Show Error</button>
            <ToastContainer />
        </div>
    );
}

export default TestToast;
