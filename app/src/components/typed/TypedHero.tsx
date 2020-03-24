import * as React from "react";
import Typed from 'typed.js';

declare global {
    interface Window { typedHeroLoaded?: boolean; }
}

export class TypedHero extends React.Component<{}> {

    componentWillUnmount(): void {
        window.typedHeroLoaded = false;
    }

    render() {
        if(!window.typedHeroLoaded) {
            setTimeout(() => {
                const options = {
                    strings: [
                        'this will be a typing animation.',
                        'fuck I tested positive.'
                    ],
                    typeSpeed: 40,
                    shuffle: true,
                    loop: true
                };
                var typed = new Typed('#typed-hero', options);
            }, 34000);
            window.typedHeroLoaded = true;
        }

        return(
            <div>
                <div>...</div>
                <div>
                    <span id="typed-hero"></span>
                </div>
            </div>
        );
    }
}
