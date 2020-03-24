import * as React from "react";

interface PhoneLinkProps {
    phone: string;
    display?: string;
}

export function PhoneLink(props: PhoneLinkProps) {
    const display = props.display || props.phone;
    const tel = `tel:${props.phone.replace(/\s/, '')}`;
    return (
        <a href={tel}>{ display }</a>
    );
}