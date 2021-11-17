import React from 'react';
import ConfirmationModal from '../common/confirmationModal';

export default function Logout(props) {
    return (
        <ConfirmationModal
            visible={props.visible}
            onConfirmation={props.onConfirmation}
            onCancel={props.onCancel}
            title={'Cerrar sesión'}
            question={'¿Desea cerrar sesión?'}
        />
    );
}