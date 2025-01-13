import React, { useState } from 'react';

const Modal = ({ title, content, confirmText, cancelText, onConfirm, onCancel }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleConfirm = () => {
        setIsVisible(false);
        if (onConfirm) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <>
            {isVisible && (
                <div className="modal" style={{ zIndex: '-50' }}>
                    <div className="modal-content">
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirm}>{confirmText}</button>
                            <button onClick={handleCancel}>{cancelText}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
