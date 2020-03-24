import * as React from "react";

interface EmailLinkProps {
    email: string;
    display?: string;
}

export function EmailLink(props: EmailLinkProps) {
    const display = props.display || props.email;
    const mailto = `mailto:${props.email}`;
    return (
        <a href={mailto}>{ display }</a>
    );
}